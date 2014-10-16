// base setup
var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var path         = require('path');

var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var cors         = require('cors');
var favicon      = require('serve-favicon');
var compression  = require('compression');

var configDb     = require('./config/database.js');
var db           = mongoose.connection;
var port         = process.env.PORT || 8080;
var env          = process.env.NODE_ENV || 'development';

var apiRouter    = express.Router();
var authRouter   = express.Router();
var dataRouter   = express.Router();
var adminRouter  = express.Router();


// mongoose config
mongoose.connect(configDb.url);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connection established');
});


// passport config
require('./config/passport')(passport);


// dev config
// if (env === 'development') {
//   var morgan = require('morgan');
//   app.use(morgan('tiny'));
// }

// app config
app.set('view engine', 'ejs');
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'front-end')));
app.use(cookieParser());
app.use(bodyParser());
app.use(favicon(__dirname + '/public/favicon.ico'));

// router config
apiRouter.use(cors());

// authRouter config
authRouter.use(cors());
authRouter.use(session({ secret: "racksRacksRacksRacks" }));
authRouter.use(passport.initialize());
authRouter.use(passport.session());

// adminRouter config
adminRouter.use(session({ secret: "racksRacksRacksRacks" }));
adminRouter.use(passport.initialize());
adminRouter.use(passport.session());


// routes
app.get('/', function(req, res) {
  res.render(__dirname + '/front-end/index.html');
});
require('./app/api-routes.js')(apiRouter);
require('./app/auth-routes.js')(authRouter, passport);
require('./app/data-routes.js')(dataRouter);
require('./app/admin-routes.js')(adminRouter, passport);


// mount routers
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/portal', dataRouter);
app.use('/admin', adminRouter);

// 404
app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) return res.render(__dirname + '/public/404.ejs', { url: req.url });

  // respond with json
  if (req.accepts('json')) return res.send({ error: 'Not found' });

  // default to plain-text. send()
  res.type('txt').send('Not found');
});


// start server
app.listen(port);
console.log('Magic happens on port ' + port);

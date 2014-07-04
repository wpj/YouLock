// base setup
var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');

var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var cors         = require('cors');
var morgan       = require('morgan');

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
if (env === 'development') {
  app.use(morgan('tiny'));
}

// app config
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser());

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
require('./app/routes.js')(apiRouter);
require('./app/auth-routes.js')(authRouter, passport);
require('./app/data-routes.js')(dataRouter);
require('./app/admin-routes.js')(adminRouter, passport);


// mount routers
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/data', dataRouter);
app.use('/admin', adminRouter);


// start server
app.listen(port);
console.log('Magic happens on port ' + port);

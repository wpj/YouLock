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
var flash        = require('connect-flash');

var configDb     = require('./config/database.js');
var db           = mongoose.connection;
var port         = process.env.PORT || 8080;
var env          = process.env.NODE_ENV || 'development';

var router       = express.Router();
var authRouter   = express.Router();


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
app.use(cookieParser());
app.use(bodyParser());
app.use(flash());
app.set('view engine', 'ejs');

// router config
router.use(cors());

// authRouter config
authRouter.use(cors());
authRouter.use(session({ secret: "racksRacksRacksRacks" }));
authRouter.use(passport.initialize());
authRouter.use(passport.session());


// routes
require('./app/routes.js')(router);
require('./app/auth-routes.js')(authRouter, passport);


// mount routers
app.use('/api', router);
app.use('/auth', authRouter);


// start server
app.listen(port);
console.log('Magic happens on port ' + port);

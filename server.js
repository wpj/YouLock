// BASE SETUP

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

var router       = express.Router();

// mongoose config
mongoose.connect(configDb.url);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connection established');
});

// app config
app.use(bodyParser());

// router config
if (env === 'development') {
  router.use(morgan('tiny'));
}
router.use(cors());


// routes
require('./app/routes.js')(router);


// mount router at ~/api
app.use('/api', router);

// start server
app.listen(port);
console.log('Magic happens on port ' + port);

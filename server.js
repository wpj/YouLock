// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');    // call express
var app        = express();         // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var db = mongoose.connection;
var cors       = require('cors');
var port = process.env.PORT || 8080;    // set our port
var env = process.env.NODE_ENV || 'development';
var configDB = require('./config/database.js');

var router = express.Router();        // get an instance of the express Router

// mongoose config
mongoose.connect(configDB.url);
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

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

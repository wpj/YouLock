// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');    // call express
var app        = express();         // define our app using express
var bodyParser = require('body-parser');
var cors       = require('cors');
var Lockup = require('./app/models/lockup');

var mongoose = require('mongoose');
if (process.env.NODE_ENV === 'development') mongoose.connect('mongodb://localhost:lockup-api');
if (process.env.NODE_ENV === 'test') mongoose.connect('mongodb://localhost:lockup-api-test');
mongoose.connect('mongodb://localhost:lockup-api');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('DB connection established');
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

var port = process.env.PORT || 8080;    // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();        // get an instance of the express Router

router.use(cors());

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'Please visit /api/lockups to use the API' }); 
});

// on routes that end in /lockups
// ----------------------------------------------------
router.route('/lockups')

  // create a lockup (accessed at POST http://localhost:8080/api/lockups)
  .post(function(req, res) {
    Lockup.create({
      name: req.body.name,
      address: req.body.address,
      location: {
        type: req.body.location.type,
        coordinates: req.body.location.coordinates
      },
      rackAmount: req.body.rackAmount,
      createdBy: req.body.createdBy
    },
    function(err, lockup) {
      if (err) res.send(err);
      console.log(lockup);
      res.json(lockup);
    });
  })

  // if there's a map_bounds query string, send Lockup documents within the map area
  // otherwise, get all the lockups (accessed at GET http://localhost:8080/api/lockups)
  .get(function(req, res) {
    if (req.query.filtered) {

      // have to parseInt because the params return a stringified num for some reason
      // cornersArray has to be in this format to work with mongo's $within $box function
      var cornersArray = [
        [
          parseFloat(req.query.SWLng),
          parseFloat(req.query.SWLat)
        ],
        [
          parseFloat(req.query.NELng),
          parseFloat(req.query.NELat)
        ]
      ];

      Lockup.findInMapArea(cornersArray, function(err, lockups) {
        if (err) console.log(err);
        console.log(lockups);
        res.json(lockups);
      });
    } else {
      Lockup.find(function(err, lockups) {
        if (err) res.send(err);
        res.json(lockups);
      });
    };
  });

router.route('/lockups/:lockup_id')

  // get the lockup with that id (accessed at 
  // GET http://localhost:8080/api/lockups/:lockup_id)
  .get(function(req, res) {
    Lockup.findById(req.params.lockup_id, function(err, lockup) {
      if (err) res.send(err);
      res.json(lockup);
    });
  })

  // update the lockup with this id
  // (accessed at PUT http://localhost:8080/api/lockups/:lockup_id)
  .put(function(req, res) {
    Lockup.findById(req.params.lockup_id, function(err, lockup) {
      if (err) return res.send(err);
      lockup.update({
        name: req.body.name,
        address: req.body.address,
        coordinates: req.body.coordinates,
        rackAmount: req.body.rackAmount,
        createdBy: req.body.createdBy
      }, function(err) {
        if (err) return res.send(err);
        // } else {
        res.json({ message: "Lockup updated!" });
        // };
      });
    });
  })

  // delete the lockup with this id
  // (accessed at DELETE http://localhost:8080/api/lockups/:lockup_id)
  .delete(function(req, res) {
    Lockup.remove({
      _id: req.params.lockup_id
    }, function(err, lockup) {
      if (err) res.send(err);
      res.json({ message: 'Lockup successfully deleted' });
    });
  });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

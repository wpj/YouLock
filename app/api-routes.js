var Lockup = require('./models/lockup');
var Report = require('./models/report');
var Record = require('./models/record');

module.exports = function(router) {
  // API ROUTES
  // =============================================================================

  // accessed at GET http://localhost:8080/api
  router.get('/', function(req, res) {
    res.json({ message: 'Please visit /api/lockups to use the API' });
  });

  // on routes that end in /lockups
  // ----------------------------------------------------
  router.route('/lockups')

    // create a lockup (accessed at POST http://localhost:8080/api/lockups)
    .post(function(req, res) {
      Lockup.create({
        description: req.body.description,
        address: req.body.address,
        location: req.body.location,
        rackAmount: req.body.rackAmount,
        createdBy: req.body.createdBy,
        lockupType: req.body.lockupType
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
      }
    });

  router.route('/lockups/:lockup_id')

    // get the lockup with that id (accessed at 
    // GET http://localhost:8080/api/lockups/:lockup_id)
    .get(function(req, res) {
      Lockup.findById(req.params.lockup_id, function(err, lockup) {
        if (err) res.send(err);
        if (lockup) {
          res.json(lockup);
        } else {
          res.send("Lockup not found.");
        }
      });
    })

    // update the lockup with this id
    // (accessed at PUT http://localhost:8080/api/lockups/:lockup_id)
    .put(function(req, res) {
      Lockup.findById(req.params.lockup_id, function(err, lockup) {
        if (err) return res.send(err);
        if (lockup) {
          lockup.update({
            description: req.body.description,
            address: req.body.address,
            location: req.body.location,
            rackAmount: req.body.rackAmount,
            createdBy: req.body.createdBy,
            lockupType: req.body.lockupType
          }, function(err) {
            if (err) return res.send(err);
            res.json({ message: "Lockup updated!" });
          });
        } else {
          res.json({ message: "Lockup not found." });
        }
      });
    })

    // delete the lockup with this id
    // (accessed at DELETE http://localhost:8080/api/lockups/:lockup_id)
    .delete(function(req, res) {
      Lockup.findById(req.params.lockup_id, function(err, lockup) {
        if (lockup) {
          Lockup.remove({
            // _id: req.params.lockup_id
            _id: lockup._id
          }, function(err, lockup) {
            if (err) res.send(err);
            res.json({ message: 'Lockup successfully deleted' });
          });
        } else {
          res.json({ message: "Lockup not found" });
        }
      });
    });

  // routes for report functionality
  router.route('/reports')

    .post(function(req, res) {
      Report.create({
        lockupId: req.body.lockupId,
        reportDescription: req.body.description,
        theft: req.body.theft,
        missing: req.body.missing
      }, function(err, report) {
        if (err) res.send(err);
        if (report) console.log(report);
        res.json(report);
      });
    });

  // analytics
  router.get('/analytics/lockups/:lockup_id', function(req, res) {
    Lockup.findById(req.params.lockup_id, function(err, lockup) {
      if (err) res.send(err);

      lockup.pageViews++;
      lockup.save(function(err) {
        if (err) console.log(err);
        // res.send("Incremented pageview counter to " + lockup.pageViews + " for :" + lockup._id);
      });
      console.log(lockup.location);

      Record.create({
        dataType: 1,
        time: new Date(),
        location: {
          type: "Point",
          coordinates: lockup.location.coordinates
        }
      }, function(err, record) {
        if (err) res.send(err);
        res.json(record);
      });
    });
  });

  router.get('/analytics/search/location', function(req, res) {
    Record.create({
      dataType: 2,
      time: new Date(),
      location: {
        type: "Point",
        coordinates: [
          parseFloat(req.query.lng),
          parseFloat(req.query.lat)
        ]
      }
    }, function(err, record) {
      if (err) res.send(err);
      res.json(record);
    });
  });

  router.get('/analytics/search/address', function(req, res) {
    Record.create({
      dataType: 3,
      time: new Date(),
      location: {
        type: "Point",
        coordinates: [
          parseFloat(req.query.lng),
          parseFloat(req.query.lat)
        ]
      }
    }, function(err, record) {
      if (err) res.send(err);
      res.json(record);
    });
  });

  router.get('/data', function(req, res) {
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

      // if search query is filtered by Record's dataType
      if (req.query.searchMode) {
        // finds Records within the current map area that match the current searchMode (1, 2, or 3)
        Record.findDataTypeInMapArea(cornersArray, req.query.searchMode, function(err, records) {
          if (err) console.log(err);
          console.log(records);
          return res.json(records);
        });
      } else {
        // finds Records within the current map area
        Record.findAllInMapArea(cornersArray, function(err, records) {
          if (err) console.log(err);
          console.log(records);
          return res.json(records);
        });
      }
    } else {
      Record.find(function(err, records) {
        if (err) res.send(err);
        return res.json(records);
      });
    }
  });

};

// route middleware to make sure a user is logged in
var isLoggedIn = function(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    console.log("Request authenticated.");
    return next();
  }

  res.send(401);
  // res.json(401, { message: "Please sign in." });
};

var isAdmin = function(req, res, next) {
  if (req.user.admin) {
    console.log("User is admin.");
    return next();
  }

  res.redirect('/login');
};
var Lockup = require('./models/lockup');
var Report = require('./models/report');

module.exports = function(router, passport) {

  router.get('/', isLoggedIn, isAdmin, function(req, res) {
    res.render(__dirname + '/../public/admin/admin');
  });

  router.get('/login', function(req, res) {
    res.render(__dirname + '/../public/admin/login');
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/admin',
    failureRedirect : 'login',
    failureFlash : false
  }));

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('login');
  });

  
  // lockup management routes

  router.route('/lockups/:lockup_id')

    // update the lockup with this id
    // (accessed at PUT http://localhost:8080/api/lockups/:lockup_id)
    .put(isLoggedIn, isAdmin, function(req, res) {
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
    .delete(isLoggedIn, isAdmin, function(req, res) {
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

  // report routes

  router.get('/reports', isLoggedIn, isAdmin, function(req, res) {
    Report.find(function(err, reports) {
      if (err) res.send(err);
      res.json(reports);
    });
  });

  router.delete('/reports/:report_id', isLoggedIn, isAdmin, function(req, res) {
    Report.findById(req.params.report_id, function(err, report) {
      if (report) {
        Report.remove({
          _id: report._id
        }, function(err, report) {
          if (err) res.send(err);
          res.json({ message: 'Report successfully deleted' });
        });
      } else {
        res.json({ message: "Report not found" });
      }
    });
  });
};

var isLoggedIn = function(req, res, next) {
  console.log(req.cookies);

  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('login');
};

var isAdmin = function(req, res, next) {
  if (req.user.admin) {
    return next();
  }

  res.redirect('login');
};
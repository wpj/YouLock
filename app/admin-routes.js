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

  
  // report routes

  router.get('/reports', isLoggedIn, isAdmin, function(req, res) {
    Report.find(function(err, reports) {
      if (err) res.send(err);
      res.json(reports);
    });
  });

  router.delete('/reports/:report_id', function(req, res) {
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
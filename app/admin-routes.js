var Lockup = require('./models/lockup');
var Report = require('./models/report');

module.exports = function(router) {
  router.get('/', function(req, res) {
    res.render(__dirname + '/../admin/admin');
  });

  router.get('/reports', function(req, res) {
    Report.find(function(err, reports) {
      if (err) res.send(err);
      res.json(reports);
    });
  });
};

var isLoggedIn = function(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    console.log("Request authenticated.");
    return next();
  }

  res.send(401);
  // res.json(401, { message: "Please sign in." });
};
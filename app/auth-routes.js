module.exports = function(router, passport) {

  router.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) return next(err);
      if (!user) return res.json(403, {
        signedUp: false,
        info: info
      });
      
      // add logic for logging in user here

      res.json({
        signedUp: true,
        info: info
      });
    })(req, res, next);
  });

  router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) return next(err);
      if (!user) return res.json(401, {
        signedIn: false,
        info: info
      });

      req.login(user, function(err) {
        if (err) return next(err);
        return res.json({
          signedIn: true,
          info: info
        });
      });
      
    })(req, res, next);
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.json({ 'signoutMessage': 'Successfully signed out' });
  });

};
module.exports = function(router, passport) {

  router.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) return next(err);
      if (!user) return res.json(401, {
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
          user: {
            id: user._id,
            email: user.local.email
          },
          signedIn: true,
          info: info
        });
      });
      
    })(req, res, next);
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.json(200, { 'signoutMessage': 'Successfully signed out' });
  });

  router.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? { id: req.user._id, email: req.user.local.email } : '0');
  });

};
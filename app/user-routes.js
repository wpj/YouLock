module.exports = function(router, passport) {

  // Home page with login links
  router.get('/', function(req, res) {
    res.render('index.ejs');
  });

  router.get('/login', function(req, res) {

    // render page and pass in any flash message if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // signup
  router.get('/signup', function(req, res) {

    // render the signup page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process signup form
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // profile section (protected, must be logged in to view)
  router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user: req.user // get the user from the session and pass to template
    });
  });

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));

  // route for logging out
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


  // logout
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });



  // authorization

  // local
  router.get('/connect/local', function(req, res) {
    res.render('connect-local.ejs', { message: req.flash('loginMessage') });
  });
  router.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/connect/local',
    failureFlash: true
  }));

  // facebook

  // send to facebook to do auth
  router.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

  // handle the callback after facebook has authorized the user
  router.get('/connect/facebook/callback',
    passport.authorize('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

  // ===========================================================================
  // UNLINK ACCOUNTS ===========================================================
  // ===========================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local
  router.get('/unlink/local', function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // facebook
  router.get('/unlink/facebook', function(req, res) {
    var user = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });
};

// route middleware to make sure a user is logged in
var isLoggedIn = function(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't, redirect them to the home page
  res.redirect('/');
};
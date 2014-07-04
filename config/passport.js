var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var User       = require('../app/models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

  // passport session setup

  // serialize the user into the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  // local signup
  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {

    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error
        if (err) return done(err);

        // check to see if theres already a user with that email
        if (user) {
          return done(null, false, { 'signupMessage': 'email is already registered' });
        } else {
          var newUser            = new User();
          newUser.local.email    = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.admin          = false;

          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser, { 'signupMessage': 'Signup successful!' });
          });
        }
      });
    });

  }));

  // local login
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {

    // find a user whose email is the same as the one submitted with the form
    // we're checking to see if the user trying to log in exists
    User.findOne({ 'local.email': email }, function(err, user) {
      if (err) return done(err);

      // if no user is found, return message
      if (!user) return done(null, false, { 'loginMessage': 'email/password is incorrect' });

      // if the user is found but the password is wrong
      if (!user.validPassword(password))
        return done(null, false, { 'loginMessage': 'email/password is incorrect' });

      // return the successully logged in user
      return done(null, user, { 'loginMessage': 'Signed in!' });
    });

  }));

};
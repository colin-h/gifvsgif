var express = require('express');
var keys = require('../keys.js');

var utils = require('./utils.js');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  // console.log(user.id);
  // console.log(user.username);

  var userID = user.id;
  var username = user.username;
  //check if user exists
  // utils.findUser()
    //check if they have voted


  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// EXPRESS initialization and config

var app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('client'));
app.use('/scripts', express.static('bower_components'));



app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res){


      // The request will be redirected to GitHub for authentication, so this
      // function will not be called.
    });

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });





//   function (req, res) {


//   // console.log("crossed to server.js");
//   utils.signin();
//   res.end();
// })


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
//accept POST requests.

//Headers
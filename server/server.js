var express = require('express');
var session = require('cookie-session');
var keys = require('../keys.js');

var utils = require('./utils.js');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;



// EXPRESS initialization and config
var app = express();


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

app.use(session({
  name: 'app:session',
  secret: process.env.SESSION_SECRET || 'development',
  secure: (!! process.env.SESSION_SECRET),
  signed: true
}))

app.use(passport.initialize());
app.use(passport.session());


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

  var github_id = user.id;
  var github_username = user.username;

  //check if user exists
  utils.findUser(github_id, function(err, dbUser){

    console.log('user', user);
    // console.log('hasVoted', hasVoted);

    //if user exists
    if (dbUser) {
      done(null, dbUser.github_id);
      console.log("user has been added to session with ", dbUser.github_id);
      console.log("user exists! check to see if they have voted");

      //if user HAS NOT voted
      // if (hasVoted === 0){
      //   console.log("You have 1 vote!");
        //send increment query to database (write in utils)

      //if user HAS voted
      // } else {
        //return/send something
      // }
    } else {

      console.log("user doesn't exist... add them!")
      utils.addUser(github_id, github_username, function(err, newUser){
        if (err) {
          return console.error(err);
        }
        // console.log("----------", newUser;
        done(null, newUser.id);
      });
    }


  })


});

// This happens on every request
passport.deserializeUser(function(userId, done) {

  console.log("before we try to find in deserialize, userID is ", userId);
  // TODO: Find user
  utils.findUser(userId, function(err, dbUser){

    if (dbUser) {
      done(null, dbUser);
    }
    else {
      done(err, null);
    }
  })
});



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


//Handle user vote POST requests
app.post('/voteHard', function (req, res){

  console.log("voteHard user:", req.user);

  //check if they have voted
  if (req.user.hasVoted === 0){
    console.log(req.user.github_username, "has a vote to use! change value in database");
    //change count
    //increment vote
  } else {
    console.log("Oh no, this user has already voted");

  }

})

app.post('/voteSoft', function (req, res){
  console.log("voteSoft user:", req.user);

  if (req.user.hasVoted === 0){
    console.log(req.user.github_username, "has a vote to use! change value in database");

    //change count
    utils.submitVote(req.user.github_id, function(err, results){
      console.log("time to increment the count");
      if (err){
        console.error(err);
      }

      //increment vote
      utils.incrementSoft(function(results){
        console.log("THE VOTE HAS BEEN INCREMENTED");
      });
    })
  } else {
    console.log("Oh no, this user has already voted");

  }
  res.send({})
})




var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

//Authentication Check (not used at the moment).
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}



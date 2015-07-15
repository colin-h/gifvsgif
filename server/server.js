var express = require('express');
var session = require('cookie-session');
var keys = require('../client/keys.js');

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

  var github_id = user.id;
  var github_username = user.username;

  //check if user exists
  utils.findUser(github_id, function(err, dbUser){

    //if user exists
    if (dbUser) {
      done(null, dbUser.github_id);
      console.log("user has been added to session with ", dbUser.github_id);
      console.log("user exists! check to see if they have voted");

    //user doesn't exist
    } else {

      //Add the user!
      console.log("user doesn't exist... add them!")
      utils.addUser(github_id, github_username, function(err, newUser){
        console.log("This is the newUser after addUser succeeds : ", newUser);
        if (err) {
          return console.error(err);
        }

        //Add User to session with their github_id
        done(null, github_id);
      });
    }


  })


});

// This happens on every request
passport.deserializeUser(function(userId, done) {

  console.log("before we try to find in deserialize, userID is ", userId);


  utils.findUser(userId, function(err, dbUser){
    //if found
    if (dbUser) {
      //give back full user info
      done(null, dbUser);
    }
    //else, return error
    else {
      done(err, null);
    }
  })
});



app.use(express.static('client'));
app.use('/scripts', express.static('bower_components'));

app.get('/', function(){
  console.log("testing");
})

app.get('/auth/github',
  passport.authenticate('github'),
    function(req, res){
      // The request will be redirected to GitHub for authentication, so this
      // function will not be called.
    });

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/getCounts', function(req, res){
  //call getCounts in utils
  utils.getCounts(function(err, results){
    if (err){
      console.error(err);
    }

    console.log("the results from the getCounts GET are : ", results)
    res.send(results);

  })
})


//Handle adding votes

app.post('/voteSoft', function (req, res){
  console.log("voteSoft user:", req.user);

  //if user has not voted
  if (req.user.hasvoted === 0){
    console.log(req.user.github_username, "has a vote to use! change value in database");

    //Change their vote value to 1
    utils.submitVote(req.user.github_id, function(err, results){
      console.log("time to increment the count");
      if (err){
        console.error(err);
      }

      //incremenet the vote
      utils.incrementSoft(function(results){
        console.log("THE VOTE HAS BEEN INCREMENTED");
        res.send();
      });
    })

  //if they have voted, return an error.
  } else {
    console.log("Oh no, this user has already voted");

  }
  res.send({})
});

app.post('/voteHard', function (req, res){
  console.log("voteHard user:", req.user);

  //if user has not voted
  if (req.user.hasvoted === 0){
    console.log(req.user.github_username, "has a vote to use! change value in database");

    //Change their vote value to 1
    utils.submitVote(req.user.github_id, function(err, results){
      console.log("hasvoted value for ", req.user.github_username, "has been switched");
      if (err){
        console.error(err);
      }

      //incremenet the vote
      utils.incrementHard(function(results){
        console.log("THE VOTE HAS BEEN INCREMENTED");
        res.send();
      });
    })

  //if they have voted, return an error.
  } else {
    console.log("Oh no, this user has already voted");

  }
  res.send({})
});



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


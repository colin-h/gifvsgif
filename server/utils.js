var sql = require('mysql');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var keys = require('../keys.js')

//set up connection to the database
var dbConnection = sql.createConnection({
  user: "root",
  password: "",
  database: "gifvsgif",
});

dbConnection.connect();



exports.signin = function(){


  console.log("yay");

  passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
};

//get check if user is in database
exports.findUser = function(github_id, cb){
  var queryStr = 'SELECT id, github_username, hasVoted FROM users WHERE github_id = (?);';
  dbConnection.query(queryStr, github_id, function(err, results){

    //results is sent as an array of objects [ { id: 1, github_username: 'colin-h', hasVoted: 0 } ]
    //capture hasVoted property to pass back to our previous func in server.js
    var hasVoted = results[0].hasVoted;
    console.log(results);
    console.log("find user results")
    if (err) {
      cb(400)
    }

    if (results.length === 0) {
      cb(false);
    }

    else {
      cb(true, hasVoted);
    }


  })
};

exports.addUser = function (github_id, github_username, cb){

  //last item is 0 to make hasVoted column falsy
  var params = [github_id, github_username, 0];

  var queryStr = 'INSERT INTO users (github_id, github_username, hasVoted) VALUES ((?), (?), (?));';
  dbConnection.query(queryStr, params, function(err, results){
    if (err){
      cb(400);
    }

    cb(results);
  });
}

//reference
// exports.postUsers = function(username, cb){
//   var queryString = "INSERT INTO users (username) VALUES (?);";
//   dbConnection.query(queryString, username ,function(err, results){
//     if (err) { cb(400) }
//     cb(results);
//   });
// };


//check if use has voted already ???
exports.hasVoted = function(userEmail, cb){

};
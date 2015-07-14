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
exports.findUser = function(userEmail, cb){
  var queryStr = 'SELECT id, hasVoted FROM users WHERE email = (?)';
  dbConnection.query(queryStr, userEmail, function(err, results){
    if (err) {
      cb(400)
    }

    cb(results);
  })
};

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
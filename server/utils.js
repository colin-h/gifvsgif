// var sql = require('mysql');
var pg = require('pg');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
// var keys = require('../client/keys.js')


//Connection POSTGRESQL

//for local, do this
// var dbConnection = new pg.Client(process.env.DATABASE_URL || keys.pgData);
var dbConnection = new pg.Client(process.env.DATABASE_URL);

dbConnection.connect();









// //set up connection to the database MYSQL
// var dbConnection = sql.createConnection({
//   user: "root",
//   password: "",
//   database: "gifvsgif",
// });

// dbConnection.connect();



//get Counts
exports.getCounts = function(cb){

  var queryStr = 'SELECT gif_type, votes FROM gif_counts;'
  dbConnection.query(queryStr, function(err, results){
    if (err) {
      cb(err, null)
    }


    //sends back full results
    //for Postgres change to results.rows
    cb(null, results.rows);

  })
}

//get check if user is in database
exports.findUser = function(github_id, cb){

  console.log("should be github_id : ", github_id);
  var queryStr = 'SELECT id, github_id, github_username, hasVoted FROM users WHERE github_id = ' + github_id + ';';
  dbConnection.query(queryStr, function(err, results){

    //results is sent as an array of objects [ { id: 1, github_username: 'colin-h', hasVoted: 0 } ]
    //capture hasVoted property to pass back to our previous func in server.js
    // var hasVoted = results[0].hasVoted;
    if (err) {
      cb(400, null)
    }
    //for Postgres change to results.rows
    console.log("successful find on : ", results.rows[0]);

    cb(null, results.rows[0]);

  })
};

exports.addUser = function (github_id, github_username, cb){

  //last item is 0 to make hasVoted column falsy
  var params = [github_id, github_username, 0];

  var queryStr = "INSERT INTO users (github_id, github_username, hasVoted) VALUES (" + github_id + ",'" + github_username + "'," + 0 + ");";
  dbConnection.query(queryStr, function(err, results){
    if (err){
      console.log(err);
      cb(400);

    } else {
      console.log("# added user successfully");
      cb(null, results);
    }
  });
}



//send a vote to db
exports.submitVote = function(github_id, cb){
  //change users hasVoted to 1
  var queryStr = "UPDATE users SET hasvoted = 1 WHERE github_id = " + github_id + ";";


  dbConnection.query(queryStr, function(err, results){
    if (err){
      cb(400)
    }
    console.log("vote changed successfully, results are : ", results);
    cb(null, results);
  });
}

exports.incrementSoft = function(cb){

  //NOTE: id = 2 for soft g in database gif_counts
  var queryStr = "UPDATE gif_counts SET votes = votes + 1 WHERE id = 2;"

  dbConnection.query(queryStr, function (err, results){
    if (err){
      cb(400)
    }
    console.log("incrementSoft has succeeded!!");
    cb(null, results);
  })
}

exports.incrementHard = function(cb){

  //NOTE: id = 2 for Hard g in database gif_counts
  var queryStr = "UPDATE gif_counts SET votes = votes + 1 WHERE id = 1;"

  dbConnection.query(queryStr, function (err, results){
    if (err){
      cb(400)
    }
    console.log("incrementHard has succeeded!!");
    cb(null, results);
  })
}





//reference
// exports.postUsers = function(username, cb){
//   var queryString = "INSERT INTO users (username) VALUES (?);";
//   dbConnection.query(queryString, username ,function(err, results){
//     if (err) { cb(400) }
//     cb(results);
//   });
// };
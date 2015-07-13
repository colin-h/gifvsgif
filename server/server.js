var express = require('express');
var sql = require('mysql');
var app = express();


app.use(express.static('client'));
app.use('/scripts', express.static('bower_components'));

// respond with "hello world" when a GET request is made to the homepage
// app.get('/', function(req, res) {
//   res.send('../client/index.html');
// });

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


//accept POST requests.

//Headers
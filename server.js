var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var routes = require('./routes/routes')(app);

var port = process.env.PORT || 4034;

app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log("listening on port: " + port);
});

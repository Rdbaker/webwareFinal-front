var assert = require("assert")
var app = require("../server")
var http = require("./suppport/http")

describe('The endpoints of the application', function(){

  before(function(done) {
    http.createServer(app, done);
  });

  it('GET /status should return a 200 for the app and all services', function(done) {
    request()
      .get('/status');
  });
});

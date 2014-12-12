var jade = require('jade');
var request = require('request');

requirements = {
  'jade' : jade,
  'request' : request,
};

// register all routes
function router(app) {
  var tests = require('./tests')(app, requirements);
  var status = require('./status')(app, requirements);
  var index = require('./index')(app, requirements);
  var api = require('./api')(app, requirements);
}

module.exports = router;

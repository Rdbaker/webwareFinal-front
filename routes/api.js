module.exports = function(app, reqs) {
  // ------------ API endpoints -----------------
  // this file is used to get the partials

  // --------------- HOME PAGE VIEWS -----------------
  // GET the main game jade template
  app.get('/home', function(req, res) {
     // set the options
    var options = {};
    // set the locals
    var locals = {};

    var fn = reqs.jade.compileFile('./views/home.jade', options);
    // send back the compiled jade file
    res.send(fn(locals));

  });

  // GET the games view
  app.get('/games-view', function(req, res) {
    // set the options
    var options = {};
    // set the locals
    var locals = {};

    var fn = reqs.jade.compileFile('./templates/games-view.jade', options);
    // send back the compiled jade file
    res.send(fn(locals));
  });

  // GET the leaderboard view
  app.get('/leaderboard-view', function(req, res) {
    // set the options
    var options = {};
    // set the locals
    var locals = {};

    var fn = reqs.jade.compileFile('./templates/leaderboard-view.jade', options);
    // send back the compiled jade file
    res.send(fn(locals));
  });

  // GET the user stocks view
  app.get('/user-stocks-view', function(req, res) {
    // set the options
    var options = {};
    // set the locals
    var locals = {};

    var fn = reqs.jade.compileFile('./templates/user-stocks-view.jade', options);
    // send back the compiled jade file
    res.send(fn(locals));
  });
  // --------------- END HOME PAGE VIEWS -----------------

  // --------------- BROWSE PAGE VIEWS -----------------
  // GET the main browse jade template
  app.get('/browse', function(req, res) {
     // set the options
    var options = {};
    // set the locals
    var locals = {};

    var fn = reqs.jade.compileFile('./views/browse.jade', options);
    // send back the compiled jade file
    res.send(fn(locals));

  });

  // GET the browse stocks view
  app.get('/browse-view', function(req, res) {
    // set the options
    var options ={};
    // set the locals
    var locals = {};

    var fn = reqs.jade.compileFile('./templates/browse-view.jade', options);
    // send back the compiled jade file
    res.send(fn(locals));
  });
  // --------------- END BROWSE PAGE VIEWS -----------------


};

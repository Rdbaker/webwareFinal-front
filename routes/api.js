module.exports = function(app, reqs) {
  // ------------ API endpoints -----------------
  // this file is used to get the partials and views

  // --------------- HOME PAGE VIEWS -----------------
  // GET the games view
  app.get('/games-view', function(req, res) {
    // set the locals
    var obj = {};
    var fn = reqs.jade.compileFile('./templates/games-view.jade', obj);
    // send back the compiled jade file
    res.send(fn(obj));
  });

  // GET the leaderboard view
  app.get('/leaderboard-view', function(req, res) {
    // set the locals
    var obj = {};
    var fn = reqs.jade.compileFile('./templates/leaderboard-view.jade', obj);
    // send back the compiled jade file
    res.send(fn(obj));
  });

  // GET the user stocks view
  app.get('/user-stocks-view', function(req, res) {
    // set the locals
    var obj = {};
    var fn = reqs.jade.compileFile('./templates/user-stocks-view.jade', obj);
    // send back the compiled jade file
    res.send(fn(obj));
  });

  // --------------- END HOME PAGE VIEWS -----------------

};

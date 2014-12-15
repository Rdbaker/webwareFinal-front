module.exports = function(app, reqs) {
  // GET the login page
  app.get('/', function(req, res) {
    // set the options
    var options = {};
    // set the locals
    var locals = {};

    var fn = reqs.jade.compileFile('./views/login.jade', options);
    // send back the compiled jade file
    res.send(fn(locals));
  });

  // POST to the login route
  app.post('/login', function(req, res) {
    // logic for logging in
    // then redirect to the home page
    res.redirect('/game');
  });

  // POST to the signup route
  app.post('/signup', function(req, res) {
    // logic for signing up
    // then redirect to the home page
    res.redirect('/game');
  });

  // GET the game view
  app.get('/game', function(req, res) {
    // set the options
    var options = {};
    // set the locals
    var locals = {};

    var fn = reqs.jade.compileFile('./views/parent.jade', options);
    // send back the compiled jade file
    res.send(fn(locals));
  });

  // GET the browse stocks view
  app.get('/browse', function(req, res) {
    // set the options
    var options = {};
    // set the locals
    var locals = {};

    var fn = reqs.jade.compileFile('./views/browse.jade', options);
    // send back the compiled jade file
    res.send(fn(locals));
  });

  // POST the logout and return to the login page
  app.post('/logout', function(req, res) {
    // do some logic to end the user's session
    res.redirect('/');
  });

};

module.exports = function(app, reqs) {
  // GET the login page
  app.get('/', function(req, res) {
    // set the locals
    var obj = {};
    var fn = reqs.jade.compileFile('./views/login.jade', obj);
    // send back the compiled jade file
    res.send(fn(obj));
  });

  // POST to the login route
  app.post('/login', function(req, res) {
    // logic for logging in
    // then redirect to the home page
    res.redirect('/home');
  });

  // POST to the signup route
  app.post('/signup', function(req, res) {
    // logic for signing up
    // then redirect to the home page
    res.redirect('/home');
  });

  // GET the home view
  app.get('/home', function(req, res) {
    // set the locals
    var obj = {};
    var fn = reqs.jade.compileFile('./views/home.jade', obj);
    // send back the compiled jade file
    res.send(fn(obj));
  });

  // GET the browse stocks view
  app.get('/browse', function(req, res) {
    // set the locals
    var obj = {};
    var fn = reqs.jade.compileFile('./views/browse.jade', obj);
    // send back the compiled jade file
    res.send(fn(obj));
  });

  // POST the logout and return to the login page
  app.post('/logout', function(req, res) {
    // do some logic to end the user's session
    res.redirect('/');
  });

};

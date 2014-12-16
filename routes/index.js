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
    // send a post request to the API to login
    reqs.request.post(
      {
        url:'http://rous.wpi.edu:4028/users/login',
        // send the data
        json: {
          'username' : req.body.username,
          'password' : req.body.password
        }
      },
      // callback function
      function(err, response, body) {
        if(err) {
          res.redirect('/');
        }
        if(body.code === 400) {
          res.redirect('/');
        } else {
          console.log(body);
          res.set({
            'authToken' : body['authToken'],
            'userId'    : body['userId']
          });
          res.redirect('/game');
        }
      }
    );
  });

  // POST to the signup route
  app.post('/signup', function(req, res) {
    // send a post request to the API to sign a user up
    reqs.request.post(
      {
        url:'http://rous.wpi.edu:4028/users/create',
        // send the data
        json: {
          'username' : req.body.username,
          'password' : req.body.password
        }
      },
      // callback function
      function(err, response, body) {
        res.redirect('/');
      }
    );
  });

  // GET the game view
  app.get('/game', function(req, res) {
    // set the options
    var options = {};
    // set the locals
    var locals = {
      ""
    };

    var fn = reqs.jade.compileFile('./views/parent.jade', options);
    // send back the compiled jade file
    res.send(fn(locals));
  });

  // POST the logout and return to the login page
  app.post('/logout', function(req, res) {
    // do some logic to end the user's session
    res.redirect('/');
  });

};

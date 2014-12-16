module.exports = function(app, reqs) {
  // ------------ API endpoints -----------------
  // this file is used to get the partials or data

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


  // POST get the leaderboard data
  app.post('/leaderboard-data', function(req, res) {
    reqs.request.post(
      {
        url:'http://rous.wpi.edu:4028/games/leaderboard',
        // send the data
        json: {
          'authToken' : req.body.authToken,
          'gameId' : req.body.gameId
        }
      },
      // callback function
      function(err, response, body) {
        var data = [];
        var length = body.length;

        for (i in body) {
          data[i] = { username : body[i].username, amount : Number(body[i].currentValue) };
          var stocks = body[i].stocks;
          var stocksString = '';
          for (j in stocks) {
            stocksString = stocksString + ',' + stocks[j].stockName;
          }
          stocksString = stocksString.substring(1, stocksString.length);

          if(!!stocksString) {
            reqs.request.get(
            {
              url : 'http://rous.wpi.edu:7021/stock/' + stocksString
            },
            // callback function
            function(err2, response2, body2) {
              body2 = JSON.parse(body2);
              for (k in body2) {
                var toAdd = body2[k].askRealtime;
                if (toAdd == 0) {
                  toAdd = body2[k].bidRealtime;
                }
                if(!!stocks[j]) {
                  data[i].amount += Number(toAdd) * Number(stocks[j].currentShares);
                }
              }
              if (data.length === body2.length) {
                data.sort(function(a, b) { return a.amount < b.amount });
                res.send(data);
              }
            });
          } else {
            if (data.length === body.length) {
                data.sort(function(a, b) { return a.amount < b.amount });
                res.send(data);
            }
          }
        }
      });
  });
};

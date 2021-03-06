(function (window, document, $) {
  // make a backbone view
  var GamesView = Backbone.View.extend({
    // the tagname for this view's element
    tagname: "div",

    // what to do on initialization
    initialize: function () {
      // a little trick to use proper scoping
      (function (_this) {
        $.get('/games-view', function (data) {
          $(_this.el).html(data);
          new Application.Services.APIRequestService({
            // type of request
            'type' : "POST",
            // endpoint for the API to hit
            'uri'  : "/games",
            // the data to send
            'data' : { 'authToken' : window.authToken },
            // the callback
            'callback' : function(data) {
              _this.makeTableFromGames(JSON.parse(data));
            }
          });

          // close the new game form
          $("#new-game-form", $(_this.el)).hide();
        });
      })(this);
    },

    // make a table from the game names for the user
    makeTableFromGames: function (games) {
      // get the table body
      var tbody = $("tbody", $("#games")).html("");

      var td1, td2, tr, delbtn;
      // for each game name
      for (var i = 0; i < games.length; i++) {
        // make a new row
        tr = document.createElement('tr');
        td1 = document.createElement('td');
        td2 = document.createElement('td');
        td1.innerText = games[i].name;
        td2.innerText = Number(games[i].currentValue).toFixed(2);

        // append it to the table
        tr.appendChild(td1);
        tr.appendChild(td2);
        // if the user is the creator
        if(userId === games[i].creator) {
          // allow them to delete the game
          delbtn = document.createElement('div');
          delbtn.className = "btn btn-sm btn-primary delete right-align";
          delbtn.innerText = 'x';
          tr.appendChild(delbtn);
        }
        tr.id = games[i].gameId;
        tbody[0].appendChild(tr);
      }
    },

    // open the newGame form
    newGame: function () {
      // open the form
      $("#new-game-form", $(this.el)).slideDown();
    },

    // close the newGame form and clear the inputs
    cancelGame: function () {
      var form = $("#new-game-form", $(this.el));
      // close the form
      form.slideUp('fast');

      // clear the form
      $('input', form).val("");

      // get rid of the player inputs
      var players = $('.add-user', form).remove();

      // make sure the form doesn't have errors
      $("#game-name-group").removeClass('has-error');
      $('#game-start-group').removeClass('has-error');
    },

    // create the game
    createGame: function () {
      // validate the form
      var good = this.validateForm();

      if (good) {
        var gameName = $("#game-name").val();
        var toWin = $("#start-worth").val();
        var names = [];
        $('.add-user').each(function(ind, val) { names.push(val.value); });
        names.push(window.username)
        var uniqueNames = [];
        $.each(names, function(i, el){
          if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        });

        // send the game information to the server
        // in an API service request
        (function(_this) {
          new Application.Services.APIRequestService({
            // the type of request
            'type'       : 'POST',
            // the endpoint for the request
            'uri'        : '/games/create',
            // send the data
            'data'       : {
                             'name'          : gameName,
                             'startValue'    : toWin,
                             'users'         : JSON.stringify(uniqueNames),
                             'authToken'     : window.authToken
                           },
            // the callback
            'callback'   : function(data) {
              new Application.Services.APIRequestService({
                // type of request
                'type' : "POST",
                // endpoint for the API to hit
                'uri'  : "/games",
                // the data to send
                'data' : { 'authToken' : window.authToken },
                // the callback
                'callback' : function(data) {
                  _this.makeTableFromGames(JSON.parse(data));
                }
              });
            }
          });
        })(this);

        // close and clear the form
        this.cancelGame();
      }
    },

    // validate the newGame form
    validateForm: function () {
      // get the input fields
      var gameName = $("#game-name").val();

      // the regex for usernames and for game names
      var re = /\w/;

      // test the game name
      var good = re.test(gameName);

      // if the game name isn't good, let the user know
      if (!good) {
        $("#game-name-group").addClass('has-error');
      } else {
        $("#game-name-group").removeClass('has-error');
      }

      // check if the winning net worth is right
      var worth = $("#start-worth").val();

      // the regex for the networth
      re = /\d/;

      // test the worth
      var good_worth = re.test(worth);

      // if the worth isn't good, let the user know
      if (!good_worth) {
        $('#game-start-group').addClass('has-error');
      } else {
        $('#game-start-group').removeClass('has-error');
      }

      // return the validation result
      return good && good_worth;
    },

    // get the game's info and change its color on a click
    getGameInfo: function (e) {
      // remove any already chosen row
      $('.warning', $('tbody', $(this.el))).removeClass('warning');

      // add it to the clicked row
      $(e.currentTarget).addClass('warning');

      // retrieve the info for the game
      this.retrieveLeaderBoardData(e);
      this.retrieveMyStockPortfolioData(e);

    },

    retrieveLeaderBoardData: function (event) {
      // get the game ID
      var gameId = event.currentTarget.id;
      // send the POST request
      $.post('/leaderboard-data',
        {
          authToken: window.authToken,
          gameId   : gameId
        },
        function(data) {
          // clear the leaderboard
          var tbody = $("tbody", $('#leaderboard-view')).html("");
          var username, networth, row;
          for (var i = 0; i < data.length; i++) {
            // create the row and data for the row
            row = document.createElement("tr");
            username = document.createElement("td");
            networth = document.createElement("td");
            // put the content in the row
            $(username).text(data[i].username);
            $(networth).text(data[i].amount.toFixed(2));
            // append the content to the row
            row.appendChild(username);
            row.appendChild(networth);
            // append the row to the body
            tbody.append(row);
          }
        }
      );
    },

    retrieveMyStockPortfolioData: function (event) {
      // get the game id
      var gameId = event.currentTarget.id;

      (function(_this){
        new Application.Services.APIRequestService({
          // type of request
          'type': "POST",
          // data for the POST
          'data':
            {
              'authToken' : window.authToken,
              'gameId'    : gameId
            },
          // endpoint for the API to hit
          'uri': "/stocks",
          // callback function for the request
          'callback': function (data) {
            // append the data to Leader board table
            // instead of asking for new data from the server
            data = JSON.parse(data);
            var stocks = data;
            var stocksString = '';
            for (j in stocks) {
              stocksString = stocksString + ',' + stocks[j].stockName;
            }
            stocksString = stocksString.substring(1, stocksString.length);
            var tbody = $("tbody", $('#user-stock-view')).html("");
            if(!!stocksString) {
              $.get('http://rous.wpi.edu:7021/stock/' + stocksString,
                // callback function
                function(data2) {
                  data2 = JSON.parse(data2);
                  for (k in data2) {
                    var stockval = data2[k].askRealtime;
                    if (stockval === 0) {
                      stockval = data2[k].bidRealtime;
                    }
                    var stockName, NumOwned, CostperShare, BuySell, row;
                    // create the row and data for the row
                    row = document.createElement("tr");
                    stockName = document.createElement("td");
                    NumOwned = document.createElement("td");
                    CostperShare = document.createElement("td");
                    BuySell = _this.buySellInput();
                    // put the content in the row
                    $(stockName).text(data[k].stockName);
                    $(NumOwned).text(data[k].currentShares);
                    $(CostperShare).text(stockval.toFixed(2));
                    // append the content to the row
                    row.appendChild(stockName);
                    row.appendChild(NumOwned);
                    row.appendChild(CostperShare);
                    row.appendChild(BuySell);
                    // append the row to the body
                    tbody.append(row);
                  }
                }
              );
            }
          }
       });
      })(this);
    },

    addPlayer: function() {
      // add a new input field to the players part of the form
      var formarea = $("#players", $(this.el));

      // create the input area
      var input = document.createElement("input");
      input.type = 'text';
      $(input).addClass('add-user');

      formarea[0].appendChild(input);
    },

    buySellInput: function() {
      // create the elements
      var td = document.createElement('td');
      var sell = document.createElement("span");
      var buy = document.createElement("span");
      var input = document.createElement("input");

      // assign the classes and properties
      sell.className = "btn btn-xs btn-primary sell";
      buy.className = "btn btn-xs btn-success buy";
      sell.innerText = '-';
      buy.innerText = '+';
      input.type = 'text';

      // append the elements
      td.appendChild(sell);
      td.appendChild(input);
      td.appendChild(buy);

      return td;
    },

    deleteGame: function(e) {
      var gameId = e.currentTarget.parentElement.id;
      var dat = {
        'authToken' : window.authToken,
        'gameId'    : gameId
      };
      new Application.Services.APIRequestService({
        'type' : 'POST',
        'uri'  : '/games/remove',
        'data' : dat,
        'callback' : function(data) {
          $('#'+gameId).slideUp();
        }
      });
    },

    // set up the events
    events: {
      'click #game-btn'           : 'newGame',
      'click #cancel-game'        : 'cancelGame',
      'click #create-game'        : 'createGame',
      'click #games > tbody > tr' : 'getGameInfo',
      'click #add-player'         : 'addPlayer',
      'click .delete'             : 'deleteGame'
    },

  });

  // assign it to the global scope
  window.Application.Views.GamesView = GamesView;
})(window, document, jQuery, undefined);

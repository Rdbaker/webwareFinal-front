(function(window, document, $) {
  // make a backbone view
  var UserStockView = Backbone.View.extend({
    // the tagname for this view's element
    tagname: "div",

    // what to do on initialization
    initialize: function() {
      // a little trick to use proper scoping
      (function(_this) {
        $.get('/user-stocks-view', function(data) {
          $(_this.el).html(data);
        });
      })(this);
    },

    buyOrSell: function(e) {
        // get the game id
      var gameId = $('.warning')[0].id;

      if ($(e.currentTarget).hasClass('sell')) {

        (function(_this){
          new Application.Services.APIRequestService({
            // type of request
            'type': "POST",
            // data for the POST
            'data':
              {
                'authToken' : window.authToken,
                'gameId'    : gameId,
                'stockName' : e.currentTarget.parentElement.parentElement.childNodes[0].innerText,
                'amount'    : e.currentTarget.parentElement.childNodes[1].value
              },
            // endpoint for the API to hit
            'uri': "/stocks/sell",
            // callback function for the request
            'callback': function (data) {
              var stocks = Number(e.currentTarget.parentElement.parentElement.childNodes[1].innerText);
              stocks -= Number(e.currentTarget.parentElement.childNodes[1].value);
              e.currentTarget.parentElement.parentElement.childNodes[1].innerText = stocks;

              var moneyChange = Number(e.currentTarget.parentElement.childNodes[1].value) * Number(e.currentTarget.parentElement.parentElement.childNodes[2].innerText);
            
              (function(_this){
                new Application.Services.APIRequestService({
                  // type of request
                  'type': "POST",
                  // data for the POST
                  'data':
                    {
                      'authToken' : window.authToken,
                      'gameId'    : gameId,
                      'amount'    : Number($('.warning')[0].childNodes[1].innerText) + moneyChange
                    },
                  // endpoint for the API to hit
                  'uri': "/games/remainingMoney",
                  // callback function for the request
                  'callback': function (data) {
                  }
                });
              })(this);

              $('.warning')[0].childNodes[1].innerText = (Number($('.warning')[0].childNodes[1].innerText) + moneyChange).toFixed(2);
              e.currentTarget.parentElement.childNodes[1].value = '';
            }
          });
        })(this);

      } else {

        (function(_this){
          new Application.Services.APIRequestService({
            // type of request
            'type': "POST",
            // data for the POST
            'data':
              {
                'authToken' : window.authToken,
                'gameId'    : gameId,
                'stockName' : e.currentTarget.parentElement.parentElement.childNodes[0].innerText,
                'amount'    : e.currentTarget.parentElement.childNodes[1].value
              },
            // endpoint for the API to hit
            'uri': "/stocks/buy",
            // callback function for the request
            'callback': function (data) {
              var stocks = Number(e.currentTarget.parentElement.parentElement.childNodes[1].innerText);
              stocks += Number(e.currentTarget.parentElement.childNodes[1].value);
              e.currentTarget.parentElement.parentElement.childNodes[1].innerText = stocks;

              var moneyChange = Number(e.currentTarget.parentElement.childNodes[1].value) * Number(e.currentTarget.parentElement.parentElement.childNodes[2].innerText);

              (function(_this){
                new Application.Services.APIRequestService({
                  // type of request
                  'type': "POST",
                  // data for the POST
                  'data':
                    {
                      'authToken' : window.authToken,
                      'gameId'    : gameId,
                      'amount'    : Number($('.warning')[0].childNodes[1].innerText) - moneyChange
                    },
                  // endpoint for the API to hit
                  'uri': "/games/remainingMoney",
                  // callback function for the request
                  'callback': function (data) {
                  }
                });
              })(this);

              $('.warning')[0].childNodes[1].innerText = (Number($('.warning')[0].childNodes[1].innerText) - moneyChange).toFixed(2);
              e.currentTarget.parentElement.childNodes[1].value = '';
            }
          });
        })(this);

      }
    },

    // set up the events
    events: {
      'click .buy' : 'buyOrSell',
      'click .sell' : 'buyOrSell'
    },


  });

  // assign it to the global scope
  window.Application.Views.UserStockView = UserStockView;
})(window, document, jQuery, undefined);

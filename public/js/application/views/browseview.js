(function(window, document, $) {
  // make a backbone view
  var BrowseView;
  BrowseView = Backbone.View.extend({
    // the tagname for this view's element
    tagname: "div",

    // what to do on initialization
    initialize: function () {
      // a little trick to use proper scoping
      (function (_this) {
        $.get('/browse-view', function (data) {
          $(_this.el).html(data);
          _this.makeBrowseStocksTable([{id: 100, name: 'test', price: 100}]);

          // close the new game form
          $("#add-stock-form", $(_this.el)).hide();
        });
      })(this);
    },

        // TODO: remove once finished testing

    //add id, stockname, price table and sort by most popular
     makeBrowseStocksTable: function (browseStocks) {
     var tbody = $("tbody", $("#browseStocks"));

     var td1, td2, td3, tr;
     // make a new row for each stock
     for (var i = 0; i < browseStocks.length; i++) {
     td1 = document.createElement('td');
     td2 = document.createElement('td');
     td3 = document.createElement('td');
     tr = document.createElement('tr');
     td1.innerText = browseStocks[i].id;
     td2.innerText = browseStocks[i].name;
     td3.innerText = browseStocks[i].price;

     // add it to the table
     tr.appendChild(td1);
     tr.appendChild(td2);
     tr.appendChild(td3);
     tbody[0].appendChild(tr);
  }


    },

    // open the add stock form
    addStock: function () {
      // open the form
      $("#add-stock-form", $(this.el)).slideDown();
    },

    // close the add stock form and clear the inputs
    cancelGame: function () {
      var form = $("#add-stock-form", $(this.el));
      // close the form
      form.slideUp();

      // clear the form
      $('input', form).val("");
    },

    retrieveStocksData: function(stockId){

    },

    // todo: when user clicks on a a stock,
    // have the div slide down and let them have the option
    // to add it to their portfolio for a specific game
    //(have a drop down of the games they're currently in)*/


    // set up the events
    events: {
      'click #add-stock-btn': 'addStock',
      'click #cancel': 'cancel',
      'click #submit' : 'submit',
      'click #browseStocks > tbody > tr': 'getStockInfo'
    },


  });

  // assign it to the global scope
  window.Application.Views.BrowseView = BrowseView;
})(window, document, jQuery, undefined);

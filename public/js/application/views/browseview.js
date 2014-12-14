(function(window, document, $) {
  // make a backbone view
  var BrowseView = Backbone.View.extend({
    // the tagname for this view's element
    tagname: "div",

    // what to do on initialization
    initialize: function() {
      // a little trick to use proper scoping
      (function(_this) {
        $.get('/browse-view', function(data) {
          $(_this.el).html(data);
        });
      })(this);
    },

    //add stockname, price table and sort by most popular
    makeBrowseStocksTable: function(browseStocks){
      var tableBody = $('tableBody', $(browseStocks));

      var td, tr;
      // make a new row for each stock
      for (var i=0; i<browseStocks.length; i++){
        td = document.createElement('td');
        tr = document.createElement('tr');
        td.innerText(browseStocks[i]);

        // add it to the table
        tr.appendChild(td);
        tableBody[0].appendChild(tr);
      }
    },

    /* TODO: add search bar
    // TODO: when user clicks on a a stock,
    // have the div slide down and let them have the option
    // to add it to their portfolio for a specific game
    (have a drop down of the games they're currently in)*/

    // set up the events
    events: {
    },


  });

  // assign it to the global scope
  window.Application.Views.BrowseView = BrowseView;
})(window, document, jQuery, undefined);

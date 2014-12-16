(function(window, document, $) {
  // make a backbone view
  var LeaderboardView = Backbone.View.extend({
    // the tagname for this view's element
    tagname: "div",

    // what to do on initialization
    initialize: function() {
      // a little trick to use proper scoping
      (function(_this) {
        $.get('/leaderboard-view', function(data) {
          $(_this.el).html(data);
        });
      })(this);
    },

    // make a table from the leaderboard data
    makeLeaderboardTable: function(leaderboard) {
      // get the table body
      var tbody = $('tbody', $('#leaderboard'));

      var td, tr;
      // for each user in the game, make a table entry
      for(var i=0; i<leaderboard.length; i++) {
        // make a new row
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.innerText = names[i];

        // append it to the table
        tr.appendChild(td);
        tbody[0].appendChild(tr);
      }
    },

    // set up the events
    events: {
    },


  });

  // assign it to the global scope
  window.Application.Views.LeaderboardView = LeaderboardView;
})(window, document, jQuery, undefined);

(function(window, document, $) {
  // make a backbone view
  var GamesView = Backbone.View.extend({
    // the tagname for this view's element
    tagname: "div",

    // what to do on initialization
    initialize: function() {
      // a little trick to use proper scoping
      (function(_this) {
        $.get('/games-view', function(data) {
          $(_this.el).html(data);
          // make an API services request to get
          // the games for the user
          // then make a table from it
          _this.makeTableFromGames([{ name: 'test', val: 100}]);
        });
      })(this);
    },

    // make a table from the game names for the user
    makeTableFromGames: function(games) {
      // get the table body
      var tbody = $("tbody", $("#games"));

      var td1,td2,tr;
      // for each game name
      for(var i=0; i<games.length; i++) {
        // make a new row
        tr = document.createElement('tr');
        td1 = document.createElement('td');
        td2 = document.createElement('td');
        td1.innerText = games[i].name;
        td2.innerText = games[i].val;

        // append it to the table
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody[0].appendChild(tr);
      }
    },

    // set up the events
    events: {
      'click #game-btn' : 'newGame'
    },


  });

  // assign it to the global scope
  window.Application.Views.GamesView = GamesView;
})(window, document, jQuery, undefined);

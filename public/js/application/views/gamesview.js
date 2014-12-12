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
        });
      })(this);
    },

    // set up the events
    events: {
    },


  });

  // assign it to the global scope
  window.Application.Views.GamesView = GamesView;
})(window, document, jQuery, undefined);

(function(window, document, $) {

  // scaffold the application container
  var Application = {
    Views       : {},
    Models      : {},
    Collections : {},
    Templates   : {},
    Routers     : {},
    Services    : {}
  }

  // the current views in the Application
  Application.currentViews = [];

  // make sure it's globally available
  window.Application = Application;

  function goHome() {
    $.get('/home', function(data) {
      $('#view-injection').html(data);
      $('#home-btn').addClass('active');
      $('#stocks-btn').removeClass('active');
      // create the backbone views
      var view1 = new Application.Views.GamesView({ el: $('#games-view') }),
          view2 = new Application.Views.LeaderboardView({ el: $('#leaderboard-view') }),
          view3 = new Application.Views.UserStockView({ el: $('#user-stock-view') });
      Application.currentViews.push(
        view1,
        view2,
        view3
      );
    });
  };

  function goBrowse() {
    $.get('/browse', function(data) {
      // inject the view
      $('#view-injection').html(data);
      $('#stocks-btn').addClass('active');
      $('#home-btn').removeClass('active');
      // create the backbone views
      Application.currentViews.push(
        new Application.Views.BrowseView({ el: $('#browse-view') })
      );
    });
  };

  $(document).ready(function() {
    $('#logout-btn').on('click', function(){
      $('form')[0].submit();
    });

    $('#home-btn').on('click', function(e) {
      // remove all current views
      Application.currentViews.forEach(function(elt, ind, arr) {
        arr[ind].remove();
      });
      // get the home view
      goHome();
    });

    $('#stocks-btn').on('click', function(e) {
      // remove all current views
      Application.currentViews.forEach(function(elt, ind, arr) {
        arr[ind].remove();
      });
      // get the browse view
      goBrowse();
    });

    // start on the home view
    goHome();
  });

})(window, document, jQuery, undefined);

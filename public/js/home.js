// this is the initializer for the home page
$(document).ready(function() {
  new Application.Views.GamesView({ el: $('#games-view') });

  $('#home-btn').addClass('active');
  $('#stocks-btn').removeClass('active');
});

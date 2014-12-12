// this is the initializer for the home page
$(document).ready(function() {
  new Application.Views.GamesView({ el: $('#games-view') });
  new Application.Views.LeaderboardView({ el: $('#leaderboard-view') });
  new Application.Views.UserStockView({ el: $('#user-stock-view') });

  $('#home-btn').addClass('active');
  $('#stocks-btn').removeClass('active');
});

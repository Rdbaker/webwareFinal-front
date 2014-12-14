// this is the initializer for the home page
$(document).ready(function() {
  new Application.Views.BrowseView({ el: $('#browse-view') });

  $('#home-btn').removeClass('active');
  $('#stocks-btn').addClass('active');
});

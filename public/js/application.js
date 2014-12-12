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

  // make sure it's globally available
  window.Application = Application;

  $(document).ready(function() {
    $('#logout-btn').on('click', function(){
      $('form')[0].submit();
    });
  });

})(window, document, jQuery, undefined);

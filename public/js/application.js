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

})(window, document, jQuery, undefined);

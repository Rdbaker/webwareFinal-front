(function(window, document, $) {
  // the params variable has the following keys:
  //    type --- the type of request, either "POST" or "GET"
  //    uri  --- the endpoint to hit, starting with "/"
  //    data --- the data to be passed if it is a POST request
  // callback--- the callback function to run with the returned data
  var api_request_service = function(params) {
    // the API host domain - no route attached here
    var api = "http://rous.wpi.edu:" + (params.port || "4028");

    var to_ret = {};

    // make sure the request type is specified
    // and the url is specified
    // and the callback is specified
    if(!params.hasOwnProperty("type") ||
        !params.hasOwnProperty("uri")) {
      return to_ret;
    }

    if(params.type === "GET") {
      // send a get request to the specified url
      $.get(api+params.uri, function(data) {
        // if it has a callback
        if(params.hasOwnProperty("callback")) {
          // call it
          params.callback(data);
        }
        to_ret.data = data;
      });
    } else if (params.type === "POST") {
      // if it doesn't have POST data
      if(!params.hasOwnProperty("data")) {
        // return
        return to_ret;
      }

      $.post(api+params.uri, params.data, function(data) {
        // if there's no callback
        if(!params.hasOwnProperty("callback")) {
          // return the data received
          to_ret.data = data;
        }
        // else call the callback with the data
        params.callback(data);
      });
    }
    return to_ret;
  };


  // assign it to the global scope
  window.Application.Services.APIRequestService = api_request_service;

})(window, document, jQuery, undefined);

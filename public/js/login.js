// this is for the login page
$(document).ready(function() {

    // validate the username input
    function validateUsername() {
      // get the username input value
      var input = $('#username-input').val();
      // the username regex
      var re = /^\w+$/;
      // check if the input is good
      var good = re.test(input);
      if(good) {
        // if it's good, let the user know
        $('#username-group').removeClass('has-error');
      } else {
        // if it's not good, let the user know
        $('#username-group').addClass('has-error');
      }
      // return whether it was good or not
      return good;
    }

    // validate the password
    function validatePassword() {
      // as long as it's not empty I guess that's okay
      var good = !!$('#pw-input').val();
      if(good) {
        // if it's good, let the user know
        $('#pw-group').removeClass('has-error');
      } else {
        // if it's not good, let the user know
        $('#pw-group').addClass('has-error');
      }
      // return whether it was good or not
      return good;
    }

    // send the login
    function sendLogin(e) {
      // validate the form
      if(!validateUsername() || !validatePassword()) {
        return;
      }
      // submit the form
      var form = $('form');
      form[0].action = '/login';
      form[0].submit();
    }

    // send the signup
    function sendSignup(e) {
      // validate the form
      if(!validateEmail() || !validatePassword()) {
        return;
      }

      // submit the form
      var form = $('form');
      form[0].action = '/signup';
      form[0].submit();
    }

    // handle events on the page
    $('#login-btn').on('click', sendLogin);
    $('#signup-btn').on('click', sendSignup);
    $('#username-input').on('input', validateEmail);
    $('#pw-input').on('input', validatePassword);

});

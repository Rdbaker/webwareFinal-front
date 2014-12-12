// this is for the login page
$(document).ready(function() {

    // validate the email input
    function validateEmail() {
      var input = $('#email-input').val();
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var good = re.test(input);
      if(good) {
        $('#email-group').removeClass('has-error');
      } else {
        $('#email-group').addClass('has-error');
      }
      return good;
    }

    // validate the password
    function validatePassword() {
      // as long as it's not empty I guess that's okay
      var good = !!$('#pw-input').val();
      if(good) {
        $('#pw-group').removeClass('has-error');
      } else {
        $('#pw-group').addClass('has-error');
      }
      return good;
    }

    // send the login
    function sendLogin(e) {
      // validate the form
      if(!validateEmail() || !validatePassword()) {
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
    $('#email-input').on('input', validateEmail);
    $('#pw-input').on('input', validatePassword);

});

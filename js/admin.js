'use strict';

(function(ctx) {

  function loggedIn() {
    return localStorage.access_token && parseInt(localStorage.token_expiry) > Date.now();
  }

  function initLoginForm() {
    $('.form-login').on('submit', function(e) {
      e.preventDefault();
      let data = $(this).serialize();
      $.post('http://localhost/api/login', data, function(res) {
        if (res) {
          if (res.success) {
            localStorage.access_token = res.token;
            localStorage.token_expiry = res.expiresIn;
            initNavTabs();
          } else {
            $('.login-result').text(res.message);
          }
        } else {
          $('.login-result').text('Failed to retrieve token from API.');
        }
      }, 'json').fail(function() {
        $('.login-result').text('Failed to connect to API.');
      });
    });
  }

  function initNavTabs() {
    $('.section-toggle').on('click', function(e) {
      e.preventDefault();
      $('.admintab-section').hide();
      $('#' + $(this).data('tab')).fadeIn(500);
    });
    $('.section-toggle:first').trigger('click');
  }

  function displayLogin() {
    $('.admintab-section').hide();
    $('#login-section').show();
    initLoginForm();
  }

  function initAdminPage() {
    initNavTabs();
    initAddForm();
    initEditForm();
  }

  function checkLogin() {
    if (loggedIn()) {
      initAdminPage();
    } else {
      displayLogin();
    }
  }

  $(function() {
    checkLogin();
  });
})(window);

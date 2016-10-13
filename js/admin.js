'use strict';

(function(ctx) {

  let template = Handlebars.compile($('#project-template').html());

  function loggedIn() {
    return localStorage.access_token && parseInt(localStorage.token_expiry) > Date.now();
  }

  function initLoginForm() {
    $('.form-login').on('submit', function(e) {
      $('.form-login').attr('disabled', true);
      e.preventDefault();
      let data = $(this).serialize();
      $.post('http://api.trentonkress.com/api/login', data, function(res) {
        if (res) {
          if (res.success) {
            localStorage.access_token = res.token;
            localStorage.token_expiry = res.expiresIn;
            initNavTabs();
          } else {
            displayLoginResult(res.message);
          }
        } else {
          displayLoginResult('Failed to retrieve token from API.');
        }
      }, 'json').fail(function() {
        displayLoginResult('Failed to connect to API.');
      });
    });
  }

  function displayLoginResult(message) {
    $('.form-login').attr('disabled', false);
    $('.login-result').text(message);
  }

  function initAddForm() {
    $('.form-add-project').on('submit', function(e) {
      e.preventDefault();
      $('.form-add-project').attr('disabled', true);

      let data = $(this).serialize();

      $.ajax({
        type: 'POST',
        url: 'http://api.trentonkress.com/api/projects',
        data: 'token=' + localStorage.access_token + '&' + data,
        success: function(msg) {
          if (msg.includes('Successfully'))
            $('.form-add-project').trigger('reset');
          $('.form-add-project').attr('disabled', true);
          $('.add-result').text(msg);
        }
      });
    });
    $('.form-add-project').on('change', function() {
      $('.project-preview').empty();
      $('.project-preview').append(template(formToJSON($(this))));
    });
    initProjectFlips();
  }

  function formToJSON(form) {
    let data = {};
    form.serializeArray().map(function(x) {
      data[x.name] = x.value;
    });
    return data;
  }

  function initEditForm() {

  }

  function initNavTabs() {
    $('.section-toggle').on('click', function(e) {
      e.preventDefault();
      $('.admintab-section').hide();
      $('#' + $(this).data('tab')).fadeIn(500);
    });
    $('.section-toggle:first').trigger('click');
  }

  function initProjectFlips() {
    $('.project-preview').on('click', '.proj-body-container', function() {
      var target = $(this);
      $('.proj-body-container').each(function() {
        if ($(this).find('.proj-back').is(':visible') && $(this).text() != target.text()) {
          $(this).find('.proj-front').toggle(400);
          $(this).find('.proj-back').toggle(400);
        }
      });
      target.find('.proj-front').toggle(400);
      target.find('.proj-back').toggle(400);
    });
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

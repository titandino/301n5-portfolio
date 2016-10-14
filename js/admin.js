'use strict';

(function(ctx) {

  let template = Handlebars.compile($('#project-template').html());

  function isLoggedIn() {
    if (localStorage.access_token) {
      $.ajaxSetup({
        headers: {
          'x-access-token': localStorage.access_token
        }
      });
      return true;
    }
    return false;
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
        data: data,
        success: function(msg) {
          if (msg.includes('Successfully'))
            $('.form-add-project').trigger('reset');
          $('.form-add-project').attr('disabled', true);
          $('.add-result').text(msg);
        }
      });
    });
    $('.form-add-project').on('change', function() {
      $('.add-project-preview').empty();
      $('.add-project-preview').append(template(formToJSON($(this))));
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

  function deleteProject() {
    let id = $('.form-edit-project input:first-child').val();
    console.log(formToJSON($('.form-edit-project')));
    if (id) {
      if (confirm('Are you sure you want to delete this project?')) {
        $.ajax({
          type: 'DELETE',
          url: 'http://api.trentonkress.com/api/projects',
          data: { projId:id },
          success: function(msg) {
            if (msg.includes('Successfully'))
              $('.form-edit-project').trigger('reset');
            $(this).attr('disabled', false);
            $('.form-edit-project').attr('disabled', false);
            $('.edit-result').text(msg);
          }
        });
      }
    } else {
      $('.edit-result').text('No project selected to delete.');
    }
  }

  function initEditForm() {
    $('#deleteButton').on('click', function() {
      console.log('deleteing');
      deleteProject();
    });
    $('.form-edit-project').on('submit', function(e) {
      e.preventDefault();
      $('.form-edit-project').attr('disabled', true);

      let data = formToJSON($(this));
      data._id = $('.form-edit-project input:first-child').val();

      $.ajax({
        type: 'PUT',
        url: 'http://api.trentonkress.com/api/projects',
        data: data,
        success: function(msg) {
          if (msg.includes('Successfully'))
            $('.form-edit-project').trigger('reset');
          $('.form-edit-project').attr('disabled', false);
          $('.edit-result').text(msg);
        }
      });
    });
    $('.edit-selection').on('change', function() {
      var project = Project.projects[$(this).find('option:selected').data('idx')];
      for (let key in project) {
        if (project.hasOwnProperty(key))
          $('.form-edit-project input[name=' + key + ']').val(project[key]);
      }
      $('.form-edit-project input[name=projId]').val(project._id);
      $('.edit-project-preview').empty();
      $('.edit-project-preview').append(template(formToJSON($('.form-edit-project'))));
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
    if (isLoggedIn()) {
      initAdminPage();
    } else {
      displayLogin();
    }
  }

  $(function() {
    checkLogin();
  });
})(window);

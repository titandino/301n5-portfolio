'use strict';

(function(ctx) {
  var numLoaded = 0;
  Project.projects = [];

  function Project(data) {
    if (typeof data === 'object') {
      console.log('Parsing object fields.');
      for (let field in data) {
        this[field] = data[field];
      }
    } else {
      console.log('Error loading Project.', data);
    }
  }

  Project.prototype.render = function() {
    let template = Handlebars.compile($('#project-template').html());
    $('.project-display').append(template(this));
    return this;
  };

  function initNav() {
    $('.section-toggle').on('click', function(e) {
      e.preventDefault();
      $('.tab-section').hide();
      $('#' + $(this).data('tab')).fadeIn(500);
    });
    $('.section-toggle:first').trigger('click');
  };

  function initSkillsLists() {
    $('.skills-list').on('click', 'ul', function(e) {
      var target = $(this);
      e.preventDefault();
      $('.skills-list ul > li').each(function() {
        if ($(this).is(':visible') && $(this).parent().text() != target.text()) {
          $(this).toggle(400);
        }
      });
      target.find('li').toggle(400);
    });
  };

  function initProjectFlips() {
    $('#projects').on('click', '.proj-body-container', function() {
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
  };

  function initShowMore() {
    $('#show-more').on('click', () => loadProjects(4));
  };

  Project.preloadProjects = function(callback) {
    Project.projects = [];
    $.getJSON('http://api.trentonkress.com/api/projects', function(data) {
      for(let i = 0;i < data.length;i++) {
        Project.projects[i] = new Project(data[i]);
        $('.edit-selection').append('<option data-idx=' + i + '>' + Project.projects[i].name + '</option>');
        console.log('Project loaded:', i);
      }
    }).fail(function() {
      console.log('Error loading projects file.');
    }).success(function() {
      if (callback)
        callback(4);
    });
  };

  function loadProjects(amount) {
    for(let i = 0;i < amount;i++) {
      if ((numLoaded + i) >= Project.projects.length)
        continue;
      Project.projects[numLoaded + i].render();
    }
    numLoaded += amount;
  };

  $(function() {
    initNav();
    initSkillsLists();
    initProjectFlips();
    initShowMore();
    Project.preloadProjects(loadProjects);
  });

  ctx.Project = Project;
})(window);

'use strict';

(function() {
  var numLoaded = 0;
  var projects = [];

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
    $('#show-more').on('click', function() {
      loadProjects(4);
    });
  };

  function loadProjects(amount) {
    $.getJSON('ajax/projects.json', function(data) {
      for(var i = 0;i < amount;i++) {
        if ((numLoaded + i) >= data.length)
          continue;
        projects[numLoaded + i] = new Project(data[numLoaded + i]).render();
        console.log('Project loaded:', numLoaded + i);
      }
      numLoaded += amount;
    }).fail(function() {
      console.log('Error loading projects file.');
    });
  };

  $(function() {
    initNav();
    initSkillsLists();
    initProjectFlips();
    initShowMore();
    loadProjects(4);
  });
})();

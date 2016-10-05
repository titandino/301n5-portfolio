'use strict';

var renderer = {
  projects: [],
  projectsLoaded: 0,
};

renderer.initNav = function() {
  $('.section-toggle').on('click', function(e) {
    e.preventDefault();
    $('.tab-section').hide();
    $('#' + $(this).data('tab')).fadeIn(500);
  });
  $('.section-toggle:first').trigger('click');
};

renderer.initSkillsLists = function() {
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

renderer.initProjectFlips = function() {
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

renderer.initLoadMore = function() {
  $('#load-more').on('click', function() {
    renderer.loadProjects(4);
  });
};

renderer.loadProjects = function(amount) {
  $.getJSON('ajax/projects.json', function(data) {
    for(var i = 0;i < amount;i++) {
      if ((renderer.projectsLoaded + i) >= data.length)
        continue;
      renderer.projects[renderer.projectsLoaded + i] = new Project(data[renderer.projectsLoaded + i]).render();
      console.log('Project loaded:', renderer.projectsLoaded + i);
    }
    renderer.projectsLoaded += amount;
  }).fail(function() {
    console.log('Error loading projects file.');
  });
};

$(function() {
  renderer.initNav();
  renderer.initSkillsLists();
  renderer.initProjectFlips();
  renderer.initLoadMore();
  renderer.loadProjects(4);
});

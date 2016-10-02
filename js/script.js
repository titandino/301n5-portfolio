'use strict';

var renderer = { };

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
    e.preventDefault();
    $(this).find('li').toggle(300);
  });
};

renderer.initProjectFlips = function() {
  $('#projects').on('click', '.proj-body-container', function() {
    $(this).find('.project-body').toggle();
    $(this).find('img').toggle();
  });
};

$(function() {
  renderer.initNav();
  renderer.initSkillsLists();
  renderer.initProjectFlips();
});

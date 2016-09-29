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
  $('.skills-list ul').on('click', function(e) {
    e.preventDefault();
    $(this).find('li').toggle(300);
  });
};

renderer.initNav();
renderer.initSkillsLists();

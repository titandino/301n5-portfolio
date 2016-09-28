'use strict';

var renderer = { }

renderer.initNav = function() {
  $('.section-toggle').on('click', 'li', function(e) {
    e.preventDefault();
    $('.tab-section').hide();
    $('#' + $(this).name).show();
  });
};

renderer.initNav();

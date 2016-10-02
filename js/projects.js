'use strict';

function Project(data) {
  if (typeof data === 'object') {
    console.log('Parsing object fields.');
    for (var field in data) {
      this[field] = data[field];
    }
  } else {
    console.log('Error loading Project.', data);
  }
}

Project.prototype.render = function() {
  var template = Handlebars.compile($('#project-template').html());
  $('#projects').append(template(this));
};

$(function() {
  $.getJSON('ajax/projects.json', function(data) {
    console.log(data);
    for(var i = 0;i < data.length;i++) {
      new Project(data[i]).render();
    }
  }).fail(function() {
    console.log('Error loading projects file.');
  });
});

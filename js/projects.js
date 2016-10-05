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
  $('.project-display').append(template(this));
  return this;
};

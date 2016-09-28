'use strict';

var projects = [];

function Project(name, date, desc, img) {
  this.name = name;
  this.date = date;
  this.desc = desc;
  this.img = img;
}

Project.prototype.render = function() {

};

projects.push(new Project('FIRST PROJECT', 'June 26th 2016', 'There it is!', 'img/project1.png'));
projects.push(new Project('FIRST PROJECT2', 'June 27th 2016', 'There it is!', 'img/project2.png'));
projects.push(new Project('FIRST PROJECT3', 'June 28th 2016', 'There it is!', 'img/project3.png'));

for(var i = 0;i < projects.length;i++) {
  projects[i].render();
}

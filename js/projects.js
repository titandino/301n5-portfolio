'use strict';

function Project(name, date, desc, img) {
  this.name = name;
  this.date = date;
  this.desc = desc;
  this.img = img;
}

Project.prototype.render = function() {
  var template = Handlebars.compile($('#project-template').html());
  $('#projects').append(template(this));
};

$(function() {
  var projects = [];

  projects.push(new Project('Engine/Content Programmer — Asteroids - a 2D implementation of Asteroids in JavaScript.',
                            'August 2016- Present',
                            '<p>Programmed both the engine and the gameplay from scratch. Small engine that was created includes game object rendering with the 3 essential position, rotation, and scaling transformations, particle system with fading transparency, bounding box static collision, and basic physics up to acceleration. Gameplay includes a menu flow, random asteroids that split based on scale, and powerups. Click <a href="http://titandino.github.io/canvas-game/" target="_blank">here</a> to play the game.</p>',
                            'img/asteroids.png'));
  projects.push(new Project('Programmer/Project Manager — Runescape private servers written in Java.',
                            'June 2007- July 2016',
                            '<p>Reverse engineering obfuscated Java game clients and writing servers that communicate with them to both emulate the real game and create custom content that players suggest ingame or on the website forum. An example showcasing boss mechanics can be seen on my YouTube channel <a href="https://www.youtube.com/watch?v=q2-tvHWhIBA" target="_blank">here</a>.</p>',
                            'img/runescape.png'));
  projects.push(new Project('Engine/Content Programmer — “Curiosity” - a 2D puzzle platformer game written in C. (5 programmers)',
                            'April 2013- June 2013',
                            '<p>Programmed many engine elements including particle systems and an audio controller using the FMOD API. Worked a lot on the physics and graphics end which involved matrices for sprite transformations and vectors for physics and collision detection.</p>',
                            'img/curiosity.png'));

  for(var i = 0;i < projects.length;i++) {
    projects[i].render();
  }
});

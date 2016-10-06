'use strict';

var Drawable = require('./Drawable');
var World = require('./World');

var Rock = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = World.cellSize;
  this.height = World.cellSize;
  this.color = 'brown';
  this.collision = true;
};

Rock.prototype = new Drawable;

module.exports = Rock;

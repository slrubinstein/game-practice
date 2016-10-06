'use strict';

var Drawable = require('../Drawable');
var World = require('../World');

var Water = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = World.cellSize;
  this.height = World.cellSize;
  this.color = 'blue';
  this.collision = true;
};

Water.prototype = new Drawable;

module.exports = Water;

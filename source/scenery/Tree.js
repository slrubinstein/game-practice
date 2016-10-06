'use strict';

var Drawable = require('../Drawable');
var World = require('../World');

var Tree = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = World.cellSize;
  this.height = World.cellSize;
  this.color = 'darkgreen';
  this.collision = true;
};

Tree.prototype = new Drawable;

module.exports = Tree;

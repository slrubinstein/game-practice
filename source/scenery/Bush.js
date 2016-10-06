'use strict';

var Drawable = require('../Drawable');
var World = require('../World');

var Bush = function(x, y) {
	this.x = x;
	this.y = y;
	this.width = World.cellSize;
	this.height = World.cellSize;
	this.color = 'darkolivegreen';
	this.collision = false;
};

Bush.prototype = new Drawable;

module.exports = Bush;

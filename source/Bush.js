'use strict';

var Drawable = require('./Drawable');

var Bush = function(x, y) {
	this.x = x;
	this.y = y;
	this.width = 10;
	this.height = 10;
	this.color = 'darkgreen';
	this.collision = true;
};

Bush.prototype = new Drawable;

module.exports = Bush;

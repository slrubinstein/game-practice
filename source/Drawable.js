'use strict';

var Drawable = function() {};

Drawable.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

module.exports = Drawable;

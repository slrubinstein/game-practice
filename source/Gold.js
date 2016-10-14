'use strict';

var Drawable = require('./Drawable');
var World = require('./World');

var Gold = function(x, y, amount, game) {
  this.x = x;
  this.y = y;
  this.width = World.cellSize;
  this.height = World.cellSize;
  this.color = 'gold';
  this.collision = true;
  this.amount = amount;
  this.game = game;
};

Gold.prototype = new Drawable;

Gold.prototype.draw = function() {
  var ctx = this.game.ctx;
  Drawable.prototype.draw.call(this, ctx);
  ctx.fillStyle = 'black';
  ctx.font = '24px sans-serif';
  ctx.fillText(this.amount, this.x, this.y + this.height);
};

Gold.prototype.removeFromMap = function() {
  this.game.map.scenery.splice(this.game.map.scenery.indexOf(this), 1);
};

module.exports = Gold;

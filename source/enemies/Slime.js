'use strict';

var Enemy = require('../Enemy');
var World = require('../World');
var Player = require('../Player');
var MathUtils = require('../utils/MathUtils');

var Slime = function(x, y, game) {
  this.x = x;
  this.y = y;
  this.game = game;
  this.width = World.cellSize;
  this.height = World.cellSize;
  this.color = 'red';
  this.collision = true;
  this.direction = null;

  Enemy.call(this, {
    hp: MathUtils.randomNumberBetween(4, 6),
    strength: MathUtils.randomNumberBetween(6, 8),
    defense: MathUtils.randomNumberBetween(5, 6),
    level: 1
  });
};

Slime.prototype = Object.create(Enemy.prototype);

Slime.prototype.moveCondition = function() {
  var player = this.game.actors.filter(actor => actor instanceof Player)[0];
  if (this.nextTo(player)) {
    this.attack(player);
  } else {
    this.moveRandom();
  }
};

module.exports = Slime;

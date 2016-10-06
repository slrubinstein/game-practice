'use strict';

var Enemy = require('../Enemy');
var World = require('../World');
var GameProgress = require('../GameProgress');

var Troll = function(x, y, game) {
  this.x = x;
  this.y = y;
  this.game = game;
  this.width = World.cellSize;
  this.height = World.cellSize;
  this.color = 'red';
  this.collision = true;
  this.direction = null;

  Enemy.call(this, {
    hp: 16,
    strength: 13,
    defense: 7,
    level: 3
  });
};

Troll.prototype = Object.create(Enemy.prototype);

Troll.prototype.moveCondition = function(player) {
  if (this.nextTo(player)) {
    this.attack(player);
  } else {
    this.moveRandom();
  }
};

Troll.prototype.die = function() {
  GameProgress.trollAlive = false;
  Enemy.prototype.die.call(this);
};

module.exports = Troll;

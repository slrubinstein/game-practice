'use strict';

var Enemy = require('../Enemy');
var World = require('../World');
var GameProgress = require('../GameProgress');

var Goblin = function(x, y, game) {
  this.x = x;
  this.y = y;
  this.game = game;
  this.width = World.cellSize;
  this.height = World.cellSize;
  this.color = 'red';
  this.collision = true;
  this.direction = null;

  Enemy.call(this, {
    hp: 20,
    strength: 12,
    defense: 5,
    level: 2
  });
};

Goblin.prototype = Object.create(Enemy.prototype);

Goblin.prototype.moveCondition = function(player) {
  if (this.nextTo(player)) {
    this.attack(player);
  } else {
    this.moveRandom();
  }
};

Goblin.prototype.die = function() {
  GameProgress.goblinAlive = false;
  Enemy.prototype.die.call(this);
};

module.exports = Goblin;

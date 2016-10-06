'use strict';

var Player = require('./Player');
var Movable = require('./Movable');
var World = require('./World');
var CollisionDetector = require('./CollisionDetector');
var Combat = require('./Combat');
var MathUtils = require('./utils/MathUtils');

var directions = ['north', 'south', 'east', 'west', null];

var Enemy = function(options) {
  this.hp = options.hp;
  this.strength = options.strength;
  this.defense = options.defense;
  this.level = options.level;
};

Enemy.prototype = new Movable;

Enemy.prototype.moveEnemy = function(player) {
  this.moveCondition(player);
};

Enemy.prototype.moveRandom = function() {
  this.direction = this.getRandomDirection();
  this.move();
};

Enemy.prototype.handleLeaveMap = function(game) {
  this.stayPut();
};

Enemy.prototype.getRandomDirection = function() {
  var random = MathUtils.randomNumberBetween(0, 4);
  return directions[random];
};

Enemy.prototype.handleCollision = function() {
  this.stayPut();
};

Enemy.prototype.attack = function(player) {
  Combat.attack(this, player);
};

Enemy.prototype.die = function() {
  this.game.actors.splice(this.game.actors.indexOf(this), 1);
};

module.exports = Enemy;

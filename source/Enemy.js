'use strict';

var Player = require('./Player');
var Movable = require('./Movable');
var World = require('./World');
var CollisionDetector = require('./CollisionDetector');
var Combat = require('./Combat');
var MathUtils = require('./utils/MathUtils');
var Gold = require('./Gold');

var directions = ['north', 'south', 'east', 'west', null];

var Enemy = function(options) {
  this.hp = options.hp;
  this.strength = options.strength;
  this.defense = options.defense;
  this.level = options.level;
  this.gold = this.createGold();
};

Enemy.prototype = new Movable;

Enemy.prototype.createGold = function() {
  return MathUtils.randomNumberBetween(0, 3) * this.level;
};

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
  this.dropGold();
  this.game.actors.splice(this.game.actors.indexOf(this), 1);
};

Enemy.prototype.dropGold = function() {
  if (this.gold) {
    var newGold = new Gold(this.x, this.y, this.gold, this.game);
    this.game.map.addNewItem(newGold);
  }
};

module.exports = Enemy;

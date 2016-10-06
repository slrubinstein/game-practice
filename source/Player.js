'use strict';

var Movable = require('./Movable');
var World = require('./World');
var CollisionDetector = require('./CollisionDetector');
var Combat = require('./Combat');
var Interactions = require('./constants/Interactions');
var MathUtils = require('./utils/MathUtils');

var Player = function(game) {
	this.game = game;
	this.x = World.cellSize * 5;
	this.y = World.cellSize * 5;
	this.width = World.cellSize;
	this.height = World.cellSize;
	this.color = 'yellow';
	this.collision = true;
	this.maxHp = 18;
	this.hp = this.maxHp;
	this.strength = 9;
	this.defense = 6;
	this.experience = 0;
	this.level = 1;

	Movable.call(this);
};

Player.prototype = Object.create(Movable.prototype);

Player.prototype.handleKey = function(key) {
	switch(key) {
		case 'leftArrow':
			this.changeDirection('west');
			break;
		case 'upArrow':
			this.changeDirection('north');
			break;
		case 'rightArrow':
			this.changeDirection('east');
			break;
		case 'downArrow':
			this.changeDirection('south');
			break;
	}
};

Player.prototype.changeDirection = function(direction) {
	this.direction = direction;
	this.move();
};

Player.prototype.afterMove = function() {
	this.game.update();
};

Player.prototype.handleLeaveMap = function(direction) {
	switch(direction) {
		case 'east':
			this.x = 0;
			break;
		case 'west':
			this.x = World.width - this.width;
			break;
		case 'north':
			this.y = World.height - this.height;
			break;
		case 'south':
			this.y = 0;
			break;
	}
	this.game.getNewMap(direction);
};

Player.prototype.handleCollision = function(collision) {
	var interactionType = Interactions.getInteractionType(collision);

	switch(interactionType) {
		case 'wall':
			this.stayPut();
			break;
		case 'attack':
			this.attack(collision);
			break;
	}
};

Player.prototype.movePlayerToNewPosition = function(position) {
	this.x = position.x;
	this.y = position.y;
};

Player.prototype.attack = function(enemy) {
	Combat.attack(this, enemy);
};

Player.prototype.gainExperience = function(experience) {
	this.experience += experience;
	if (this.experience >= this.level * 1.2 * 50) {
		this.gainLevel();
	}
};

Player.prototype.gainLevel = function() {
	this.level++;
	this.maxHp += MathUtils.randomNumberBetween(2, 5);
	this.strength += MathUtils.randomNumberBetween(1, 3);
	this.defense += MathUtils.randomNumberBetween(1, 3);
	this.hp = this.maxHp;
};

Player.prototype.die = function() {
	alert('game over!');
};

module.exports = Player;

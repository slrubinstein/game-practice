'use strict';

var Drawable = require('./Drawable');

var Player = function() {
	this.x = 100;
	this.y = 100;
	this.width = 10;
	this.height = 10;
	this.color = 'red';
};

Player.prototype = new Drawable;

Player.prototype.move = function() {
	
};

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
};

Player.prototype.move = function() {
	switch(this.direction) {
		case 'east':
			this.x += this.width;
			break;
		case 'west':
			this.x -= this.width;
			break;
		case 'north':
			this.y -= this.height;
			break;
		case 'south': 
			this.y += this.height;
			break;
	}
	this.direction = null;
	
};

module.exports = Player;

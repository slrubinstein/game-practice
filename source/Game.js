'use strict';

var Player = require('./Player');
var world = require('./world');
var keyboard = require('./keyboard');
var Bush = require('./Bush');
var Map = require('./Map');
var level1 = require('./assets/level1.json');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var Game = function() {
	canvas.width = world.width;
	canvas.height = world.height;

	this.actors = [];
};

Game.prototype.init = function() {
	this.player = new Player;
	this.map = new Map(level1);

	this.actors.push(this.player);

	this.initKeyboard(this.player);
	this.update();
};

Game.prototype.initKeyboard = function(actor) {
	var keyboardListener = keyboard.handleKey.bind(null, actor);
	document.body.addEventListener('keydown', keyboardListener);
};

Game.prototype.drawWorld = function() {
	ctx.fillStyle = 'green';
	ctx.fillRect(0, 0, world.width, world.height);	
};

Game.prototype.movePlayer = function() {
	this.player.move();
};

Game.prototype.drawActors = function() {
	this.actors.forEach(function(actor) {
		actor.draw(ctx);
	});

};

Game.prototype.update = function() {
	ctx.clearRect(0, 0, world.width, world.height);
	this.drawWorld();
	this.map.drawMap(ctx);
	this.movePlayer();
	this.drawActors();
	requestAnimationFrame(this.update.bind(this));
};

module.exports = Game;

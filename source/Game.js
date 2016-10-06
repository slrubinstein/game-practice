'use strict';

const Player = require('./Player');
var World = require('./World');
var keyboard = require('./keyboard');
var Enemy = require('./Enemy');
var Map = require('./Map');
var MapStore = require('./MapStore');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var Game = function() {
	this.width = World.width;
	this.height = World.height + World.textAreaSize;
	this.actors = [];

	canvas.width = this.width;
	canvas.height = this.height;
};

Game.prototype.init = function(level) {
	this.player = new Player(this);
	this.map = new Map(MapStore[level], this);

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
	ctx.fillRect(0, 0, World.width, World.height);
};

Game.prototype.getNewMap = function(direction) {
	var nextMap = this.map.exits[direction];
	this.map = new Map(MapStore[nextMap], this);
};

Game.prototype.moveEnemies = function() {
	var enemies = this.getEnemies();
	enemies.forEach(enemy => enemy.moveEnemy(this.player));
};

Game.prototype.getEnemies = function() {
	return this.actors.filter(actor => actor instanceof Enemy);
};

Game.prototype.drawActors = function() {
	this.actors.forEach(function(actor) {
		actor.draw(ctx);
	});
};

Game.prototype.writeText = function() {
	ctx.fillStyle = 'black';
	ctx.font = '24px sans-serif';
	ctx.fillText(
		'hp: ' + this.player.hp + ' ' +
		'exp: ' + this.player.experience,
		10, 450
	);
	var enemies = this.getEnemies();
	enemies.forEach(enemy => ctx.fillText(enemy.hp, enemy.x, enemy.y + 24));

};

Game.prototype.update = function() {
	ctx.clearRect(0, 0, this.width, this.height);
	this.drawWorld();
	this.map.drawMap(ctx);
	this.moveEnemies();
	this.drawActors();
	this.writeText();
};

module.exports = Game;

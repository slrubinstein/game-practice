'use strict';

var Game = require('./Game');

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.addEventListener('load', function() {
	var game = new Game;
	game.init('level10');
});

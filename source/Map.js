'use strict';

var Player = require('./Player');
var Bush = require('./scenery/Bush');
var Rock = require('./scenery/Rock');
var Tree = require('./scenery/Tree');
var Water = require('./scenery/Water');
var Slime = require('./enemies/Slime');
var World = require('./World');
var NPCs = require('./NPCs');
var GameProgress = require('./GameProgress');

var Map = function(data, game) {
	this.data = data;
	this.game = game;
	this.game.actors = this.game.actors.filter(actor => actor instanceof Player);
	this.backgroundColor = data.backgroundColor;
	this.scenery = [];
	this.exits = data.exits;
	this.setScenery();
};

Map.prototype.drawMap = function(ctx) {
	this.drawBackground(ctx);
	this.drawScenery(ctx);
};

Map.prototype.drawBackground = function(ctx) {
	ctx.fillStyle = this.backgroundColor;
	ctx.fillRect(0, 0, World.width, World.height);
};

Map.prototype.drawScenery = function(ctx) {
	this.scenery.forEach(function(item) {
		item.draw(ctx);
	});
};

Map.prototype.setScenery = function(ctx) {
	var rows = this.data.map;

	rows.forEach(function(row, i) {
		row.forEach(function(cell, j) {
			this.setSceneryItem(cell, i, j);
		}, this);
	}, this);
};

Map.prototype.setSceneryItem = function(cell, i, j) {
	switch(cell) {
		case 1:
			this.scenery.push(new Bush(j * World.cellSize, i * World.cellSize));
			break;
		case 2:
			this.scenery.push(new Tree(j * World.cellSize, i * World.cellSize));
			break;
		case 3:
			this.scenery.push(new Water(j * World.cellSize, i * World.cellSize));
			break;
		case 4:
			this.scenery.push(new Rock(j * World.cellSize, i * World.cellSize));
			break;
		case 5:
			this.game.actors.push(new Slime(j * World.cellSize, i * World.cellSize, this.game));
			break;
		case '*':
			this.handleConditional(cell, i, j);
			break;
	}
};

Map.prototype.handleConditional = function(cell, i, j) {
	var conditional = this.data.gameCondition;
	var condition = conditional.condition;

	if (GameProgress[condition]) {
		this.placeConditional(cell, i, j, conditional);
	}
}

Map.prototype.placeConditional = function(cell, i, j, conditional) {
	if (conditional.type === 'NPC') {
		var npc = new NPCs[conditional.name](j * World.cellSize, i * World.cellSize, this.game);
		this.game.actors.push(npc);
	}
};

module.exports = Map;

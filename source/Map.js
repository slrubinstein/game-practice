'use strict';

var Bush = require('./Bush');

var Map = function(data) {
	this.data = data;
	this.backgroundColor = data.backgroundColor;
	this.scenery = [];
	this.setScenery();
};

Map.prototype.drawMap = function(ctx) {
	this.drawBackground(ctx);
	this.drawScenery(ctx);
};

Map.prototype.drawBackground = function(ctx) {
	ctx.fillStyle = this.backgroundColor;
	ctx.fillRect(this.x, this.y, this.width, this.height);
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
			this.scenery.push(new Bush(i * 30, j * 30));
			break;
	}
};

module.exports = Map;

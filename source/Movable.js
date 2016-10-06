'use strict';

var CollisionDetector = require('./CollisionDetector');
var Drawable = require('./Drawable');

var Movable = function() {
  this.lastPosition = {};

  Drawable.call(this);
};

Movable.prototype = Object.create(Drawable.prototype);

Movable.prototype.move = function() {
  var newPosition = Object.assign({}, this.getUpdatedPosition(this.direction), {width: this.width, height: this.height});

  var collision = this.checkCollision(newPosition);

  this.lastPosition = {
    x: this.x,
    y: this.y
  };

  if (collision.length) {
    this.handleCollision(collision[0]);
  } else {
    this.moveToNewPosition(newPosition);
  }

  if (CollisionDetector.didLeaveMap(newPosition)) {
    this.handleLeaveMap(this.direction);
  }

  if (this.afterMove) {
    this.afterMove();
  }
  this.clearLastPosition();
};

Movable.prototype.getUpdatedPosition = function(direction) {
  switch(direction) {
    case 'east':
      return {
        x: this.x + this.width,
        y: this.y
      };
    case 'west':
      return {
        x: this.x - this.width,
        y: this.y
      };
    case 'north':
      return {
        x: this.x,
        y: this.y - this.height
      };
    case 'south':
      return {
        x: this.x,
        y: this.y + this.height
      };
    default:
      return {
        x: this.x,
        y: this.y
      };
  }
};

Movable.prototype.checkCollision = function(position) {
  return this.game.map.scenery.concat(this.game.actors)
    .filter(item => item.collision)
    .filter(item => CollisionDetector.didCollide(position, item));
};

Movable.prototype.moveToNewPosition = function(position) {
  this.x = position.x;
  this.y = position.y;
};

Movable.prototype.stayPut = function() {
  this.x = this.lastPosition.x;
  this.y = this.lastPosition.y;
  this.clearLastPosition();
};

Movable.prototype.clearLastPosition = function() {
  this.lastPosition = {};
};

Movable.prototype.nextTo = function(something) {
  return CollisionDetector.isAdjacent(this, something);
};

module.exports = Movable;

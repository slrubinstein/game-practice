var Rock = require('../scenery/Rock');
var Water = require('../scenery/Water');
var Enemy = require('../Enemy');
var Gold = require('../Gold');

var Interactions = {
  getInteractionType(type) {

    if (type instanceof Rock) {
      return 'wall';
    }

    if (type instanceof Water) {
      return 'wall';
    }

    if (type instanceof Enemy) {
      return 'attack';
    }

    if (type instanceof Gold) {
      return 'pickup'
    }

  }

};

module.exports = Interactions;

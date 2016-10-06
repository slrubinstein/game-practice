var Rock = require('../scenery/Rock');
var Water = require('../scenery/Water');
var Enemy = require('../Enemy');

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

  }

};

module.exports = Interactions;

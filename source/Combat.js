var MathUtils = require('./utils/MathUtils');

var Combat = {
  attack(attacker, defender) {
    var power = Math.max(attacker.strength - defender.defense - MathUtils.randomNumberBetween(1, 5), 1);

    defender.hp -= power;

    if (defender.hp <= 0) {
      defender.die();

      if (attacker.gainExperience) {
        this.gainExperience(attacker, defender);
      }

    }
  },

  gainExperience(winner, loser) {
    var levelDifference = winner.level - loser.level;
    var experience = Math.floor(10 - (levelDifference * 1.5));
    winner.gainExperience(experience);
  }
};

module.exports = Combat;

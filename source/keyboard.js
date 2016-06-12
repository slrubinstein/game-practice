'use strict';

var keyboard = {

	handleKey: function(actor, event) {
		var keyCode = event.keyCode;

		switch(keyCode) {
			case 37:
				actor.handleKey('leftArrow');
				break;
			case 38:
				actor.handleKey('upArrow');
				break;
			case 39:
				actor.handleKey('rightArrow');
				break;
			case 40:
				actor.handleKey('downArrow');
				break;
			case 80:
				actor.handleKey('p');
				break;
		}

	}

};

module.exports = keyboard;

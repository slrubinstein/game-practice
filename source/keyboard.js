'use strict';

var timer = null;

var usableKeys = [37, 38, 39, 40, 80];

var keyboard = {

	handleKey: function(actor, event) {

		var keyCode = event.keyCode;

		if (usableKeys.indexOf(keyCode) > -1) {
			event.preventDefault();
		}

		if (timer) {
			return;
		}

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

		timer = setTimeout(() => timer = null, 100);
	}

};

module.exports = keyboard;

const $ = require('jquery');

$(document).ready(function() {
	var input = $('input');
	var messages = $('messages');

	var addMessge = function(message) {
		messages.append('<div>' + message + '</div>');
	};

	input.on('keydown', function(event) {
		if (event.keyCode != 13) {
			return;
		}

		var message = input.val();
		addMessge(message);
		input.val('');
	});
});
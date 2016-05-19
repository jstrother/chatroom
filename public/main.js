$(document).ready(function() {
	const socket = io();
	const input = $('input');
	const messages = $('#messages');

	input.on('keydown', function(event) {
		const message = input.val();

		if (event.keyCode != 13) {
			return;
		}

		addMessge(message);
		socket.emit('message', message);
		input.val('');
	});

	socket.on('message', addMessge);

	function addMessge(message) {
		messages.append('<div>' + message + '</div>');
	};
});
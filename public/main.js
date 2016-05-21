$(document).ready(function() {
	const socket = io();
	const name = $('#name');
	const input = $('#message');
	const messages = $('#messages');

	var user;

	name.on('keydown', function(event) {
		user = name.val();

		if (event.keyCode != 13) {
			return;
		} else {
			$('#nameDiv').hide();
			$('#messageDiv').show();
		}

		user += ' says\: ';
		console.log(user);
		return user;
	});
	input.on('keydown', function(event) {
		const text = input.val();

		if (event.keyCode != 13) {
			return;
		}

		message = user + text;
		addMessge(message);
		socket.emit('message', message);
		input.val('');
	});

	socket.on('message', addMessge);

	function addMessge(message) {
		messages.append('<div>' + message + '</div><br><br>');
	};
});
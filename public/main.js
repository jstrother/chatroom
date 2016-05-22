$(document).ready(function() {
	const socket = io();
	const name = $('#name');
	const input = $('#message');
	const messages = $('#messages');

	name.on('keydown', function(event) {
		const user = name.val() + ' says\: ';

		if (event.keyCode != 13) {
			return;
		} else {
			$('#nameDiv').hide();
			$('#messageDiv').show();
		}

		console.log(user);
		addUser(user);
		socket.emit('user', user);
	});
	input.on('keydown', function(event) {
		const message = input.val();

		if (event.keyCode != 13) {
			return;
		}

		addMessage(message);
		socket.emit('message', message);
		input.val('');
	});

	socket.on('message', addMessage);
	socket.on('user', addUser);

	function addUser(user) {
		messages.prepend('<div>' + user + '</div>');
	}

	function addMessage(message) {
		messages.append('<div>' + message + '</div><br><br>');
	};
});
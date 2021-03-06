$(document).ready(function() {
	const socket = io();
	const name = $('#name');
	const text = $('#text');
	const messages = $('#messages');
	const users = $('#users');
	const Message = require('./Message');
	const leave = $('#leaveButton');

	const message = new Message();

	name.on('keydown', function(event) {
		const user = name.val();

		if (event.keyCode != 13) {
			return;
		} else {
			$('#nameDiv').hide();
			$('#textDiv').show();
		}

		message.addUser(user);

		console.log(user);
		addNewUser(user);
		socket.emit('user', user);
	});
	text.on('keydown', function(event) {
		if (event.keyCode != 13) {
			return;
		}

		let note = message.newMessage(text.val());

		addMessage(note);
		socket.emit('message', note);
		text.val('');
	});
	leave.on('click', function() {
		var left = `${message.user} has left the conversation.`;

		addLeft(left);
		socket.emit('leave', left);
	});

	socket.on('message', addMessage);
	socket.on('user', addNewUser);
	socket.on('leave', addLeft);

	function addLeft(left) {
		users.append(`<div>${left}</div>`);
	}

	function addNewUser(user) {
		users.append(`<div>${user} has joined the conversation.</div>`);
	}

	function addMessage(text) {
		messages.append(`<div> ${text.user}: ${text.text} @ ${text.time} </div><br><br>`);
	}
});
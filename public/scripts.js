(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Message() {}

Message.prototype = {
	newMessage: function(text) {
		var date = new Date();
		return {
			user: this.user,
			text: text,
			time: date.toTimeString()
		};
	},
	addUser: function(user) {
		this.user = user;
	}
};

module.exports = Message;
},{}],2:[function(require,module,exports){
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
},{"./Message":1}]},{},[2]);

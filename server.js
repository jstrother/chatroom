const express = require('express');
const socket = require('socket.io');
const http = require('http');

const app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket(server);

io.on('connection', function(socket) {
	console.log('Client connected');

	socket.on('message', function(message) {
		console.log('Received message:', message);
		socket.broadcast.emit('message', message);
	})
});

server.listen(8080);
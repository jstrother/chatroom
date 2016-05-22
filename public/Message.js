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
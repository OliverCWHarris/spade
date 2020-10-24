module.exports = {
	name: 'userinfo',
	cooldown: 5,
	execute(message, args) {
		message.channel.send(`User info:\nYour username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
};
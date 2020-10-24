module.exports = {
	name: 'hello',
	cooldown: 5,
	execute(message, args) {
		message.channel.send(`hi`);
	},
};
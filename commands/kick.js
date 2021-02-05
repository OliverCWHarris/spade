  
module.exports = {
	name: 'kick',
	cooldown: 30,
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`no thats gay, im not removing ${taggedUser.username}`);
	},
};
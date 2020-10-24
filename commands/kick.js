  
module.exports = {
	name: 'kick',
	cooldown: 30,
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`You wanted to kick: ${taggedUser.username}, but you don't have the permissions to do that!`);
	},
};
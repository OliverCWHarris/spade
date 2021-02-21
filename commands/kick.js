  
module.exports = {
	name: 'kick',
	cooldown: 300,
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`${taggedUser.username} said they would give me chocolate if i went in their van so no i wont kick them`);
	},
};
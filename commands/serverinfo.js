module.exports = {
	name: 'serverinfo',
	cooldown: 5,
	execute(message, args) {
		message.channel.send(`Server info:\nServer name: ${message.guild.name}\nMember count: ${message.guild.memberCount}\nServer created: ${message.guild.createdAt}\nServer region: ${message.guild.region}`);
	},
};
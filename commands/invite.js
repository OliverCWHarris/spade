module.exports = {
	name: 'invite',
    cooldown: 60,
	execute(message, args) {
        message.channel.createInvite()
        .then(invite => message.channel.send(`Invite link: https://discord.gg/${invite.code}\nThis will last forever and can be used as many times as you like!`))
    },
};
module.exports = {
	name: 'createinvite',
    cooldown: 60,
	execute(message, args) {
        let options = {
            maxAge: 3600,
            maxUses: 1,
        }
        message.channel.createInvite(options)
        .then(invite => message.channel.send(`Invite link: https://discord.gg/${invite.code}\nThis will last for 1 hour and can only be used once!`))
    },
};
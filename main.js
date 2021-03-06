const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const ytdl = require("ytdl-core");



const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on("ready", () =>{
    console.log(`${client.user.tag} is shoveling!`);
    client.user.setActivity('[tilde]help')
 });

 client.on('message', message => {
    if (message.mentions.has(client.user)) {
        console.log(`${client.user.tag}has been mentioned by ${message.author.username}`)
    }
 });

 
//EXPERIMENTAL COMMAND START
//
//client.on("message", async message => {
//	
//	if (command === 'play') {
//		let track = await bot.player.play(message.member.voice.channel, args[0], message.member.user.tag);
//		message.channel.send('currently playing ${track.name}! - requested by ${track.requestedBy}');
//
//	}
//
//	if (command === 'stop') {
//		let track = await bot.player.stop(message.guild.id);
//		message.channel.send('stopped');
//		}
//})
//
//EXPERIMENTAL COMMAND END


 
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}


	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
        message.reply(`There was an error trying to execute that command:\n \`\`\`\n ${error}\n\`\`\``);
    }
});

client.login(token);




























//dear future programmer:
//when i wrote this only god and myself knew how it worked
//now only god knows how it works
//so please add to this couter to warn any other programmers
//total_hours_wasted_here = 16
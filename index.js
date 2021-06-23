const Discord = require('discord.js');
const botsettings = require('./botsettings.json');

const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
const client = new Discord.Client();
client.commands = new Discord.Collection();
const bot = new Discord.Client({ disableEveryone: true });
bot.login(botsettings.token);
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// Set a new item in the Collection.
	// With the key as the command name and the value as the exported module.
	client.commands.set(command.name, command);
}

// JSON FILES FOR PICTURES.
const rabbitpics = require('/home/container/rabbitpics.json');
const dogpics = require('/home/container/dogpics.json');
const turtle = require('/home/container/turtle.json');
const gamer = require('/home/container/gamer.json');
//END OF JSON FILES

// Activity Presence
bot.on('ready', async () => {
	console.log(`${bot.user.username} is online`);
	bot.user.setActivity('use s. as the notation!', { type: 'PLAYING' });
});

// Auto-Welcomer
bot.on('guildMemberAdd', (member) => {
	const channel = member.guild.channels.cache.get('670691195378335760');

	if (!channel) return;
	channel.send({
		embed: {
			color: 3447003,
			title: "**Vito's Time Space Contiuum.**",
			description:
				`Welcome ${member},` +
				` to the **VTSC** server! Be sure to read the information in <#691992229631230023>!`,
			fields: [
				{
					name: '**INFO**',
					value: "It's a whole festival in here 🥑"
				}
			],
			timestamp: new Date(),
			footer: {
				icon_url: member.user.displayAvatarURLL,
				text: '@ VTSC 2019-2021'
			}
		}
	});
});

// SUGGESTION CODE
client.on('message', (msg) => {
	let prefix = 'a!suggest ';
	let message = msg.content.toLowerCase();

	if (msg.author.bot) {
		return;
	} else if (msg.channel.id != '645811560089911296') {
		return;
	} else {
		msg.delete();
		console.log(message.startsWith(prefix));
		if (message.startsWith(prefix) != true) {
			return;
		} else {
			message = message.replace('a!suggest ', '');
			msg.reply('Suggestion ' + message + ' has been submitted! Check <733718657364131930> to vote');
			client.channels.get('733718657364131930').send('New Suggestion: ' + message).then(function(message) {
				message.react('✅');
				message.react('❌');
			});
		}
	}
});

// Command Line Starts Here
bot.on('message', async (message) => {
	if (message.author.bot || message.channel.type === 'dm') return;

	let prefix = botsettings.prefix;
	let messageArray = message.content.split(' ');
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	if (cmd === `${prefix}ping`) {
		client.commands.get('ping').execute(message, args);
		// Grabs it from the command folder.
	}

	if (cmd === `${prefix}help`) {
		const helpEmbed = new Discord.MessageEmbed()
			.setTitle('**SERENA HELP PAGE**')
			.setColor('#FFAA44')
			.addField(
				'Fun Commands:',
				'**s.ping** | Will output pong!\n**s.gamer** | Will show much of a gamer you are!\n**s.coinflip** | Will do a coin flip!\n**s.rabbit** | Shows pictures of rabbit!\n**s.dog** | Shows pictures of dogs!\n**s.turtle** | Shows pictures of turtle!',
				true
			)
			.addField(
				'Server Commands:',
				'**s.ip** | Will display the OFS IP!\n**s.donate** | Will display the donate link!\n**s.vote** | Will display the vote links!\n**s.staffapp** | Will display the staff app link!\n**s.suggest** | Will submit your suggestion!',
				true
			)
			.addField(
				'Staff Commands:',
				'**s.kick** | Will kick a mentioned user!\n**s.mute** | Will mute a mentioned user!\n**s.removerole** | Will remove a role from a mentioned user!\n**s.addrole** | Will add a role to a mentioned user!\n**s.clear** | Will delete chat messages!',
				true
			);
		message.channel.send(helpEmbed);
	}

	// Moderation Commands
	if (cmd === `${prefix}clear`) {
		client.commands.get('clear').execute(message, args);
	}

	if (cmd === `${prefix}mute`) {
		client.commands.get('mute').execute(message, args);
	}

	if (cmd === `${prefix}kick`) {
		client.commands.get('kick').execute(message, args);
	}

	if (cmd === `${prefix}addrole`) {
		client.commands.get('addrole').execute(message, args);
	}

	if (cmd === `${prefix}removerole`) {
		client.commands.get('removerole').execute(message, args);
	}

	if (cmd === `${prefix}suggest`) {
		let messageContent = args.join(' ').toLowerCase();

		if (message.channel.id != '645811560089911296') return;

		message.delete();
		message.reply(
			'your suggestion: ' + messageContent + ' has been submitted! Check <#733718657364131930> to vote'
		);

		message.guild.channels.cache
			.get('733718657364131930')
			.send('**New Suggestion:** ' + messageContent)
			.then((msg) => {
				msg.react('✅');
				msg.react('❌');
			});
	}

	// Fun Commands
	if (cmd === `${prefix}cat`) {
		client.commands.get('cat').execute(message, args);
	}

	if (cmd === `${prefix}rabbit`) {
		console.log('Rabbit command was used.');
		message.channel.send(`${rabbitpics[Math.floor(Math.random() * rabbitpics.length)]}`);
	}

	if (cmd === `${prefix}dog`) {
		console.log('Dog command was used.');
		message.channel.send(`${dogpics[Math.floor(Math.random() * dogpics.length)]}`);
	}

	if (cmd === `${prefix}turtle`) {
		console.log('Turtle command was used.');
		message.channel.send(`${turtle[Math.floor(Math.random() * turtle.length)]}`);
	}

	if (cmd === `${prefix}gamer`) {
		console.log('Gamer command was used.');
		message.channel.send("**You're just about,**");
		message.channel.send(`${gamer[Math.floor(Math.random() * gamer.length)]}`);
	}

	if (cmd === `${prefix}vitosnude`) {
		console.log('Vitos command was used.');
		message.channel.send('**Shh, be discrete, https://tinyurl.com/qmwtmxb**');
	}

	if (cmd === `${prefix}coinflip`) {
		let random = Math.floor(Math.random() * Math.floor(2));
		if (random === 0) {
			message.channel.send('You got...**heads**!');
		} else {
			message.channel.send('You got...**tails**!');
		}
	}

	// MINECRAFT OFFSHORE SERVER COMMANDS

	if (cmd === `${prefix}staffapp`) {
		// Get's the staff app link.
		console.log('Staffapp command was used.');
		message.channel.send(
			"Consider yourself worthy? Here's the **staff application link**:\n https://www.theoffshore.net/apply"
		);
	}
	
	if (cmd === `${prefix}wowvitosohot`) {
		// Get's the staff app link.
		console.log('The beautiful command was used.');
		message.channel.send(
			"Hey sisters! Wait, what. \n So, its me your boy. No need to thank me. Im in a bot. I cant see whats going on around me, I just assume this message will land in general per the channel ID I placed this in. Im a genius I know, communicating with you guys without me actually being on Discord, this is epic. So, Alyssa reached out to me that roles couldnt be added, and I am working on making Serena self assign roles but in the meantime Ive given permission to **Staff+** members to change user roles. Please reach out to a **Staff+** if youd like to be removed from a role or be given a role. Also, please stop using Alyssa as a way to ping pong back and forth conversation with me **because I'm on break** how does that sound ey. Im looking at you Vorah. Smh my head. Hi Andelli, you smell, Paige youre demoted, Levi you beautiful man go away. Ill see you all when I come back in 39.6 days!"
		);
	}

	if (cmd === `${prefix}ip`) {
		// Get's the IP address.
		console.log('IP command was used.');
		message.channel.send("Absolutely! Here's the **IP address**:\n ``mc.theoffshore.net``");
	}

	if (cmd === `${prefix}donate`) {
		// Get's the donation store address.
		console.log('Dnation store command was used.');
		message.channel.send(
			"We appreciate donations! 👉👈 Here's the **donation store link:**\nhttps://theoffshore.net/store"
		);
	}

	if (cmd === `${prefix}vote`) {
		// Get's the vote links web address.
		console.log('Vote command was used.');
		message.channel.send('Vote links will be added when we go public!');
	}
});
// Make a discord bot that can be used to play minecraft in discord
const {Client, Intents, Collection} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES]});
const config = require('./config.json');
const fs = require('fs');
const mineflayer = require('mineflayer')
const viewer = require('prismarine-viewer').mineflayer
const bot = mineflayer.createBot({
  username: 'StarGazer'
})
const streamserver = config.streamserver
const streamkey  = config.streamkey
client.commands = new Collection();
client.bot = bot;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
	  currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

bot.once('spawn', () => {
    viewer(bot, { output: `${streamserver}${streamkey}`, width: 1280, height: 720})
    //viewer(bot, {firstPerson: true, port: 3960})
    bot.chat('Hi!!!')
})
bot.on('death', () => {
	bot.chat('Oof. I died! :((')
})

client.login(config.token);

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    // must run after we login
    const testChamberChannel = await client.channels.fetch(process.env.CHANNEL_ID);
    testChamberChannel.join().then(connection => {
        connection.on('speaking', (user, isSpeaking) => {
            console.log(`${user.username} is speaking? `, isSpeaking.bitfield === 1);
        })
    })
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

client.login(process.env.DISCORD_TOKEN);


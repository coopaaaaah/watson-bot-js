require('dotenv').config();
const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    // must run after we login
    const testChamberChannel = await client.channels.fetch(process.env.CHANNEL_ID);
    testChamberChannel.join().then(connection => {
        connection.on('speaking', async (discordUser, speaking) => {

            const user = {
                user: discordUser.username,
                isSpeaking: speaking.bitfield === 1
            }

            console.log(`${discordUser.username} is speaking? `, speaking.bitfield === 1);
            // send a POST req to another web server 
            /**
             * {
             *   "user": user.username
             *   "isSpeaking": isSpeaking.bitfield === 1
             * }
             * 
             * example :
             * {
             *   "user": "david",
             *   "isSpeaking": true | false
             * }
             */
            try {
                
                const options = {
                    headers: {'Content-Type': 'application/json'}
                };
                const response = await axios.post('http://raspberrypi.local:3000/', user, options);
            } catch (error) {
                console.error(error);
            }
        })
    })
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

client.login(process.env.DISCORD_TOKEN);


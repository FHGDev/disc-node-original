# disc-node

**Tutorial**

Hmm, I wonder how you login with disc-node?

```js
const discord = require('disc-node')
const bot = new discord.Client("your-token-here")

// Listens for when the bot is ready to respond to commands

bot.on('ready', () => {
    console.log(`%s is ready!`, bot.user.username)
    // No current way to set the status of the bot, but that's coming in the next fix
})

// Listens for a new message. When it recieves one, it logs it.

bot.on('message', message => {
    console.log(message.content)
})

// Connects the bot to discord, and starts listening for events like 'ready' and 'message'.

bot.connect()
```

**About**

disc-node is a very young project created by fhg_developer to interface with the Discord API.
disc-node is currently at version 0.0.4

**Fixes for this version**

I fixed the error that it throws when you try to reference the message variable given by the message event.
I fixed message sending! Your bot can now send messages. Method: `message.channel.sendMsg`

## Credits

ThatTonybo [nodecord](https://github.com/nodecord/nodecord) for some of the models I used (channel, guild).
Discord [Documentation](https://discordapp.com/developers/docs) for the gateway and REST documentation.
MrSheldon []() for inspiring me to create disc-node.
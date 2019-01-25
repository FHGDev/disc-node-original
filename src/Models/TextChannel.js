const Channel = require('./Channel')

module.exports = class TextChannel extends Channel {
    constructor(obj, client) {
        super(obj, client)
        this.client = client
    }

    sendMsg(content) {
        return new Promise((resolve, reject) => {
            require('snekfetch').post(`https://discordapp.com/api/channels/${this.id}/messages`)
            .set("Authorization", `Bot ${this.client.token}`)
            .send({content: content})
            .then(r => resolve(r.body))
            .catch(err => reject(err))
        })
    }
}
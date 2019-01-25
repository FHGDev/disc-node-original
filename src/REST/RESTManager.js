const snekfetch = require('snekfetch')

class RestManager {
    constructor(token) {
        this.token = token
    }
    /**
     * 
     * @param {String} channelid a string containing the ID of the channel you want the message sent to.
     * @param {String} content a string containing the message you want sent. 
     */
    sendMessage(channelid, content) {
        snekfetch.post(`https://discordapp.com/api/channels/${channelid}/messages`)
        .set("Authorization", `Bot ${this.token}`)
    }
}

module.exports = RestManager
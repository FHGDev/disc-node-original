module.exports = class Guild {
    constructor(obj, client) {
        for (const [key, value] of Object.entries(obj)) {
            this[key] = value;
        }
        this.client = client
        this.bans = new (require('../Util/Collection'))
    }

    /**
     * 
     * @param {String} memberid The ID of the user you want to ban. 
     * @param {banOptions} options An Object of options containing the settings you want sent.
     * @example message.guild.ban('someid', {days: 7, reason: "some random reason"})
     */ 
   ban(memberid, options) {
      if (typeof(options.days) !== 'number') throw new TypeError("DiscordAPIError: banOptions.days must be an integer.")
      this.bans.set(memberid, true)

       return new Promise((resolve, reject) => {
        require('snekfetch').put(`https://discordapp.com/api/guilds/${this.id}/bans/${memberid}`)
        .set(`Authorization`, `Bot ${this.client.token}`)
        .send({"delete-message-days": options.days, "reason": options.reason || "no reason provided."})
        .then(r => resolve(r.body))
        .catch(err => reject(err))
       })
   }

   unban(memberid) {
    this.bans.set(memberid, false)
   }
}
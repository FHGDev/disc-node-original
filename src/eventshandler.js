const Collection = require('./Util/Collection')
const Guild = require('./Models/Guild')
const Channel = require('./Models/Channel')
const TextChannel = require('./Models/TextChannel')
module.exports = {
    'ready': (client, d) => {
        client.user = d.d.user;

        client.sessionId = d.d.session_id

        for (const [obj] in d.d.guilds) {
            client.guilds.set(d.d.guilds[obj].id, { ready: false })
        }

        for (const [obj] in d.d.channels) {
            client.channels.set(d.d.channels[obj].id, new TextChannel(d.d.channels[obj], client))
        }

        client.emit('ready')
    },

    'guildCreate': (client, d) => {
        let obj = d.d;

        let channels = new Collection()
        for (const channel of d.d.channels) {
            channels.set(channel.id, channel)
            client.channels.set(channel.id, channel)
        }

        let members = new Collection()
        for (const member of d.d.members) {
            members.set(member.user.id, member)
            client.users.set(member.user.id, member.user)
        }

        if (client.guilds.has(d.d.id) && client.guilds.get(d.d.id).ready == false) {
            obj.channels = channels;
            obj.members = members;

            obj.ready = true;

            client.guilds.set(d.d.id, obj)
            client.emit('guildAvailable', obj)
        } else {
            client.guilds.set(d.d.id, obj)
            client.emit('guildCreate', obj)
        }
    },

    'message': (client, d) => {
        let message = require('./Models/Message')
        let msg = new message(d.d, {
            guild: client.guilds.get(d.d.guild_id),
            channel: client.channels.get(d.d.channel_id)
        }, client)

        client.emit("message", msg)
    },

    'guildDelete': (client, d) => {
        let obj = d.d

        for (const member in obj.members) {
            client.users.del(member.user.id)
        }

        for (const channel in obj.channels) {
            client.channels.del(channel.id)
        }

        client.guilds.del(obj.id)

        client.emit('guildDelete', obj)
    }
}
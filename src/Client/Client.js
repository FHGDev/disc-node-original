const Collection = require('../Util/Collection')
const socket = require('../socket').socket
const events = require('events')

module.exports = class Client extends events {
    constructor(token) {
        super();
        this.user = null;
        this.token = token
        this.channels = new Collection()
        this.guilds = new Collection()
        this.users = new Collection()
    }

    connect() {
        const attemptLogin = require('../socket').c

        attemptLogin(this)
    }

    changeStatus(status) {
        const sock = new socket()
        sock.changeStatus(status)
    }
}
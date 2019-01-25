global.post = require('snekfetch').post
global.get = require('snekfetch').get

module.exports = {
    Client: require("./Client/Client"),
    Collection: require("./Util/Collection")
}
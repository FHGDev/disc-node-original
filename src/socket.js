const ws = require('ws')
const socket = new ws(`wss://gateway.discord.gg/?v=7&encoding=json`)
const constants = require('./Util/Constants').Constants

module.exports.c = (client) => {
    socket.on('message', (message) => {
        const d = JSON.parse(message) || message;

        switch(d.op) {
            case 10: /* Herro */ 
                setInterval(() => {
                    socket.send(JSON.stringify({
                        op: 1,
                        d: d.s
                    }))
                }, d.d.heartbeat_interval)

                socket.send(JSON.stringify({
                    op: 2,
                    d: {
                        token: client.token,
                        properties: {
                            $os: "Linux",
                            $browser: "disnode",
                            $device: "disnode"
                        },

                        compress: false,
                        large_threshold: 250,
                        presence: {
                            status: 'online',
                            afk: false
                        }
                    }
                }))
                break;

                case 11: /* heartbeat */
                    client.emit("heartbeat_ack")
                break;

                case 1:
                    
                break;
                
            case 0: /* event */ 
                let Events = require('./gateway/gateway_events')
                if (!Events.hasOwnProperty(d.t)) return;

                if (d.t == "READY") {
                    client.readyAt = Date.now()
                }

                let e = require('./eventshandler')[Events[d.t]];
                if (e) {
                    e(client, d)
                }
            break;
        }
    })
}

module.exports.socket = class Socket {
    changeStatus(status) {
        socket.on('message', a => {
            
            if (constants.validStatuses.includes(status)) {
            socket.send(JSON.stringify({
                op: 3,
                since: null,
                game: null,
                status: status,
                afk: false
            }))
            } else {
                throw new Error(`${status} is not a valid Discord status type.`)
            }
        })
    }
}
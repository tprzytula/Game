const WebSocket = require('ws');
const { PlayerConnection } = require('./playerConnection');

class WebsocketServer {
    constructor(messageBus) {
        this.messageBus = messageBus;
    }

    init() {
        const wss = new WebSocket.Server({ port: 7150 });
 
        wss.on('connection', connection => this._handleNewConnection(connection));
    }

    _handleNewConnection(connection) {
        const playerConnection = new PlayerConnection({ connection });

        this.messageBus.emit('player-connected', {
            playerId: playerConnection.id
        });

        playerConnection.onMessage(message => {
            this.messageBus.emit('player-message', {
                ip: playerConnection.ip,
                playerId: playerConnection.id,
                message
            })
        });

        playerConnection.onClose(() => {
            this.messageBus.emit('player-disconnected', {
                ip: playerConnection.ip,
                playerId: playerConnection.id,
            })
        });
    }
}

module.exports.WebsocketServer = WebsocketServer;
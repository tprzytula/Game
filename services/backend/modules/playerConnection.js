class PlayerConnection {
    constructor({ connection }) {
        this.connection = connection;
        this.id = Date.now();
    }

    onMessage(callback) {
        this.connection.on('message', callback);
    }

    onClose(callback) {
        this.connection.on('close', callback);
    }
}

module.exports.PlayerConnection = PlayerConnection;
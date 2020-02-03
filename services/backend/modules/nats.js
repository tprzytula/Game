const NATS = require('nats')

class Nats {
    constructor(messageBus) {
        this.messageBus = messageBus;

        this._setupListeners();
    }

    init() {
        this.nc = NATS.connect({
            url: 'nats://nats:4222',
            json: true
        });
          
        this.nc.subscribe('player-connected', payload => {
            console.log('New player connection:', payload);
        });

        this.nc.subscribe('player-message', payload => {
            console.log('Received new message from player:', payload);
        });

        this.nc.subscribe('player-disconnected', payload => {
            console.log('Player has disconnected', payload);
        });
    }

    _setupListeners() {
        // Sample messages to test the Queue
        this.messageBus.on('player-connected', payload => {
            this.nc.publish('player-connected', { playerData: payload });
        });

        this.messageBus.on('player-message', payload => {
            this.nc.publish('player-message', payload);
        });

        this.messageBus.on('player-disconnected', payload => {
            this.nc.publish('player-disconnected', payload);
        });
    }
};

module.exports.Nats = Nats;
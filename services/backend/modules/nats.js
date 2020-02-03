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
          
        this.nc.subscribe('player-connected', message => {
            console.log('New player connection:', message);
        });
    }

    _setupListeners() {
        this.messageBus.on('player-connected', payload => {
            this.nc.publish('player-connected', { playerData: payload });
        });
    }
};

module.exports.Nats = Nats;
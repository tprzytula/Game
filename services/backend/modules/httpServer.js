const express = require('express');

class HTTPServer {
    constructor(messageBus) {
        this.messageBus = messageBus;
    }

    init() {
        const app = express();

        app.get('/', (req, res) => {
            this.messageBus.emit('player-connected', {
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                query: req.query
            });

            res.send('Hello there!');
        });

        app.listen(4000, () => console.log('App listening on port 4000'));
    }
}

module.exports.HTTPServer = HTTPServer;
const express = require('express');
const app = express();

const NATS = require('nats')
const nc = NATS.connect({
    url: 'nats://nats:4222',
    json: true
});
 
nc.subscribe('foo', message => {
  console.log('Received a message: ', message);
});

nc.subscribe('user-connections', message => {
  console.log('New user request:', message);
});

nc.publish('foo', { message: 'Hello World!' })

app.get('/', (req, res) => {
    nc.publish('user-connections', {
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        query: req.query
    });

    res.send('Hello there!');
});

app.listen(4000, () => console.log('App listening on port 4000'));

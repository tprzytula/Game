const { MessageBus } = require('./modules/messageBus');
const { Database } = require('./modules/database');
const { Nats } = require('./modules/nats');
const { HTTPServer } = require('./modules/httpServer');

const messageBus = new MessageBus();

const database = new Database(messageBus);
const nats = new Nats(messageBus);
const httpServer = new HTTPServer(messageBus);

database.init();
nats.init();
httpServer.init();
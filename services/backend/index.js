const { MessageBus } = require('./modules/messageBus');
const { Database } = require('./modules/database');
const { Nats } = require('./modules/nats');
const { HTTPServer } = require('./modules/httpServer');
const { WebsocketServer } = require('./modules/websocketServer');

const messageBus = new MessageBus();

const database = new Database(messageBus);
const nats = new Nats(messageBus);
const httpServer = new HTTPServer(messageBus);
const websocketServer = new WebsocketServer(messageBus);

database.init();
nats.init();
httpServer.init();
websocketServer.init();
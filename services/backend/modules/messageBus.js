const EventEmitter = require('events');

class MessageBus extends EventEmitter {}

module.exports.MessageBus = MessageBus;
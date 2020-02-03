const MongoClient = require('mongodb').MongoClient;

const CONNECTION_URL = 'mongodb://mongo:27017';

class Database {
    constructor(messageBus) {
        this.messageBus = messageBus;
    }

    init() {
        MongoClient.connect(CONNECTION_URL, function(error, client) {
            if (error) {
                console.error('Could not connect to the database', error);
                return;
            }
            console.log("Connected successfully to database");
            client.close();
        });
    }
}

module.exports.Database = Database;
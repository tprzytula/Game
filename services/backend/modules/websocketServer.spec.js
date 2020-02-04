const WebSocket = require('ws');
const { WebsocketServer } = require('./websocketServer');
const PlayerConnection = require('./playerConnection');

jest.mock('ws');
jest.mock('./playerConnection', () => jest.fn());

const messageBusInstanceMock = {
    on: jest.fn(),
    emit: jest.fn()
};

const websocketOnCallbacks = {};
const WebSocketMock = {
    on: jest.fn().mockImplementation((eventName, callback) => {
        websocketOnCallbacks[eventName] = callback;
    })
};

WebSocket.Server.mockImplementation(() => WebSocketMock);

describe('When initialised', () => {
    let websocketServerInstance;

    beforeEach(() => {
        websocketServerInstance = new WebsocketServer(messageBusInstanceMock);
        websocketServerInstance.init();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should listen on port 7150', () => {
        expect(WebSocket.Server).toBeCalledWith({ "port": 7150 });
    });

    it('should listen for incoming WebSocket connections', () => {
        expect(WebSocketMock.on).toBeCalledWith('connection', expect.any(Function));
    });

    describe('And a new connection is made', () => {
        let onMessageCallback, onCloseCallback;

        const PlayerConnectionInstanceMock = {
            id: 'sample-id',
            ip: 'sample-ip',
            onMessage: jest.fn().mockImplementation(callback => { onMessageCallback = callback; }),
            onClose: jest.fn().mockImplementation(callback => { onCloseCallback = callback; })
        };
        const sampleConnection = {
            on: jest.fn()
        };

        beforeEach(() => {
            PlayerConnection.mockImplementation(() => PlayerConnectionInstanceMock);
            websocketOnCallbacks.connection(sampleConnection);
        });

        it('should create an instance of PlayerConnection for the new connection', () => {
            expect(PlayerConnection).toBeCalledWith({ connection: sampleConnection })
        });

        it('should emit a "player-connected" event on MessageBus', () => {
            expect(messageBusInstanceMock.emit).toBeCalledWith('player-connected', { playerId: 'sample-id' })
        });

        describe('And onMessage callback is fired on the playerConnection', () => {
            beforeEach(() => {
                onMessageCallback('received-message');
            });

            it('should emit a "player-message" event on MessageBus', () => {
                expect(messageBusInstanceMock.emit).toBeCalledWith('player-message', {
                    ip: 'sample-ip',
                    playerId: 'sample-id',
                    message: 'received-message'
                })
            });
        });

        describe('And onClose callback is fired on the playerConnection', () => {
            beforeEach(() => {
                onCloseCallback();
            });

            it('should emit a "player-disconnected" event on MessageBus', () => {
                expect(messageBusInstanceMock.emit).toBeCalledWith('player-disconnected', {
                    ip: 'sample-ip',
                    playerId: 'sample-id'
                })
            });
        });
    });
});
import {
    socketConnect,
    socketDisconnect,
    socketReceive,
    socketSend,
} from '../actions';

class Socket
{
    constructor(socketUrl, store) {
        this.store = store;
        this.conn = new WebSocket(socketUrl);
        this.conn.onopen = e => this.onConnect(e);
        this.conn.onmessage = e => this.onReceive(e);
        this.conn.onclose = e => this.onDisconnect(e);
    }

    onConnect = e => {
        console.log("onConnect\n", e);
        this.store.dispatch(socketConnect());
    };

    onDisconnect = e => {
        console.log("onDisconnect\n", e);
        this.store.dispatch(socketDisconnect());
    };

    onReceive = e => {
        console.log("onReceive\n", e.data);
        try {
            if (e.data) {
                const dataObject = JSON.parse(e.data);
                console.log("Parse object\n", dataObject);
                this.store.dispatch(socketReceive(dataObject));
            }
            else {
                throw "ERROR: onReceive event got no data!";
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    send(e) {
        console.log("send\n", e);
        this.conn.send(JSON.stringify(e));
    }
}

const createSocketMiddleware = socketUrl => store => {
    const sock = new Socket(socketUrl, store);

    return next => action => {
        if (action.type === socketSend.toString()) {
            sock.send(action.payload);
            if (action.payload.type === 'msg') {
                next(action);
            }
        }
        else {
            next(action);
        }
    }
};

export default createSocketMiddleware;

import { handleActions } from 'redux-actions';

import {
    socketConnect,
    socketDisconnect,
    socketSend,
    socketReceive
} from '../actions';

const initialState = {
    connected: false,
    lastSent : null,
    msgQueue : [],
};

const socketConnectReducer = (state, action) => ({...state, connected: true});

const socketDisconnectReducer = (state, action) => ({...state, connected: false});

const socketReceiveReducer = (state, action) => ({
    ...state,
    msgQueue: [...state.msgQueue, action.payload, ],
});

const socketSendReducer = (state, action) => ({
    ...state,
    msgQueue: [...state.msgQueue, {...action.payload, from: 'me'},],
});

export default handleActions(
    {
        [socketConnect]   : socketConnectReducer,
        [socketDisconnect]: socketDisconnectReducer,
        [socketReceive]   : socketReceiveReducer,
        [socketSend]      : socketSendReducer,
    }, initialState);

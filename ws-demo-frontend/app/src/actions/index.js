import {createAction} from 'redux-actions';

export const socketConnect = createAction('SOCKET_CONNECT');
export const socketDisconnect = createAction('SOCKET_DISCONNECT');
export const socketSend = createAction('SOCKET_SEND');
export const socketReceive = createAction('SOCKET_RECEIVE');

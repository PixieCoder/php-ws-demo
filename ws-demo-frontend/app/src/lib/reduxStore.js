import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSocketMiddleware from './socketMiddleware';
import reducers from '../reducers';

let reduxStore = null;

const initRedux = (initialState = {}) => {
    if (!reduxStore) {
        const socketMiddelware = createSocketMiddleware('ws://ws-demo.docker:2345');
        reduxStore = {
            ...createStore(
                reducers,
                initialState,
                composeWithDevTools(
                    applyMiddleware(socketMiddelware),
                ),
            ),
        };
    }

    return reduxStore;
};

export default initRedux;

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import initRedux from '../lib/reduxStore';
import DemoView from '../layouts/DemoView';

(function () {
    const store = initRedux();
    const appElement = document.getElementById('react-entry');

    ReactDOM.render(
        <Provider store={store}>
            <DemoView/>
        </Provider>,
        appElement,
    );
})();

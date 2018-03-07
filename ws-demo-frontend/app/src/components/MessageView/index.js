import React from 'react';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import MessageView from './MessageView';

const mapStateToProps = state => ({
    msgQueue : state.socket.msgQueue.filter(msg => msg.type === 'msg'),
    connected: state.socket.connected,
});

export default compose(
    connect(mapStateToProps),
    branch(
        props => !props.connected,
        renderComponent(() => <div>Connecting...</div>)
    ),
)(MessageView);

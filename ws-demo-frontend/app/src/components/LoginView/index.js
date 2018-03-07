import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers, withState } from 'recompose';


import { socketSend } from '../../actions';
import LoginView from './LoginView';

const mapStateToProps = state => ({
    msgQueue : state.socket.msgQueue.filter(msg => msg.type === 'login'),
    connected: state.socket.connected,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            socketSend,
        }, dispatch),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withState('username', 'setUsernameInput', ''),
    withState('password', 'setPasswordInput', ''),
    withHandlers(
        {
            handleUsernameInput: props => event => {
                props.setUsernameInput(event.target.value);
            },
            handlePasswordInput: props => event => {
                props.setPasswordInput(event.target.value);
            },
            handleLogin        : props => event => {
                props.actions.socketSend(
                    {
                        type    : 'login',
                        username: props.username,
                        password: props.password
                    });
                props.setUsernameInput('');
                props.setPasswordInput('');
            }
        }
    ),
)(LoginView);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers, withState, lifecycle } from 'recompose';

import { socketSend } from '../../actions';

const KEY_ENTER = 13;

import MessageInput from './MessageInput';


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            socketSend,
        }, dispatch),
});


export default compose(
    connect(null, mapDispatchToProps),
    withState('chatInput', 'setChatInput', ''),
    withHandlers(
        {
            handleChatInput: props => event => {
                props.setChatInput(event.target.value);
            },
            handleChatSend : props => event => {
                props.actions.socketSend({type: 'msg', text: props.chatInput});
                props.setChatInput('');
            }
        }
    ),
    withHandlers(
        {
            handleKeyPress: props => event => {
                if (event.keyCode === KEY_ENTER) {
                    props.handleChatSend();
                }
            }
        }
    ),
    lifecycle(
        {
            componentWillMount() {
                window.addEventListener('keydown', this.props.handleKeyPress);
            },
            componentWillUnmount() {
                window.removeEventListener('keydown', this.props.handleKeyPress);
            },
        }
    ),
)(MessageInput);

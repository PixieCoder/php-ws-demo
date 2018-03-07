import React from 'react';

import MessageInput from '../MessageInput';

const MessageView = ({msgQueue}) => (
    <div style={{
        position      : "absolute",
        display       : "flex",
        flexDirection : "column",
        justifyContent: "flex-end",
        left          : "50%",
        top           : "0",
        bottom        : "0",
        right         : "0",
        padding       : "10px",
        overflow      : "hidden",
    }}>
        <div style={{
            position     : "relative",
            width        : "100%",
            height       : "auto",
        }}>
            <ul>
                {
                    msgQueue.map((msg, i) => <li key={i}>{msg.from ? msg.from : 'me'}:{msg.text}</li>)
                }
            </ul>
        </div>
        <MessageInput/>
    </div>
);

export default MessageView;

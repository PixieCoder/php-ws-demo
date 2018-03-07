import React from 'react';

const MessageInput = ({handleChatInput, chatInput, handleChatSend}) => (
    <div className="chat-input"
         style={{
             position: "relative",
             width   : "calc(100% - 40px)",
             height  : "25px",
         }}
    >
        <input type="text" onChange={handleChatInput} value={chatInput}/>
        <button type="button" onClick={handleChatSend}>Send</button>
    </div>
);

export default MessageInput;

import React from 'react';

const LoginView = ({handleLogin, username, handleUsernameInput, password, handlePasswordInput, msgQueue}) => (
    <div style={{
        backgroundColor: "maroon",
        position       : "absolute",
        width          : "100%",
        top            : "0",
        bottom         : "0",
        display        : "flex",
        justifyContent : "center",
        alignItems     : "center",
    }}>
        <div style={{
            backgroundColor: "black",
            padding        : "40px",
            display        : "flex",
            flexDirection  : "column",
            alignItems     : "center"
        }}>
            <label style={{color: "white"}}>Username:<br/>
                <input type="text" value={username} onChange={handleUsernameInput}/></label>
            <label style={{color: "white"}}>Password:<br/>
                <input type="password" value={password} onChange={handlePasswordInput}/></label>
            <button type="button" onClick={handleLogin}>Login</button>
            {
                msgQueue.map((msg, i) => <div key={i}>{msg.text}</div>)
            }
        </div>
    </div>

);

export default LoginView;

import React from 'react';
import { Link } from 'react-router-dom';

export function Unauthenticated(props) {
    const [username, setUsername] = React.useState(props.username);
    const [password, setPassword] = React.useState(props.password);

    function login() {
        localStorage.setItem('username', username);
        props.onLogin(username);
    }
    
    function register() {
        localStorage.setItem('username', username);
        //fixme I don't want to do anything with passwords and Simon doesn't have that, so
        props.onLogin(username);
    }

    return(
        <div className="test">
            <input display="block" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input display="block" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
            <div>
                    <button onClick={() => login()} disabled={!username || !password}>login</button>
                    <button onClick={() => register()} disabled={!username || !password}>register</button>
            </div>
        </div>
    )
}
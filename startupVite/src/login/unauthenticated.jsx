import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Unauthenticated(props) {
    const [username, setUsername] = React.useState(props.username);
    const [password, setPassword] = React.useState(props.password);
    const navigate = useNavigate();

    function handleLogin() {
        createAuth('PUT');
    }

    function handleRegister() {
        createAuth('POST');
    }

    //create auth function
    async function createAuth(method) {
        const res = await fetch('api/auth', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        });
        console.log(res);
        await res.json();
        if(res.ok) {
            props.onLogin(username);
            navigate('/home');
        } else {
            alert('authentication failed :(');
        }
    }

    // function login() {
    //     localStorage.setItem('username', username);
    //     props.onLogin(username);
    //     // navigate('/home');
    // }
    
    // function register() {
    //     localStorage.setItem('username', username);
    //     //fixme I don't want to do anything with passwords and Simon doesn't have that, so
    //     props.onLogin(username);
    //     // navigate('/home');
    // }

    return(
        <div className="test">
            <input display="block" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input display="block" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
            <div>
                    <button onClick={() => handleLogin()} disabled={!username || !password}>login</button>
                    <button onClick={() => handleRegister()} disabled={!username || !password}>register</button>
            </div>
        </div>
    )
}
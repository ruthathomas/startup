import React from 'react';
import { Link } from 'react-router-dom';
import { AuthState } from './authState.js';
import { Authenticated } from './authenticated.jsx';
import { Unauthenticated } from './unauthenticated.jsx';

export function Login({ username, authState, onAuthChange }) {
    return (
        <main>
            <h1>Bad Libs</h1>
            {authState === AuthState.Authenticated && (<Authenticated></Authenticated>)}
            {authState === AuthState.Unauthenticated && (<Unauthenticated></Unauthenticated>)}
        </main>
    );
}

// make it so log in logs you in (local storage)
// make it so create creates one (local storage)
// maybe make an extra page? not really sure
// you're going to have to have a variable to check whether things are authenticated or not

{/* <h1>Bad Libs</h1>
            <div className="test">
                    <input display="block" type="text" placeholder="username"></input>
                    <input display="block" type="password" placeholder="password"></input>
                    <div>
                        <Link to="/home">
                            <button>login</button>
                        </Link>
                        <Link to="/home">
                            <button>register</button>
                        </Link>
                    </div>
                </div> */}
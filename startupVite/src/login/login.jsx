import React from 'react';
import { Link } from 'react-router-dom';

export function Login() {
    return (
        <main>
            <h1>Bad Libs</h1>
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
                </div>
        </main>
    );
}
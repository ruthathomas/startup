import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthState } from '../login/authState';

export function Home({ username, onAuthChange }) {
    const navigate = useNavigate();

    function homeLogout() {
        localStorage.removeItem('username');
        onAuthChange(username, AuthState.Unauthenticated);
        navigate('/');
    }

    return (
        <main>
            <div className="test" style={{alignItems: "center", margin: 0, background: "#615A7C"}}>
                <p><b>welcome to</b></p>
                <h1>Bad Libs,</h1>
                <p style={{fontSize: 1.5 + "rem"}}><b>✨ {username} ✨</b></p>
            </div>
            <div className="test">
                <div>
                    <Link to="/game">
                        <button style={{flexGrow: 1}}>create game</button>
                    </Link>
                </div>
                <div>
                    <input type="text" placeholder="game code"></input>
                    <Link to="/game">
                        <button>join</button>
                    </Link>
                </div>
                <div>
                    <button style={{flexGrow: 1}} onClick={homeLogout}>logout</button>
                </div>
            </div>
            <Link style={{padding: 1 + 'rem', alignSelf: 'flex-start'}} to="/animal">
                <button id="surprise">surprise</button>
            </Link>
        </main>
    );
}

// "align-items: center; background-color: #615A7C; margin: 0;"

// make it so hitting join checks to see if the entered game code is valid (will need a local storage thing containing game codes)
// make it so hitting create game generates a game code (which will be saved in local storage) and then opens up a new game
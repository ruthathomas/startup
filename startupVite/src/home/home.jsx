import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
    return (
        <main>
            <div className="test" style={{alignItems: "center", margin: 0, background: "#615A7C"}}>
                <p><b>welcome to</b></p>
                <h1>Bad Libs,</h1>
                <p><b>username</b></p>
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
                    <Link to="/">
                        <button style={{flexGrow: 1}}>logout</button>
                    </Link>
                </div>
            </div>
            <Link style={{padding: 1 + 'rem', alignSelf: 'flex-start'}} to="/animal">
                <button id="surprise">surprise</button>
            </Link>
        </main>
    );
}

// "align-items: center; background-color: #615A7C; margin: 0;"
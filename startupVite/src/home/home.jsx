import React from 'react';

export function Home() {
    return (
        <main>
            <div className="test" style={{alignItems: "center", margin: 0, background: "#615A7C"}}>
                <p><b>welcome to</b></p>
                <h1>Bad Libs,</h1>
                <p><b>username</b></p>
            </div>
            <div className="test">
                <form method="get" action="game.html">
                    <button>create game</button>
                </form>
                <form method="get" action="game.html">
                    <input type="text" placeholder="game code"></input>
                    <button type="submit">join</button>
                </form>
                <form method="get" action="index.html">
                    <button>logout</button>
                </form>
            </div>
            <form style={{padding: 1 + 'rem', alignSelf: 'flex-start'}} method="get" action="animal.html">
                <button id="surprise">surprise</button>
            </form>
        </main>
    );
}

// "align-items: center; background-color: #615A7C; margin: 0;"
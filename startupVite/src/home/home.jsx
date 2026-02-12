import React from 'react';

export function Home() {
    return (
        <main>
            <div className="test" style="align-items: center; background-color: #615A7C; margin: 0;">
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
        </main>
    );
}
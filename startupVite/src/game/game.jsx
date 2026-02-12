import React from 'react';

export function Game() {
    return (
        <main className="game">
            <div id="above-game">
                <span>Game Code: XXXXXX</span>
                <form method="get" action="home.html">
                    <button>quit</button>
                </form>
            </div>
            <div id="game-box">
                <span>The</span>
                <input type="text" placeholder="plural noun"/>
                <span>here</span>
                <span>will</span>
                <span>be</span>
                <span>redacted</span>
                <span>for</span>
                <span>actual</span>
                <span>gameplay.</span>
                <input type="text" placeholder="pronoun"/>
                <span>will</span>
                <span>only</span>
                <span>be</span>
                <span>able</span>
                <span>to</span>
                <span>see</span>
                <span>the</span>
                <span>full</span>
                <input type="text" placeholder="noun"/>
                <span>after</span>
                <span>you</span>
                <span>have</span>
                <input type="text" placeholder="verb ending in -ed"/>
                <span>in</span>
                <span>the</span>
                <span>blanks</span>
                <span>with</span>
                <span>your</span>
                <span>friends.</span>
                <p>The scripts for the game will be stored in and fetched from the database.</p>
            </div>
            <div style="margin: 0rem 1rem;">
                <p><em>User beans's turn!</em></p>
                <p>User username joined.</p>
            </div>
            <form style="padding: 1rem;" method="get" action="game.html">
                <button>new game</button>
            </form>
        </main>
    );
}
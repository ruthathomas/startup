import React from 'react';
import { Link } from 'react-router-dom';

export function Game() {
    const refresh = () => {
        window.location.reload();
    };

    return (
        <main className="game">
            <div id="above-game">
                <span>Game Code: XXXXXX</span>
                <Link to="/home">
                    <button>quit</button>
                </Link>
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
            <div style={{margin: 0 + 'rem ' + 1 + 'rem'}}>
                <p><em>User beans's turn!</em></p>
                <p>User username joined.</p>
            </div>
            <form style={{padding: 1 + 'rem'}}>
                <button onClick={refresh}>new game</button>
            </form>
        </main>
    );
}
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GameAuthState } from './gameAuthState';
import { Unvalidated } from './unvalidated';
import { Validated } from './validated';

export function Game({ gameState, onGameAuthChange}) {

    return (
        <main style={{margin: 0, alignItems: 'stretch'}}>
            {/* <div className="game">
                <div id="above-game">
                    <span>Game Code: XXXXXX</span>
                    <button onClick={() => quit()}>quit</button>
                </div>
                <div id="game-box">
                </div>
                <div id ="websocket-box" style={{margin: 0 + 'rem ' + 1 + 'rem'}}>
                    <p><em>User beans's turn!</em></p>
                    <p>User username joined.</p>
                </div>
                <form style={{padding: 1 + 'rem'}}>
                    <button id="new-game-button" visibility={buttonVis} onClick={changeGame}>new game</button>
                </form>
            </div> */}
            {gameState === GameAuthState.Validated && (
                <Validated onGameAuthChange={onGameAuthChange}></Validated>
            )}
            {gameState === GameAuthState.Unvalidated && (
                <Unvalidated></Unvalidated>
            )}
        </main>
    );
}


// after a player joins it needs to show that they joined (websocket imitation; check simon implementation)
// game code stuff


// perhaps address the way it looks when it repopulates? looks funny
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GameAuthState } from './gameAuthState';
import { Unvalidated } from './unvalidated';
import { Validated } from './validated';

export function Game({ username, gameState, onGameAuthChange}) {

    const location = useLocation();
    // const {thing(s)} = location.state
    const {code, game} = location.state;

    useEffect(() => {
        console.log(`code: ${code}`)
    }, []);

    return (
        <main style={{margin: 0}}>
            {gameState === GameAuthState.Validated && (
                <Validated username={username} onGameAuthChange={onGameAuthChange} code={code} game={game}></Validated>
            )}
            {gameState === GameAuthState.Unvalidated && (
                <Unvalidated></Unvalidated>
            )}
        </main>
    );
}

// perhaps address the way it looks when it repopulates? looks funny
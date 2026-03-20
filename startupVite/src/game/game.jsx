import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GameAuthState } from './gameAuthState';
import { Unvalidated } from './unvalidated';
import { Validated } from './validated';

export function Game({ username, gameState, onGameAuthChange}) {

    return (
        <main style={{margin: 0}}>
            {gameState === GameAuthState.Validated && (
                <Validated username={username} onGameAuthChange={onGameAuthChange}></Validated>
            )}
            {gameState === GameAuthState.Unvalidated && (
                <Unvalidated></Unvalidated>
            )}
        </main>
    );
}

// perhaps address the way it looks when it repopulates? looks funny
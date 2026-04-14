import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GameAuthState } from './gameAuthState';
import { UndefinedValState } from './undefinedValState';
import { Unvalidated } from './unvalidated';
import { Validated } from './validated';
import { AuthState } from '../login/authState';

export function Game({ username, authState, gameState, onGameAuthChange}) {

    if(authState === undefined) {
            authState = AuthState.Unauthenticated;
    }

    const location = useLocation();
    // const {thing(s)} = location.state
    // const {code, game} = location.state;
    let code = '';
    let game = null;
    if(location.state) {
        // code, game = location.state;
        code = location.state?.code;
        game = location.state?.game;
    }
    // , stateUser, stateGameState

    //FIXME so it would be ideal to be checking authentication in here

    // useEffect(() => {
    //     console.log(`code: ${code}`)
    //     console.log(`username: ${username}`);
    //     console.log(`gameState: ${gameState}`);
    //     if (gameState === GameAuthState.Validated && !code) {
    //         //fixme
    //     }
    // }, []);

    //fixme; this messed everything up, so come back to it if you can but otherwise ignore it
    async function getCodeViaUser() {
        const res = await fetch('/api/auth/game', {
            method: 'GET',
        });
        const resData = await res.json();
        console.log(`data: ${JSON.stringify(resData)}`);
        if(res.ok) {
            code = resData.code;
        }
    }

    return (
        <main style={{margin: 0}}>
            {authState === AuthState.Authenticated && gameState === GameAuthState.Validated && code && (
                <Validated username={username} onGameAuthChange={onGameAuthChange} code={code} game={game}></Validated>
            )}
            {authState === AuthState.Authenticated && gameState === GameAuthState.Validated && !code && (
                <div>...failed to load game; please try again from the home page...</div>
            )}
            {authState === AuthState.Authenticated && gameState === GameAuthState.Unvalidated && (
                <Unvalidated></Unvalidated>
            )}
            {authState === AuthState.Authenticated && gameState === undefined && (
                <UndefinedValState></UndefinedValState>
            )}
            {authState === AuthState.Unauthenticated && (
                <div>403: Unauthorized :(</div>
            )}
        </main>
    );
}

// perhaps address the way it looks when it repopulates? looks funny
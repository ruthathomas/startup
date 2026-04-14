import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthState } from '../login/authState';
import { GameAuthState } from '../game/gameAuthState';

export function Home({ username, onAuthChange, onGameAuthChange }) {
    const navigate = useNavigate();
    const [gameCode, setGameCode] = React.useState('');

    async function handleJoinGame() {
        const enteredCode = document.getElementById('game-code').value;
        //fixme this is async and so it may go to setupGame before this has been taken care of
        setGameCode(enteredCode);
    }

    function handleCreateGame() {
        createGame();
    }

    // we are having some internal server errors here? check it
    function handleLogout() {
        fetch('/api/auth', {
            method: 'DELETE',
        });
        //fixme do we need to wait here? to make sure everything is working properly?
        onAuthChange(username, AuthState.Unauthenticated);
        localStorage.removeItem('username');
        navigate('/');
    }

    async function createGame() {
        const res = await fetch('/api/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({code: gameCode, player: username})
        });
        // the response is coming back with an empty body :'(
        const resData = await res.json();
        console.log(`data: ${JSON.stringify(resData)}`);
        if(res.ok) {
            // setGameCode(resData.code);
            onGameAuthChange(GameAuthState.Validated);
            navigate('/game', { state: {code: resData.code, game: resData.game} });
        } else {
            alert(`${resData.msg}`);
        }
    }

    async function getGame() {
        //should be get, not put FIXME --> get can't have body
        const res = await fetch('/api/game', {
            method: 'GET',
            // just make a header for code instead of the body
            headers: {
                'Content-Type': 'application/json',
                'code': gameCode,
                'player': username
             }
            // body: JSON.stringify({code: gameCode})
        });
        const resData = await res.json();
        console.log(`data: ${JSON.stringify(resData)}`);
        if(res.ok) {
            onGameAuthChange(GameAuthState.Validated);
            navigate('/game', { state: {code: gameCode, game: resData.game} });
            // , username: username, gameState: GameAuthState.Validated
        } else {
            alert('game code invalid :(');
        }
    }

    useEffect(() => {
        if(gameCode) {
            getGame();
        } else {
            console.log(':(');
        }
    }, [gameCode])

    return (
        <main>
            <div className="test" style={{alignItems: "center", margin: 0, background: "#615A7C"}}>
                <p><b>welcome to</b></p>
                <h1>Bad Libs,</h1>
                <p style={{fontSize: 1.5 + "rem"}}><b>✨ {username} ✨</b></p>
            </div>
            <div className="test">
                <div>
                    <button style={{flexGrow: 1}} onClick={() => handleCreateGame()}>create game</button>
                </div>
                <div>
                    <input id="game-code" type="text" placeholder="game code"></input>
                    <button onClick={() => handleJoinGame()}>join</button>
                </div>
                <div>
                    <button style={{flexGrow: 1}} onClick={()=> handleLogout()}>logout</button>
                </div>
            </div>
            <button style={{padding: 1 + 'rem', alignSelf: 'flex-start'}} id="surprise" onClick={() => navigate('/animal')}>surprise</button>
        </main>
    );
}

// "align-items: center; background-color: #615A7C; margin: 0;"
import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthState } from '../login/authState';
import { GameAuthState } from '../game/gameAuthState';

export function Home({ username, onAuthChange, onGameAuthChange }) {
    const navigate = useNavigate();
    const [gameCode, setGameCode] = React.useState();

    function handleJoinGame() {
        const enteredCode = document.getElementById('game-code').value;
        //fixme this is async and so it may go to setupGame before this has been taken care of
        setGameCode(enteredCode);
        setupGame('PUT');
    }

    function handleCreateGame() {
        setupGame('POST');
    }

    function handleLogout() {
        fetch('api/auth', {
            method: 'DELETE',
        });
        onAuthChange(username, AuthState.Unauthenticated);
        navigate('/');
    }

    async function setupGame(method) {
        const res = await fetch('/api/game', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({code: gameCode})
        });
        console.log(res);
        await res.json();
        if(res.ok) {
            //then do the things that you're supposed to do (change the game auth state, etc.)
            onGameAuthChange(GameAuthState.Validated);
            navigate('/game');
        } else {
            alert('game authentication failed :(');
        }
    }
    // function homeLogout() {
    //     localStorage.removeItem('username');
        
    // }


    // function generateCode() {
    //     var newCode = ""
    //     for(var i = 0; i < 6; i++) {
    //         newCode += i;
    //     }
    //     console.log(newCode);
    //     setGameCode(newCode);        
    // }

    // function submitGameCode() {
    //     const enteredCode = document.getElementById('game-code').value;
    //     if(enteredCode == localStorage.getItem('perpetualGameCode')) {
    //         setGameCode(enteredCode);
    //     }
    //     navigate('/game');
    // }

    // function createGame() {
    //     generateCode();
    //     navigate('/game');
    // }

    useEffect(() => {
        // if(gameCode) {
        //     localStorage.setItem('gameCode', gameCode);
        //     onGameAuthChange(GameAuthState.Validated);
        // }
        // maybe keeping this here will force it to update?
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
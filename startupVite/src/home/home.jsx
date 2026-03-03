import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthState } from '../login/authState';
import { GameAuthState } from '../game/gameAuthState';

export function Home({ username, onAuthChange, onGameAuthChange }) {
    const navigate = useNavigate();
    const [gameCode, setGameCode] = React.useState();

    function homeLogout() {
        localStorage.removeItem('username');
        onAuthChange(username, AuthState.Unauthenticated);
        navigate('/');
    }

    function generateCode() {
        var newCode = ""
        for(var i = 0; i < 6; i++) {
            newCode += i;
        }
        console.log(newCode);
        setGameCode(newCode);        
    }

    function submitGameCode() {
        const enteredCode = document.getElementById('game-code').value;
        if(enteredCode == localStorage.getItem('perpetualGameCode')) {
            setGameCode(enteredCode);
        }
        navigate('/game');
    }

    function createGame() {
        generateCode();
        navigate('/game');
    }

    useEffect(() => {
        if(gameCode) {
            localStorage.setItem('gameCode', gameCode);
            onGameAuthChange(GameAuthState.Validated);
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
                    <button style={{flexGrow: 1}} onClick={() => createGame()}>create game</button>
                </div>
                <div>
                    <input id="game-code" type="text" placeholder="game code"></input>
                    <button onClick={() => submitGameCode()}>join</button>
                    {/* <Link to="/game">
                        <button>join</button>
                    </Link> */}
                </div>
                <div>
                    <button style={{flexGrow: 1}} onClick={()=> homeLogout()}>logout</button>
                </div>
            </div>
            <Link style={{padding: 1 + 'rem', alignSelf: 'flex-start'}} to="/animal">
                <button id="surprise">surprise</button>
            </Link>
        </main>
    );
}

// "align-items: center; background-color: #615A7C; margin: 0;"
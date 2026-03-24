import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GameAuthState } from './gameAuthState';

const sampleGames = [
    {
        title: "A Holiday Story",
        script: ["I", "had", "the", "craziest", "holiday", "last", "month.", "We", "were", "setting", "up", "the", "animal", "decoration", "preposition", "the", "part of home", "when", "the", "element", "alarm", "went", "off!", "It", "turned", "out", "that", "family member", "had", "confused", "the", "plural decoration", "with", "the", "holiday dish", "and", "it", "was", "verb+ing", "all", "over", "the", "bottom", "of", "the", "oven!", "Luckily,", "our", "neighbors", "had", "a", "spare", "element", "extinguisher,", "so", "our", "oven", "was", "saved", "in", "no", "time.", "Dinner", "was", "pretty", "adjective", "and", "adjective", ",", "but", "at", "least", "we", "still", "had", "a", "house", "to", "eat", "it", "preposition", "!"],
        replace_indeces: [4, 12, 14, 16, 19, 27, 31, 34, 38, 52, 65, 67, 80]
    },
    {
        title: "A Story Story",
        script: ["Have", "you", "ever", "had", "to", "write", "a", "story", "for", "your", "school subject", "class?", "It", "can", "be", "pretty", "adjective", ",", "especially", "if", "your", "professor", "wants", "it", "to", "be", "adjective", ".", "I", "am", "personally", "bad", "at", "writing", "anything", "but", "genre", ".", "I", "hope", "adjective", "plural noun", "and", "number", "adjective", "plural noun", "are", "acceptable", "subject", "matter", "for", "this", "course!"],
        replace_indeces: [10, 16, 26, 36, 40, 41, 43, 44, 45]
    },
    {
        title: "A Dessert Story",
        script: ["The", "best", "kind", "of", "dessert", "is", "the", "kind", "made", "from", "real", "animal product", ".", "Not", "only", "is", "the", "artificial", "kind", "the", "superlative", ",", "I've", "heard", "it's", "made", "of", "animal", "plural body part", ".", "Isn't", "that", "adjective", "?", "The", "best", "way", "to", "get", "the", "real", "stuff", "is", "by", "going", "to", "a", "number", "shape", "bakery.", "They", "only", "use", "the", "superlative", "plural food", "and", "plural food", ",", "which", "means", "that", "none", "of", "that", "nasty", "color", "number", "!"],
        replace_indeces: [4, 11, 20, 27, 28, 32, 47, 48, 54, 55, 57, 66, 67]
    }
]
const sampleAnswers = {
    holiday: "St. Patrick's Day",
    animal: "okapi",
    preposition: "under",
    "part of home": "living room",
    element: "water",
    "family member": "step-mother",
    "plural decoration": "faberge eggs",
    "holiday dish": "eggnog",
    "verb+ing": "growing",
    adjective: "furry",
    "school subject": "physics",
    genre: "horror",
    "plural noun": "fitted sheets",
    dessert: "creme brule",
    "animal product": "eggs",
    superlative: "best",
    "plural body part": "toes",
    number: "57",
    shape: "star",
    "plural food": "okra",
    color: "blue"
}
var gameComplete = false;

export function Validated(props) {
    const [currGame, setCurrGame] = React.useState(sampleGames[0]);
    const [currElement, setCurrElement] = React.useState(document.body);
    const [checkIfDone, setCheckIfDone] = React.useState(false);
    const [buttonVis, setButtonVis] = React.useState("hidden");
    const [isPlayerTurn, setIsPlayerTurn] = React.useState(true);

    const navigate = useNavigate();
    const username = props.username;
    const fadeAnimation = { color: "#00000000" };
    const fadeTiming = { duration: 1000, iterations: 1};

    function quit() {
        localStorage.removeItem('gameCode');
        props.onGameAuthChange(GameAuthState.Unvalidated);
        navigate('/home');
    }

    function changeGame() {
        const index = Math.floor(Math.random() * sampleGames.length);
        const newGame = sampleGames[index];
        setCurrGame(newGame);
    }

    function changeElement() {
        const element = document.activeElement;
        setCurrElement(element);
    }

    function populateGame() {
        setIsPlayerTurn(true);
        const gameContent = document.getElementById("game-box");
        var numInputs = 0;
        for (let i = 0; i < currGame.script.length; i++) {
            var newElement;
            if(currGame.replace_indeces.includes(i)) {
                numInputs += 1;
                // should I give them an id?? for access??
                newElement = document.createElement("input");
                newElement.type = "text";
                newElement.placeholder = currGame.script.at(i);
                newElement.onfocus = function () {
                    changeElement();
                };
                newElement.addEventListener("keyup", function(event) {
                    if(event.key === "Enter") {
                        event.preventDefault();
                        this.disabled = true;
                        setCheckIfDone(true);
                        setIsPlayerTurn(false);
                    }
                })
            } else {
                //you should make the element a span element
                newElement = document.createElement("span");
                newElement.textContent = currGame.script.at(i);
                newElement.style = "background-color: #212529"
            }
            gameContent.appendChild(newElement);
        }
    }

    function clearGame() {
        const gameContent = document.getElementById("game-box");
        while(gameContent.firstChild) {
            gameContent.removeChild(gameContent.lastChild)
        }
    }

    function finishGame() {
        setButtonVis("visible");
        // make the redacted text visible
        const element = document.getElementById("game-box");
        const children = element.children;
            for(var i = 0; i < children.length; i++) {
                if(children[i].tagName === "SPAN") {
                    children[i].style.backgroundColor = "#00000000";
                }
            }
    }

    function sendMessage(message, isEmphasized) {
        const websocketBox = document.getElementById("websocket-box");
        const newMessage = document.createElement("p");
        newMessage.className = "websocket-message";
        newMessage.id = message;
        if(isEmphasized) {
            const emphElement = document.createElement("em");
            emphElement.textContent = message;
            newMessage.appendChild(emphElement);
        } else {
            newMessage.textContent = message;
        }
        websocketBox.appendChild(newMessage);
        setTimeout(() => {
            newMessage.animate(fadeAnimation, fadeTiming);
        }, 4000);
        setTimeout(() => {
            websocketBox.removeChild(websocketBox.firstChild);
        }, 5000)
    }

    // get game to populate game-box
    useEffect(() => {
        changeGame();
        sendMessage(`User ${username} joined!`, false);
        setTimeout(() => {
            sendMessage('User beans joined!', false);
        }, 500)
        // fixme; when you join, do: user joined! user joined! in the websocket box
    }, []);

    // populate the game box
    useEffect(() => {
        // console.log('before clear game')
        clearGame();
        // console.log('before populateGame')
        populateGame();
        setButtonVis('hidden');
    }, [currGame]);

    // check if the game is over and perform according actions
    useEffect(() => {
        // console.log('entered check if done');
        var done = true;
        var setCheckFalse = false;
        if(checkIfDone) {
            setCheckFalse = true;
            // console.log('checkifdone entered');
            const element = document.getElementById("game-box");
            const children = element.children;
            for(var i = 0; i < children.length; i++) {
                if(children[i].tagName === "INPUT") {
                    if(children[i].disabled === false) {
                        done = false;
                    }
                }
            }
            if(done) {
                // console.log('finished');
                gameComplete = true;
                finishGame();
            }
        }
        if(setCheckFalse) {
            setCheckIfDone(false);
        }
    }, [checkIfDone]);

    // show new game button
    useEffect(() => {
        document.getElementById("new-game-button").style.visibility = buttonVis;
    }, [buttonVis]);

    // change player thing FIXME can make cleaner
        useEffect(() => {
            // console.log('entered change player thing')
            const element = document.getElementById("game-box");
            const children = element.children;
            if(isPlayerTurn === true) {
                sendMessage(`User ${username}'s turn!`, true);
                // make it so regular player can play
                for(var i = 0; i < children.length; i++) {
                    if(children[i].tagName === "INPUT") {
                        if(!children[i].value) {
                            children[i].disabled = false;
                        }
                    }
                }
            } else {
                sendMessage("User beans's turn!", true);
                for(var i = 0; i < children.length; i++) {
                    if(children[i].tagName === "INPUT") {
                        children[i].disabled = true;
                    }
                }
                setTimeout(() => {
                    for(var i = 0; i < children.length; i++) {
                        if(children[i].tagName === "INPUT") {
                            if(!children[i].value) {
                                const word_type = children[i].placeholder;
                                // console.log(word_type)
                                // console.log(sampleAnswers)
                                children[i].value = sampleAnswers[word_type];
                                break;
                            }
                        }
                    }
                    setIsPlayerTurn(true);
                }, 3000);
            }
        }, [isPlayerTurn]);

    return(
        <div style={{alignItems: 'stretch'}} className="game">
            <div id="above-game">
                <span>Game Code: {localStorage.getItem('gameCode')}</span>
                <button onClick={() => quit()}>quit</button>
            </div>
            <div style={{marginBottom: 0}}>To play, type an answer in one box and hit enter :)</div>
            <div id="game-box"></div>
            <div id ="websocket-box" style={{margin: 0 + 'rem ' + 1 + 'rem'}}>
                {/* <p className='websocket-message'><em>User beans's turn!</em></p>
                <p className='websocket-message'>User username joined.</p> */}
            </div>
            <div style={{all: "revert"}}>
                <button id="new-game-button" style={{margin: 1 + 'rem'}} visibility={buttonVis} onClick={() => changeGame()}>new game</button>
            </div>
        </div>
    )
}
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

export function Game() {
    const [currGame, setCurrGame] = React.useState(sampleGames[0]);
    const [currElement, setCurrElement] = React.useState(document.body);
    const [checkIfDone, setCheckIfDone] = React.useState(false);
    const [buttonVis, setButtonVis] = React.useState("hidden");
    const [isPlayerTurn, setIsPlayerTurn] = React.useState(true);

    // const refresh = () => {
    //     window.location.reload();
    // };
    // should we reload on the get new game?? might fix problem of way it populates

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

    // get game to populate game-box
    useEffect(() => {
        changeGame();
    }, []);

    // populate the game box
    useEffect(() => {
        clearGame();
        populateGame();
    }, [currGame]);

    // check if the game is over and perform according actions
    useEffect(() => {
        console.log('entered check if done');
        var done = true;
        var setCheckFalse = false;
        if(checkIfDone) {
            setCheckFalse = true;
            console.log('checkifdone entered');
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
                console.log('finished');
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
        console.log('entered change player thing')
        const element = document.getElementById("game-box");
        const children = element.children;
        if(isPlayerTurn === true) {
            // make it so regular player can play
            for(var i = 0; i < children.length; i++) {
                if(children[i].tagName === "INPUT") {
                    if(!children[i].value) {
                        children[i].disabled = false;
                    }
                }
            }
        } else {
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
                            console.log(word_type)
                            console.log(sampleAnswers)
                            children[i].value = sampleAnswers[word_type];
                            break;
                        }
                    }
                }
                setIsPlayerTurn(true);
            }, 3000);
        }
    }, [isPlayerTurn]);

    return (
        <main className="game">
            <div id="above-game">
                <span>Game Code: XXXXXX</span>
                <Link to="/home">
                    <button>quit</button>
                </Link>
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
        </main>
    );
}


// after a player joins it needs to show that they joined (websocket imitation; check simon implementation)
// game code stuff


// perhaps address the way it looks when it repopulates? looks funny
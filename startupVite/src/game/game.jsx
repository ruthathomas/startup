import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const sampleGames = [
    {
        title: "A Holiday Story",
        script: ["I", "had", "the", "craziest", "holiday", "last", "month.", "We", "were", "setting", "up", "the", "animal", "decoration", "preposition", "the", "part of home", "when", "the", "element", "alarm", "went", "off!", "It", "turned", "out", "that", "family member", "had", "confused", "the", "plural decoration", "with", "the", "holiday dish", "and", "it", "was", "verb+ing", "all", "over", "the", "bottom", "of", "the", "oven!", "Luckily,", "our", "neighbors", "had", "a", "spare", "element", "extinguisher,", "so", "our", "oven", "was", "saved", "in", "no", "time.", "Dinner", "was", "pretty", "adjective", "and", "adjective", ",", "but", "at", "least", "we", "still", "had", "a", "house", "to", "eat", "it", "in!"],
        replace_indeces: [4, 12, 14, 16, 19, 27, 31, 34, 38, 52, 65, 67]
    },
    {
        title: "A Story Story",
        script: ["Have", "you", "ever", "had", "to", "write", "a", "story", "for", "your", "school subject", "class?", "It", "can", "be", "pretty", "adjective", ",", "especially", "if", "your", "professor", "wants", "it", "to", "be", "adjective", ".", "I", "am", "personally", "bad", "at", "writing", "anything", "but", "genre", ".", "I", "hope", "adjective", "plural noun", "and", "adjective", "plural noun", "are", "acceptable", "subject", "matter", "for", "this", "course!"],
        replace_indeces: [10, 16, 26, 36, 40, 41, 43, 44]
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
    adjective: ["furry", "crunchy", "brown", "undercooked"],
    "school subject": "physics",
    genre: "horror",
    "plural noun": ["fitted sheets", "pathogens", "armchairs", "movies"],
    dessert: "creme brule",
    "animal product": "eggs",
    superlative: ["best", "most", "worst", "largest"],
    "plural body part": "toes",
    number: 57,
    shape: "star",
    "plural food": ["okra", "lamb chops", "bananas", "flour"],
    color: "blue"
}

var mostRecentInput = undefined;

export function Game() {
    const [currGame, setCurrGame] = React.useState(sampleGames[0]);
    const [currElement, setCurrElement] = React.useState(document.body)

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
        // console.log(`curr elem: ${currElement.outerHTML}`)
        // const element = document.activeElement;
        // console.log(element);
        // console.log(`element tagName: ${element.tagName}`)
        // if(element.tagName == "INPUT") {
        //     mostRecentInput = element;
        // }
        // console.log(`recent elem: ${mostRecentInput.outerHTML}`);
        // setCurrElement(element);
    }

    function populateGame() {
        const gameContent = document.getElementById("game-box");
        for (let i = 0; i < currGame.script.length; i++) {
            var newElement;
            if(currGame.replace_indeces.includes(i)) {
                // should I give them an id?? for access??
                newElement = document.createElement("input");
                newElement.type = "text";
                newElement.placeholder = currGame.script.at(i);
                newElement.onfocus = function () {
                    changeElement();
                };
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

    useEffect(() => {
        //get game to populate game-box
        changeGame();
    }, []);

    useEffect(() => {
        //populate the game box
        clearGame();
        populateGame();
    }, [currGame]);

    useEffect(() => {
        //disable the input field once something has been entered in it
        // document.activeElement;
        if(currElement.tagName == "INPUT") {
            console.log('yoohoo')
            console.log(`${currElement.outerHTML}`)
            currElement.value = "yolo"
            console.log(`${currElement.value}`)
        }
    }, [currElement]);

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
            <div style={{margin: 0 + 'rem ' + 1 + 'rem'}}>
                <p><em>User beans's turn!</em></p>
                <p>User username joined.</p>
            </div>
            <form style={{padding: 1 + 'rem'}}>
                <button onClick={changeGame}>new game</button>
            </form>
            {/* <button onClick={changeElement}>cry</button> */}
        </main>
    );
}

// when an input item is completed, it needs to be disabled (maybe give the input fields a class??)
    // make some sort of react thing?? so when an input field is deselected and contains text, it gets disabled??
// when all input items are completed, the text needs to be unredacted
    // maybe make a class so that you can style the redacted text to have a rounded border??
// after user inputs we need to do something to make it so that "other players" input a field??
// after a player joins it needs to show that they joined (websocket imitation; check simon implementation)
// is everything supposed to be disabled when not your turn?? because you will also have to code for that
// button for new game shouldn't be visible until game is completed


// perhaps address the way it looks when it repopulates? looks funny
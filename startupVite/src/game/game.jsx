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
        script: ["Have", "you", "ever", "had", "to", "write", "a", "story", "for", "your", "SCHOOL SUBJECT", "class?", "It", "can", "be", "pretty", "ADJECTIVE", ",", "especially", "if", "your", "professor", "wants", "it", "to", "be", "ADJECTIVE", ".", "I", "am", "personally", "bad", "at", "writing", "anything", "but", "GENRE", ".", "I", "hope", "ADJECTIVE", "PLURAL NOUN", "and", "ADJECTIVE", "PLURAL NOUN", "are", "acceptable", "subject", "matter", "for", "this", "course!"],
        replace_indeces: [10, 16, 25, 37, 38, 40, 41]
    },
    {
        title: "A Dessert Story",
        script: ["The", "best", "kind", "of", "DESSERT", "is", "the", "kind", "made", "from", "real", "ANIMAL PRODUCT", ".", "Not", "only", "is", "the", "artificial", "kind", "the", "SUPERLATIVE", ",", "I've", "heard", "it's", "made", "of", "ANIMAL", "PLURAL BODY PART", ".", "Isn't", "that", "ADJECTIVE", "?", "The", "best", "way", "to", "get", "the", "real", "stuff", "is", "by", "going", "to", "a", "NUMBER", "SHAPE", "bakery.", "They", "only", "use", "the", "SUPERLATIVE", "PLURAL FOOD", "and", "PLURAL FOOD", ",", "which", "means", "that", "none", "of", "that", "nasty", "COLOR", "NUMBER", "!"],
        replace_indeces: [4, 11, 20, 27, 28, 32, 47, 48, 54, 55, 57, 66, 67]
    }
]

export function Game() {
    const [currGame, setCurrGame] = React.useState(sampleGames[0]);

    const refresh = () => {
        window.location.reload();
    };

    function changeGame() {
        const newGame = sampleGames[Math.floor(Math.random * sampleGames.length)];
        setCurrGame(newGame);
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
            } else {
                //you should make the element a span element
                newElement = document.createElement("span");
                newElement.textContent = currGame.script.at(i);
                newElement.style = "background-color: #212529"
            }
            gameContent.appendChild(newElement);
        }
    }

    useEffect(() => {
        //get game to populate game-box
        changeGame();
        //populate the game box
        populateGame();
    }, []);

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
                <button onClick={refresh}>new game</button>
            </form>
        </main>
    );
}

// so new game button needs to change the game (clear old game and populate with new one)
// when an input item is completed, it needs to be disabled (maybe give the input fields a class??)
    // make some sort of react thing?? so when an input field is deselected and contains text, it gets disabled??
// when all input items are completed, the text needs to be unredacted
    // maybe make a class so that you can style the redacted text to have a rounded border??
// after user inputs we need to do something to make it so that "other players" input a field??
// after a player joins it needs to show that they joined (websocket imitation; check simon implementation)
// is everything supposed to be disabled when not your turn?? because you will also have to code for that
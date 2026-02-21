import React from 'react';
import { Link } from 'react-router-dom';

const sampleGames = [
    {
        game_code: "000001",
        title: "A Holiday Story",
        script: ["I", "had", "the", "craziest", "HOLIDAY", "last", "month.", "We", "were", "setting", "up", "the", "ANIMAL", "decoration", "PREPOSITION", "the", "PART OF HOME", "when", "the", "ELEMENT", "alarm", "went", "off!", "It", "turned", "out", "that", "FAMILY MEMBER", "had", "confused", "the", "PLURAL DECORATION", "with", "the", "HOLIDAY DISH", "and", "it", "was", "VERB+ING", "all", "over", "the", "bottom", "of", "the", "oven!", "Luckily,", "our", "neighbors", "had", "a", "spare", "ELEMENT", "extinguisher,", "so", "our", "oven", "was", "saved", "in", "no", "time.", "Dinner", "was", "pretty", "ADJECTIVE", "and", "ADJECTIVE", ",", "but", "at", "least", "we", "still", "had", "a", "house", "to", "eat", "it", "in!"],
        replace_indeces: [4, 12, 14, 16, 19, 27, 31, 34, 38, 52, 65, 67]
    },
    {
        game_code: "000010",
        title: "A Story Story",
        script: ["Have", "you", "ever", "had", "to", "write", "a", "story", "for", "your", "SCHOOL SUBJECT", "class?", "It", "can", "be", "pretty", "ADJECTIVE", ",", "especially", "if", "your", "professor", "wants", "it", "to", "be", "ADJECTIVE", ".", "I", "am", "personally", "bad", "at", "writing", "anything", "but", "GENRE", ".", "I", "hope", "ADJECTIVE", "PLURAL NOUN", "and", "ADJECTIVE", "PLURAL NOUN", "are", "acceptable", "subject", "matter", "for", "this", "course!"],
        replace_indeces: [10, 16, 25, 37, 38, 40, 41]
    },
    {
        game_code: "000011",
        title: "A Dessert Story",
        script: ["The", "best", "kind", "of", "DESSERT", "is", "the", "kind", "made", "from", "real", "ANIMAL PRODUCT", ".", "Not", "only", "is", "the", "artificial", "kind", "the", "SUPERLATIVE", ",", "I've", "heard", "it's", "made", "of", "ANIMAL", "PLURAL BODY PART", ".", "Isn't", "that", "ADJECTIVE", "?", "The", "best", "way", "to", "get", "the", "real", "stuff", "is", "by", "going", "to", "a", "NUMBER", "SHAPE", "bakery.", "They", "only", "use", "the", "SUPERLATIVE", "PLURAL FOOD", "and", "PLURAL FOOD", ",", "which", "means", "that", "none", "of", "that", "nasty", "COLOR", "NUMBER", "!"],
        replace_indeces: [4, 11, 20, 27, 28, 32, 47, 48, 54, 55, 57, 66, 67]
    }
]

export function Game() {
    const refresh = () => {
        window.location.reload();
    };

    return (
        <main className="game">
            <div id="above-game">
                <span>Game Code: XXXXXX</span>
                <Link to="/home">
                    <button>quit</button>
                </Link>
            </div>
            <div id="game-box">
                <span>The</span>
                <input type="text" placeholder="plural noun"/>
                <span>here</span>
                <span>will</span>
                <span>be</span>
                <span>redacted</span>
                <span>for</span>
                <span>actual</span>
                <span>gameplay.</span>
                <input type="text" placeholder="pronoun"/>
                <span>will</span>
                <span>only</span>
                <span>be</span>
                <span>able</span>
                <span>to</span>
                <span>see</span>
                <span>the</span>
                <span>full</span>
                <input type="text" placeholder="noun"/>
                <span>after</span>
                <span>you</span>
                <span>have</span>
                <input type="text" placeholder="verb ending in -ed"/>
                <span>in</span>
                <span>the</span>
                <span>blanks</span>
                <span>with</span>
                <span>your</span>
                <span>friends.</span>
                <p>The scripts for the game will be stored in and fetched from the database.</p>
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
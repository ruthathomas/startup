const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';
const baseGames = [{
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
    }];
const possChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

let users = [];
let games = [];

app.use(express.json())
app.use(cookieParser());

//register - post
app.post('/api/auth', async (req, res) => {
    if(await getUser('username', req.body.username)) {
        res.status(409).send({msg: 'Username already exists'})
    } else {
        const user = await createUser(req.body.username, req.body.password);
        createAuthCookie(res, user);
        res.send({username: user.username});
    }
})

//login - put
app.put('/api/auth', async (req, res) => {
    const user = await getUser('username', req.body.username);
    if(user && (await bcrypt.compare(req.body.password, user.password))) {
        createAuthCookie(res, user);
        res.send({username: user.username});
    } else {
        res.status(401).send({msg: 'Incorrect password :('})
    }
})

//logout - delete
app.delete('/api/auth', async (req, res) => {
    const token = req.cookies['token'];
    const user = await getUser('token', token);
    if(user) {
        deleteAuthCookie(res, user);
    }
    res.send({});
})

//start game
app.post('/api/game', async (req, res) => {
    const token = req.cookies['token'];
    const user = await getUser('token', token);
    if(user) {
        let game = await createGame();
        // do some sort of authentication for game? prob. unnecessary
        return res.send({code: game.code, game: game.text});
    } else {
        return res.status(401).send({msg: 'Unauthorized :('});
    }
})

//join game
app.get('/api/game', async (req, res) => {
    const token = req.cookies['token'];
    const user = await getUser('token', token);
    const code = req.headers.code;
    const game = await getGame('code', code);
    if(user && game) {
        res.send({code: code, game: game.text})
    } else {
        res.status(401).send({msg: 'Unauthorized :('});
    }
})

//leave game
app.delete('/api/game', async (req, res) => {
    const token = req.cookies['token'];
    const user = await getUser('token', token);
    //fixme FIXME
})

//create cookie
function createAuthCookie(res, user) {
    user.token = uuid.v4();
    res.cookie('token', user.token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    });
}

//delete cookie
function deleteAuthCookie(res, user) {
    delete user.token;
    res.clearCookie('token');
}

//get user
function getUser(field, value) {
    if (value) {
        return users.find((user) => user[field] === value);
    }
    return null;
}

//create user
async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 15);
    const user = {
        username: username,
        password: passwordHash,
    };
    users.push(user);
    return user;
}

//verify user

//fetch game
function getGame(field, value) {
    if (value) {
        return games.find((game) => game[field] === value);
    }
    return null;
}

//create game
async function createGame() {
    // create a game number
    let code = ""
    while(true) {
        code = generateCode();
        if(!games.find((game) => game["code"] === code)) {
            break;
        }
    }
    // get a random game
    const gameIndex = Math.floor(Math.random() * baseGames.length)
    const game = {
        code: code,
        text: baseGames[gameIndex]
    }
    games.push(game);
    return game;
}

//generate code
function generateCode() {
    let gameCode = ""
    for(var i = 0; i < 6; i++) {
        // array[Math.floor(Math.random() * array.length)]
        // const charIndex = Math.floor(Math.random() * possChars.length());
        gameCode += possChars[Math.floor(Math.random() * possChars.length)];
    }
    return gameCode
}

//update game

//verify game code

//error handling

app.listen(4000);
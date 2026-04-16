const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
// const cors = require('cors');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';
const baseGames = [{
        index: 0,
        title: "A Holiday Story",
        script: ["I", "had", "the", "craziest", "holiday", "last", "month.", "We", "were", "setting", "up", "the", "animal", "decoration", "preposition", "the", "part of home", "when", "the", "element", "alarm", "went", "off!", "It", "turned", "out", "that", "family member", "had", "confused", "the", "plural decoration", "with", "the", "holiday dish", "and", "it", "was", "verb+ing", "all", "over", "the", "bottom", "of", "the", "oven!", "Luckily,", "our", "neighbors", "had", "a", "spare", "element", "extinguisher,", "so", "our", "oven", "was", "saved", "in", "no", "time.", "Dinner", "was", "pretty", "adjective", "and", "adjective", ",", "but", "at", "least", "we", "still", "had", "a", "house", "to", "eat", "it", "preposition", "!"],
        replace_indeces: [4, 12, 14, 16, 19, 27, 31, 34, 38, 52, 65, 67, 80]
    },
    {
        index: 1,
        title: "A Story Story",
        script: ["Have", "you", "ever", "had", "to", "write", "a", "story", "for", "your", "school subject", "class?", "It", "can", "be", "pretty", "adjective", ",", "especially", "if", "your", "professor", "wants", "it", "to", "be", "adjective", ".", "I", "am", "personally", "bad", "at", "writing", "anything", "but", "genre", ".", "I", "hope", "adjective", "plural noun", "and", "number", "adjective", "plural noun", "are", "acceptable", "subject", "matter", "for", "this", "course!"],
        replace_indeces: [10, 16, 26, 36, 40, 41, 43, 44, 45]
    },
    {
        index: 2,
        title: "A Dessert Story",
        script: ["The", "best", "kind", "of", "dessert", "is", "the", "kind", "made", "from", "real", "animal product", ".", "Not", "only", "is", "the", "artificial", "kind", "the", "superlative", ",", "I've", "heard", "it's", "made", "of", "animal", "plural body part", ".", "Isn't", "that", "adjective", "?", "The", "best", "way", "to", "get", "the", "real", "stuff", "is", "by", "going", "to", "a", "number", "shape", "bakery.", "They", "only", "use", "the", "superlative", "plural food", "and", "plural food", ",", "which", "means", "that", "none", "of", "that", "nasty", "color", "number", "!"],
        replace_indeces: [4, 11, 20, 27, 28, 32, 47, 48, 54, 55, 57, 66, 67]
    }];
const possChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
const port = process.argv.length > 2 ? process.argv[2] : 4000;


// let users = [];
let games = [];

// app.use(cors());
app.use(express.json())
app.use(cookieParser());
app.use(express.static('public'));

//get authenticated sucker
app.get('/api/auth/me', async (req, res) => {
    const user = await getUser('token', req.cookies[authCookieName]);
    if(user) {
        res.send({username: user.username, authenticated: 'true'});
    } else {
        res.status(401).send({msg: 'Unauthorized :('});
    }
})


//register - post
app.post('/api/auth', async (req, res) => {
    if(await getUser('username', req.body.username)) {
        res.status(409).send({msg: 'Username already exists'})
    } else {
        const user = await createUser(req.body.username, req.body.password);
        setAuthCookie(res, user.token);
        res.send({username: user.username});
    }
})

//login - put
app.put('/api/auth', async (req, res) => {
    const user = await getUser('username', req.body.username);
    if(user && (await bcrypt.compare(req.body.password, user.password))) {
        user.token = uuid.v4();
        await DB.updateUser(user);
        setAuthCookie(res, user);
        res.send({username: user.username});
    } else {
        res.status(401).send({msg: 'Unauthorized (incorrect password or user does not exist) :('})
    }
})

//logout - delete
app.delete('/api/auth', async (req, res) => {
    const user = await getUser('token', req.cookies[authCookieName]);
    if(user) {
        await DB.updateUserRemoveAuth(user);
        // deleteAuthCookie(res, user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
    // res.send({});
})

// // get code via user; ignore for now :')
// app.get('/api/auth/game', async (req, res) => {
//     const token = req.cookies['token'];
//     const user = await getUser('token', token);
//     if(user) {
//         res.send({code: user.inGame});
//     }
//     res.send({});
// })

//start game
app.post('/api/game', async (req, res) => {
    const user = await getUser('token', req.cookies[authCookieName]);
    if (user.inGame) {
        return res.status(400).send({msg: `You are already playing game ${user.inGame}; please quit before joining another.`})
    } else if(user) {
        let game = await createGame(user.username);
        user.inGame = game.code;
        await DB.updateUser(user);
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
    const game = await DB.getGame(code);
    if(!game) {
        return res.status(404).send({msg: 'Game not found :('});
    }
    if (user.inGame && user.inGame != game.code) {
        return res.status(400).send({msg: `You are already playing game ${user.inGame}; please quit before joining another.`})
    } else if(user && game) {
        if(!user.inGame) {
            user.inGame = game.code;
            DB.updateUser(user);
            game.players.push(username);
            DB.updateGame(game);
        }
        res.send({code: code, game: game.text})
    } else {
        res.status(401).send({msg: 'Unauthorized :('});
    }
})

//update game (for refresh purposes) (currently unused)
app.get('/api/game/refresh', async (req, res) => {
    const user = await getUser('token', req.cookies[authCookieName]);
    const code = req.headers.code;
    // const player = req.headers.player;
    const game = await DB.getGame(code);
    if(user && user.username === user.username && game) {
        res.send({code: code, game: game.text})
    } else {
        res.status(401).send({msg: 'Unauthorized :('});
    }
})

//update game
app.put('/api/game', async (req, res) => {
    const user = await getUser('token', req.cookies[authCookieName]);
    const newGame = req.body.game;
    const code = req.body.code;
    // game is only coming in with replace indices and script
    // we want to only replace the text part also
    // const index = games.findIndex(game => game.code === code);
    // if(index === -1) {
    //     res.send('failed to update game :(');
    if (user) {
        await DB.updateGame(newGame);
        const game = await DB.getGame(code);
        // games[index].text = newGame;
        //fixme remove the players bit later
        res.send({game: game.text});
    } else {
        res.send('Unauthorized :(');
    }
    //fixme and then we have to update the game I cry
})

//new game
app.put('/api/new-game', async (req, res) => {
    const token = req.cookies['token'];
    const user = await getUser('token', token);
    const code = req.body.code;
    // const index = games.findIndex(game => game.code === code);
    // if(index === -1) {
    //     res.send('failed to update game :(');
    if(user) {
        const currGame = await DB.getGame(code);
        let game = getRandomGame(currGame.players, code);
        return res.send({game: game.text});
    } else {
        res.send('Unauthorized :(');
    }
})

//leave game (fixme - do I need to )
app.delete('/api/game', async (req, res) => {
    const user = await getUser('token', req.cookies[authCookieName]);
    const code = req.headers.code;
    // const gIndex = games.findIndex(game => game.code === code);
    // if(gIndex === -1) {
    //     res.send('failed to leave game :(');
    const game = await DB.getGame(code);
    if(user) {
        const pIndex = game.players.findIndex(p => p === user.username);
        // let help = games[gIndex].players[pIndex]
        game.players.splice(pIndex, 1);
        if(game.players.length === 0) {
            //FIXME delete game from database
            DB.removeGame(game);
            // games.splice(gIndex, 1);
        } else {
            DB.updateGame(game);
        }
        user.inGame = '';
        await DB.updateUser(user);
        res.send({msg: 'is this right??'});
    } else {
        res.send('Unauthorized :(');
    }
    //fixme FIXME
})

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

//create cookie
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

//delete cookie
function deleteAuthCookie(res, user) {
    delete user.token;
    res.clearCookie('token');
}

//get user
function getUser(field, value) {
    if(!value) {
        return null;
    }
    if (field == 'token') {
        return DB.getUserByToken(value);
        // return users.find((user) => user[field] === value);
    }
    return DB.getUser(value);
}

//create user
async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 15);
    const user = {
        username: username,
        password: passwordHash,
        inGame: '',
        token: uuid.v4(),
    };
    await DB.addUser(user);
    return user;
}

//verify user

//fetch game
// async function getGame(field, value) {
//     if(!value) {
//         return null;
//     }
//     return DB.getGame(value);
//     // if (value) {
//     //     return games.find((game) => game[field] === value);
//     // }
//     // return null;
// }

//create game
async function createGame(player) {
    // create a game number
    let code = ""
    while(true) {
        code = generateCode();
        const game = await DB.getGame(code);
        if(!game) {
            break;
        }
        // if(!games.find((game) => game["code"] === code)) {
        //     break;
        // }
    }
    // get a random game
    const randGame = await getRandomGame([player], code);
    return randGame;
}

async function getRandomGame(players, code) {
    const gameIndex = Math.floor(Math.random() * baseGames.length);
    const text = await DB.getBaseGame(gameIndex);
    const game = {
        code: code,
        text: text,
        players: players
    }
    const check = await DB.getGame(code);
    if(!check) {
        DB.addGame(game);
    } else {
        DB.updateGame(game);
    }
    // games.push(game);
    return game;
}

//generate code
function generateCode() {
    let gameCode = ""
    for(var i = 0; i < 6; i++) {
        gameCode += possChars[Math.floor(Math.random() * possChars.length)];
    }
    return gameCode
}

//error handling??

async function initDBGames() {
    await DB.initDB(baseGames);
}

await initDBGames();
app.listen(port);
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';
const baseGames = []; //fixme fill up with the games

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
        res.send({code: game.code, game: game.game});
    } else {
        res.status(401).send({msg: 'Unauthorized :('});
    }
})

//join game
app.put('/api/game', async (req, res) => {
    const token = req.cookies['token'];
    const user = await getUser('token', token);
    const game = await getGame('code', req.body.code);
    if(user) {
        res.send({game: game.game})
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
    // get a random game
    const game = {
        code: 'fixme',
        text: 'fixme'
    }
    games.push(game);
    return game;
}

//update game

//verify game code

//error handling

app.listen(4000);
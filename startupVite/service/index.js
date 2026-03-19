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
        setAuthCookie(res, user);
        res.send({username: user.username});
    }
})

//login - put
app.put('/api/auth', async (req, res) => {
    const user = await getUser('username', req.body.username);
    if(user && (await bcrypt.compare(req.body.password, user.password))) {
        setAuthCookie(res, user);
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

//update game

//create game

//verify game code

//error handling

app.listen(3000);
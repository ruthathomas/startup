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

//register - post
app.post('/api/auth', async (req, res) => {
    //stubbing
    res.send(req.body);
})

//login - put/post
app.put('/api/auth', async (req, res) => {
    //stubbing
    res.send(req.body);
})

//logout - delete
app.delete('/api/auth', async (req, res) => {
    //stubbing
    res.send(req.body);
})

//verify user

//fetch game

//update game

//create game

//verify game code

//error handling

//cookie handling
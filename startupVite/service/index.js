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

//create cookie
function createAuthCookie(res, user) {
    user.token = uuid.v4();
    res.cookie('token', user.token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    });
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

//cookie handling

app.listen(3000);


// const express = require('express');
// const app = express();

// // registration
// app.post('/api/auth', async (req, res) => {
//   res.send({ email: 'marta@id.com' });
// });

// // login
// app.put('/api/auth', async (req, res) => {
//   res.send({ email: 'marta@id.com' });
// });

// // logout
// app.delete('/api/auth', async (req, res) => {
//   res.send({});
// });

// // getMe
// app.get('/api/user', async (req, res) => {
//   res.send({ email: 'marta@id.com' });
// });

// app.listen(3000);
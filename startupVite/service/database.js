const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}/?appName=StartupCluster`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const gameCollection = db.collection('game');
const defaultGames = db.collection('base-game');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

async function initDB(games) {
    const game = await defaultGames.findOne({index: 0});
    if(game) {
        //nothing
    } else {
        await defaultGames.insertMany(games);
    }
}

function getBaseGame(index) {
    return defaultGames.findOne({index: index});
}

function getUser(username) {
    return userCollection.findOne({username: username});
}

function getUserByToken(token) {
    return userCollection.findOne({token: token});
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({username: user.username}, {$set: user});
}

async function updateUserRemoveAuth(user) {
    await userCollection.updateOne({ username: user.username }, { $unset: { token: 1 } });
}

async function getGame(code) {
    return gameCollection.findOne({code: code});
}

async function addGame(game) {
    await gameCollection.insertOne(game);
}

async function updateGame(game) {
    let text = game.text;
    if(!text) {
        text = {
            index: game.index,
            title: game.title,
            script: game.script,
            replace_indeces: game.replace_indeces
        }
    }
    await gameCollection.updateOne({code: game.code}, {$set: {text: text}});
}

async function removeGame(game) {
    await gameCollection.deleteOne({code: game.code});
}

module.exports = {
  initDB,
  getBaseGame,
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  getGame,
  addGame,
  updateGame,
  removeGame
};

// THIS IS THE SAMPLE STUFF

// async function addScore(score) {
//   return scoreCollection.insertOne(score);
// }

// function getHighScores() {
//   const query = { score: { $gt: 0, $lt: 900 } };
//   const options = {
//     sort: { score: -1 },
//     limit: 10,
//   };
//   const cursor = scoreCollection.find(query, options);
//   return cursor.toArray();
// }
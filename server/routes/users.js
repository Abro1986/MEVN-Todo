const router = require('express').Router();
const mongo = require('mongodb');
const httpError = require('throw.js');
const bcrypt = require('bcrypt');
require('dotenv').config();

const userSchema = require('../db/userSchema');

const {DB_USER, DB_PASSWORD} = process.env;
const dbConnectString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ol3x2.mongodb.net/MEVN-todo?retryWrites=true&w=majority`;
const salt = 5;

router.post('/', async (req, res, next) => {
  try {
    const users = await loadUsersCollection();
    if(await userExists(await users.find({email: req.body.email}).toArray())) {
      throw new httpError.BadRequest('email is registered, please provide another');
    };
    req.body.password = await bcrypt.hash(req.body.password, salt);
    await users.insertOne(
      userSchema(req.body)
    );
    res.status(201).send("OK")
  } catch (err) {
    next(err);
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const users = await loadUsersCollection();
    const user = await users.findOne({email: req.body.email})
    if(await bcrypt.compare(req.body.password, user.password)) {
      const expireTime = 3600;
      res.cookie('timer', 'tick tock', { maxAge: expireTime * 1000, httpOnly: false, secure: false});
      res.cookie('userId', `${user._id}`, { maxAge: expireTime * 1000, httpOnly: false, secure: false});
      res.status(200).send("OK")
    } else {
      throw new httpError.Forbidden('incorrect password')
    }
  } catch (err) {
    next(err);
  }
})

async function loadUsersCollection() {
  const client = await mongo.MongoClient.connect(dbConnectString, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  return client.db('MEVN-todo').collection('users'); 
}

async function userExists(queryResult) {
  if(queryResult.length > 0){
    return true;
  } else {
    return false;
  }
}



module.exports = router  
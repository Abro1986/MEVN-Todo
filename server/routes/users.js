const router = require('express').Router();
const mongo = require('mongodb');
const httpError = require('throw.js');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');

require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_APIKEY);

const userSchema = require('../db/userSchema');
const sendGridTemplate = require('../util/sendgridTemplate');

const {DB_USER, DB_PASSWORD} = process.env;
const dbConnectString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ol3x2.mongodb.net/MEVN-todo?retryWrites=true&w=majority`;
const salt = 5;
const expireTime = 3600;

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
    const user = await users.findOne({email: req.body.email});
    await sgMail.send(sendGridTemplate(user._id.toHexString()));
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
      res.cookie('userId', `${user._id}`, { maxAge: expireTime * 1000, httpOnly: false, secure: false});
    } else {
      throw new httpError.Forbidden('incorrect password')
    }
    if(user.verified === true) {
      res.cookie('timer', 'tick tock', { maxAge: expireTime * 1000, httpOnly: false, secure: false});
    }
    res.status(200).send("OK")
  } catch (err) {
    next(err);
  }
})

router.get('/:id/verify', async (req, res, next) => {
  try {
    const users = await loadUsersCollection();
    await users.updateOne({_id: new mongo.ObjectID(`${req.params.id}`)}, { "$set": {"verified": true}} , {upsert: true});
    res.send("OK");
  } catch (err) {
    next(err);
  }
})

router.get('/:id/verified', async (req, res, next) => {
  const users = await loadUsersCollection();
  const user = await users.findOne({"email": req.params.id});
  if(user.verified){
    res.status(200).send(true)
  } else {
    res.status(200).send(false)
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
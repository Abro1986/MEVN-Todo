const router = require('express').Router();
const mongo = require('mongodb');
const httpError = require('throw.js');
require('dotenv').config();

const todoSchema = require('../db/todoSchema');

const {DB_USER, DB_PASSWORD} = process.env;
const dbConnectString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ol3x2.mongodb.net/MEVN-todo?retryWrites=true&w=majority`;

router.get('/', async (req, res, next) => {
  try {
    const todos = await loadTodoCollection();
    const userTodos = await todos.find({_id: new mongo.ObjectID(req.cookies.userId)}).toArray()
    res.status(200).send(userTodos[0].todos);
  } catch (err) {
    next(new httpError.InternalServerError(err.message || err));
  }
});

router.post('/', async (req, res, next) => {
  try {
    const posts = await loadTodoCollection();
    await posts.findOneAndUpdate({_id: new mongo.ObjectID(req.cookies.userId)}, {"$push": {"todos" : todoSchema(req.body) } } )
    res.status(201).send("OK")
  } catch (err) {
    next(new httpError.InternalServerError(err.message || err));
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const todos = await loadTodoCollection();
    await todos.updateOne({_id: new mongo.ObjectID(req.cookies.userId)}, {"$pull": {"todos" : {"uniqueId": `${req.params.id}`} } });
    res.status(200).send();
  } catch (err) {
    next(new httpError.InternalServerError(err.message || err));
  }
})

async function loadTodoCollection() {
  const client = await mongo.MongoClient.connect(dbConnectString, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  return client.db('MEVN-todo').collection('users'); 
}

module.exports = router  
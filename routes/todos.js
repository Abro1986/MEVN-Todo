const router = require('express').Router();
const mongo = require('mongodb');
const httpError = require('throw.js');

router.get('/', async (req, res, next) => {
  try {
    const todos = await loadTodoCollection();
    res.status(200).send(await todos.find({}).toArray());
  } catch (err) {
    next(new httpError.InternalServerError(err.message || err));
  }
});

router.post('/', async (req, res, next) => {
  try {
    const posts = await loadTodoCollection();
    await posts.insertOne({
      text: req.body.text,
      createdAt: new Date()
    });
    res.status(201).send("OK")
  } catch (err) {
    next(new httpError.InternalServerError(err.message || err));
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const todos = await loadTodoCollection();
    await todos.deleteOne({_id: new mongo.ObjectID(req.params.id)});
    res.status(200).send();
  } catch (err) {
    next(new httpError.InternalServerError(err.message || err));
  }
})

async function loadTodoCollection() {
  const client = await mongo.MongoClient.connect('mongodb+srv://aBroestl:URTVkOQago07kzwQ@cluster0.ol3x2.mongodb.net/MEVN-todo?retryWrites=true&w=majority', 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  return client.db('MEVN-todo').collection('todos'); 
}

module.exports = router  
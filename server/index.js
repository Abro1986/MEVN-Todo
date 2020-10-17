const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const init = require('./routes/index');
require('dotenv').config();

const app = express();

//Middlewares
app.use(bodyParser.json())
app.use(cors());

init(app);

// Handle Production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));

  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server started on port: ${port}`))
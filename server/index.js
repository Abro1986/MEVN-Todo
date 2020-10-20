const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const init = require('./routes/index');
const errorHandler = require('./util/errorHandler');

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
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

app.use(async (err, req, res, next) => {
  await errorHandler.HandleError(err, req, res, next);
});

//app.use(errorHandler)
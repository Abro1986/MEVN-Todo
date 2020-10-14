const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const init = require('../routes/index');

const app = express();

init(app);


//Middlewares
app.use(bodyParser.json())
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server started on port: ${port}`))
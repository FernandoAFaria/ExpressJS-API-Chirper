const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/index');


let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use(express.static('client'));

app.use('/api', apiRouter);

app.listen(3000);
//This will pull all routes, bundle them and send them to server.js

const express = require('express');
const chirpRouter = require('./chirps');
const path = require('path');

let router = express.Router();


router.use('/', chirpRouter);

module.exports = router;
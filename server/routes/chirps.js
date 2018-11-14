const express = require('express');
const chirpStore = require('../chirpstore');
const path = require('path');

let router = express.Router();

router.get('/chirps', (req, res) => {
    res.send(chirpStore.GetChirps());
});

router.post('/submit', (req, res) => {
    chirpStore.CreateChirp(req.body);
    res.sendStatus(200);
});
router.put('/submit/:id', (req, res) => {
    let id = req.params.id;
    chirpStore.UpdateChirp(id, req.body);
    res.sendStatus(200)
})
router.delete('/submit/:id', (req, res) => {
    let id = req.params.id;
    chirpStore.DeleteChirp(id);
    res.sendStatus(200);
})

module.exports = router;
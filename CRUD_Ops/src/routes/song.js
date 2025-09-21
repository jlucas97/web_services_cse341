const express = require('express');
const router = express.Router();

const songController = require('../controllers/song');
const validation = require('../middleware/validation');

router.get('/songs', songController.getAllSongs);

router.get('/songs/:id', songController.getSong);

router.post('/songs', validation.saveSong, songController.createSong);

router.put('/songs/:id', validation.saveSong, songController.updateSong);

router.delete('/songs/:id', songController.deleteSong);

module.exports = router;
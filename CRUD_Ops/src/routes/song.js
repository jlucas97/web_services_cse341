const express = require('express');
const router = express.Router();

const songController = require('../controllers/song');
const validation = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

// Get all songs
router.get('/songs', songController.getAllSongs);

// Get single song by ID 
router.get('/songs/:id', songController.getSong);

// Create new song (auth + validation)
router.post(
  '/songs',
  isAuthenticated,
  validation.saveSong,
  songController.createSong
);

// Update existing song (auth + validation)
router.put(
  '/songs/:id',
  isAuthenticated,
  validation.saveSong,
  songController.updateSong
);

// Delete a song (auth only)
router.delete(
  '/songs/:id',
  (req, res, next) => { console.log("DELETE /songs/:id hit"); next(); },
  isAuthenticated,
  songController.deleteSong
);

module.exports = router;

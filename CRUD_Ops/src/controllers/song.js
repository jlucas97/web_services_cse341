const mongoDB = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllSongs = async (req, res) => {
  // #swagger.tags = ['Songs']
  try {
    const songs = await mongoDB
      .getDb()
      .collection('music_hits')
      .find({})
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while fetching songs.' });
  }
};

const getSong = async (req, res) => {
  // #swagger.tags = ['Songs']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid song id to fetch a song.');
    }

    const songId = new ObjectId(req.params.id);
    const song = await mongoDB
      .getDb()
      .collection('music_hits')
      .findOne({ _id: songId });

    if (!song) {
      return res.status(404).json({ message: 'Song not found.' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(song);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while fetching the song.' });
  }
};

const createSong = async (req, res) => {
  // #swagger.tags = ['Songs']
 /* #swagger.parameters['obj'] = {
      in: "body",
      description: "Song payload",
      required: true,
      schema: {
        "$title": "Smells Like Teen Spirit",
        "$artist": "Nirvana",
        "$album": "Nevermind",
        "releaseYear": 1991,
        "genre": "Grunge"
      }
} */

  try {
    const song = {
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
    };

    const response = await mongoDB
      .getDb()
      .collection('music_hits')
      .insertOne(song);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Song created successfully.', id: response.insertedId });
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the song.');
    }
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while creating the song.' });
  }
};

const updateSong = async (req, res) => {
  // #swagger.tags = ['Songs']
 /* #swagger.parameters['obj'] = {
      in: "body",
      description: "Song payload",
      required: true,
      schema: {
        "$title": "Smells Like Teen Spirit",
        "$artist": "Nirvana",
        "$album": "Nevermind",
        "releaseYear": 1991,
        "genre": "Grunge"
      }
} */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid song id to update a song.');
    }

    const songId = new ObjectId(req.params.id);
    const song = {
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
    };

    const response = await mongoDB
      .getDb()
      .collection('music_hits')
      .replaceOne({ _id: songId }, song);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Song not found or no changes made.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while updating the song.' });
  }
};

const deleteSong = async (req, res) => {
  // #swagger.tags = ['Songs']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid song id to delete a song.');
    }

    const songId = new ObjectId(req.params.id);
    const response = await mongoDB
      .getDb()
      .collection('music_hits')
      .deleteOne({ _id: songId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Song not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while deleting the song.' });
  }
};

module.exports = {
  getAllSongs,
  getSong,
  createSong,
  updateSong,
  deleteSong,
};

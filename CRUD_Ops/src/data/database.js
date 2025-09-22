const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { MongoClient } = require('mongodb');

const URI = process.env.MONGODB_URI || process.env.DATABASE_URI;
const DB_NAME = process.env.DB_NAME || process.env.DATABASE_NAME;

let _db;

console.log("👉 Loaded MONGODB_URI:", process.env.MONGODB_URI);
console.log("👉 Loaded DB_NAME:", process.env.DB_NAME);

// Initialize the database connection
const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }

  MongoClient.connect(URI)
    .then((client) => {
      _db = client.db(DB_NAME);
      console.log(`Connected to database: ${DB_NAME}`);
      callback(null, _db);
    })
    .catch((err) => {
      console.error('Failed to connect to the database:', err);
      callback(err);
    });
};

// Return the active DB instance
const getDb = () => {
  if (!_db) {
    throw Error('Database is not initialized. Call initDb first.');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};

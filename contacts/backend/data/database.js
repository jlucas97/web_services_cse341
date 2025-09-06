const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB_NAME || 'contactsdb';

const MongoClient = require('mongodb').MongoClient;

let client;
let db;

const initDb = (callback) => {
    if (db) {
        console.log('Database is already initialized!');
        return callback(null, db);
    }

    

    MongoClient.connect(URI)
    .then((client) => {
        db = client.db(DB_NAME);
        console.log('Database initialized');
        callback(null, db);
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
        callback(err);
    });
};

const getDb = () => {
    if (!db) {
        throw Error('Database is not initialized');
    }
    return db;
};

module.exports = {
    initDb,
    getDb
};
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

let db;

const initDb = (callback) => {
    if (db) {
        console.log('Database is already initialized!');
        return callback(null, db);
    }

    MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
        db = client;
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
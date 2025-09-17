const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const mongoDB = require('./data/database');
const bodyParser = require('body-parser');
const routes = require('./routes/');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Content-Type, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`)
});

app.use('/', routes);


mongoDB.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
       app.listen(port, () => {
    console.log(`Database is listening and Node running on port ${port}`)});
    }
});
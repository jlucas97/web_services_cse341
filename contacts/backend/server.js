const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const mongoDB = require('./data/database');
const routes = require('./routes/');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', routes);

mongoDB.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
       app.listen(port, () => {
    console.log(`Database is listening and Node running on port ${port}`)});
    }
});
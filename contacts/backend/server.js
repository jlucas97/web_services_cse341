const express = require('../node_modules/express');
const mongoDB = require('./data/database');

const app = express();
const routes = require('./routes/');

const port = process.env.PORT || 3000;

app.use('/', routes);

mongoDB.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
       app.listen(port, () => {
    console.log(`Database is listening and Node running on port ${port}`)});
    }
});
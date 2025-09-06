const express = require('../node_modules/express');
const app = express();
const routes = require('./routes/');

const port = process.env.PORT || 3001;

app.use('/', routes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// express web server
const express = require('express');
const app = express();
const routes = require('./routes/routes');

const port = 3000;

app.use('/', routes);
 
app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});
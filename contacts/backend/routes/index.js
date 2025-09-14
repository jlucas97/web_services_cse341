const routes = require('express').Router();
const controller = require('../controllers/controllers');

routes.use(require('./swagger'));
routes.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Hello World');
});

routes.use(require('./contact'));

module.exports = routes;
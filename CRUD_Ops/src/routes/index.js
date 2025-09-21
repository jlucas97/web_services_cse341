const routes = require('express').Router();

routes.use('/', require('./song'));
routes.use('/', require('./country'));
routes.use('/', require('./swagger'));

module.exports = routes;
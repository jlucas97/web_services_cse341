const routes = require('express').Router();
const controller = require('../controllers/controllers');

routes.get('/', controller.home);

routes.use(require('./contact'));

module.exports = routes;
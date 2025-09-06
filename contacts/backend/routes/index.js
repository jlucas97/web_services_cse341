const routes = require('express').Router();
const controller = require('../controllers/controllers');

routes.get('/', controller.home);

module.exports = routes;
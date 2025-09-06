const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.home);
routes.get('/Jana', lesson1Controller.janaRoute);
routes.get('/Tony', lesson1Controller.tonyRoute);

module.exports = routes;
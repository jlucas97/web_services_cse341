const passport = require('passport');

const routes = require('express').Router();

const { isAuthenticated } = require('../middleware/authenticate');
const GitHubStrategy = require('passport-github2').Strategy;

routes.use('/', require('./song'));
routes.use('/', require('./country'));
routes.use('/', require('./swagger'));

routes.get('/auth/github', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', function(req, res, next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

routes.get('/protected-test', isAuthenticated, (req, res) => {
  res.json({ message: 'You passed auth!' });
});


module.exports = routes;
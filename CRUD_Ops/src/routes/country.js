const express = require('express');
const router = express.Router();

const countryController = require('../controllers/country');
const validation = require('../middleware/validation');

router.get('/countries', countryController.getAllCountries);

router.get('/countries/:id', countryController.getCountry);

router.post('/countries', validation.saveCountry, countryController.createCountry);

router.put('/countries/:id', validation.saveCountry, countryController.updateCountry);

router.delete('/countries/:id', countryController.deleteCountry);

module.exports = router;
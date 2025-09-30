const express = require('express');
const router = express.Router();

const countryController = require('../controllers/country');
const validation = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

// Get all countries 
router.get('/countries', countryController.getAllCountries);

// Get one country 
router.get('/countries/:id', countryController.getCountry);

// Create new country
router.post(
  '/countries',
  isAuthenticated,
  validation.saveCountry,
  countryController.createCountry
);

// Update existing country 
router.put(
  '/countries/:id',
  isAuthenticated,
  validation.saveCountry,
  countryController.updateCountry
);

// Delete a country 
router.delete(
  '/countries/:id',
  isAuthenticated,
  countryController.deleteCountry
);

module.exports = router;

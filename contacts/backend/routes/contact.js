const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');

router.get('/contacts', contactController.getAllContacts);
router.get('/contacts/:id', contactController.getContact);

module.exports = router;
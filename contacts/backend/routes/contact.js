const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');
const validation = require('../middleware/validation');

router.get('/contacts', contactController.getAllContacts);

router.get('/contacts/:id', contactController.getContact);

router.post('/contacts', validation.saveContact, contactController.createContact);

router.put('/contacts/:id', validation.saveContact, contactController.updateContact);

router.delete('/contacts/:id', contactController.deleteContact);

module.exports = router;
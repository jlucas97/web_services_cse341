const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');

router.get('/contacts', contactController.getAllContacts);

router.get('/contacts/:id', contactController.getContact);

router.post('/contacts', contactController.createContact);

router.put('/contacts/:id', contactController.updateContact);

router.delete('/contacts/:id', contactController.deleteContact);

module.exports = router;
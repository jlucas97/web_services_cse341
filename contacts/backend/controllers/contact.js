const e = require('express');
const mongoDB = require('../data/database');
const {ObjectId} = require('mongodb');


const getAllContacts = async (req, res) => {
  // #swagger.tags = ['Contacts']
    const contacts = await mongoDB
      .getDb()
      .collection('contacts')
      .find({})
      .toArray();

    res.status(200).json(contacts);
};

const getContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
    const {id} = req.params;

    const contact = await mongoDB
      .getDb()
      .collection('contacts')
      .findOne({ _id: new ObjectId(id) });

     res.status(200).json(contact)
};

const createContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongoDB
      .getDb()
      .collection('contacts')
      .insertOne(contact);
      if (response.acknowledged) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
      }
};

const updateContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongoDB
      .getDb()
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
      }
};

const deleteContact = async (req, res) => {
  // #swagger.tags = ['Contacts']
    const contactId = new ObjectId(req.params.id);
    
    const response = await mongoDB
      .getDb()
      .collection('contacts')
      .deleteOne({ _id: contactId }, true);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
      }
};


module.exports = {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};
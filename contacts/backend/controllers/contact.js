const mongoDB = require('../data/database');
const {ObjectId} = require('mongodb');


const getAllContacts = async (req, res) => {
    const contacts = await mongoDB
      .getDb()
      .collection('contacts')
      .find({})
      .toArray();

    res.status(200).json(contacts);
};

const getContact = async (req, res) => {
    const {id} = req.params;

    const contact = await mongoDB
      .getDb()
      .collection('contacts')
      .findOne({ _id: new ObjectId(id) });

     res.status(200).json(contact); 
}

module.exports = {
    getAllContacts,
    getContact
};
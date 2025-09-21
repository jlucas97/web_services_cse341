const e = require('express');
const mongoDB = require('../data/database');
const {ObjectId} = require('mongodb');


const getAllCountries = async (req, res) => {
  // #swagger.tags = ['Countries']
    const countries = await mongoDB
      .getDb()
      .collection('countries_of_america')
      .find({})
      .toArray((err, lists) => {
          if (err) {
              res.status(400).json({ message: 'An error occurred while fetching countries.' });
          }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
          });
    };  

const getCountry = async (req, res) => {
  // #swagger.tags = ['Countries']
    const {id} = req.params;

    const country = await mongoDB
      .getDb()
      .collection('countries_of_america')
      .findOne({ _id: new ObjectId(id) })
      .toArray((err, lists) => {
          if (err) {
              res.status(400).json({ message: 'An error occurred while fetching countries.' });
          }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
          });

     res.status(200).json(country)
};

const createCountry = async (req, res) => {
  // #swagger.tags = ['Countries']
 
    const country ={
        name: req.body.name,
        capital: req.body.capital,
        region: req.body.region,
        population: body.population,
        areaKm2: body.areaKm2
    }

    const response = await mongoDB
      .getDb()
      .collection('countries_of_america')
      .insertOne(country);
      if (response.acknowledged) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the country.');
      }
};

const updateCountry = async (req, res) => {
  // #swagger.tags = ['Countries']
   if(!ObjectId.isValid(req.params.id)){
    res.status(400).json('Must use a valid country id to update a country.');
  }
    const countryId = new ObjectId(req.params.id);
    const country = {
        name: req.body.name,
        capital: req.body.capital,
        region: req.body.region,
        population: body.population,
        areaKm2: body.areaKm2
    };

    const response = await mongoDB
      .getDb()
      .collection('countries_of_america')
      .replaceOne({ _id: countryId }, country);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the country.');
      }
};

const deleteCountry = async (req, res) => {
  // #swagger.tags = ['Countries']
   if(!ObjectId.isValid(req.params.id)){
    res.status(400).json('Must use a valid country id to delete a country.');
  }
    const countryId = new ObjectId(req.params.id);
    
    const response = await mongoDB
      .getDb()
      .collection('countries_of_america')
      .deleteOne({ _id: countryId }, true);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the country.');
      }
};


module.exports = {
    getAllCountries,
    getCountry,
    createCountry,
    updateCountry,
    deleteCountry
};
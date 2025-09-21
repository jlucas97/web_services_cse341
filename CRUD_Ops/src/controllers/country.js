const mongoDB = require('../data/database');
const { ObjectId } = require('mongodb');

const getAllCountries = async (req, res) => {
  // #swagger.tags = ['Countries']
  try {
    const countries = await mongoDB
      .getDb()
      .collection('countries_of_america')
      .find({})
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(countries);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while fetching countries.' });
  }
};

const getCountry = async (req, res) => {
  // #swagger.tags = ['Countries']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid country id to fetch a country.');
    }

    const countryId = new ObjectId(req.params.id);
    const country = await mongoDB
      .getDb()
      .collection('countries_of_america')
      .findOne({ _id: countryId });

    if (!country) {
      return res.status(404).json({ message: 'Country not found.' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(country);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while fetching the country.' });
  }
};

const createCountry = async (req, res) => {
  // #swagger.tags = ['Countries']
  /* #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: { $name: "Costa Rica", $capital: "San José", $region: "Central America", population: 5000000, areaKm2: 51100 }
  } */
  try {
    const country = {
      name: req.body.name,
      capital: req.body.capital,
      region: req.body.region,
      population: req.body.population,
      areaKm2: req.body.areaKm2,
    };

    const response = await mongoDB
      .getDb()
      .collection('countries_of_america')
      .insertOne(country);

    if (response.acknowledged) {
      res.status(201).json({ message: 'Country created successfully.', id: response.insertedId });
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the country.');
    }
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while creating the country.' });
  }
};

const updateCountry = async (req, res) => {
  // #swagger.tags = ['Countries']
  /* #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: { $name: "Costa Rica", $capital: "San José", $region: "Central America", population: 5000000, areaKm2: 51100 }
  } */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid country id to update a country.');
    }

    const countryId = new ObjectId(req.params.id);
    const country = {
      name: req.body.name,
      capital: req.body.capital,
      region: req.body.region,
      population: req.body.population,
      areaKm2: req.body.areaKm2,
    };

    const response = await mongoDB
      .getDb()
      .collection('countries_of_america')
      .replaceOne({ _id: countryId }, country);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Country not found or no changes made.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while updating the country.' });
  }
};

const deleteCountry = async (req, res) => {
  // #swagger.tags = ['Countries']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid country id to delete a country.');
    }

    const countryId = new ObjectId(req.params.id);
    const response = await mongoDB
      .getDb()
      .collection('countries_of_america')
      .deleteOne({ _id: countryId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Country not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while deleting the country.' });
  }
};

module.exports = {
  getAllCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
};

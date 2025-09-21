const Validator = require('validatorjs');

const saveCountry = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    capital: 'required|string',
    region: 'required|string',
    population: 'integer',  
    areaKm2: 'numeric'      
  };

  const validation = new Validator(req.body, validationRule);

  if (validation.fails()) {
    return res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: validation.errors.all(),
    });
  }

  next();
};

const saveSong = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    artist: 'required|string',
    album: 'required|string',
    releaseYear: 'integer', 
    genre: 'string'        
  };

  const validation = new Validator(req.body, validationRule);

  if (validation.fails()) {
    return res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: validation.errors.all(),
    });
  }

  next();
};

module.exports = {
  saveCountry,
  saveSong,
};

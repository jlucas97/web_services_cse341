const validator = require('validator');

const saveCountry = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        capital: 'required|string',
        region: 'required|string'
    }

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }   
    });
}

const saveSong = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        artist: 'required|string',
        album: 'required|string',
    }

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }   
    });
}


module.exports = {
    saveCountry,
    saveSong
};
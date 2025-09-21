const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API',
        description: 'API for countries and songs',
    },
    host: 'https://web-services-contacts.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

//This will generate your swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);

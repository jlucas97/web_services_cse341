const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./backend/routes/index.js'];

//This will generate your swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);

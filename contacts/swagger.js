const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts'
    },
    host: 'web-services-contacts.onrender.com',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./backend/routes/index.js'];

//This will generate your swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

app.use(express.static('dist'));

app.use(require('./middleware/authentication-filter'))

app.use(express.json());
app.use('/user', require('./routes/user'));
app.use('/cook', require('./routes/cook'));
app.use('/patient', require('./routes/patient'));
app.use('/admin', require('./routes/admin'));



const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe Of Hope API with Swagger',
      version: '0.1.0',
      description: "Recipe Of Hope's Website",
      contact: {
        name: 'Tarun Sharma',
        email: 'tsharma2@illinois.edu',
      },
    },
    servers: [
      {
        url: 'https://recipeofhope.herokuapp.com/',
      },
    ],
  },
  apis: [
    './routes/user/index.js',
    './routes/admin/index.js',
    './routes/cook/index.js',
    './routes/patient/index.js',
  ],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

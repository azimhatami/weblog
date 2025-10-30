import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weblog API',
      version: '1.0.0',
      description: 'API documentation for weblog project',
      contact: {
        name: 'Azim Hatami',
        email: 'azimhatami.dev@gmail.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Development server'
      }
    ],
  },
  apis: ['src/swagger/*.swagger.ts']
};

// Generate Swagger specs
const specs = swaggerJsdoc(options);

// Create a route to serve the Swagger UI
export const setupSwagger = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log(`Swagger documentation is available at http://localhost:${process.env.PORT}/docs`);
};


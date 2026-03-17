import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fin-Back API',
      version: '1.0.0',
      description: 'API para organizador de finanças pessoais com processamento de NFe',
      contact: {
        name: 'Willian',
        email: 'contato@example.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      },
      {
        url: 'https://api.production.com',
        description: 'Servidor de Produção'
      }
    ],
    tags: [
      {
        name: 'Health',
        description: 'Endpoints de verificação de saúde da API'
      },
      {
        name: 'Order',
        description: 'Endpoints de processamento de pedidos e NFe'
      }
    ]
  },
  apis: ['./src/server/**/*.routes.js'] // Caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };

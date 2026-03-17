import path from 'node:path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import type { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fin-Back API',
      version: '1.0.0',
      description: 'API para organizador de financas pessoais com processamento de NFe',
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
        description: 'Servidor de Producao'
      }
    ],
    tags: [
      {
        name: 'Health',
        description: 'Endpoints de verificacao de saude da API'
      },
      {
        name: 'Order',
        description: 'Endpoints de processamento de pedidos e NFe'
      }
    ]
  },
  apis: [
    path.resolve(process.cwd(), 'src/server/**/*.routes.ts'),
    path.resolve(process.cwd(), 'dist/src/server/**/*.routes.js')
  ]
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };
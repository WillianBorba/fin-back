import express from 'express';
import routes from './src/server/routes.js';
import { swaggerUi, swaggerSpec } from './src/config/swagger.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Registrar rotas
app.use(routes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Acesse: http://localhost:${PORT}`);
  console.log(`📚 Documentação: http://localhost:${PORT}/api-docs`);
});

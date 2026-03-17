import express from 'express';
import routes from './src/server/routes.js';
import { swaggerSpec, swaggerUi } from './src/config/swagger.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acesse: http://localhost:${port}`);
  console.log(`Documentacao: http://localhost:${port}/api-docs`);
});
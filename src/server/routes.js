import express from 'express';
import healthRoutes from './health/health.routes.js';
import orderRoutes from './order/order.routes.js';

const router = express.Router();

// Registra todas as rotas com prefixos
router.use('/health', healthRoutes);
router.use('/order', orderRoutes);

export default router;
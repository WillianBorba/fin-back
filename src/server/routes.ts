import { Router } from 'express';
import healthRoutes from './health/health.routes.js';
import orderRoutes from './order/order.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/order', orderRoutes);

export default router;
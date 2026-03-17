import express from 'express';
import orderBusiness from '../../business/order.business.js';

const router = express.Router();

// Rota de health check
router.get('/json', async (req, res) => {
  const filePath = './NFe35250201937635002983550570006780591052004710.xml';
  const result = await orderBusiness.processNFe(filePath);
  res.json(result);
});

export default router;
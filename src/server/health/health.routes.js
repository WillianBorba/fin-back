import express from 'express';

const router = express.Router();

// Rota de health check
router.get('', (req, res) => {
  res.json({ status: 'healthy' });
});

export default router;
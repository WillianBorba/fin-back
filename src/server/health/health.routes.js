import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica o status da API
 *     description: Retorna o status de saúde da aplicação
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API está funcionando corretamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 */
router.get('', (req, res) => {
  res.json({ status: 'healthy' });
});

export default router;
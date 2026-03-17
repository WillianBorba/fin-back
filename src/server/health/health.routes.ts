import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica o status da API
 *     description: Retorna o status de saude da aplicacao
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API esta funcionando corretamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 */
router.get('', (_req, res) => {
  res.json({ status: 'healthy' });
});

export default router;
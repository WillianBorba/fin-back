import express from 'express';
import { processNFe } from '../../business/order.business.js';

const router = express.Router();

/**
 * @swagger
 * /order/json:
 *   get:
 *     summary: Processa arquivo XML de NFe e retorna JSON
 *     description: Lê um arquivo XML de Nota Fiscal Eletrônica e retorna os dados estruturados em JSON
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: NFe processada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     nota:
 *                       type: object
 *                       properties:
 *                         numero:
 *                           type: string
 *                           example: "678059"
 *                         serie:
 *                           type: string
 *                           example: "57"
 *                         dataEmissao:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-02-04T20:45:55-03:00"
 *                         chaveAcesso:
 *                           type: string
 *                           example: "35250201937635002983550570006780591052004710"
 *                     emitente:
 *                       type: object
 *                       properties:
 *                         cnpj:
 *                           type: string
 *                           example: "01937635002983"
 *                         nome:
 *                           type: string
 *                           example: "SONDA SUPERMERCADOS EXP.E IMP.S.A"
 *                         endereco:
 *                           type: object
 *                     destinatario:
 *                       type: object
 *                       properties:
 *                         cpf:
 *                           type: string
 *                           example: "10260457973"
 *                         nome:
 *                           type: string
 *                           example: "WILLIAN"
 *                         endereco:
 *                           type: object
 *                     produtos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           codigo:
 *                             type: string
 *                             example: "000000001000005290"
 *                           descricao:
 *                             type: string
 *                             example: "BISCOITO PASSAT.RECH.CHOC.130g"
 *                           quantidade:
 *                             type: number
 *                             example: 1
 *                           valorUnitario:
 *                             type: number
 *                             example: 3.62
 *                           valorTotal:
 *                             type: number
 *                             example: 3.62
 *                     totais:
 *                       type: object
 *                       properties:
 *                         valorProdutos:
 *                           type: number
 *                           example: 182.24
 *                         valorFrete:
 *                           type: number
 *                           example: 14.90
 *                         valorTotal:
 *                           type: number
 *                           example: 197.14
 *       500:
 *         description: Erro ao processar NFe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Erro ao parsear XML: ..."
 */
router.get('/json', async (req, res) => {
  const filePath = './NFe35250201937635002983550570006780591052004710.xml';
  const result = await processNFe(filePath);
  res.json(result);
});

export default router;
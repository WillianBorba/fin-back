import { XMLParser } from 'fast-xml-parser';
import fs from 'fs/promises';

/**
 * Configuração do parser XML
 */
const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  parseAttributeValue: true,
  trimValues: true
};

const parser = new XMLParser(parserOptions);

/**
 * Lê e parseia um arquivo XML de NFe
 * @param {string} filePath - Caminho do arquivo XML
 * @returns {Promise<Object>} - Objeto JSON com os dados da NFe
 */
export async function parseNFeXML(filePath) {
  try {
    // Lê o arquivo XML
    const xmlData = await fs.readFile(filePath, 'utf-8');
    
    // Converte XML para JSON
    const jsonData = parser.parse(xmlData);
    
    return jsonData;
  } catch (error) {
    throw new Error(`Erro ao parsear XML: ${error.message}`);
  }
}

/**
 * Extrai informações resumidas da NFe
 * @param {Object} nfeJson - Objeto JSON da NFe parseada
 * @returns {Object} - Dados resumidos da nota fiscal
 */
export function extractNFeInfo(nfeJson) {
  try {
    const nfe = nfeJson.nfeProc?.NFe?.infNFe;
    
    if (!nfe) {
      throw new Error('Estrutura de NFe inválida');
    }

    // Informações da nota
    const ide = nfe.ide;
    const emit = nfe.emit;
    const dest = nfe.dest;
    const total = nfe.total?.ICMSTot;
    const items = Array.isArray(nfe.det) ? nfe.det : [nfe.det];

    return {
      nota: {
        numero: ide.nNF,
        serie: ide.serie,
        dataEmissao: ide.dhEmi,
        modelo: ide.mod,
        chaveAcesso: nfe['@_Id']?.replace('NFe', '')
      },
      emitente: {
        cnpj: emit.CNPJ,
        nome: emit.xNome,
        endereco: {
          logradouro: emit.enderEmit?.xLgr,
          numero: emit.enderEmit?.nro,
          bairro: emit.enderEmit?.xBairro,
          cidade: emit.enderEmit?.xMun,
          uf: emit.enderEmit?.UF,
          cep: emit.enderEmit?.CEP
        }
      },
      destinatario: {
        cpf: dest.CPF || dest.CNPJ,
        nome: dest.xNome,
        endereco: {
          logradouro: dest.enderDest?.xLgr,
          numero: dest.enderDest?.nro,
          complemento: dest.enderDest?.xCpl,
          bairro: dest.enderDest?.xBairro,
          cidade: dest.enderDest?.xMun,
          uf: dest.enderDest?.UF,
          cep: dest.enderDest?.CEP
        }
      },
      produtos: items.map(item => ({
        codigo: item.prod.cProd,
        descricao: item.prod.xProd,
        ean: item.prod.cEAN,
        ncm: item.prod.NCM,
        quantidade: parseFloat(item.prod.qCom),
        unidade: item.prod.uCom,
        valorUnitario: parseFloat(item.prod.vUnCom),
        valorTotal: parseFloat(item.prod.vProd)
      })),
      totais: {
        valorProdutos: parseFloat(total.vProd),
        valorFrete: parseFloat(total.vFrete),
        valorDesconto: parseFloat(total.vDesc),
        valorTotal: parseFloat(total.vNF),
        valorICMS: parseFloat(total.vICMS),
        valorPIS: parseFloat(total.vPIS),
        valorCOFINS: parseFloat(total.vCOFINS)
      }
    };
  } catch (error) {
    throw new Error(`Erro ao extrair informações da NFe: ${error.message}`);
  }
}

/**
 * Processa um arquivo NFe e retorna dados formatados
 * @param {string} filePath - Caminho do arquivo XML
 * @returns {Promise<Object>} - Dados processados da NFe
 */
export async function processNFe(filePath) {
  try {
    // Parseia o XML
    const nfeJson = await parseNFeXML(filePath);
    
    // Extrai informações
    const nfeInfo = extractNFeInfo(nfeJson);
    
    return {
      success: true,
      data: nfeInfo
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

export default {
  processNFe
};

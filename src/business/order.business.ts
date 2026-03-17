import { XMLParser } from 'fast-xml-parser';
import fs from 'node:fs/promises';

interface ParsedNFeProduct {
  prod: {
    cProd: string;
    xProd: string;
    cEAN?: string;
    NCM?: string;
    qCom: number | string;
    uCom?: string;
    vUnCom: number | string;
    vProd: number | string;
  };
}

interface ParsedNFeAddress {
  xLgr?: string;
  nro?: string;
  xCpl?: string;
  xBairro?: string;
  xMun?: string;
  UF?: string;
  CEP?: string;
}

interface ParsedNFeInfo {
  '@_Id'?: string;
  ide: {
    nNF: string;
    serie: string;
    dhEmi: string;
    mod: string;
  };
  emit: {
    CNPJ?: string;
    xNome: string;
    enderEmit?: ParsedNFeAddress;
  };
  dest: {
    CPF?: string;
    CNPJ?: string;
    xNome: string;
    enderDest?: ParsedNFeAddress;
  };
  total?: {
    ICMSTot?: {
      vProd?: number | string;
      vFrete?: number | string;
      vDesc?: number | string;
      vNF?: number | string;
      vICMS?: number | string;
      vPIS?: number | string;
      vCOFINS?: number | string;
    };
  };
  det: ParsedNFeProduct | ParsedNFeProduct[];
}

interface ParsedNFeDocument {
  nfeProc?: {
    NFe?: {
      infNFe?: ParsedNFeInfo;
    };
  };
}

export interface NFeSummary {
  nota: {
    numero: string;
    serie: string;
    dataEmissao: string;
    modelo: string;
    chaveAcesso: string;
  };
  emitente: {
    cnpj?: string;
    nome: string;
    endereco: {
      logradouro?: string;
      numero?: string;
      bairro?: string;
      cidade?: string;
      uf?: string;
      cep?: string;
    };
  };
  destinatario: {
    cpf?: string;
    nome: string;
    endereco: {
      logradouro?: string;
      numero?: string;
      complemento?: string;
      bairro?: string;
      cidade?: string;
      uf?: string;
      cep?: string;
    };
  };
  produtos: Array<{
    codigo: string;
    descricao: string;
    ean?: string;
    ncm?: string;
    quantidade: number;
    unidade?: string;
    valorUnitario: number;
    valorTotal: number;
  }>;
  totais: {
    valorProdutos: number;
    valorFrete: number;
    valorDesconto: number;
    valorTotal: number;
    valorICMS: number;
    valorPIS: number;
    valorCOFINS: number;
  };
}

export interface ProcessNFeResult {
  success: boolean;
  data?: NFeSummary;
  error?: string;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  parseAttributeValue: true,
  trimValues: true
});

function toNumber(value: number | string | undefined): number {
  return Number(value ?? 0);
}

export async function parseNFeXML(filePath: string): Promise<ParsedNFeDocument> {
  try {
    const xmlData = await fs.readFile(filePath, 'utf-8');
    return parser.parse(xmlData) as ParsedNFeDocument;
  } catch (error) {
    throw new Error(`Erro ao parsear XML: ${(error as Error).message}`);
  }
}

export function extractNFeInfo(nfeJson: ParsedNFeDocument): NFeSummary {
  try {
    const nfe = nfeJson.nfeProc?.NFe?.infNFe;

    if (!nfe) {
      throw new Error('Estrutura de NFe invalida');
    }

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
        chaveAcesso: nfe['@_Id']?.replace('NFe', '') ?? ''
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
      produtos: items.map((item) => ({
        codigo: item.prod.cProd,
        descricao: item.prod.xProd,
        ean: item.prod.cEAN,
        ncm: item.prod.NCM,
        quantidade: toNumber(item.prod.qCom),
        unidade: item.prod.uCom,
        valorUnitario: toNumber(item.prod.vUnCom),
        valorTotal: toNumber(item.prod.vProd)
      })),
      totais: {
        valorProdutos: toNumber(total?.vProd),
        valorFrete: toNumber(total?.vFrete),
        valorDesconto: toNumber(total?.vDesc),
        valorTotal: toNumber(total?.vNF),
        valorICMS: toNumber(total?.vICMS),
        valorPIS: toNumber(total?.vPIS),
        valorCOFINS: toNumber(total?.vCOFINS)
      }
    };
  } catch (error) {
    throw new Error(`Erro ao extrair informacoes da NFe: ${(error as Error).message}`);
  }
}

export async function processNFe(filePath: string): Promise<ProcessNFeResult> {
  try {
    const nfeJson = await parseNFeXML(filePath);
    const nfeInfo = extractNFeInfo(nfeJson);

    return {
      success: true,
      data: nfeInfo
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message
    };
  }
}
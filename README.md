# 💰 Fin-Back - API de Organizador de Finanças

API backend para organizador de finanças pessoais com suporte para processamento de notas fiscais eletrônicas (NFe).

## 🚀 Tecnologias

- **Node.js** v22
- **TypeScript** - Tipagem estática e compilação para JavaScript
- **Express** - Framework web minimalista
- **fast-xml-parser** - Parser de XML para JSON
- **Swagger** - Documentação de API

## 📋 Pré-requisitos

- Node.js v22 ou superior
- npm ou yarn

## 🔧 Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd fin-back

# Instale as dependências
npm install
```

## ▶️ Executando o Projeto

### Modo Desenvolvimento (com auto-reload)
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Modo Produção
```bash
npm start
```

O servidor estará disponível em: `http://localhost:3000`

## 📚 Documentação da API

A documentação interativa está disponível via Swagger UI:

```
http://localhost:3000/api-docs
```

## 🛣️ Rotas Disponíveis

### Health Check
- **GET** `/health` - Verifica se a API está funcionando

### Processamento de NFe
- **GET** `/order/json` - Processa arquivo XML da NFe e retorna JSON formatado

## 📁 Estrutura do Projeto

```
fin-back/
├── src/
│   ├── business/           # Lógica de negócio
│   │   └── order.business.ts
│   ├── config/             # Configurações da aplicação
│   │   └── swagger.ts
│   ├── model/              # Modelos e contratos de domínio
│   │   └── store.ts
│   └── server/             # Configuração do servidor
│       ├── routes.ts       # Centralizador de rotas
│       ├── health/         # Rotas de health check
│       │   └── health.routes.ts
│       └── order/          # Rotas de pedidos/NFe
│           └── order.routes.ts
├── dist/                   # Saída compilada do TypeScript
├── index.ts                # Entry point da aplicação
├── package.json
├── tsconfig.json
└── README.md
```

## 🔍 Funcionalidades

### Processamento de NFe (Nota Fiscal Eletrônica)

A API é capaz de processar arquivos XML de NFe e extrair informações relevantes:

- Dados da nota fiscal
- Informações do emitente
- Dados do destinatário
- Lista de produtos
- Totais e impostos

**Exemplo de resposta:**

```json
{
  "success": true,
  "data": {
    "nota": {
      "numero": "678059",
      "serie": "57",
      "dataEmissao": "2025-02-04T20:45:55-03:00",
      "chaveAcesso": "35250201937635002983550570006780591052004710"
    },
    "emitente": {
      "cnpj": "01937635002983",
      "nome": "SONDA SUPERMERCADOS EXP.E IMP.S.A"
    },
    "produtos": [...],
    "totais": {
      "valorProdutos": 182.24,
      "valorTotal": 197.14
    }
  }
}
```

## 🛠️ Scripts Disponíveis

- `npm run build` - Compila o projeto TypeScript para `dist`
- `npm start` - Inicia o servidor compilado em modo produção
- `npm run dev` - Inicia o servidor com reload automático usando `tsx`

## 🌐 Variáveis de Ambiente

- `PORT` - Porta do servidor (padrão: 3000)

## 📝 Próximos Passos

- [ ] Implementar upload de arquivos XML
- [ ] Adicionar validação de dados
- [ ] Implementar autenticação
- [ ] Adicionar banco de dados
- [ ] Criar testes unitários
- [ ] Implementar logs estruturados

## 📄 Licença

ISC

## 👥 Autor

Willian

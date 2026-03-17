function normalizeText(value: string): string {
  return value.trim();
}

export interface StoreData {
  nome: string;
  uf: string;
  endereco: string;
  bairro: string;
}

export class Store {
  nome: string;
  uf: string;
  endereco: string;
  bairro: string;

  constructor({ nome, uf, endereco, bairro }: StoreData) {
    this.nome = normalizeText(nome);
    this.uf = normalizeText(uf).toUpperCase();
    this.endereco = normalizeText(endereco);
    this.bairro = normalizeText(bairro);
  }

  isValid(): boolean {
    return Boolean(this.nome && this.uf && this.endereco && this.bairro);
  }

  toJSON(): StoreData {
    return {
      nome: this.nome,
      uf: this.uf,
      endereco: this.endereco,
      bairro: this.bairro
    };
  }
}

export function createStore(data: StoreData): Store {
  const store = new Store(data);

  if (!store.isValid()) {
    throw new Error('Os campos nome, uf, endereco e bairro sao obrigatorios para store');
  }

  return store;
}
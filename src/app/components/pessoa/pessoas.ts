export class Pessoas{
  id!: number;
  nome!: string;
  cpforcnpj!: string;
  endereco!: string;
  numero!: string;
  bairro!: string;
  complemento!:String;
  cep!: string;
  cidadeId!: number;
  uf!: string;
  telefone!: string;
  email!: string;
}

export class Content{
  content: Array<Pessoas> = [];
}

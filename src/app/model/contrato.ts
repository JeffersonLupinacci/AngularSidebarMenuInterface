import { EnderecoContrato } from './enderecoContrato';
import { Entidade } from './entidade';

export interface Contrato extends Entidade {
  fantasia: string;
  razaoSocial: string;
  cnpj: string;
  email: string;
  endereco: EnderecoContrato;
  ativo: boolean;
  dataRegistro: Date;
  aliases: string;
}




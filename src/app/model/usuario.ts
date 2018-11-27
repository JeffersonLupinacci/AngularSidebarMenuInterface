import { Contrato } from './contrato';
import { Entidade } from './entidade';
import { Permissao } from './permissao';

export interface Usuario extends Entidade {
  nome: string;
  email: string;
  permissoes: Permissao[];
  contrato: any;
}




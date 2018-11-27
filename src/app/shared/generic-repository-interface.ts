import { PaginationData, FilterData } from '../shared/pagination';
import { Entidade } from '../model/entidade';

export interface IGenericRepository<T extends Entidade> {

  onDataGridLoad(pagination: PaginationData, filter: FilterData): Promise<any>;

  onRecupera(codigo: Number): Promise<T>;

  onRemover(entidade: T): Promise<void>;

  onPersiste(entidade: T): Promise<any>;

  onAtualiza(entidade: T): Promise<any>;

  onCadastra(entidade: T): Promise<any>;

}

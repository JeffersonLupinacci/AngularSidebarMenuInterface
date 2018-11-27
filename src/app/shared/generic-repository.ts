import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

import { IGenericRepository } from './generic-repository-interface';
import { FilterData, PaginationData } from '../shared/pagination';
import { MessagesService } from './../shared/messages.service';
import { Entidade } from '../model/entidade';
import { Injectable } from '@angular/core';
import { RestResult } from '../model/restresult';

@Injectable()
export abstract class GenericRepository<T extends Entidade> implements IGenericRepository<T> {

  constructor(
    protected http: AuthHttp,
    protected messageService: MessagesService) { }

  abstract getUrl(): string;

  onDataGridLoad(pagination: PaginationData, filter: FilterData): Promise<RestResult> {
    const url = `${this.getUrl()}/?${pagination.getParams()}&${filter.getParams()}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return (response) ? response.json() : Promise.resolve('');
      }).catch(erro => {
        return this.messageService.setResponseError(erro);
      });
  }

  onRecupera(codigo: Number): Promise<T> {
    return this.http.get(`${this.getUrl()}/${codigo}`)
      .toPromise()
      .then(response => {
        return (response) ? response.json() : Promise.resolve('');
      }).catch(erro => {
        return this.messageService.setResponseError(erro);
      });
  }

  onRemover(entidade: T): Promise<void> {
    return this.http.delete(`${this.getUrl()}/${entidade.codigo}`)
      .toPromise()
      .then(() => {
        this.messageService.setInformation(`Registro removido com sucesso.`);
      }
      ).catch(erro => {
        return this.messageService.setResponseError(erro);
      });
  }

  onPersiste(entidade: T): Promise<any> {
    if (entidade.codigo) {
      return this.onAtualiza(entidade);
    } else {
      return this.onCadastra(entidade);
    }
  }

  onAtualiza(entidade: T): Promise<any> {
    return this.http.put(`${this.getUrl()}/${entidade.codigo}`, entidade)
      .toPromise()
      .then(() => {
        this.messageService.setInformation(`Registro Atualizado com sucesso.`);
      }
      ).catch(erro => {
        return this.messageService.setResponseError(erro);
      });
  }

  onCadastra(entidade: T): Promise<any> {
    return this.http.post(`${this.getUrl()}/`, entidade)
      .toPromise()
      .then(() => {
        this.messageService.setInformation(`Registro adicionado com sucesso.`);
      }
      ).catch(erro => {
        return this.messageService.setResponseError(erro);
      });
  }

}

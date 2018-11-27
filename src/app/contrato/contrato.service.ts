import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { Contrato } from '../model/contrato';
import { GenericRepository } from './../shared/generic-repository';
import { Global } from '../shared/global';

@Injectable()
export class ContratoService extends GenericRepository<Contrato> {

  getUrl(): string {
    return `${Global.DOMAIN}/softhouse/contratos`;
  }

  onAlteraStatus(contrato: Contrato): Promise<void> {
    return this.http.put(`${this.getUrl()}/${contrato.codigo}/ativo`, !contrato.ativo)
      .toPromise()
      .then(() => {
        this.messageService.setInformation(`Status do contrato alterado com sucesso.`);
      }
      ).catch(erro => {
        return this.messageService.setResponseError(erro);
      });
  }

  findBy(field: string, val: string): Promise<any> {
    return this.http.get(`${this.getUrl()}/findBy?${field}=${val}`)
      .toPromise()
      .then(response => {
        return (response) ? response.json() : Promise.resolve('');
      }).catch(erro => {
        return this.messageService.setResponseError(erro);
      });
  }

}

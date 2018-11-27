import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { Usuario } from '../model/usuario';
import { GenericRepository } from './../shared/generic-repository';
import { Global } from '../shared/global';
import { Permissao } from '../model/permissao';

@Injectable()
export class UsuarioService extends GenericRepository<Usuario> {

  getUrl(): string {
    return `${Global.DOMAIN}/usuarios`;
  }

  onRecuperaPermissoes(): Promise<Permissao[]> {
    const url = `${this.getUrl()}/permissoes/`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return (response) ? response.json() : Promise.resolve('er');
      }).catch(erro => {
        return this.messageService.setResponseError(erro);
      });
  }

}

import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessagesService {

  constructor(private toasty: ToastyService) { }

  setResponseError(erro: any): Promise<any> {
    let msgPersonalizada = false;
    if (typeof erro === 'string') {
      this.toasty.info(erro);
    } else if (erro instanceof Response) {
      try {
        const body = erro.json();
        if (body) {
          for (const ex of body) {
            if (ex.usuario) {
              msgPersonalizada = true;
              this.toasty.error(ex.usuario);
              console.log(ex.desenvolvedor);
            }
          }
          if (!msgPersonalizada) {
            this.showError(erro);
          }
        }
      } catch (ex) {
        this.showException(ex);
      }
    }
    return Promise.reject(erro);
  }

  showException(ex) {
    this.toasty.error('[Exception]' + ex);
  }

  showError(erro) {
    if (erro.status === 0) {
      this.toasty.error('[000] Falha de conexão com servidor de autenticação.');
    } else if (erro.status === 400) {
      this.toasty.error('[400] Solicitação Imprópria.');
    } else if (erro.status === 401) {
      this.toasty.error('[401] Credenciais inválidas com o servidor.');
    } else if (erro.status === 403) {
      this.toasty.error('[403] Permissão negada para esta ação.');
    } else if (erro.status === 404) {
      this.toasty.error('[404] Recurso não encontrado no servidor.');
    } else if (erro.status === 500) {
      this.toasty.error('[500] Ocorreu uma falha no servidor.');
    } else {
      this.toasty.error(erro);
    }
  }

  setInformation(information: string): Promise<any> {
    this.toasty.info(information);
    return null;
  }

  mensagemErroLogin(erro: any): Promise<any> {
    let msg = '';
    if (erro.status === 0) {
      msg = 'Falha de conexão com servidor de autenticação.';
    } else if (erro.status === 401) {
      msg = 'Credenciais inválidas com o servidor.';
    } else if (erro.status === 400) {
      msg = 'Usuário ou senha inválidos.';
    } else if (erro.status === 403) {
      msg = 'Permissão negada para esta ação.';
    } else if (erro.status === 500) {
      msg = 'Ocorreu uma falha no servidor.';
    } else if (erro) {
      const e = erro.json();
      msg = e.error_description;
    }
    return Promise.reject(msg);
  }

}

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { Global } from '../shared/global';
import { JwtHelper } from 'angular2-jwt';
import { MessagesService } from '../shared/messages.service';

@Injectable()
export class AuthService {

  jwtPayload: any;
  logged: Boolean = false;

  // TODO: Alterar em produção, usando em testes o refresh token dentro da aplicação
  refresh_token: any;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper,
    private router: Router,
    private messagesService: MessagesService) {
    this.loadStoredToken();
  }

  loadStoredToken() {
    const stored = localStorage.getItem('token');
    if (stored) {
      this.decodeAndStoreToken(stored);
    }

    // TODO: Alterar em produção, usando em testes o refresh token dentro da aplicação
    const storedRefresh = localStorage.getItem('refresh_token');
    if (storedRefresh) {
      this.storeRefreshToken(stored);
    }
  }

  decodeAndStoreToken(token: string) {
    this.logged = true;
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  // TODO: Alterar em produção, usando em testes o refresh token dentro da aplicação
  storeRefreshToken(token: string) {
    this.refresh_token = token;
    localStorage.setItem('refresh_token', token);
  }

  validAuthorities(perm: string) {
    return this.jwtPayload &&
      this.jwtPayload.authorities &&
      this.jwtPayload.authorities.includes(perm);
  }

  getHeaders(): Headers {
    const h = new Headers();
    h.append('Authorization', Global.AUTHORIZATION);
    h.append('Content-Type', 'application/x-www-form-urlencoded');
    return h;
  }

  refreshToken(): Promise<any> {
    let body = `grant_type=refresh_token`;

    // TODO: Alterar em produção, usando em testes o refresh token dentro da aplicação
    body += `&refresh_token=${this.refresh_token}`;

    return this.http.post(Global.DOMAIN + '/oauth/token', body, { headers: this.getHeaders(), withCredentials: true })
      .toPromise()
      .then(response => {
        this.decodeAndStoreToken(response.json().access_token);

        // TODO: Alterar em produção, usando em testes o refresh token dentro da aplicação
        this.storeRefreshToken(response.json().refresh_token);

      }).catch(erro => {
        this.logged = false;
        return this.messagesService.mensagemErroLogin(erro);
      });
  }

  isTokenExpired() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  isLogged(): Boolean {
    if ((!this.jwtPayload) || this.isTokenExpired()) {
      this.logged = false;
    }
    return this.logged;
  }

  logout() {
    this.logged = false;
    this.jwtPayload = null;
    localStorage.removeItem('token');

    // TODO: Alterar em produção, usando em testes o refresh token dentro da aplicação
    localStorage.removeItem('refresh_token');

    this.router.navigate(['/login']);
  }

  login(params): Promise<any> {
    const body = `grant_type=password&username=${params.email}&password=${params.password}`;
    return this.http.post(Global.DOMAIN + '/oauth/token', body, { headers: this.getHeaders() })
      .toPromise()
      .then(response => {
        this.decodeAndStoreToken(response.json().access_token);

        // TODO: Alterar em produção, usando em testes o refresh token dentro da aplicação
        this.storeRefreshToken(response.json().refresh_token);

      }).catch(erro => {
        this.logged = false;
        return this.messagesService.mensagemErroLogin(erro);
      });
  }

}

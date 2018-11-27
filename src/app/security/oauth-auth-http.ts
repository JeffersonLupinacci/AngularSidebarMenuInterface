import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export class InvalidCredentialsException { }

@Injectable()
export class OauthAuthHttp extends AuthHttp {

  constructor(
    private auth: AuthService,
    private router: Router,
    options: AuthConfig,
    http: Http, defOpts?: RequestOptions,
  ) {
    super(options, http, defOpts);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.execute(() => super.delete(url, options));
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.execute(() => super.patch(url, options));
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.execute(() => super.head(url, options));
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.execute(() => super.options(url, options));
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.execute(() => super.get(url, options));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.execute(() => super.post(url, body, options));
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.execute(() => super.put(url, body, options));
  }

  private execute(fn: Function): Observable<Response> {
    if (this.auth.isTokenExpired()) {
      const getRefreshToken = this.auth.refreshToken()
        .then(() => {
          if (this.auth.isTokenExpired()) {
            throw new InvalidCredentialsException();
          }
          return fn().toPromise();
        }).catch(error => {
          this.router.navigate(['/login']);
        });
      return Observable.fromPromise(getRefreshToken);
    } else {
      return fn();
    }
  }
}

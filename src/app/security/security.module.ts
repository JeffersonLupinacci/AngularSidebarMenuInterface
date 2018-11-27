import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { JwtHelper, AuthHttp, AuthConfig } from 'angular2-jwt';

import { InputText } from 'primeng/components/inputtext/inputtext';

import { AppSharedModule } from '../shared/app-shared.module';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { SecurityRoutingModule } from './security-routing.module';
import { OauthAuthHttp } from './oauth-auth-http';

export function authHttpServiceFactory(auth: AuthService, router: Router, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ]
  });
  return new OauthAuthHttp(auth, router, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,

    SecurityRoutingModule,
    AppSharedModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [
    AuthService, JwtHelper,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [AuthService, Router, Http, RequestOptions]
    },
    AuthGuard
  ]

})
export class SecurityModule { }

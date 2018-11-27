import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreRoutingModule } from './core/core-routing.module';

import { LoginComponent } from './security/login/login.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { FullscreenLayoutComponent } from './shared/fullscreen-layout.component';

const appRoutes: Routes = [
  {
    path: '',
    component: FullscreenLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'not-found', component: NotfoundComponent }
    ]
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

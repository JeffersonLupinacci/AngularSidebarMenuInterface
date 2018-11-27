import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SecurityModule } from './security/security.module';
import { CoreModule } from './core/core.module';
import { ContratoModule } from './contrato/contrato.module';
import { UsuarioModule } from './usuario/usuario.module';

import { BreadcrumbService } from './shared/breadcrumb.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    ConfirmDialogModule,

    CoreModule,
    SecurityModule,
    ContratoModule,
    UsuarioModule,

    AppRoutingModule,
    ToastyModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  exports: [ToastyModule],
  providers: [ConfirmationService, BreadcrumbService]

})
export class AppModule { }

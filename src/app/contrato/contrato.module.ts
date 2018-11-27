import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';

import { SharedModule } from 'primeng/components/common/shared';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';

import { UserInterfaceComponent } from '../core/user-interface/user-interface.component';
import { AppSharedModule } from './../shared/app-shared.module';
import { AuthGuard } from '../security/auth.guard';
import { ContratoPesquisaComponent } from './contrato-pesquisa/contrato-pesquisa.component';
import { ContratoCadastroComponent } from './contrato-cadastro/contrato-cadastro.component';
import { ContratoService } from './contrato.service';

export const routes: Routes = [
  {
    path: '',
    component: UserInterfaceComponent,
    children: [
      {
        path: 'contratos',
        component: ContratoPesquisaComponent,
        canActivate: [AuthGuard],
        data: { permission: 'ROLE_CONTRATOS_P', title: 'Contratos' }
      },
      {
        path: 'contratos/novo',
        component: ContratoCadastroComponent,
        canActivate: [AuthGuard],
        data: { permission: 'ROLE_CONTRATOS_E', title: 'Novo Contrato' },
      },
      {
        path: 'contratos/:codigo',
        component: ContratoCadastroComponent,
        canActivate: [AuthGuard],
        data: { permission: 'ROLE_CONTRATOS_E', title: 'Editar Contrato' }
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    InputTextModule,
    InputMaskModule,
    DropdownModule,
    SharedModule,
    DataTableModule,
    TooltipModule,

    AppSharedModule
  ],
  declarations: [ContratoPesquisaComponent, ContratoCadastroComponent],
  providers: [ContratoService]
})

export class ContratoModule { }

import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';

import { SharedModule } from 'primeng/components/common/shared';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ListboxModule } from 'primeng/components/listbox/listbox';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';

import { UserInterfaceComponent } from '../core/user-interface/user-interface.component';
import { AppSharedModule } from './../shared/app-shared.module';
import { AuthGuard } from '../security/auth.guard';
import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioService } from './usuario.service';

export const routes: Routes = [
  {
    path: '',
    component: UserInterfaceComponent,
    children: [
      {
        path: 'usuarios',
        component: UsuarioPesquisaComponent,
        canActivate: [AuthGuard],
        data: { permission: 'ROLE_USUARIOS_P', title: 'Usuarios' }
      },
      {
        path: 'usuarios/novo',
        component: UsuarioCadastroComponent,
        canActivate: [AuthGuard],
        data: { permission: 'ROLE_USUARIOS_E', title: 'Novo Usuario' },
      },
      {
        path: 'usuarios/:codigo',
        component: UsuarioCadastroComponent,
        canActivate: [AuthGuard],
        data: { permission: 'ROLE_USUARIOS_E', title: 'Editar Usuario' }
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),

    InputTextModule,
    InputMaskModule,
    DropdownModule,
    SharedModule,
    DataTableModule,
    TooltipModule,
    ListboxModule,
    AutoCompleteModule,

    AppSharedModule
  ],
  declarations: [UsuarioPesquisaComponent, UsuarioCadastroComponent],
  providers: [UsuarioService]
})

export class UsuarioModule { }

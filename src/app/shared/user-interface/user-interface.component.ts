import { Component, OnInit } from '@angular/core';
import { UserItemMenu } from '../itemmenu';

import { BreadcrumbModule } from 'primeng/components/breadcrumb/breadcrumb';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})

export class UserInterfaceComponent {

  menu: UserItemMenu[] = null;
  toggle: Boolean = false;
  posicao_usuario: MenuItem[];

  toggleSidebar() {
    this.toggle = !this.toggle;
    localStorage.setItem('toggle', String(this.toggle));
  }

  constructor() {
    const v = localStorage.getItem('toggle');
    this.toggle = v === 'true' ? true : false;

    this.posicao_usuario = [
      { label: 'Pessoas' },
      { label: 'Pesquisa' }
    ];

    const m = [
      {
        'group': 'Favoritos',
        'expanded': false,
        'icon': 'fa fa-bookmark',
        'items': [{ 'name': 'Pessoas', 'icon': 'fa fa-bandcamp' },
        { 'name': 'Contas a receber', 'icon': 'fa fa-telegram' },
        { 'name': 'Delicia de parudez', 'icon': 'fa fa-table' },
        ]
      },
      {
        'group': 'Cadastros',
        'expanded': false,
        'icon': 'fa fa-bandcamp',
        'items': [
          { 'name': 'Pessoas', 'permissoes': ['EDITA', 'ALTERA'] },
          { 'name': 'Contratos' }]
      },

      {
        'group': 'Thiago',
        'expanded': true,
        'icon': 'fa fa-bandcamp',
        'items': [
          { 'name': 'Pessoa 1' },
          { 'name': 'Pessoa 2' }]
      },

      {
        'group': 'Quadradinho de 8',
        'expanded': false,
        'icon': 'fa fa-telegram',
        'items': [{ 'name': 'mulher' },
        { 'name': 'cerveja' },
        { 'name': 'salame' },
        { 'name': 'mulher' },
        { 'name': 'mais mulher' }]
      },

      {
        'group': 'Financeiro',
        'expanded': false,
        'icon': 'fa fa-telegram',
        'items': [{ 'id': 3, 'name': 'Contas a Pagar' },
        { 'id': 4, 'name': 'Contas a Receber' }]
      },
      {
        'group': 'Relatórios',
        'expanded': false,
        'icon': 'fa fa-table',
        'items': [{ 'name': 'Movimento de Pessoas' },
        { 'name': 'Movimento de Contratos' }]
      },
      {
        'group': 'Configurações',
        'expanded': false,
        'icon': 'fa fa-thermometer-full ',
        'items': [{ 'name': 'Configurações de Email' }]
      }
    ];

    this.menu = m;

  }

}

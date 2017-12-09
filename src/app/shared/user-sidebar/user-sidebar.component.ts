import { Component, OnInit, Input } from '@angular/core';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UserSubItemMenu, UserItemMenu } from './../itemmenu';

import { MenuModule } from 'primeng/components/menu/menu';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  public config: PerfectScrollbarConfigInterface = {};
  term: String = '';

  @Input() menu: UserItemMenu[];

  constructor() { }

  dropmenuitems: MenuItem[];

  ngOnInit() {
    this.dropmenuitems = [
      { label: 'Configurações', icon: 'fa-cogs' },
      { label: 'Logout', icon: 'fa-sign-out ' }
    ];
  }
  toggleExpand(itemMenu: UserItemMenu) {
    itemMenu.expanded = !itemMenu.expanded;
  }

  menuExpanded(exp: Boolean): Boolean {
    return this.term !== '' ? false : !exp;
  }

  favorites(): UserSubItemMenu[] {
    return this.menu[0].items;
  }

}

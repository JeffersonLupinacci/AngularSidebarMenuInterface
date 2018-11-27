import { Component, OnInit } from '@angular/core';

import { MenuModule } from 'primeng/components/menu/menu';
import { MenuItem } from 'primeng/components/common/menuitem';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { UserSubItemMenu, UserItemMenu } from './../../model/itemmenu';
import { AuthService } from '../../security/auth.service';
import { Global } from '../../shared/global';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  public config: PerfectScrollbarConfigInterface = {};
  term: String = '';

  menu: UserItemMenu[];

  dropmenuitems: MenuItem[];

  constructor(
    private auth: AuthService) { }

  ngOnInit() {
    this.dropmenuitems = [
      { label: 'Perfil do Usuário', icon: 'fa-cogs', },
      { label: 'Logout', icon: 'fa-sign-out ', routerLink: ['/login'] }
    ];
    this.menu = Global.MENU_DO_APLICATIVO;
  }

  toggleExpand(itemMenu: UserItemMenu) {
    itemMenu.expanded = !itemMenu.expanded;
  }

  menuExpanded(exp: Boolean): Boolean {
    return this.term !== '' ? false : !exp;
  }

  favorites(): UserSubItemMenu[] {
    const filteredItems: any[] = new Array();
    if (this.auth.jwtPayload) {
      const authorities = this.auth.jwtPayload.authorities;
      if (null != authorities) {
        this.menu[0].items.forEach((grpItem) => {
          if (authorities.includes(grpItem.authoritie)) {
          filteredItems.push(grpItem);
          }
        });
      }
    }
    return filteredItems;
  }

  logout() {
    this.auth.logout();
  }

}

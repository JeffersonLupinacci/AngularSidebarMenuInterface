import { Component, Input, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/components/common/menuitem';

import { AuthService } from './../../security/auth.service';
import { UserItemMenu } from '../../model/itemmenu';
import { Global } from '../../shared/global';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})

export class UserInterfaceComponent implements OnInit {

  menu: UserItemMenu[] = null;
  toggle: Boolean = false;

  ngOnInit(): void {
    if (!this.auth.isLogged()) {
      this.auth.logout();
    }
  }

  toggleSidebar() {
    this.toggle = !this.toggle;
    localStorage.setItem('toggle', String(this.toggle));
  }

  constructor(private auth: AuthService) {
    const v = localStorage.getItem('toggle');
    this.toggle = v === 'true' ? true : false;
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { SidebarFilterPipe } from './sidebar-filter-pipe';

import {
  PerfectScrollbarModule, PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';

import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { BreadcrumbModule } from 'primeng/components/breadcrumb/breadcrumb';
import { MenuModule } from 'primeng/components/menu/menu';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  swipePropagation: false,
  wheelPropagation: false
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    PerfectScrollbarModule,

    TooltipModule,
    MenuModule,
    BreadcrumbModule

  ],
  declarations: [SidebarFilterPipe, UserInterfaceComponent, UserSidebarComponent],
  exports: [UserInterfaceComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class SharedModule { }

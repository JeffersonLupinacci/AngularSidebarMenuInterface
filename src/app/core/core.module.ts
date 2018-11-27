import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  PerfectScrollbarModule, PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';

import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { MenuModule } from 'primeng/components/menu/menu';

import { AppSharedModule } from './../shared/app-shared.module';
import { BreadcrumbService } from './../shared/breadcrumb.service';

import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { SidebarFilterPipe } from './sidebar-filter-pipe';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { DeniedComponent } from './denied/denied.component';
import { CoreRoutingModule } from './core-routing.module';
import { BreadcrumbComponent } from './breadcrumb.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  swipePropagation: false,
  wheelPropagation: false
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PerfectScrollbarModule,

    TooltipModule,
    MenuModule,

    AppSharedModule,
    CoreRoutingModule

  ],
  declarations: [SidebarFilterPipe, UserInterfaceComponent, BreadcrumbComponent,
    UserSidebarComponent, DeniedComponent, BreadcrumbComponent, DashboardComponent],

  exports: [UserInterfaceComponent],

  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
    /*,{ provide: LOCALE_ID, useValue: 'pt-BR' }*/
  ]
})
export class CoreModule { }

import { AuthGuard } from './../security/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeniedComponent } from './denied/denied.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const coreRoutes: Routes = [

  {
    path: '',
    component: UserInterfaceComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'denied',
        component: DeniedComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes)
  ]
})
export class CoreRoutingModule { }


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { ToastyConfig, ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { BreadcrumbService } from './shared/breadcrumb.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <ng2-toasty></ng2-toasty>
    <p-confirmDialog></p-confirmDialog>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastyConfig: ToastyConfig,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService) {
    this.toastyConfig.theme = 'bootstrap';
  }

  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        if (event.title) {
          this.breadcrumbService.setTitle(event.title);
        }
      });
  }
}


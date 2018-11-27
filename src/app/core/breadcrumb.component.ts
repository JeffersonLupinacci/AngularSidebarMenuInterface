import { BreadcrumbService } from './../shared/breadcrumb.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-breadcrumb',
  template: `<h5>{{title}}</h5>`,
  styles: []
})
export class BreadcrumbComponent implements OnDestroy {

  @Input() title: String = '';
  subscription: Subscription;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.subscription = this.breadcrumbService.getTitle().subscribe(v => this.title = v.title);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

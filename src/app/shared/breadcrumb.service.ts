import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BreadcrumbService {
  private subject = new Subject<any>();

  setTitle(title) {
    this.subject.next({ title });
  }

  getTitle(): Observable<any> {
    return this.subject.asObservable();
  }
}

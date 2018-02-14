import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GegebenService {

  constructor() { }

  private subject = new Subject<any>();
  setPaidAmount(amount): void {
    console.log('Paid amount in service = ' + amount);
    this.subject.next({paidAmount: amount});
  }

  getPaidAmount(): Observable<any> {
    return this.subject.asObservable();
  }
  clearPaidAmount() {
    this.subject.next();
  }
}

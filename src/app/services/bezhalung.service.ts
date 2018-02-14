import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class BezhalungService {

  private subject = new Subject<any>();

  sendAmountOfAllItems(amount: number): void {
    console.log('Total amount in service = ' + amount);
    this.subject.next({amountOfAllItems: amount});
  }

  getAmountOfAllItems(): Observable<any> {
    return this.subject.asObservable();
  }

  setPaidAmount(amount): void {
    console.log('Paid amount in service = ' + amount);
    this.subject.next({paidAmount: amount});
  }

  getPaidAmount(): Observable<any> {
    return this.subject.asObservable();
  }

  clearAllAmounts() {
    this.subject.next();
  }
  constructor() { }

}

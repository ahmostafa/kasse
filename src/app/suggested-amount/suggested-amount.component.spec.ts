import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedAmountComponent } from './suggested-amount.component';
import { BezhalungService } from '../services/bezhalung.service';
import { GegebenService } from '../services/gegeben.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';

describe('SuggestedAmountComponent', () => {
  let component: SuggestedAmountComponent;
  let fixture: ComponentFixture<SuggestedAmountComponent>;

  const bezahlungServ = {
    getAmountOfAllItems: function(): Subject<any>{
      return Observable.of(new Subject<any>());
    }
  };

  const gegebenServ = {
    setPaidAmount: function(): void{
      // return Observable.of(new Subject<any>);
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedAmountComponent ],
      providers: [{provide: BezhalungService, useValue: bezahlungServ}, { provide: GegebenService, useValue: gegebenServ}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('suggestedAmount(62.97) amount should be  [100, 70, 65, 63, 62.97]', () => {
    expect(component.suggestedAmount(62.97)).toEqual([100.00, 70.00, 65.00, 63.00, 62.97]);
  });

  it('suggestedAmount(97.3) amount should be  [500, 200, 100, 98, 97.3]', () => {
    expect(component.suggestedAmount(97.3)).toEqual([500, 200, 100, 98, 97.3]);
  });
  it('suggestedAmount(19.3) amount should be  [200, 100, 50, 20, 19.3]', () => {
    expect(component.suggestedAmount(19.3)).toEqual([200, 100, 50, 20, 19.3]);
  });
  it('suggestedAmount(1000) amount should be  [1000]', () => {
    expect(component.suggestedAmount(1000)).toEqual([1000]);
  });
  it('isBankNote(50) should be true', () => {
    expect(component.isBankNote(50)).toEqual(true);
  });
  it('getNextBankNote(100) should be 200', () => {
    expect(component.getNextBankNote(100)).toEqual(200);
  });
  it('getNextBankNote(30) should be 0', () => {
    expect(component.getNextBankNote(30)).toEqual(0);
  });
  it('isDecimalNumber(100) should be false', () => {
    expect(component.isDecimalNumber(100)).toEqual(false);
  });
  it('isDecimalNumber(100.32) should be false', () => {
    expect(component.isDecimalNumber(100.32)).toEqual(true);
  });
  it('getNextNumberForNumbersStartWithZeor(30) should be 40', () => {
    expect(component.getNextNumberForNumbersStartWithZeor(30)).toEqual(40);
  });
  it('getNextNumberForNumbersStartWithZeor(40) should be 50', () => {
    expect(component.getNextNumberForNumbersStartWithZeor(40)).toEqual(50);
  });
  it('getNextNumberForNumbersStartWithZeor(210) should be 220', () => {
    expect(component.getNextNumberForNumbersStartWithZeor(210)).toEqual(220);
  });

});

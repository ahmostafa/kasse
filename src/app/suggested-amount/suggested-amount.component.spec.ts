import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedAmountComponent } from './suggested-amount.component';

describe('SuggestedAmountComponent', () => {
  let component: SuggestedAmountComponent;
  let fixture: ComponentFixture<SuggestedAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedAmountComponent ]
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
});

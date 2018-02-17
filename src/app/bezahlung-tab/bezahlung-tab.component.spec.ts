import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BezahlungTabComponent } from './bezahlung-tab.component';

describe('BezahlungTabComponent', () => {
  let component: BezahlungTabComponent;
  let fixture: ComponentFixture<BezahlungTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BezahlungTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BezahlungTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

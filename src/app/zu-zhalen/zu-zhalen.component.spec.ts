import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZuZhalenComponent } from './zu-zhalen.component';

describe('ZuZhalenComponent', () => {
  let component: ZuZhalenComponent;
  let fixture: ComponentFixture<ZuZhalenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZuZhalenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZuZhalenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

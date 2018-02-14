import { TestBed, inject } from '@angular/core/testing';

import { BezhalungService } from './bezhalung.service';

describe('BezhalungService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BezhalungService]
    });
  });

  it('should be created', inject([BezhalungService], (service: BezhalungService) => {
    expect(service).toBeTruthy();
  }));
});

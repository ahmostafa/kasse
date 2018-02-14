import { TestBed, inject } from '@angular/core/testing';

import { GegebenService } from './gegeben.service';

describe('BegegebenSerGegebenServicevice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GegebenService]
    });
  });

  it('should be created', inject([GegebenService], (service: GegebenService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { EnlaceAPIService } from './enlace-api.service';

describe('EnlaceAPIService', () => {
  let service: EnlaceAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnlaceAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

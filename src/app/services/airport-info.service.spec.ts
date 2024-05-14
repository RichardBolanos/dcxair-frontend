import { TestBed } from '@angular/core/testing';

import { AirportInfoService } from './airport-info.service';

describe('AirportInfoService', () => {
  let service: AirportInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

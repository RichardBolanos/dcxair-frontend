import { TestBed } from '@angular/core/testing';

import { DcxairService } from './dcxair.service';

describe('DcxairService', () => {
  let service: DcxairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DcxairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

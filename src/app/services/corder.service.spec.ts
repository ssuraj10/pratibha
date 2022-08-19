import { TestBed } from '@angular/core/testing';

import { CorderService } from './corder.service';

describe('CorderService', () => {
  let service: CorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

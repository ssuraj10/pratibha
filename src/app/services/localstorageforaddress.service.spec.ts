import { TestBed } from '@angular/core/testing';

import { LocalstorageforaddressService } from './localstorageforaddress.service';

describe('LocalstorageforaddressService', () => {
  let service: LocalstorageforaddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageforaddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

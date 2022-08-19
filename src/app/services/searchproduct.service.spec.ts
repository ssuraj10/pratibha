import { TestBed } from '@angular/core/testing';

import { SearchproductService } from './searchproduct.service';

describe('SearchproductService', () => {
  let service: SearchproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CanbanService } from './canban.service';

describe('CanbanService', () => {
  let service: CanbanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

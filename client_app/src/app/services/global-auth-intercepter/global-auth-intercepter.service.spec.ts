import { TestBed } from '@angular/core/testing';

import { GlobalAuthIntercepterService } from './global-auth-intercepter.service';

describe('GlobalAuthIntercepterService', () => {
  let service: GlobalAuthIntercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalAuthIntercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

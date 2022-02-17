import { TestBed } from '@angular/core/testing';

import { UserAddServiceService } from './user-add-service.service';

describe('UserAddServiceService', () => {
  let service: UserAddServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAddServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

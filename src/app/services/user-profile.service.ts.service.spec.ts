import { TestBed } from '@angular/core/testing';

import { UserProfileServiceTsService } from './user-profile.service.ts.service';

describe('UserProfileServiceTsService', () => {
  let service: UserProfileServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

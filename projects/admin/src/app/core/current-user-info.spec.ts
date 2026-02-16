import { TestBed } from '@angular/core/testing';

import { CurrentUserInfo } from './current-user-info';

describe('CurrentUserInfoService', () => {
  let service: CurrentUserInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentUserInfo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

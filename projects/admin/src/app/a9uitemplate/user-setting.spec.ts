import { TestBed } from '@angular/core/testing';

import { UserSetting } from './user-setting';
import { provideZonelessChangeDetection } from '@angular/core';

describe('UserSetting', () => {
  let service: UserSetting;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [provideZonelessChangeDetection()] });
    service = TestBed.inject(UserSetting);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

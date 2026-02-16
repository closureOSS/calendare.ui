import { TestBed } from '@angular/core/testing';

import { AppAuthState } from './app-auth-state';

describe('AppAuthStateService', () => {
  let service: AppAuthState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppAuthState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CurrentUserRepository } from './current-user-repository';

describe('CurrentUserRepositoryService', () => {
  let service: CurrentUserRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentUserRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

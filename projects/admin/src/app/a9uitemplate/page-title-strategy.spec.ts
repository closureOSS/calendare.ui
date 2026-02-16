import { TestBed } from '@angular/core/testing';

import { PageTitleStrategy } from './page-title-strategy';
import { provideZonelessChangeDetection } from '@angular/core';

describe('PageTitleStrategy', () => {
  let service: PageTitleStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [provideZonelessChangeDetection()] });
    service = TestBed.inject(PageTitleStrategy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

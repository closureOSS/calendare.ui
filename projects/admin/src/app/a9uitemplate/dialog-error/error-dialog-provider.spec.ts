import { TestBed } from '@angular/core/testing';

import { ErrorDialogProvider } from './error-dialog-provider';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ErrorDialogProvider', () => {
  let service: ErrorDialogProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [provideZonelessChangeDetection()] });
    service = TestBed.inject(ErrorDialogProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

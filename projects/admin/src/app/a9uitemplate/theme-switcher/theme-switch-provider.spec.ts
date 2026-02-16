import { TestBed } from '@angular/core/testing';

import { ThemeSwitchProvider } from './theme-switch-provider';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ThemeSwitchProvider', () => {
  let service: ThemeSwitchProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [provideZonelessChangeDetection()]});
    service = TestBed.inject(ThemeSwitchProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

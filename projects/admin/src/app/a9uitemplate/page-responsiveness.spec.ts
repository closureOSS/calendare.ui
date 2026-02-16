import { TestBed } from '@angular/core/testing';
import { PageResponsiveness } from './page-responsiveness';
import { provideZonelessChangeDetection } from '@angular/core';


describe('PageResponsiveness', () => {
  let service: PageResponsiveness;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [provideZonelessChangeDetection()] });
    service = TestBed.inject(PageResponsiveness);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

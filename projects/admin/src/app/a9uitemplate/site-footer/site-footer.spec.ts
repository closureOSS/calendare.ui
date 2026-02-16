import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFooter } from './site-footer';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SiteFooter', () => {
  let component: SiteFooter;
  let fixture: ComponentFixture<SiteFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteFooter, provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SiteFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

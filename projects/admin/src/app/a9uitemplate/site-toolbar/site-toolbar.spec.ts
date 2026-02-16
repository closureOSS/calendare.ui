import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteToolbar } from './site-toolbar';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SiteToolbar', () => {
  let component: SiteToolbar;
  let fixture: ComponentFixture<SiteToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteToolbar, provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SiteToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

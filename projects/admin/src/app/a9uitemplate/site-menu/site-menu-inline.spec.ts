import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMenuInline } from './site-menu-inline';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SiteMenuInline', () => {
  let component: SiteMenuInline;
  let fixture: ComponentFixture<SiteMenuInline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteMenuInline,provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteMenuInline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

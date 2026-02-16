import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMenuPopup } from './site-menu-popup';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SiteMenuPopup', () => {
  let component: SiteMenuPopup;
  let fixture: ComponentFixture<SiteMenuPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteMenuPopup, provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SiteMenuPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

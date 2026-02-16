import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMenu } from './site-menu';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SiteMenu', () => {
  let component: SiteMenu;
  let fixture: ComponentFixture<SiteMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteMenu, provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SiteMenu);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

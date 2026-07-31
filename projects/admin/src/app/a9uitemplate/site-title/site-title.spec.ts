import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTitle } from './site-title';

describe('SiteTitle', () => {
  let component: SiteTitle;
  let fixture: ComponentFixture<SiteTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

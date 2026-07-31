import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteStickyHeader } from './site-sticky-header';

describe('SiteStickyHeader', () => {
  let component: SiteStickyHeader;
  let fixture: ComponentFixture<SiteStickyHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteStickyHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteStickyHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSearch } from './site-search';

describe('SiteSearch', () => {
  let component: SiteSearch;
  let fixture: ComponentFixture<SiteSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

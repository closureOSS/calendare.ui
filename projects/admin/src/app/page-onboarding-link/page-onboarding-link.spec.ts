import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOnboardingLink } from './page-onboarding-link';

describe('PageOnboardingLinkComponent', () => {
  let component: PageOnboardingLink;
  let fixture: ComponentFixture<PageOnboardingLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageOnboardingLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageOnboardingLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOnboarding } from './page-onboarding';

describe('PageOnboardingComponent', () => {
  let component: PageOnboarding;
  let fixture: ComponentFixture<PageOnboarding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageOnboarding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageOnboarding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

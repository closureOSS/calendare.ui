import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSwitcherButton } from './language-switcher-button';

describe('LanguageSwitcherButton', () => {
  let component: LanguageSwitcherButton;
  let fixture: ComponentFixture<LanguageSwitcherButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSwitcherButton],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

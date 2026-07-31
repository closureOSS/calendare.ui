import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSwitcherButton } from './theme-switcher-button';

describe('ThemeSwitcherButton', () => {
  let component: ThemeSwitcherButton;
  let fixture: ComponentFixture<ThemeSwitcherButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitcherButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitcherButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

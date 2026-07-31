import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPaletteSwitcher } from './color-palette-switcher';

describe('ColorPaletteSwitcher', () => {
  let component: ColorPaletteSwitcher;
  let fixture: ComponentFixture<ColorPaletteSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPaletteSwitcher],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorPaletteSwitcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

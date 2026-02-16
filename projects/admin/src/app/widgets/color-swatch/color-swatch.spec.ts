import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSwatch } from './color-swatch';

describe('ColorSwatch', () => {
  let component: ColorSwatch;
  let fixture: ComponentFixture<ColorSwatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorSwatch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorSwatch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintBox } from './hint-box';
import { provideZonelessChangeDetection } from '@angular/core';

describe('HintBox', () => {
  let component: HintBox;
  let fixture: ComponentFixture<HintBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HintBox, provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HintBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

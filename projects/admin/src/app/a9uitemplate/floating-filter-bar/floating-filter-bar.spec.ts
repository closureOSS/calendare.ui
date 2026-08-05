import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingFilterBar } from './floating-filter-bar';

describe('FloatingFilterBar', () => {
  let component: FloatingFilterBar;
  let fixture: ComponentFixture<FloatingFilterBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingFilterBar],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingFilterBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

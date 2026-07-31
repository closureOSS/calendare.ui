import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTimezone } from './input-timezone';

describe('InputTimezone', () => {
  let component: InputTimezone;
  let fixture: ComponentFixture<InputTimezone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTimezone],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTimezone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

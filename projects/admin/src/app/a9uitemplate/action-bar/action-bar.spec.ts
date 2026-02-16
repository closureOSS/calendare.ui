import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBar } from './action-bar';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ActionBar', () => {
  let component: ActionBar;
  let fixture: ComponentFixture<ActionBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionBar, provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActionBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateBackButton } from './navigate-back-button';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NavigateBackButton', () => {
  let component: NavigateBackButton;
  let fixture: ComponentFixture<NavigateBackButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigateBackButton, provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavigateBackButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

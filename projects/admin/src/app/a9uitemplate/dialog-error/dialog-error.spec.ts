import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogError } from './dialog-error';
import { provideZonelessChangeDetection } from '@angular/core';

describe('DialogError', () => {
  let component: DialogError;
  let fixture: ComponentFixture<DialogError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogError,provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

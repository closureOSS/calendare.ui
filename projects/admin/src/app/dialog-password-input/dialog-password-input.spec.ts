import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPasswordInput } from './dialog-password-input';

describe('DialogPasswordInputComponent', () => {
  let component: DialogPasswordInput;
  let fixture: ComponentFixture<DialogPasswordInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPasswordInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPasswordInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

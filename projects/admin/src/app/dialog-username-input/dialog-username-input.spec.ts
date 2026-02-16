import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUsernameInput } from './dialog-username-input';

describe('DialogUsernameInputComponent', () => {
  let component: DialogUsernameInput;
  let fixture: ComponentFixture<DialogUsernameInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUsernameInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUsernameInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

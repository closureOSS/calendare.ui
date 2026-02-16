import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailConfirm } from './edit-email-confirm';

describe('EditEmailConfirm', () => {
  let component: EditEmailConfirm;
  let fixture: ComponentFixture<EditEmailConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmailConfirm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmailConfirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

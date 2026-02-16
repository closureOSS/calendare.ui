import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrincipal } from './edit-principal';

describe('EditPrincipalComponent', () => {
  let component: EditPrincipal;
  let fixture: ComponentFixture<EditPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

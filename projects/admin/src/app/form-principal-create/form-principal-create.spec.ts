import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPrincipalCreate } from './form-principal-create';

describe('FormPrincipalCreateComponent', () => {
  let component: FormPrincipalCreate;
  let fixture: ComponentFixture<FormPrincipalCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPrincipalCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPrincipalCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

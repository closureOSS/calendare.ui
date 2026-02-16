import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrincipalButton } from './create-principal-button';

describe('CreatePrincipalButton', () => {
  let component: CreatePrincipalButton;
  let fixture: ComponentFixture<CreatePrincipalButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePrincipalButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePrincipalButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

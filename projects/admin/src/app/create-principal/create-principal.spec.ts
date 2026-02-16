import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrincipal } from './create-principal';

describe('CreatePrincipalComponent', () => {
  let component: CreatePrincipal;
  let fixture: ComponentFixture<CreatePrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

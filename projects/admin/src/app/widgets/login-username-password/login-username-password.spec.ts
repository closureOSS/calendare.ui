import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUsernamePassword } from './login-username-password';

describe('LoginUsernamePasswordComponent', () => {
  let component: LoginUsernamePassword;
  let fixture: ComponentFixture<LoginUsernamePassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginUsernamePassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginUsernamePassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

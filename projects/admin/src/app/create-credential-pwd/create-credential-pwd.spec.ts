import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCredentialPwd } from './create-credential-pwd';

describe('CreateCredentialPwd', () => {
  let component: CreateCredentialPwd;
  let fixture: ComponentFixture<CreateCredentialPwd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCredentialPwd],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCredentialPwd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

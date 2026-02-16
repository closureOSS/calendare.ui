import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCredentialButton } from './create-credential-button';

describe('CreateCredentialButton', () => {
  let component: CreateCredentialButton;
  let fixture: ComponentFixture<CreateCredentialButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCredentialButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCredentialButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

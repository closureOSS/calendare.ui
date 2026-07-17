import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCredential } from './create-credential';

describe('CreateCredential', () => {
  let component: CreateCredential;
  let fixture: ComponentFixture<CreateCredential>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCredential],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCredential);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

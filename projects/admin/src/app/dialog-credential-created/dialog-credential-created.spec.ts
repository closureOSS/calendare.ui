import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCredentialCreated } from './dialog-credential-created';

describe('DialogCredentialCreated', () => {
  let component: DialogCredentialCreated;
  let fixture: ComponentFixture<DialogCredentialCreated>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCredentialCreated],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogCredentialCreated);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

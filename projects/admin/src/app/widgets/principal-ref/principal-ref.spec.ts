import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalRef } from './principal-ref';

describe('PrincipalRefComponent', () => {
  let component: PrincipalRef;
  let fixture: ComponentFixture<PrincipalRef>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalRef]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

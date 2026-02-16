import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupPrincipal } from './lookup-principal';

describe('LookupPrincipalComponent', () => {
  let component: LookupPrincipal;
  let fixture: ComponentFixture<LookupPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookupPrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookupPrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

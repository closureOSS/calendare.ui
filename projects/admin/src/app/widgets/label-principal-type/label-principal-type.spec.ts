import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelPrincipalType } from './label-principal-type';

describe('LabelPrincipalType', () => {
  let component: LabelPrincipalType;
  let fixture: ComponentFixture<LabelPrincipalType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelPrincipalType],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelPrincipalType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

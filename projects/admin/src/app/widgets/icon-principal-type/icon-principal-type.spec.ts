import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPrincipalType } from './icon-principal-type';

describe('IconPrincipalTypeComponent', () => {
  let component: IconPrincipalType;
  let fixture: ComponentFixture<IconPrincipalType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconPrincipalType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconPrincipalType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

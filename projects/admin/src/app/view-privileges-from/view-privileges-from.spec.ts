import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrivilegesFrom } from './view-privileges-from';

describe('ViewPrivilegesFrom', () => {
  let component: ViewPrivilegesFrom;
  let fixture: ComponentFixture<ViewPrivilegesFrom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPrivilegesFrom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPrivilegesFrom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

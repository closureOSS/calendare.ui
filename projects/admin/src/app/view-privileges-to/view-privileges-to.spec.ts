import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrivilegesTo } from './view-privileges-to';

describe('ViewPrivilegesToComponent', () => {
  let component: ViewPrivilegesTo;
  let fixture: ComponentFixture<ViewPrivilegesTo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPrivilegesTo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPrivilegesTo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

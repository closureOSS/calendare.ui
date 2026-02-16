import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrincipalPermissions } from './edit-principal-permissions';

describe('EditPrincipalPermissionsComponent', () => {
  let component: EditPrincipalPermissions;
  let fixture: ComponentFixture<EditPrincipalPermissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPrincipalPermissions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPrincipalPermissions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

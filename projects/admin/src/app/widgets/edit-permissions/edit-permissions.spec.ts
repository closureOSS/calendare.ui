import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPermissions } from './edit-permissions';

describe('EditPermissionsComponent', () => {
  let component: EditPermissions;
  let fixture: ComponentFixture<EditPermissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPermissions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPermissions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

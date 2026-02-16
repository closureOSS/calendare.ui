import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollectionPermissions } from './edit-collection-permissions';

describe('EditCollectionPermissionsComponent', () => {
  let component: EditCollectionPermissions;
  let fixture: ComponentFixture<EditCollectionPermissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCollectionPermissions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCollectionPermissions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

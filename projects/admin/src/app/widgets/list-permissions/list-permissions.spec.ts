import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPermissions } from './list-permissions';

describe('ListPermissionsComponent', () => {
  let component: ListPermissions;
  let fixture: ComponentFixture<ListPermissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPermissions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPermissions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

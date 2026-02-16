import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrivileges } from './edit-privileges';

describe('EditPrivilegesComponent', () => {
  let component: EditPrivileges;
  let fixture: ComponentFixture<EditPrivileges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPrivileges]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPrivileges);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrivileges } from './list-privileges';

describe('ListPrivilegesComponent', () => {
  let component: ListPrivileges;
  let fixture: ComponentFixture<ListPrivileges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPrivileges]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPrivileges);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

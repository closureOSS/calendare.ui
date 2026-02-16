import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMemberships } from './view-memberships';

describe('ViewMemberships', () => {
  let component: ViewMemberships;
  let fixture: ComponentFixture<ViewMemberships>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMemberships]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMemberships);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRestrictions } from './list-restrictions';

describe('ListRestrictionsComponent', () => {
  let component: ListRestrictions;
  let fixture: ComponentFixture<ListRestrictions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRestrictions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRestrictions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

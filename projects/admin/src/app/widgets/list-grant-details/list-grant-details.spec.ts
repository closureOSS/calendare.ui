import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGrantDetails } from './list-grant-details';

describe('ListGrantDetails', () => {
  let component: ListGrantDetails;
  let fixture: ComponentFixture<ListGrantDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGrantDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGrantDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

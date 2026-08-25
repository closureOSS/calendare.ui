import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudTagFilter } from './cloud-tag-filter';

describe('CloudTagFilter', () => {
  let component: CloudTagFilter;
  let fixture: ComponentFixture<CloudTagFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudTagFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudTagFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

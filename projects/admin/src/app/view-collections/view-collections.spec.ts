import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCollections } from './view-collections';

describe('ViewCollectionsComponent', () => {
  let component: ViewCollections;
  let fixture: ComponentFixture<ViewCollections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCollections]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCollections);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

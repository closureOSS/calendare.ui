import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollection } from './edit-collection';

describe('EditCollectionComponent', () => {
  let component: EditCollection;
  let fixture: ComponentFixture<EditCollection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCollection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCollection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

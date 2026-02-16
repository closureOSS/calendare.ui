import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrxJournal } from './edit-trx-journal';

describe('EditTrxJournalComponent', () => {
  let component: EditTrxJournal;
  let fixture: ComponentFixture<EditTrxJournal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTrxJournal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrxJournal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

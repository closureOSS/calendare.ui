import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMyCalendars } from './page-my-calendars';

describe('PageMyCalendars', () => {
  let component: PageMyCalendars;
  let fixture: ComponentFixture<PageMyCalendars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMyCalendars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMyCalendars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGoodbye } from './page-goodbye';

describe('PageGoodbyeComponent', () => {
  let component: PageGoodbye;
  let fixture: ComponentFixture<PageGoodbye>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageGoodbye]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGoodbye);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

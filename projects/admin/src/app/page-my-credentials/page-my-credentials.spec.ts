import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMyCredentials } from './page-my-credentials';

describe('PageMyCredentials', () => {
  let component: PageMyCredentials;
  let fixture: ComponentFixture<PageMyCredentials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMyCredentials]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMyCredentials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

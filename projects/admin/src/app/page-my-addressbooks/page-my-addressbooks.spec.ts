import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMyAddressbooks } from './page-my-addressbooks';

describe('PageMyAddressbooks', () => {
  let component: PageMyAddressbooks;
  let fixture: ComponentFixture<PageMyAddressbooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMyAddressbooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMyAddressbooks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

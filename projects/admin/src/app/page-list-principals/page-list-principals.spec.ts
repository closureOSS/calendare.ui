import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListPrincipals } from './page-list-principals';

describe('PageListPrincipalsComponent', () => {
  let component: PageListPrincipals;
  let fixture: ComponentFixture<PageListPrincipals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageListPrincipals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageListPrincipals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

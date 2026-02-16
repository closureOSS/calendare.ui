import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMyPrincipal } from './page-my-principal';

describe('PageMyPrincipal', () => {
  let component: PageMyPrincipal;
  let fixture: ComponentFixture<PageMyPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMyPrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMyPrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

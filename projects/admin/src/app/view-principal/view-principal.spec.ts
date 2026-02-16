import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrincipal } from './view-principal';

describe('ViewPrincipalComponent', () => {
  let component: ViewPrincipal;
  let fixture: ComponentFixture<ViewPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

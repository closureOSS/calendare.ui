import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCredentials } from './view-credentials';

describe('ViewCredentialsComponent', () => {
  let component: ViewCredentials;
  let fixture: ComponentFixture<ViewCredentials>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCredentials]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCredentials);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

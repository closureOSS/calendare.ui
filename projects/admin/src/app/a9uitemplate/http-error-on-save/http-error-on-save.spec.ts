import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorOnSave } from './http-error-on-save';

describe('HttpErrorOnSave', () => {
  let component: HttpErrorOnSave;
  let fixture: ComponentFixture<HttpErrorOnSave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpErrorOnSave],
    }).compileComponents();

    fixture = TestBed.createComponent(HttpErrorOnSave);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

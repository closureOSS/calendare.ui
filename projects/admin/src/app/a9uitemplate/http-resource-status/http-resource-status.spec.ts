import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResourceStatus } from './http-resource-status';
import { provideZonelessChangeDetection } from '@angular/core';


describe('HttpResourceStatus', () => {
  let component: HttpResourceStatus;
  let fixture: ComponentFixture<HttpResourceStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpResourceStatus,provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpResourceStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

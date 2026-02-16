import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloatingActionBar } from './floating-action-bar';
import { provideZonelessChangeDetection } from '@angular/core';


describe('FloatingActionBar', () => {
  let component: FloatingActionBar;
  let fixture: ComponentFixture<FloatingActionBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingActionBar, provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingActionBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

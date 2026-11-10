import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabNavigationBar } from './site-top-navigation';

describe('TabNavigationBar', () => {
  let component: TabNavigationBar;
  let fixture: ComponentFixture<TabNavigationBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabNavigationBar],
    }).compileComponents();

    fixture = TestBed.createComponent(TabNavigationBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

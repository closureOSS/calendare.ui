import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVersion } from './view-version';

describe('ViewVersionComponent', () => {
  let component: ViewVersion;
  let fixture: ComponentFixture<ViewVersion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVersion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVersion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

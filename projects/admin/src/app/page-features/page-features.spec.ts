import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFeatures } from './page-features';

describe('PageFeaturesComponent', () => {
  let component: PageFeatures;
  let fixture: ComponentFixture<PageFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFeatures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFeatures);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

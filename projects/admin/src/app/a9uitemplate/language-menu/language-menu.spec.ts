import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageMenu } from './language-menu';
import { provideZonelessChangeDetection } from '@angular/core';

describe('LanguageMenu', () => {
  let component: LanguageMenu;
  let fixture: ComponentFixture<LanguageMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageMenu, provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LanguageMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

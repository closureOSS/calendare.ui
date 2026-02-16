import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSwitcher } from './language-switcher';
import { provideZonelessChangeDetection } from '@angular/core';

describe('LanguageSwitcher', () => {
  let component: LanguageSwitcher;
  let fixture: ComponentFixture<LanguageSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSwitcher, provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

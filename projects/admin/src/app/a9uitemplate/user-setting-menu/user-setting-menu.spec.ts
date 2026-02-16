import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingMenu } from './user-setting-menu';
import { provideZonelessChangeDetection } from '@angular/core';

describe('UserSettingMenu', () => {
  let component: UserSettingMenu;
  let fixture: ComponentFixture<UserSettingMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSettingMenu, provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserSettingMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

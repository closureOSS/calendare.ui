import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { LanguageMenu } from "../language-menu/language-menu";
import { CurrentUserInfo } from './current-user-info';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'a9-user-setting-menu',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    TranslocoDirective,
    LanguageMenu,
  ],
  templateUrl: './user-setting-menu.html',
  styleUrl: './user-setting-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingMenu {
  public currentUser = inject(CurrentUserInfo);
  private readonly router = inject(Router);

  public async logout() {
    await this.currentUser.logout();
    await this.router.navigate(['/goodbye']);
  }
}

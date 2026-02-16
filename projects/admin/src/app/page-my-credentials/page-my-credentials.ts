import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ViewCredentials } from '../view-credentials/view-credentials';
import { TranslocoDirective } from '@jsverse/transloco';
import { CurrentUserInfoJwt } from '../core/current-user-info';
import { FloatingActionBar } from '../a9uitemplate/floating-action-bar/floating-action-bar';
import { CreateCredentialButton } from "../create-credential-button/create-credential-button";

@Component({
  selector: 'cal-page-my-credentials',
  imports: [
    ViewCredentials,
    FloatingActionBar,
    TranslocoDirective,
    CreateCredentialButton
  ],
  templateUrl: './page-my-credentials.html',
  styleUrl: './page-my-credentials.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageMyCredentials {
  private readonly currentUserInfo = inject(CurrentUserInfoJwt);
  public username = computed(() => {
    const account = this.currentUserInfo.account();
    return account ? account.username : null;
  });

  public reload = signal<number>(0);
  public refresh() {
    this.reload.update(value => value + 1);
  }
}

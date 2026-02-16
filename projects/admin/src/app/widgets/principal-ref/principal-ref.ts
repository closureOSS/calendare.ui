import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconPrincipalType } from '../icon-principal-type/icon-principal-type';

@Component({
  selector: 'cal-principal-ref',
  imports: [
    IconPrincipalType,
  ],
  templateUrl: './principal-ref.html',
  styleUrl: './principal-ref.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrincipalRef {
  readonly type = input.required<string | null | undefined>();
  readonly name = input.required<string | null | undefined>();
  readonly strike = input<boolean>(false);
}

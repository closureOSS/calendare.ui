import { Component, computed, inject, input } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'cal-label-principal-type',
  imports: [

  ],
  templateUrl: './label-principal-type.html',
})
export class LabelPrincipalType {
  readonly type = input.required<string | null | undefined>();
  private translate = inject(TranslocoService);
  readonly label = computed(() => this.translate.translate(principalTypeLabel(this.type())));

}

export function principalTypeLabel(type: string | null | undefined) {
  switch (type) {
    case 'INDIVIDUAL': return 'Person';
    case 'ROOM': return 'Room';
    case 'RESOURCE': return 'Resource';
    case 'GROUP': return 'Group';
    default:
      return 'Unknown principal type';
  }
}

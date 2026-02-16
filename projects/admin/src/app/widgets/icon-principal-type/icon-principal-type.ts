import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cal-icon-principal-type',
  imports: [
    MatIconModule,
  ],
  templateUrl: './icon-principal-type.html',
  styleUrl: './icon-principal-type.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPrincipalType {
  readonly type = input.required<string | null | undefined>();

  readonly iconName = computed(() => {
    switch (this.type()) {
      case 'INDIVIDUAL': return 'person#ptype';
      case 'ROOM': return 'meeting_room#ptype';
      case 'RESOURCE': return 'speaker#ptype';
      case 'GROUP': return 'group#ptype';
      default:
        return 'question_mark';
    }
  });
}

import { Component, computed, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { matGroupFillOutline, matMeetingRoomFillOutline, matPerson2FillOutline, matQuestionMarkFillOutline, matSpeakerFillOutline } from '@ng-icons/material-symbols/outline';

@Component({
  selector: 'cal-icon-principal-type',
  imports: [
    NgIcon,
  ],
  templateUrl: './icon-principal-type.html',
})
export class IconPrincipalType {
  readonly type = input.required<string | null | undefined>();
  size = input<string>('1.25rem');
  readonly iconSvg = computed(() => principalTypeIcon(this.type()));
}

export function principalTypeIcon(type: string | null | undefined) {
  switch (type) {
    case 'INDIVIDUAL': return matPerson2FillOutline;
    case 'ROOM': return matMeetingRoomFillOutline;
    case 'RESOURCE': return matSpeakerFillOutline;
    case 'GROUP': return matGroupFillOutline;
    default:
      return matQuestionMarkFillOutline;
  }
}

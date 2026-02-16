import { ChangeDetectionStrategy, Component, input, ResourceStatus } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'a9-http-resource-status',
  imports: [
    MatProgressBarModule
  ],
  templateUrl: './http-resource-status.html',
  styleUrl: './http-resource-status.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HttpResourceStatus {
  status = input.required<ResourceStatus>();
}

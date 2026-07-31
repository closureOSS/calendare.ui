import { Component, input, ResourceStatus } from '@angular/core';
import { HlmProgressImports } from '@spartan-ng/helm/progress';

@Component({
  selector: 'a9-http-resource-status',
  imports: [
    HlmProgressImports,
  ],
  host: { class: 'absolute top-0 left-0 right-0 w-full empty:hidden' },
  templateUrl: './http-resource-status.html',
})
export class HttpResourceStatus {
  status = input.required<ResourceStatus>();
}

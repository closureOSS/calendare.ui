import { HttpResourceRef } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HintBox } from '../../a9uitemplate/hint-box/hint-box';
import { TranslocoDirective } from '@jsverse/transloco';
import { HttpResourceStatus } from '../http-resource-status/http-resource-status';

@Component({
  selector: 'a9-http-resource-viewer',
  imports: [
    HttpResourceStatus,
    HintBox,
    TranslocoDirective,
  ],
  templateUrl: './http-resource-viewer.html',
  styleUrl: './http-resource-viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpResourceViewer<TPayload> {
  resource = input.required<HttpResourceRef<TPayload>>();
}

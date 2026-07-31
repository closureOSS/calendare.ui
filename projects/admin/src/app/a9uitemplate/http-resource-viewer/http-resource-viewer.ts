import { HttpResourceRef } from '@angular/common/http';
import { booleanAttribute, Component, effect, inject, input } from '@angular/core';
import { HintBox } from '../../a9uitemplate/hint-box/hint-box';
import { TranslocoDirective } from '@jsverse/transloco';
import { HttpResourceStatus } from '../http-resource-status/http-resource-status';
import { HttpErrorHandler } from '../../core/http-error-handler';

@Component({
  selector: 'a9-http-resource-viewer',
  imports: [
    HttpResourceStatus,
    HintBox,
    TranslocoDirective,
  ],
  host: {
    class: 'relative block',
  },
  templateUrl: './http-resource-viewer.html',
})
export class HttpResourceViewer<TPayload> {
  resource = input.required<HttpResourceRef<TPayload>>();
  defaultErrorHandler = input(false, { transform: booleanAttribute });

  #httpErrorHandler = inject(HttpErrorHandler);

  _error = effect(() => {
    if (!this.defaultErrorHandler()) return;
    const error = this.resource().error();
    this.#httpErrorHandler.standardErrorHandler(error);
  });
}

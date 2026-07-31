import { Component, input } from '@angular/core';
import { HttpProblemDetails } from '../../core/http-problem-details';

@Component({
  selector: 'a9-http-error-on-save',
  imports: [],
  templateUrl: './http-error-on-save.html',
})
export class HttpErrorOnSave {
  error = input.required<HttpProblemDetails | null>();
}

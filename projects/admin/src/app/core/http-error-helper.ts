import { HttpErrorResponse } from "@angular/common/http";
import { HttpProblemDetails } from "./http-problem-details";

export function httpErrorToProblemDetails(e: any): HttpProblemDetails {
  if (e instanceof HttpErrorResponse) {
    const pd = e.error as HttpProblemDetails;
    console.error('Http %s failed %d: %o', e.url, e.status, pd ?? e.message);
    if (pd) {
      return { ...pd, url: e.url };
    }
    return {
      url: e.url,
      title: e.message,
      status: e.status,
    };
  }
  console.error('Http failed (unknown error): %o', e);
  return {
    url: e.url,
    title: 'Saving changes failed (reason unknown)',
    status: e.status ?? 500,
    type: 'https://tools.ietf.org/html/rfc9110#section-15.6.1',
  };
}

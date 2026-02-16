import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CalendareService, PrincipalResponse, UserRegisterRequest } from '../../api';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserRepository {
  private readonly client = inject(CalendareService);

  public async linkAccount(): Promise<HttpStatusCode> {
    try {
      const _credentials = await firstValueFrom(this.client.autoLinkCurrentUser());
      return HttpStatusCode.Ok;
    }
    catch (ex) {
      const pd = ex as HttpErrorResponse;
      if (pd) {
        switch (pd.status) {
          case HttpStatusCode.NotFound:
            console.warn("Account link not possible, email doesn't exist. Provision new user?");
            return HttpStatusCode.NotFound;
          case HttpStatusCode.Unauthorized:
            return pd.status;
        }
        console.error(pd.ok, pd.status, pd.error['traceId']);
      }
    }
    return HttpStatusCode.InternalServerError;
  }

  public async createDefaultAccount(request: UserRegisterRequest): Promise<PrincipalResponse | HttpStatusCode> {
    try {
      await firstValueFrom(this.client.autoProvisionCurrentUser(request));
      const principal = await firstValueFrom(this.client.getPrincipalOfMyself());
      return principal;
    }
    catch (ex) {
      const pd = ex as HttpErrorResponse;
      if (pd) {
        switch (pd.status) {
          case HttpStatusCode.Conflict:
            console.error('Conflict, duplicated entry');
            return HttpStatusCode.Conflict;

          case HttpStatusCode.NotFound:
            console.warn("Account link not possible, email doesn't exist. Provision new user?");
            return HttpStatusCode.NotFound;

          case HttpStatusCode.Unauthorized:
            return pd.status;
        }
        console.error(pd.ok, pd.status, pd.error['traceId']);
      }
    }
    return HttpStatusCode.InternalServerError;
  }
}

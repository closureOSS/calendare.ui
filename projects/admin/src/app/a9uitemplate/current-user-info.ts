import { Injectable, signal } from "@angular/core";

@Injectable()
export class CurrentUserInfo {
  public displayname = signal<string | null>(null);
  public email = signal<string | null>(null);
  public picture = signal<string | null>(null);

  public async logout() {
    this.clear();
  }

  protected clear() {
    this.displayname.set(null);
    this.email.set(null);
    this.picture.set(null);
  }
}

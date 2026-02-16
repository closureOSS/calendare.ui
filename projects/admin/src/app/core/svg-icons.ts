import { inject, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { importSvgMaterialIcons } from './import-svg-material-icons.generated';

@Injectable({ providedIn: 'root' })
export class SvgIcons {
  private sanitizer = inject(DomSanitizer);
  private registry = inject(MatIconRegistry);
  constructor() {
    importSvgMaterialIcons(this.registry, this.sanitizer);
    this.registry.addSvgIcon('favicon', this.sanitizer.bypassSecurityTrustResourceUrl("./icon.svg"));
  }
}


import { Component, inject } from '@angular/core';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { ColorPalette, SiteThemeProvider } from '../site-theme/site-theme-provider';

@Component({
  selector: 'a9-color-palette-switcher',
  imports: [
    HlmSelectImports,
  ],
  templateUrl: './color-palette-switcher.html',
})
export class ColorPaletteSwitcher {
  private readonly config = inject(SiteThemeProvider);
  value = this.config.palette;
  selectColor(palette: ColorPalette | null | undefined) {
    if (palette) {
      this.config.setColorPalette(palette);
    }
  }
}

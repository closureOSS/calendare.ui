import { Component, inject, linkedSignal } from '@angular/core';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { ColorPalette } from './color-palette-switch-provider';
import { UserSettingProvider } from '../user-setting';

@Component({
  selector: 'a9-color-palette-switcher',
  imports: [
    HlmSelectImports,
  ],
  templateUrl: './color-palette-switcher.html',
})
export class ColorPaletteSwitcher {
  value = linkedSignal({
    source: () => this.settings.getColorPalette,
    computation: (item) => item() ?? ColorPalette.Default,
  });

  private readonly settings = inject(UserSettingProvider);
  selectColor(palette: ColorPalette | null | undefined) {
    if (palette) {
      this.settings.setColorPalette(palette);
    }
  }
}

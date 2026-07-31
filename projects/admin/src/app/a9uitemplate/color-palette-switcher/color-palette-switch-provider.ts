import { afterRenderEffect, DOCUMENT, inject, RendererFactory2, Service, signal } from '@angular/core';

export enum ColorPalette { Blue = 'Blue', Green = 'Green', Default = 'Default' };

@Service()
export class ColorPaletteSwitchProvider {
  #document = inject(DOCUMENT);
  #rendererFactory = inject(RendererFactory2);
  #renderer = this.#rendererFactory.createRenderer(null, null);

  #colorPalette = signal<ColorPalette>(ColorPalette.Default);
  public colorPalette = this.#colorPalette.asReadonly();
  private currentPalette = ColorPalette.Default;

  constructor() {
    afterRenderEffect({
      write: () => {
        let mode = this.#colorPalette();
        if (this.currentPalette !== ColorPalette.Default) {
          this.#renderer.removeClass(this.#document.documentElement, ColorPalette[this.currentPalette].toLowerCase());
        }
        if (mode && mode !== ColorPalette.Default) {
          this.#renderer.addClass(this.#document.documentElement, ColorPalette[mode].toLowerCase());
          this.currentPalette = mode;
        } else {
          this.currentPalette = ColorPalette.Default;
        }
      }
    });
  }

  public selectColorPalette(palette: ColorPalette) {
    this.#colorPalette.set(palette);
  }
}

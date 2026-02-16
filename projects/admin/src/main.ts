import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { RuntimeConfig } from './app/core/runtime-config';

fetch('./appsettings.json')
  .then((response) => response.json())
  .then((config: RuntimeConfig) => {
    bootstrapApplication(App, appConfig(config))
      .catch((err) => console.error(err));
  })

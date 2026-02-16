import { TranslocoGlobalConfig } from '@jsverse/transloco-utils';

const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'projects/admin/public/i18n/',
  defaultLang: 'en',
  langs: ['en', 'de'],
  keysManager: {
    sort: true,
  }
};

export default config;

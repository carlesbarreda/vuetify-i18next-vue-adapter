import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import LanguageDetector from 'i18next-browser-languagedetector';

import locales from '@/locales';

// Translations provided by Vuetify
import { ca, es, en } from 'vuetify/locale';

// Types
import type { App } from 'vue';

export const messages = {
  ca: { translation: { $vuetify: ca, ...locales["ca"] } },
  es: { translation: { $vuetify: es, ...locales["es"] } },
  en: { translation: { $vuetify: en, ...locales["en"] } },
};

export const i18nPromise = i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    initImmediate: false,
    //lng: import.meta.env.APP_LOCALE ? import.meta.env.APP_LOCALE : 'ca',
    //fallbackLng: import.meta.env.APP_FALLBACK_LOCALE ? import.meta.env.APP_FALLBACK_LOCALE : 'ca',
    fallbackLng: { 
      //'de-CH': ['fr', 'it'], //French and Italian are also spoken in Switzerland
      //'zh-Hant': ['zh-Hans', 'en'],
      //'es': ['fr'],
      //'default': ['en'],
      'default': [import.meta.env.APP_FALLBACK_LOCALE ? import.meta.env.APP_FALLBACK_LOCALE : 'en'],
    },
    supportedLngs: ["ca", "es", "en"],
    resources: messages,
    interpolation: {
      prefix: "{",
      suffix: "}"
    },
  });

export const registerI18NextVue = (app: App): App => {
  return app.use(I18NextVue, { i18next });
}

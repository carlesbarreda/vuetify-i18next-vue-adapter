import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
//import Backend from 'i18next-fs-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import locales from '@intlify/unplugin-vue-i18n/messages';

// Translations provided by Vuetify
import { ca, es, en } from 'vuetify/locale';

// Types
import type { App } from 'vue';

export const messages = {
  ca: { translation: { $vuetify: ca, ...locales['ca'] } },
  es: { translation: { $vuetify: es, ...locales['es'] } },
  en: { translation: { $vuetify: en, ...locales['en'] } },
};

//.use(Backend)
i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    initImmediate: false,
    fallbackLng: 'en',
    //lng: 'ca',
    resources: messages,
    /*
    resources: {
      ...
    },
    */
    /*
    preload: readdirSync(join(__dirname, '../locales')).filter((fileName) => {
      const joinedPath = join(join(__dirname, '../locales'), fileName)
      const isDirectory = lstatSync(joinedPath).isDirectory()
      return isDirectory
    }),
    ns: 'backend-app',
    defaultNS: 'backend-app',
    backend: {
      loadPath: join(__dirname, '../locales/{{lng}}/{{ns}}.json')
    }
    */
  });

export function registerI18NextVue(app: App) {
  app.use(I18NextVue, { i18next });
}

// Vuetify
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Translations provided by Vuetify
//import { ca, es, en } from 'vuetify/locale';

// i18next-vue
import { i18nPromise, registerI18NextVue, createI18nextAdapter } from '@/plugins/i18next';

// Types
import type { App } from 'vue';

export { i18nPromise as i18nInitialized };

export const registerVuetify = (app: App): App => {
  registerI18NextVue(app);
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    locale: {
      /*
      locale: import.meta.env.APP_LOCALE ? import.meta.env.APP_LOCALE : 'ca',
      fallback: import.meta.env.APP_FALLBACK_LOCALE
        ? import.meta.env.APP_FALLBACK_LOCALE
        : 'ca',
      messages: { ca, es, en },
      */
      adapter: createI18nextAdapter({ app }),
    },
  });
  app.use(vuetify)
  return app;
}

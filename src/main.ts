import { createApp } from 'vue';
import './style.css';
import VApp from './App.vue';

import { i18nInitialized, registerVuetify } from '@/plugins';

import type { App } from 'vue';

let app: App;
await i18nInitialized.then(() => {
  app = createApp(VApp);
  registerVuetify(app)
  .mount('#app');
});

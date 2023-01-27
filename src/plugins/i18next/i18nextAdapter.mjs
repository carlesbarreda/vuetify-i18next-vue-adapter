import { computed, watch } from 'vue';
//import { useProxiedModel } from '../../composables/proxiedModel.mjs';
import { useProxiedModel } from 'vuetify/lib/composables/proxiedModel.mjs';
const createTranslateFunction = (t) => {
  return function (key) {
    for (
      var _len = arguments.length,
        params = new Array(_len > 1 ? _len - 1 : 0),
        _key = 1;
      _key < _len;
      _key++
    ) {
      params[_key - 1] = arguments[_key];
    }
    // Check if params are i18n style
    if (params.length == 1 && typeof params[0] === 'object') params = params[0];
    return t(key, params);
  };
};
function useProvided(props, prop, provided) {
  const internal = useProxiedModel(props, prop);
  internal.value = props[prop] ?? provided.value;
  watch(provided, (v) => {
    if (props[prop] == null) {
      internal.value = v;
    }
  });
  return internal;
}
function createProvideFunction(data) {
  return (props) => {
    //TODO: Check if it's working the provider
    console.log("Adapter i18next provide!!");
    const current = useProvided(props, 'locale', data.current);
    const fallback = useProvided(props, 'fallback', data.fallback);
    const messages = useProvided(props, 'messages', data.messages);
    const app = data._ref.app;
    const i18next = app.config.globalProperties.$i18next;
    watch(current, async (v) => {
      await i18next.changeLanguage(v);
    });
    return {
      name: 'i18next',
      current,
      fallback,
      messages,
      t: createTranslateFunction(app.config.globalProperties.$t),
      //TODO: n function
      n: (value) => value,
      provide: createProvideFunction({
        current,
        fallback,
        messages,
        _ref: { i18next, app },
      }),
    };
  };
}
export function createI18nextAdapter(_ref) {
  const { app } = _ref;
  const i18next = app.config.globalProperties.$i18next;
  const current = computed({
    get: () => { return i18next.languages[0]; },
    set: async (v) => { await i18next.changeLanguage(v); },
  });
  //TODO: fallback getter / setter
  const fallback = computed({
    get: () => { return i18next.options.fallbackLng?.default[0]; },
    set: (v) => {
      console.log("Adapter i18n set fallback");
    },
  });
  //TODO: messages getter / setter
  const messages = computed({
    get: () => {
      return {
        ca: i18next.options.resources?.ca.translation,
        es: i18next.options.resources?.es.translation,
        en: i18next.options.resources?.en.translation
      };
    },
    set: (v) => {
      console.log("Adapter i18next set messages");
    },
  });
  const adapter = {
    name: 'i18n',
    current,
    fallback,
    messages,
    t: createTranslateFunction(app.config.globalProperties.$t),
    //TODO: n function
    n: (value) => value,
    provide: createProvideFunction({
      current,
      fallback,
      messages,
      _ref: { app },
    }),
  };
  return adapter;
}
//TODO: How to generate the map file? # sourceMappingURL=i18nextAdapter.mjs.map

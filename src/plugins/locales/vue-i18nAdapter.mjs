import { watch } from 'vue';
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
    const current = useProvided(props, 'locale', data.current);
    const fallback = useProvided(props, 'fallback', data.fallback);
    const messages = useProvided(props, 'messages', data.messages);
    const i18n = data.useI18n({
      locale: current.value,
      fallbackLocale: fallback.value,
      messages: messages.value,
      useScope: 'local',
      legacy: false,
      inheritLocale: false,
    });
    watch(current, (v) => {
      i18n.locale.value = v;
    });
    return {
      name: 'vue-i18n',
      current,
      fallback,
      messages,
      // @ts-expect-error Type instantiation is excessively deep and possibly infinite
      t: createTranslateFunction(i18n.t),
      n: i18n.n,
      provide: createProvideFunction({
        current,
        fallback,
        messages,
        useI18n: data.useI18n,
      }),
    };
  };
}
export function createVueI18nAdapter(_ref) {
  let { i18n, useI18n } = _ref;
  const current = i18n.global.locale;
  const fallback = i18n.global.fallbackLocale;
  const messages = i18n.global.messages;
  return {
    name: 'vue-i18n',
    current,
    fallback,
    messages,
    //t: i18n.global.t,
    t: createTranslateFunction(i18n.global.t),
    n: i18n.global.n,
    provide: createProvideFunction({
      current,
      fallback,
      messages,
      useI18n,
    }),
  };
}
//TODO: How to generate the map file? # sourceMappingURL=vue-i18n.mjs.map

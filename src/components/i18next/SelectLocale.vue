<script setup lang="ts">
import { computed } from 'vue';

import { useTranslation } from "i18next-vue";
const { i18next, t } = useTranslation();

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string
  }>(),
  {
    modelValue: "en",
    label: 'locale',
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", modelValue: string): void;
}>();

const localeItems = computed(() => {
  let locales: LocaleItem[] = [];
  Object.entries(i18next.getResource(i18next.languages[0], "translation", "locales")).forEach((value) => {
    locales.push({ locale: value[0], name: value[1] as string });
  });
  return locales;
});

const localeItem = computed({
  get: () => ({ locale: props.modelValue, name: t("locales." + props.modelValue) }),
  set: (item) => emit("update:modelValue", item.locale),
});

/* Example usage
<SelectLocale v-model="locale" />
*/
</script>

<template>
  <v-select
    v-model="localeItem"
    :items="localeItems"
    item-title="name"
    item-value="locale"
    return-object
    :label="t(label)"
    class="pe-2"
  ></v-select>
</template>

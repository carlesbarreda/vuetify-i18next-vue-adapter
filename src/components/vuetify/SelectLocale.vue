<script setup lang="ts">
import { computed } from 'vue';
import { useLocale } from 'vuetify';

const { messages, t } = useLocale();

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
  // @ts-ignore
  Object.entries(messages.value[props.modelValue]["locales"]).forEach((value) => {
    // @ts-ignore
    //locales.push({ locale: value[0], name: messages.value[value[0]]["locales"][value[0]] });
    locales.push({ locale: value[0], name: t("locales." + value[0]) });
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

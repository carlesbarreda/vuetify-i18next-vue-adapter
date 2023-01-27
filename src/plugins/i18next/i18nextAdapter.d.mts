import { App, Ref } from 'vue';
import type { i18n } from 'i18next';

interface LocaleMessages {
    [key: string]: LocaleMessages | string;
}
interface LocaleOptions {
    messages?: LocaleMessages;
    locale?: string;
    fallback?: string;
    adapter?: LocaleInstance;
}
interface LocaleInstance {
    name: string;
    messages: Ref<LocaleMessages>;
    current: Ref<string>;
    fallback: Ref<string>;
    t: (key: string, ...params: unknown[]) => string;
    n: (value: number) => string;
    provide: (props: LocaleOptions) => LocaleInstance;
}

declare type I18nextAdapterParams = {
    app: App;
};
declare function createI18nextAdapter({ app }: I18nextAdapterParams): LocaleInstance;

export { createI18nextAdapter };

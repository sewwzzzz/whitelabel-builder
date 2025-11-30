import { naiveDateLocaleConfig } from "@/config/locale/dateLocale";
import { naiveLocaleConfig } from "@/config/locale/locale";
import { LocaleEnum } from "@/model/locale/LocaleEnum";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useLocaleStore = defineStore("locale", () => {
  const storageKey: string = 'locale';
  const supportLocales = Object.values(LocaleEnum);
  const { locale: i18nLocale } = useI18n();
  // state
  const locale = ref(LocaleEnum.EN);

  // getter Naive UI 主题变量
  const naiveLocale = computed(() => naiveLocaleConfig[locale.value]);
  const naiveDateLocale = computed(() => naiveDateLocaleConfig[locale.value]);

  // action
  function setLocale(newLocale: string): void {
    if (isSupport(newLocale)) {
      locale.value = newLocale;
      applyLocale();
    }
  }

  function initLocale(): void {
    const savedLocale = getLocaleFromLocal();
    if (savedLocale && isSupport(savedLocale)) {
      setLocale(savedLocale);
    } else {
      applyLocale();
    }
  }

  // 内部使用的私有函数-不暴露给外部
  function isSupport(newLocale: string): newLocale is LocaleEnum {
    return supportLocales.indexOf(newLocale as LocaleEnum) > -1;
  }

  function applyLocale() {
    i18nLocale.value = locale.value;
    persistLocale();
  }

  function persistLocale() {
    localStorage.setItem(storageKey, locale.value);
  }

  function getLocaleFromLocal(): string | null {
    return localStorage.getItem(storageKey);
  }

  return { locale, naiveLocale, naiveDateLocale, setLocale, initLocale }
})
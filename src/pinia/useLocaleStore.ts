import { naiveDateLocaleConfig } from "@/config/dateLocale";
import { naiveLocaleConfig } from "@/config/locale";
import { LocaleEnum } from "@/model/locale/LocaleEnum";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useLocaleStore = defineStore("locale", () => {
  const storageKey: string = 'locale';
  const supportLocales = Object.values(LocaleEnum);
  // state
  const locale = ref(LocaleEnum.EN);

  // getter Naive UI 主题变量
  const naiveLocale = computed(() => naiveLocaleConfig[locale.value]);
  const naiveDateLocale = computed(() => naiveDateLocaleConfig[locale.value]);

  // function
  function setLocale(newLocale: string): void {
    if (isSupport(newLocale)) {
      locale.value = newLocale;
      persistLocale();
    }
  }

  function initLocale(): void {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && isSupport(savedLocale)) {
      locale.value = savedLocale;
    }
  }

  // 内部使用的私有函数-不暴露给外部
  function isSupport(newLocale: string): newLocale is LocaleEnum {
    return supportLocales.indexOf(newLocale as LocaleEnum) > -1;
  }

  function persistLocale() {
    localStorage.setItem(storageKey, locale.value);
  }

  function getLocaleFromLocal(): string | null {
    return localStorage.getItem(storageKey);
  }

  return { locale, currentLocale }
})
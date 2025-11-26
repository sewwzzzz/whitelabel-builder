<script setup lang="ts">
import { onMounted, onUpdated, provide, ref, watch } from 'vue';

/* 钩子函数 */
onMounted(() => {
  // 初始化当前主题
  ThemeManager.initTheme();
  theme.value = getTheme();
  // 初始化当前语言
  LocaleManager.initLocale();
  [lan.value, dateLan.value] = getLocales();
  locale.value = LocaleManager.getCurrentLocale();
})

onUpdated(() => {
  console.log("App updated");
})

/* 主题切换 */
import type { NaiveThemeType } from "@/model/theme/NaiveThemeType";
import ThemeManager from '@/utils/themeManager';
import { darkTheme, dateZhCN, zhCN, type NDateLocale, type NLocale } from 'naive-ui';
import type { ThemeType } from './model/theme/ThemeType';

const theme = ref<NaiveThemeType>(null);

// 获取当前主题
const getTheme = (): NaiveThemeType => {
  return ThemeManager.getCurrentTheme() === 'dark' ? darkTheme : null;
}

// 切换主题，供子组件调用
provide("toggleTheme", () => {
  ThemeManager.toggleTheme();
  theme.value = getTheme();
})

// 设置主题，供子组件调用
provide("setTheme", (themeType: ThemeType) => {
  ThemeManager.setCurrentTheme(themeType);
  theme.value = getTheme();
})

// 获取当前主题，供子组件调用
provide("getTheme", () => {
  return ThemeManager.getCurrentTheme();
})

/* 语言切换 */
import LocaleManager from '@/utils/localeManager';
import type { LocaleType } from './model/locale/LocaleType';
import { useI18n } from 'vue-i18n';

let { locale } = useI18n();
const lan = ref<NLocale | null>(null);
const dateLan = ref<NDateLocale | null>(null);

// 获取当前语言
const getLocales = (): [NLocale | null, NDateLocale | null] => {
  return LocaleManager.getCurrentLocale() === 'zh' ? [zhCN, dateZhCN] : [null, null];
}

// 切换区域，供子组件调用
provide("toggleLocale", () => {
  LocaleManager.toggleLocale();
  [lan.value, dateLan.value] = getLocales();
  locale.value = LocaleManager.getCurrentLocale();
})

// 设置区域，供子组件调用
provide("setLocale", (newLocale: LocaleType) => {
  LocaleManager.setCurrentLocale(newLocale);
  [lan.value, dateLan.value] = getLocales();
  locale.value = LocaleManager.getCurrentLocale();
})

// 获取当前区域，供子组件调用
provide("getLocale", () => {
  return LocaleManager.getCurrentLocale();
})
</script>

<template>
  <n-config-provider :locale="lan" :date-locale="dateLan" :theme="theme">
    <locale-change></locale-change>
    <theme-change></theme-change>
    <n-date-picker />
    <n-global-style />
  </n-config-provider>
</template>

<style scoped lang="less">
span {
  color: var(--theme-text);
}
</style>

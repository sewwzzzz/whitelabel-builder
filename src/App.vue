<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';

/* 钩子函数 */
onMounted(() => {
  ThemeManager.initTheme();
  theme.value = getTheme();
})

/* 主题切换 */
import ThemeChange from '@/components/ThemeChange.vue'
import type { NaiveThemeType } from "@/model/NaiveThemeType";
import ThemeManager from '@/utils/themeManager';
import { darkTheme } from 'naive-ui';
import type { ThemeType } from './model/ThemeType';

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

// 获取当前主题
provide("getTheme", () => {
  return ThemeManager.getCurrentTheme();
})



</script>

<template>
  <n-config-provider :theme="theme">
    <theme-change></theme-change>
    <n-global-style />
  </n-config-provider>
  <span>theme test</span>
</template>

<style scoped lang="less">
span {
  color: var(--theme-text);
}
</style>

<script setup lang="ts">
import { inject, onUpdated } from 'vue';

/* 钩子函数 */
onUpdated(() => {
  console.log("ThemeChange updated");
})
/* 职责：调用App.vue中的业务函数进行主题切换 */
import type { ThemeType } from '@/model/theme/ThemeType';
const toggleTheme = inject<() => void>('toggleTheme');
const setTheme = inject<(theme: ThemeType) => void>('setTheme');
const getTheme = inject<() => ThemeType>('getTheme');

import { useI18n } from 'vue-i18n';

let { t } = useI18n();

const switchTheme = (theme: ThemeType) => {
  setTheme?.(theme);
}

const getButtonTheme = (): ThemeType => {
  console.log("1")
  return getTheme?.() || 'light';
}
</script>

<template>
  <n-card class="theme-change-card">
    <n-space class="theme-change-space" style="justify-content: space-between">
      <n-button @click="switchTheme('dark')" :type="getButtonTheme() === 'dark' ? 'primary' : 'default'">{{
        t('component.themeChange.dark') }}</n-button>
      <n-button @click="switchTheme('light')" :type="getButtonTheme() === 'light' ? 'primary' : 'default'">{{
        t('component.themeChange.light') }}</n-button>
      <n-button @click="toggleTheme">{{ t('component.themeChange.toggle') }}</n-button>
    </n-space>
  </n-card>
</template>

<style scoped lang="less">
.theme-change {

  &-card {
    width: 250px;
  }

  &-space {
    width: 100%;
  }
}

.theme-change-card :deep(.n-card__content) {
  padding: 4px;
}
</style>
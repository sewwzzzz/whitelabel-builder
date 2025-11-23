<script setup lang="ts">
import { inject } from 'vue';

/* 职责：调用App.vue中的业务函数进行主题切换 */
import type { ThemeType } from '@/model/ThemeType';
const toggleTheme = inject<() => void>('toggleTheme');
const setTheme = inject<(theme: ThemeType) => void>('setTheme');
const getTheme = inject<() => ThemeType>('getTheme');

const switchTheme = (theme: ThemeType) => {
  setTheme?.(theme);
}

const getButtonTheme = (): ThemeType => {
  return getTheme?.() || 'light';
}
</script>

<template>
  <n-card class="theme-change-card">
    <n-space class="theme-change-space" style="justify-content: space-between">
      <n-button @click="switchTheme('dark')" :type="getButtonTheme() === 'dark' ? 'primary' : 'default'">dark</n-button>
      <n-button @click="switchTheme('light')"
        :type="getButtonTheme() === 'light' ? 'primary' : 'default'">light</n-button>
      <n-button @click="toggleTheme">toggle</n-button>
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
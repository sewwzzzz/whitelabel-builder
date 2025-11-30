<script setup lang="ts">
import { onUpdated, ref } from 'vue';

/* 钩子函数 */
onUpdated(() => {
  console.log("ThemeChange updated");
})

/* 职责：调用App.vue中的业务函数进行主题切换 */
import { SWITCH_CONFIG } from '@/config/theme/themeChecks';
import { useThemeStore } from '@/pinia';

const themeStore = useThemeStore();
const switchConfig = SWITCH_CONFIG;
const handleTheme = (value: string) => {
  themeStore.setTheme(value);
}
</script>

<template>
  <n-switch class="theme-change" :value="themeStore.theme" :checked-value="switchConfig.CHECKED"
    :default-value="switchConfig.DEFAULT" :unchecked-value="switchConfig.UNCHECKED" @update:value="handleTheme">
    <template #checked-icon>
      <span class="builder-icon-dark builder-icon-container"></span>
    </template>
    <template #unchecked-icon>
      <span class="builder-icon-light builder-icon-container">
      </span>
    </template>
  </n-switch>
</template>

<style scoped lang="less">
.theme-change {}
</style>
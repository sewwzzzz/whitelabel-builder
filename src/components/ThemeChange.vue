<script setup lang="ts">
import { inject, type Ref } from 'vue';

// 职责：主题切换
import { darkTheme } from 'naive-ui';
import type { ThemeType } from "@/model/ThemeType";
const theme = inject<Ref<ThemeType>>('theme');
const changeTheme = (targetTheme: ThemeType) => {
  if (theme) {
    theme.value = targetTheme;
  }
}


</script>

<template>
  <n-card class="theme-change-card">
    <n-space class="theme-change-space">
      <n-button @click="changeTheme(darkTheme)">dark</n-button>
      <n-button @click="changeTheme(null)">light</n-button>
    </n-space>
  </n-card>
</template>

<style scoped lang="less">
.theme-change {

  &-card {
    width: 200px;
  }

  &-space {
    width: 100%;
    justify-content: space-between;
  }
}

.theme-change-card :deep(.n-card__content) {
  padding: 4px;
}

// :deep(.n-card__content) {
//   padding: 4px;
// }</style>
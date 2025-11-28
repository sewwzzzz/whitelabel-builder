<script setup lang="ts">
import { inject, onUpdated } from 'vue';

/* 钩子函数 */
onUpdated(() => {
  console.log("LocaleChange updated");
})

/* 职责：调用App.vue中的业务函数进行主题切换 */

</script>

<template>
  <n-card class="locale-change-card">
    <n-space class="locale-change-space" style="justify-content: space-between">
      <n-button @click="switchLocale('zh')" :type="getButtonLocale() === 'zh' ? 'primary' : 'default'">{{
        t('component.localeChange.zh') }}</n-button>
      <n-button @click="switchLocale('en')" :type="getButtonLocale() === 'en' ? 'primary' : 'default'">{{
        t('component.localeChange.en') }}</n-button>
      <n-button @click="toggleLocale">{{ t('component.localeChange.toggle') }}</n-button>
    </n-space>
    {{ t('component.localeChange.toggle') }}
  </n-card>
  {{ t('component.localeChange.toggle') }}
</template>

<style scoped lang="less">
.locale-change {

  &-card {
    width: 250px;
  }

  &-space {
    width: 100%;
  }
}

.locale-change-card :deep(.n-card__content) {
  padding: 4px;
}
</style>
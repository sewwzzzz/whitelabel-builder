<script setup lang="ts">
import { inject, onUpdated } from 'vue';

/* 钩子函数 */
onUpdated(() => {
  console.log("LocaleChange updated");
})

/* 职责：调用App.vue中的业务函数进行主题切换 */
import type { LocaleType } from '@/model/locale/LocaleType';
import { useI18n } from 'vue-i18n';
const toggleLocale = inject<() => void>('toggleLocale');
const setLocale = inject<(newLocale: LocaleType) => void>('setLocale');
const getLocale = inject<() => LocaleType>('getLocale');

let { t } = useI18n();

const switchLocale = (newLocale: LocaleType) => {
  setLocale?.(newLocale);
}

const getButtonLocale = (): LocaleType => {
  console.log("2")
  return getLocale?.() || 'zh';
}
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
<script setup lang="ts">
import { onMounted, onUpdated, provide, ref, watch } from 'vue';

/* 钩子函数 */
onMounted(() => {
  localeStore.initLocale();
  themeStore.initTheme();
})

onUpdated(() => {
  console.log("App updated");
})

/* 国际化 */
import { useLocaleStore } from './pinia';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const localeStore = useLocaleStore();

/* 主题切换 */
import { useThemeStore } from './pinia';
const themeStore = useThemeStore();
</script>

<template>
  <n-config-provider class="body-wrapper" :locale="localeStore.naiveLocale" :date-locale="localeStore.naiveDateLocale"
    :theme="themeStore.naiveTheme">
    <body-top class="body-top"></body-top>
    <body-left class="body-left"></body-left>
    <body-middle class="body-middle"></body-middle>
    <body-right class="body-right"></body-right>
    <n-global-style />
  </n-config-provider>
</template>

<style scoped lang="less">
@import url('./styles/common.less');

.body {
  &-wrapper {
    height: 100%;
    display: grid;
    grid-template-rows: 63px calc(100% - 65px);
    grid-template-columns: 400px calc(100% - 400px - 300px) 300px;
    gap: 2px 0;
    grid-template-areas:
      "top top top"
      "left middle right";
  }

  &-top {
    grid-area: top;
    .shadow-mixins(0, 2px, 4px);
  }

  &-left {
    grid-area: left;
    .shadow-mixins(2px, 0, 2px);
  }

  &-middle {
    grid-area: middle;
  }

  &-right {
    grid-area: right;
    .shadow-mixins(-2px, 0, 2px);
  }
}

span {
  color: var(--theme-text);
}
</style>

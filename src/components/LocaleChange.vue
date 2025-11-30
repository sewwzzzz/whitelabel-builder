<script setup lang="ts">
import { onUpdated } from 'vue';

/* 钩子函数 */
onUpdated(() => {
  console.log("LocaleChange updated");
})

/* props */
import { defineProps } from 'vue';
const props = defineProps({
  width: String
})

/* 职责：调用App.vue中的业务函数进行主题切换 */
import { useLocaleStore } from '@/pinia';
import { options } from '@/config/locale/localeOptions';
const localeStore = useLocaleStore();

// 设置语言
const handleLocale = (value: string) => {
  localeStore.setLocale(value);
}
const localeOptions = options;

/* 国际化 */
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

</script>

<template>
  <n-select class="locale-change" :style="{ width: props.width + 'px' }" :value="localeStore.locale"
    :options="localeOptions" :placeholder="t('component.localeChange.locale')" @update:value="handleLocale"
    :ellipsis-tag-popover-props="{
      trigger: 'hover',
      placement: 'bottom',
      showArrow: true,
    }">
  </n-select>
</template>

<style scoped lang="less">
.locale-change{}
</style>
<script setup lang="ts">
import { onMounted, onUpdated, provide, ref, watch } from 'vue';

/* 钩子函数 */
onMounted(() => {

})

onUpdated(() => {
  console.log("App updated");
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

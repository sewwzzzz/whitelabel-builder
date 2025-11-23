<script setup lang="ts">
import { provide, ref } from 'vue';

import ThemeChange from '@/components/ThemeChange.vue'
import type { ThemeType } from "@/model/ThemeType";
const theme = ref<ThemeType>(null);
provide('theme', theme);

</script>

<template>
  <n-config-provider :theme="theme">
    <theme-change></theme-change>
    <n-global-style />
  </n-config-provider>
</template>

<style scoped></style>

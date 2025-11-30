<script setup lang="ts">
</script>

<template>
  <div class="top-bar">
    <div></div>
    <div></div>
    <div class="top-bar-controls">
      <locale-change class="top-bar__locale" :width="'100'"></locale-change>
      <theme-change class="top-bar__theme"></theme-change>
    </div>
  </div>
</template>

<style scoped lang="less">
.top-bar {
  display: grid;
  grid-template-columns: 262px 1fr auto;
  padding: 0 10px;

  &-controls {
    // 对外
    height: 100%;

    // 对内
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__locale {}

  &__theme {}
}
</style>
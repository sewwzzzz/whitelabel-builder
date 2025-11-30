<script setup lang="ts">
import api from '@/utils/request/apiManager';
import { computed, ref } from 'vue';

const fileListLength = computed(() => fileList.value && fileList.value.length);
const fileList = ref<File[]>([]);
const fileInput = ref<HTMLInputElement>();

// 选择文件后的回调
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    fileList.value = Array.from(target.files);
  }
}

// 上传文件
async function handleClick() {
  if (!fileList.value[0]) {
    return;
  }
  try {
    const { name, type, size, lastModified } = fileList.value[0];
    const response = await api.files.create({
      name: name,
      type: type,
      size: size,
      lastModified: lastModified
    });
    if (response.success) {
      console.log('添加成功');
    }
  } catch (error) {
    console.log('添加失败', error);
  }
}

// 触发原生文件选择
function triggerFileSelect() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}
</script>

<template>
  <div>
    <n-button :disabled="!fileListLength" style="margin-bottom:12px" @click="handleClick">上传文件</n-button>
    <n-button @click="triggerFileSelect">选择文件</n-button>
    <input type="file" multiple ref="fileInput" @change="handleFileChange">
  </div>
</template>

<style scoped lang="less">
input {
  display: none;
}
</style>
<template>
  <div>
    <el-button @click="open">文件类型</el-button>
    <!-- test - 文件类型 -->
    <JyDocumentTypeDialogTest v-if="show" v-model:show="show">
    </JyDocumentTypeDialogTest>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import JyDocumentTypeDialogTest from '@/views/components/modules/JyDocumentTypeDialog'
  const show = ref(false)
  const open = () => {
    show.value = true
  }
</script>

<style lang="scss" scoped></style>

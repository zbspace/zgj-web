<template>
  <div>
    <el-button @click="open">文件类型</el-button>
    <el-button @click="open1">文件类型</el-button>
    <!-- test - 文件类型 -->
    <JyDocumentTypeDialogTest v-if="show" v-model:show="show">
    </JyDocumentTypeDialogTest>
    <KDocumentTypeDialogTest
      v-if="show1"
      v-model:show="show1"
      :multiple="false"
    >
    </KDocumentTypeDialogTest>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import JyDocumentTypeDialogTest from '@/views/components/modules/JyDocumentTypeDialog'
  import KDocumentTypeDialogTest from '@/views/components/modules/KDocumentTypeDialog'
  const show = ref(false)
  const show1 = ref(false)
  const open = () => {
    show.value = true
  }
  const open1 = () => {
    show1.value = true
  }
</script>

<style lang="scss" scoped></style>

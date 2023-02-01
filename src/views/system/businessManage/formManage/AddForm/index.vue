<template>
  <div>
    <el-dialog
      v-model="isVisible"
      title="add form"
      fullscreen
      class="add-form-dialog"
    >
      <jy-vform ref="vformRef" />
      <template #footer>
        <el-button @click="cancel"> 取消 </el-button>
        <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  const vformRef = ref(null)
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const cancel = () => {
    emit('update:modelValue', false)
  }
  const handleSubmit = () => {
    emit('update:modelValue', true)
    console.log('vform--->', vformRef.value.getFormJson())
  }
</script>

<style lang="scss" scoped>
  :deep(.add-form-dialog) {
    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 0 24px;
      height: calc(100% - 63px);
      overflow: auto;
    }

    .el-dialog__footer {
      border-top: 1px solid #e9ebec;
    }
  }
</style>

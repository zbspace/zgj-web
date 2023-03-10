<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @LastEditTime 2023-03-09 10:57:15
!-->
<template>
  <div class="jy-table">
    <el-table
      :data="props.data"
      :row-key="rowKey"
      stripe
      v-loading="props.loading"
      ref="tableRef"
      @selection-change="selectionChange"
      @current-change="handleCurrentChange"
      :highlight-current-row="highlightCurrentRow"
    >
      <slot> 内容 </slot>
    </el-table>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const tableRef = ref(null)
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 单选
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    // 多选指定key
    rowKey: {
      type: String,
      default: 'id'
    }
  })

  const emit = defineEmits(['selection-change'])

  const getSelectData = () => {
    console.log(tableRef.value)
    return tableRef.value
  }

  const selectionChange = selection => {
    emit('selection-change', selection)
  }

  const handleCurrentChange = selection => {
    emit('selection-change', selection)
  }

  defineExpose({
    getSelectData
  })
</script>

<style lang="scss" scoped>
  .jy-table {
    :deep(.el-table) {
      .el-table__header {
        .el-table__cell {
          background: rgba(0, 0, 0, 0.06);
          padding: 12px 0;
        }
      }
      .el-table__body {
        .el-table__row--striped {
          .el-table__cell {
            background: rgba(0, 0, 0, 0.02);
          }
        }
      }
    }
  }
</style>

<template>
  <div class="jy-pagination">
    <el-pagination
      :current-page="props.page"
      :page-size="props.pageSize"
      background
      layout="total, sizes,slot, prev, pager, next, jumper"
      :total="props.total"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
      <div class="slot-block">&emsp;</div>
    </el-pagination>
  </div>
</template>

<script setup>
  import {} from 'vue'

  const props = defineProps({
    page: {
      // 页码
      type: Number,
      default: 1
    },

    pageSize: {
      // 每页大小
      type: Number,
      default: 10
    },

    total: {
      type: Number,
      default: 0
    },

    loadList: {
      type: Function,
      default: () => {}
    }
  })

  const emit = defineEmits(['update:page', 'update:pageSize'])

  const handleCurrentChange = page => {
    emit('update:page', page)
    props.loadList()
  }

  const handleSizeChange = pageSize => {
    emit('update:page', 1)
    emit('update:pageSize', pageSize)
    props.loadList()
  }
</script>

<style lang="scss" scoped>
  .jy-pagination {
    padding: 12px 0;
    :deep(.el-pagination) {
      display: flex;
      justify-content: flex-start;
      position: relative;
      .slot-block {
        flex: 1;
      }
      .el-pagination__total {
        position: left 0;
      }
    }
  }
</style>

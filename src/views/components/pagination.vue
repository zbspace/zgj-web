<template>
  <div class="components-pagination">
    <div class="ap-desc">
      <div class="ap-desc-text">
        共 {{ props.data.amount }} 条记录 第 {{ props.data.index }} /
        {{ Math.ceil(props.data.amount / props.data.pageNumber) || 1 }} 页
      </div>
      <div>
        <el-pagination
          v-bind="state.props.sizeAttribute"
          @size-change="sizeChange"
          @current-change="currentChange"
          :page-sizes="[10, 50, 100]"
        >
          <slot></slot>
        </el-pagination>
      </div>
    </div>
    <div class="ap-box">
      <el-pagination
        v-bind="state.props.defaultAttribute"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
        <slot></slot>
      </el-pagination>
    </div>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted } from 'vue'
  const props = defineProps({
    // 标识
    refs: {
      type: String,
      default: ''
    },
    // 处理类型
    type: {
      type: String,
      default: '0'
    },
    // 分页数据
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 默认属性
    defaultAttribute: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  const emit = defineEmits(['size-change', 'current-change'])
  const state = reactive({
    props: {
      defaultAttribute: {},
      sizeAttribute: {}
    }
  })
  // 处理默认设置
  function disDefaultAttribute() {
    const AttributeName = [
      'page-size',
      'default-page-size',
      'total',
      'page-count',
      'pager-count',
      'current-page',
      'default-current-page'
    ]
    state.props.defaultAttribute = props.defaultAttribute
    const sizeAttribute = {}
    for (const key in state.props.defaultAttribute) {
      if (key === 'layout') {
        sizeAttribute[key] = 'sizes'
      } else {
        sizeAttribute[key] = props.defaultAttribute[key]
      }
      if (
        Object.prototype.toString.call(state.props.defaultAttribute[key]) ===
        '[object String]'
      ) {
        if (AttributeName.indexOf(key) > -1) {
          state.props.defaultAttribute[key] = parseFloat(
            state.props.defaultAttribute[key]
          )
        }
      } else if (
        Object.prototype.toString.call(state.props.defaultAttribute[key]) ===
        '[object Array]'
      ) {
        // console.log();
      }
    }
    state.props.sizeAttribute = sizeAttribute
    // console.log(state.props.sizeAttribute)
  }
  //
  function sizeChange(val) {
    // console.log(val);
    emit('size-change', val)
  }
  //
  function currentChange(val) {
    // console.log(val);
    emit('current-change', val)
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 处理默认设置
    disDefaultAttribute()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .components-pagination {
    margin: 0%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .ap-desc {
      display: flex;
      align-items: center;
      .ap-desc-text {
        margin-right: 0.5rem;
        color: var(--jy-color-text-1);
      }
    }
    /* 分页 */
    :deep {
      .el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
        background-color: var(--jy-primary-6);
        color: var(--jy-in-common-use-1);
      }

      .el-pagination.is-background .el-pager li {
        background-color: rgba($color: #000000, $alpha: 0);
      }

      .el-pagination.is-background .el-pager li:hover {
        background-color: var(--jy-color-fill--2);
      }

      .el-pagination.is-background .btn-prev:disabled {
        background-color: rgba($color: #000000, $alpha: 0);
      }

      .el-pagination.is-background .btn-next {
        background-color: rgba($color: #000000, $alpha: 0);
      }

      .el-pagination.is-background .btn-prev {
        background-color: rgba($color: #000000, $alpha: 0);
      }

      .components-pagination[data-v-26def509]
        .ap-box
        .el-pagination.is-background
        .btn-prev {
        background-color: rgba($color: #000000, $alpha: 0);
      }
      .el-pagination button:hover {
        color: var(--jy-primary-6);
      }
    }
  }
</style>

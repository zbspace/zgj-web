<template>
  <div class="flow-app">
    <a-space direction="vertical" class="w-fill">
      <a-row :gutter="8">
        <a-col :span="6">
          <a-card>
            <div class="app-todo">
              <a-row>
                <a-col :span="12" class="mt-icon">
                  <bell-two-tone />
                </a-col>
                <a-col :span="12">
                  <div class="mt-title" @click="toPath('todo')">我的代办</div>
                  <div class="mt-value">59</div>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
        <a-col :span="18">
          <a-card>
            <a-row>
              <a-col :span="6">
                <div class="app-task">
                  <div class="app-task-icon">
                    <play-square-two-tone />
                  </div>
                  <span class="app-task-title" @click="toPath('applyed')"
                    >我发起的</span
                  >
                </div>
              </a-col>
              <a-col :span="6">
                <div class="app-task">
                  <div class="app-task-icon">
                    <carry-out-two-tone />
                  </div>
                  <span class="app-task-title" @click="toPath('done')"
                    >我处理的</span
                  >
                </div>
              </a-col>
              <a-col :span="6">
                <div class="app-task">
                  <div class="app-task-icon">
                    <sound-two-tone />
                  </div>
                  <span class="app-task-title" @click="toPath('copyer')"
                    >抄送我的</span
                  >
                </div>
              </a-col>
              <a-col :span="6">
                <div class="app-task">
                  <div class="app-task-icon">
                    <file-add-two-tone />
                  </div>
                  <span class="app-task-title">发起流程</span>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>

      <a-card title="我的流程">
        <template #extra>
          <a-button type="primary" :size="size" shape="round">
            <template #icon>
              <plus-outlined />
            </template>
            <span>创建</span>
          </a-button>
        </template>
        <a-row>
          <a-col :span="4">
            <div class="app-item">
              <div class="low-app-icon size-middle back-color-1">
                <home-outlined />
              </div>
              <div class="app-item-name">门户应用</div>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="app-item">
              <div class="low-app-icon size-middle back-color-2">
                <home-outlined class="app-iconify" />
              </div>
              <div class="app-item-name">门户应用</div>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="app-item">
              <div class="low-app-icon size-middle back-color-7">
                <home-outlined class="app-iconify" />
              </div>
              <div class="app-item-name">门户应用</div>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="app-item">
              <div class="low-app-icon size-middle back-color-3">
                <home-outlined class="app-iconify" />
              </div>
              <div class="app-item-name">门户应用</div>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="app-item">
              <div class="low-app-icon size-middle back-color-4">
                <home-outlined class="app-iconify" />
              </div>
              <div class="app-item-name">门户应用</div>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="app-item">
              <div class="low-app-icon size-middle back-color-5">
                <home-outlined class="app-iconify" />
              </div>
              <div class="app-item-name">门户应用</div>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="app-item">
              <div class="low-app-icon size-middle back-color-6">
                <home-outlined class="app-iconify" />
              </div>
              <div class="app-item-name">门户应用</div>
            </div>
          </a-col>
        </a-row>
      </a-card>
    </a-space>
  </div>
</template>
<script setup>
  import { ref, watch, computed, onMounted } from 'vue'
  import useCommon from '../hooks/useCommon'
  // 公共方法
  const { getflowIcon, size } = useCommon()
  const emit = defineEmits([
    'done',
    'rename',
    'sort',
    'del',
    'design',
    'edit',
    'stop',
    'move',
    'click'
  ])
  //  数据
  const categoryDatas = ref([])
  // 默认展开
  const defaultActiveKey = ref([...new Array(100).keys()])
  // 图标
  const iconList = ref([])

  // 接收属性
  const props = defineProps({
    datasource: {
      type: [Array, Function],
      required: true
    },
    width: {
      type: Number,
      required: false,
      default: 100
    },
    readable: {
      type: Boolean,
      default: false
    }
  })

  /**
   * 监听值变化
   */
  watch(
    () => props.datasource,
    newVal => {
      reload(newVal)
    }
  )

  /**
   * 图标
   */
  const activeIconSrc = computed(() => {
    return activeIcon => {
      const icon = iconList.value.find(t => t.name_suffix === activeIcon)
      return icon ? icon.url : ''
    }
  })

  /**
   * 表单面板样式
   */
  const modelPanelStyle = computed(() => {
    const width = props.width + '%'
    return {
      width
    }
  })

  onMounted(() => {
    reload()
    iconList.value = getflowIcon()
  })

  const reload = () => {
    if (Array.isArray(props.datasource)) {
      categoryDatas.value = props.datasource
      defaultActiveKey.value = [...new Array(categoryDatas.value.length).keys()]
      emit('done', props.datasource)
    } else if (typeof props.datasource === 'function') {
      props
        .datasource()
        .then(result => {
          categoryDatas.value = result
          defaultActiveKey.value = [
            ...new Array(categoryDatas.value.length).keys()
          ]
          emit('done', result)
        })
        .catch(e => {
          console.error(
            'datasource \u8FD4\u56DE\u7684\u6570\u636E\u9519\u8BEF: ',
            e == null ? void 0 : e.message
          )
        })
    }
  }

  /**
   * 重命名
   * @param {*} record
   */
  const rename = record => {
    emit('rename', record)
  }

  /**
   * 分类排序
   * @param {*} record
   */
  const sort = (record, type) => {
    emit('sort', record, type)
  }

  /**
   * 删除分类
   * @param {*} record
   */
  const delCategory = record => {
    emit('del', record)
  }

  /**
   * 设计
   * @param {*} record
   */
  const design = record => {
    emit('design', record)
  }

  /**
   * 编辑
   * @param {*} record
   */
  const edit = record => {
    emit('edit', record)
  }

  /**
   * 停用
   * @param {*} record
   */
  const stop = record => {
    emit('stop', record)
  }

  /**
   * 移动
   * @param {*} record
   */
  const move = record => {
    emit('move', record)
  }

  /**
   * 点击
   * @param {*} record
   */
  const click = record => {
    emit('click', record)
  }

  defineExpose({
    reload
  })
</script>

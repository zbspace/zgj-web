<template>
  <div class="flow-manage">
    <a-row v-if="readable" :gutter="8">
      <a-col :span="6">
        <a-card>
          <div class="app-todo" @click="toPath('todo')">
            <a-row>
              <a-col :span="12" class="mt-icon">
                <bell-two-tone />
              </a-col>
              <a-col :span="12">
                <div class="mt-title">我的代办</div>
                <div class="mt-value">{{ taskCountDatas }}</div>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card>
          <a-row>
            <a-col :span="6">
              <div class="app-task" @click="toPath('applyed')">
                <div class="app-task-icon">
                  <play-square-two-tone />
                </div>
                <span class="app-task-title">我发起的</span>
              </div>
            </a-col>
            <a-col :span="6">
              <div class="app-task" @click="toPath('done')">
                <div class="app-task-icon">
                  <carry-out-two-tone />
                </div>
                <span class="app-task-title">我处理的</span>
              </div>
            </a-col>
            <a-col :span="6">
              <div class="app-task" @click="toPath('copyer')">
                <div class="app-task-icon">
                  <sound-two-tone />
                </div>
                <span class="app-task-title">抄送我的</span>
              </div>
            </a-col>
            <a-col :span="6">
              <div class="app-task" @click="toPath('draft')">
                <div class="app-task-icon">
                  <file-add-two-tone />
                </div>
                <span class="app-task-title">我的草稿</span>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <a-card class="model-panel" :style="modelPanelStyle">
      <a-collapse
        ghost
        expand-icon-position="right"
        :defaultActiveKey="defaultActiveKey"
      >
        <template #expandIcon="{ isActive }">
          <caret-right-outlined :rotate="isActive ? 90 : 0" />
        </template>
        <a-collapse-panel
          :key="i"
          v-for="(category, i) in categoryDatas"
          forceRender
        >
          <template #header>
            <a-space>
              <span style="padding-left: 12px; font-size: 16px">{{
                category.categoryName
              }}</span>
              <!--              <a-divider type="vertical" />-->
              <!--              <a-dropdown v-if="!readable && category.categoryId != -1" @click.stop>-->
              <!--                <a class="ant-dropdown-link">-->
              <!--                  <span>分类编辑 </span>-->
              <!--                  <down-outlined />-->
              <!--                </a>-->
              <!--                <template #overlay>-->
              <!--                  <a-menu>-->
              <!--                    <a-menu-item>-->
              <!--                      <a-button type="link" @click="rename(category)">重命名</a-button>-->
              <!--                    </a-menu-item>-->
              <!--                    <a-menu-item>-->
              <!--                      <a-button type="link" @click="sort(category, 1)">排序</a-button>-->
              <!--                    </a-menu-item>-->
              <!--                    <a-menu-item>-->
              <!--                      <a-popconfirm placement="topRight" title="确定删除？" @confirm="delCategory(category)">-->
              <!--                        <a-button type="link" class="ele-text-danger">删除</a-button>-->
              <!--                      </a-popconfirm>-->
              <!--                    </a-menu-item>-->
              <!--                  </a-menu>-->
              <!--                </template>-->
              <!--              </a-dropdown>-->
            </a-space>
          </template>
          <a-row type="flex" :gutter="16">
            <a-col
              :xs="24"
              :sm="12"
              :md="12"
              :lg="6"
              :xl="6"
              class="card-out"
              v-for="(data, k) in category.modelList"
              :key="k"
              @click="click(data)"
            >
              <a-tooltip :content="data.modelName">
                <div class="card-in">
                  <FlowIcon :url="activeIconSrc(data.modelIcon)" />
                  <a-space direction="vertical">
                    <div class="first-edit">
                      <strong>
                        <span> {{ data.modelName }}</span>
                        <span v-if="!readable">
                          ({{ data.currentVersion }})</span
                        >
                      </strong>
                      <a-dropdown v-if="!readable" @click.stop="">
                        <a class="ant-dropdown-link">
                          配置 <down-outlined />
                        </a>
                        <template #overlay>
                          <a-menu>
                            <a-menu-item v-if="category.categoryId != -1">
                              <a-button type="link" @click="design(data)"
                                >设计</a-button
                              >
                            </a-menu-item>
                            <a-menu-item v-if="category.categoryId != -1">
                              <a-button type="link" @click="edit(data)"
                                >修改</a-button
                              >
                            </a-menu-item>
                            <!--                            <a-menu-item v-if="category.categoryId != -1">-->
                            <!--                              <a-button type="link" @click="sort(data, 2)">排序</a-button>-->
                            <!--                            </a-menu-item>-->
                            <a-menu-item v-if="category.categoryId != -1">
                              <a-button type="link" @click="move(data)"
                                >移动</a-button
                              >
                            </a-menu-item>
                            <a-menu-item v-if="category.categoryId != -1">
                              <a-button type="link" @click="stop(data)"
                                >停用</a-button
                              >
                            </a-menu-item>
                            <a-menu-item v-if="category.categoryId == -1">
                              <a-button type="link" @click="open(data)"
                                >启用</a-button
                              >
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                    <div>{{ data.createTime }}</div>
                    <div>{{ data.remark }}</div>
                  </a-space>
                </div>
              </a-tooltip>
            </a-col>
          </a-row>
        </a-collapse-panel>
      </a-collapse>
    </a-card>
  </div>
</template>
<script setup>
  import { ref, watch, computed, onMounted } from 'vue'
  import useCommon from '../hooks/useCommon'
  // 公共方法
  const { getflowIcon } = useCommon()

  //  数据
  const categoryDatas = ref([])

  //  数据
  const taskCountDatas = ref(0)

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
    taskCount: {
      type: [Array, Function],
      required: false,
      default: () => []
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
      reloadDatasource(newVal)
    }
  )

  /**
   * 图标
   */
  const activeIconSrc = computed(() => {
    return activeIcon => {
      const icon = iconList.value.find(t => t.name_suffix == activeIcon)
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
    reloadIcon()
    reloadDatasource()
    reloadCount()
  })

  const reloadIcon = () => {
    iconList.value = getflowIcon()
  }

  const reloadDatasource = () => {
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

  const reloadCount = () => {
    if (Array.isArray(props.taskCount)) {
      taskCountDatas.value = props.taskCount
      emit('done', props.taskCount)
    } else if (typeof props.taskCount === 'function') {
      props
        .taskCount()
        .then(result => {
          taskCountDatas.value = result
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

  const emit = defineEmits([
    'toPath',
    'done',
    'rename',
    'sort',
    'del',
    'design',
    'edit',
    'stop',
    'open',
    'move',
    'click'
  ])

  /**
   * 路由跳转
   * @param {*} record
   */
  const toPath = path => {
    emit('toPath', path)
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
   * 启用
   * @param {*} record
   */
  const open = record => {
    emit('open', record)
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
    reloadDatasource
  })
</script>

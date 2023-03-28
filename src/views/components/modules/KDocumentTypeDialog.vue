<template>
  <JyDialog
    @update:show="props.show"
    :show="props.show"
    :title="title"
    @close="closeDialog"
    @confirm="confirmDialog"
    :confirmText="$t('t-zgj-select.confirm')"
    :concelText="$t('t-zgj-operation.cancel')"
    centerBtn
    :height="574"
    :width="900"
  >
    <div class="selection-content">
      <!-- left -->
      <div class="selection-left user-select">
        <!-- tab栏 -->

        <div v-if="firstShow">
          <KDocument
            ref="kdocument"
            :initQueryParams="props.queryParams"
            :apiModule="apiModule"
            :allSelected="allSelected"
            @update:allSelected="allSelected = $event"
            :multiple="props.multiple"
          ></KDocument>
        </div>
      </div>

      <!-- right -->
      <div class="selection-right user-select">
        <div class="select-right-column c-p">
          <div class="clear-n">
            已选：
            <span v-if="allSelected.length !== 0">
              {{ allSelected.length }} 个文件类型
            </span>
          </div>
          <div class="select-close clear-t" @click="clearSelected">
            {{ $t('t-zgj-dialog-clear') }}
          </div>
        </div>

        <!-- 文件类型 -->
        <div
          class="select-right-column p"
          v-for="(item, index) in allSelected"
          :key="index"
        >
          <div class="select-right-label">
            <div style="margin-right: 10px">
              <svg
                width="12"
                height="19"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1 0C0.447715 0 0 0.447715 0 1V10C0 10.5523 0.447715 11 1 11H9C9.55228 11 10 10.5523 10 10V3.38462L8.33333 1.69231L6.66667 0H1ZM4.16667 2.53846H1.66667V3.38462H4.16667V2.53846ZM1.66667 5.07692H8.33333V5.92308H1.66667V5.07692ZM8.33333 7.61539H1.66667V8.46154H8.33333V7.61539Z"
                  fill="black"
                  fill-opacity="0.25"
                />
              </svg>
            </div>
            <div class="select-label">{{ item.name || item.fileTypeName }}</div>
          </div>
          <div style="display: flex; height: 25px">
            <el-switch
              v-model="item.includeChild"
              v-if="item.haveChildren && props.multiple"
              style="margin-right: 12px"
              @change="changeSwitch($event, item)"
            >
            </el-switch>

            <div class="select-close" @click="concelSelected(item)">
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.4375 7C0.4375 3.4375 3.4375 0.4375 7 0.4375C10.5625 0.4375 13.5625 3.4375 13.5625 7C13.5625 10.5625 10.5625 13.5625 7 13.5625C3.4375 13.5625 0.4375 10.5625 0.4375 7ZM9.8125 9.71875C10.0938 9.53125 10.0938 9.15625 9.8125 8.875L7.9375 7L9.90625 5.03125C10.1875 4.75 10.1875 4.375 9.90625 4.09375C9.625 3.8125 9.25 3.8125 8.96875 4.09375L7 6.0625L5.125 4.1875C4.9375 3.90625 4.5625 3.90625 4.28125 4.1875C4 4.46875 4 4.84375 4.28125 5.03125L6.15625 6.90625L4.1875 8.875C3.90625 9.0625 3.90625 9.53125 4.1875 9.8125C4.46875 10.0938 4.84375 10.0938 5.125 9.8125L7.09375 7.84375L8.96875 9.71875C9.15625 10 9.53125 10 9.8125 9.71875Z"
                  fill="black"
                  fill-opacity="0.25"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </JyDialog>
</template>

<script setup>
  /**
   * selectedStatus 0(未选中) 2（全部）
   * includeChild 向下包含 Boolean
   * apiModule: api对应的模块
   * queryParams: 请求参数
   * editDeploy: 修改选中项时，初始化已选
   * searchSelected: 高级搜索已选状态
   * multiple 是否多选
   */
  import i18n from '@/utils/i18n'
  import { ref } from 'vue'
  import KDocument from './modules/KDocument.vue'
  import Api from '@/api/common/organOrPerson'
  import { ElMessage } from 'element-plus'
  const emits = defineEmits(['update:show', 'update:searchSelected'])

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    apiModule: {
      type: String,
      default: 'systemOrganOrPerson'
    },
    queryParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    editDeploy: {
      type: Boolean,
      default: false
    },
    searchSelected: {
      type: Array,
      default: () => {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: true
    }
  })

  // 消息 tabs
  const title = ref('')
  title.value = i18n.global.t('t-zgj-process.SelectUseType')
  // 选中数据
  const allSelected = ref(props.searchSelected || [])

  const firstShow = ref(false)
  const apiInterface = (params, apiKey) => {
    return new Promise((resolve, reject) => {
      Api[props.apiModule]
        [apiKey](params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  // 获取选中数据 - 修改时
  if (props.editDeploy) {
    const paramsKey = Api[props.apiModule].key
    apiInterface(props.queryParams[paramsKey], 'selected').then(res => {
      allSelected.value = res.data.organs
      firstShow.value = true
    })
  } else {
    firstShow.value = true
  }

  if (props.searchSelected.length > 0) {
    // allSelected.value = toRefs(props.searchSelected)
    allSelected.value = props.searchSelected.filter(
      item => item.type === 'document'
    )
  }

  const kdocument = ref(null)
  // 清空选中项
  const clearSelected = () => {
    kdocument.value.clearSelected()
  }

  // 取消选中项
  const concelSelected = attr => {
    kdocument.value.concelSelected(attr)
  }

  // 监听 向下包含 切换
  const changeSwitch = (switchStatus, attr) => {
    kdocument.value.changeSwitch(switchStatus, attr)
  }

  // 关闭弹窗
  const closeDialog = () => {
    emits('update:show', false)
  }
  // 导出数据
  const changeResult = ref([])
  const confirmDialog = () => {
    const saveParams = {
      ...props.queryParams,
      organs: allSelected.value
    }
    // 编辑
    if (props.editDeploy) {
      apiInterface(saveParams, 'save')
        .then(res => {
          ElMessage.success(res.msg || '操作成功')
          emits('update:show', false)
        })
        .catch(() => {
          // emits('update:show', false)
        })
      return
    }

    // 非编辑 - 导出（相应模式）
    changeResult.value = changeResult.value.concat(allSelected.value)

    emits('update:searchSelected', changeResult.value)
    emits('update:show', false)
    changeResult.value = []
  }
</script>

<style lang="scss" scoped>
  svg {
    vertical-align: middle;
  }
  .selection-content {
    display: flex;
    height: 100%;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: -12px;
      left: 50%;
      height: calc(100% + 24px);
      width: 1px;
      background: rgba($color: #000000, $alpha: 0.05);
    }
    .selection-left {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .selection-right {
      flex: 1;
      // height: 380px;
      overflow-y: auto;

      .select-right-column {
        display: flex;
        justify-content: space-between;

        .select-right-label {
          display: flex;
        }

        .select-label {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
        }

        .select-close {
          cursor: pointer;
          padding-top: 5px;
        }

        .clear-t {
          color: #d04d3e;
          font-size: 14px;
          cursor: pointer;
        }

        .clear-n {
          color: rgba(0, 0, 0, 0.85);
        }
      }

      .p {
        padding: 8px 0px 8px 24px;
      }

      .c-p {
        padding: 6px 0px 12px 24px;
      }
    }
  }
</style>

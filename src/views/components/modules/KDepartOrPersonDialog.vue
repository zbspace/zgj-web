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
    :noScroll="false"
  >
    <template #noScroll>
      <div class="selection-content">
        <!-- left -->
        <div class="selection-left user-select">
          <!-- tab栏 -->
          <div>
            <VTabs
              :active="active"
              :label="tabsLabel"
              @update:active="active = $event"
              :border="false"
            ></VTabs>
          </div>
          <div v-if="firstShow" style="height: 100%">
            <KDepartTab
              ref="kdepart"
              :initQueryParams="props.queryParams"
              apiModule="publicTypeApi"
              :selectedDepart="selectedDepart"
              @update:selectedDepart="selectedDepart = $event"
              v-show="active === 'organ'"
              :multiple="props.multiple"
              :max="props.max"
              :hasTopRoot="props.hasTopRoot"
            ></KDepartTab>

            <KUserTab
              ref="kuser"
              :initQueryParams="props.queryParams"
              apiModule="publicTypeApi"
              :selectedUser="selectedUser"
              @update:selectedUser="selectedUser = $event"
              v-show="active === 'user'"
              :multiple="props.multiple"
              :max="props.max"
            ></KUserTab>

            <KRoleTab
              ref="krole"
              :initQueryParams="props.queryParams"
              apiModule="publicTypeApi"
              :selectedRole="selectedRole"
              @update:selectedRole="selectedRole = $event"
              v-show="active === 'role'"
              :multiple="props.multiple"
              :max="props.max"
            ></KRoleTab>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; flex: 1">
          <div class="select-right-column c-p">
            <div class="clear-n">
              {{ $t('t-zgj-selectPerson.Selected') }}：
              <span v-if="selectedDepart.length !== 0">
                {{ selectedDepart.length }} {{ $t('t-zgj-sync.Department') }}
              </span>
              &nbsp;
              <span v-if="selectedUser.length !== 0">
                {{ selectedUser.length }} {{ $t('t-zgj-sync.Person') }}
              </span>
              &nbsp;
              <span v-if="selectedRole.length !== 0">
                {{ selectedRole.length }} {{ $t('t-zgj-person.Role') }}
              </span>
            </div>
            <div
              class="select-close clear-t"
              @click="clearSelected"
              v-show="
                selectedDepart.length +
                  selectedUser.length +
                  selectedRole.length !==
                0
              "
            >
              {{ $t('t-zgj-dialog-clear') }}
            </div>
          </div>
          <!-- right -->
          <el-scrollbar class="user-select" always>
            <div
              v-show="
                selectedDepart.length +
                  selectedUser.length +
                  selectedRole.length ===
                0
              "
              class="null-img"
            >
              <img src="@/assets/svg/common/data_null.svg" />
            </div>

            <!-- 部门 -->
            <div
              class="select-right-column p"
              v-for="(item, index) in selectedDepart"
              :key="index"
            >
              <div class="select-right-label">
                <div style="margin-right: 10px">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      opacity="0.01"
                      width="16"
                      height="16"
                      fill="#3E78D0"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6 1H10V5H8.5V5.86365H14H14.5V6.36365V10H16V14H12V10H13.5V6.86365H8.5V10H10V14H6V10H7.5V6.86365H2.5V10H4V14H0V10H1.5V6.36365V5.86365H2H7.5V5H6V1Z"
                      fill="#3E78D0"
                    />
                  </svg>
                </div>
                <div
                  class="select-label"
                  :style="
                    item.haveChildren && props.multiple ? '' : 'width: 340px'
                  "
                  >{{ item.name }}</div
                >
              </div>
              <div style="display: flex; height: 25px">
                <el-switch
                  v-model="item.includeChild"
                  active-value="1"
                  inactive-value="0"
                  v-if="
                    item.haveChildren && props.multiple && props.haveIncluded
                  "
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

            <!-- 员工 -->
            <div
              class="select-right-column p"
              v-for="(item, index) in selectedUser"
              :key="index"
            >
              <div class="select-right-label">
                <div style="margin-right: 10px">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.45074 6.56143C3.49208 6.00794 2.90152 4.98507 2.90152 3.8781C2.90152 2.77114 3.49208 1.74826 4.45074 1.19477C5.4094 0.641292 6.59052 0.641292 7.54918 1.19477C8.50784 1.74826 9.0984 2.77114 9.0984 3.8781C9.0984 4.98507 8.50784 6.00794 7.54918 6.56143C6.59052 7.11491 5.4094 7.11491 4.45074 6.56143ZM11.1625 13.2203C11.4234 13.2203 11.6343 12.9984 11.6125 12.7359C11.4 10.1453 9.50933 8.04216 7.05308 7.56716C6.96715 7.55154 6.87965 7.58279 6.8234 7.64841C6.8234 7.64841 6.19996 8.3781 6.07184 8.53435C6.05777 8.55154 6.05465 8.57498 6.06246 8.59685L7.01402 11.0703C7.03121 11.1125 7.0234 11.1609 6.99371 11.1953L6.04059 12.5515C6.02183 12.5781 5.98277 12.5781 5.96246 12.5515L5.00934 11.1953C4.97965 11.1609 4.97184 11.1125 4.98902 11.0703L5.94059 8.59685C5.94996 8.57654 5.94527 8.55154 5.93121 8.53435C5.80308 8.3781 5.17965 7.64841 5.17965 7.64841C5.1234 7.58279 5.03434 7.54998 4.94996 7.56716C2.49215 8.04216 0.59996 10.1453 0.389022 12.7359C0.367147 12.9969 0.576522 13.2203 0.839022 13.2203H11.1625Z"
                      fill="black"
                      fill-opacity="0.45"
                    />
                  </svg>
                </div>
                <div class="select-label" style="width: 340px">{{
                  item.name
                }}</div>
              </div>
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

            <!-- 角色 -->
            <div
              class="select-right-column p"
              v-for="(item, index) in selectedRole"
              :key="index"
            >
              <div class="select-right-label">
                <div style="margin-right: 10px">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.34854 9.25581V13.7209H3C3 12.5367 3.45815 11.401 4.27366 10.5636C5.08917 9.72624 6.19523 9.25581 7.34854 9.25581ZM7.34854 8.69767C5.54661 8.69767 4.08713 7.19907 4.08713 5.34884C4.08713 3.4986 5.54661 2 7.34854 2C9.15046 2 10.6099 3.4986 10.6099 5.34884C10.6099 7.19907 9.15046 8.69767 7.34854 8.69767ZM8.75909 11.9416C8.69017 11.6438 8.69017 11.3335 8.75909 11.0357L8.21987 10.7159L8.76344 9.74921L9.30266 10.069C9.51909 9.85854 9.7807 9.70329 10.0664 9.61581V8.97674H11.1535V9.61581C11.4427 9.704 11.7036 9.8614 11.9172 10.069L12.4564 9.74921L13 10.7159L12.4608 11.0357C12.5296 11.3334 12.5296 11.6434 12.4608 11.941L13 12.2608L12.4564 13.2275L11.9172 12.9077C11.7008 13.1182 11.4392 13.2735 11.1535 13.3609V14H10.0664V13.3609C9.7807 13.2735 9.51909 13.1182 9.30266 12.9077L8.76344 13.2275L8.21987 12.2608L8.75909 11.9416ZM10.6099 10.9302C10.4658 10.9302 10.3275 10.989 10.2256 11.0937C10.1236 11.1984 10.0664 11.3403 10.0664 11.4884C10.0664 11.6364 10.1236 11.7784 10.2256 11.883C10.3275 11.9877 10.4658 12.0465 10.6099 12.0465C10.7541 12.0465 10.8924 11.9877 10.9943 11.883C11.0962 11.7784 11.1535 11.6364 11.1535 11.4884C11.1535 11.3403 11.0962 11.1984 10.9943 11.0937C10.8924 10.989 10.7541 10.9302 10.6099 10.9302Z"
                      fill="#F7A54B"
                    />
                  </svg>
                </div>
                <div class="select-label" style="width: 340px">{{
                  item.name
                }}</div>
              </div>
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
          </el-scrollbar>
        </div>
      </div>
    </template>
  </JyDialog>
</template>

<script setup>
  /**
   * selectedStatus 0(未选中) 2（全部）
   * includeChild 向下包含 String
   * apiModule: api对应的模块
   * queryParams: 请求参数
   * editDeploy: 修改选中项时，初始化已选
   * searchSelected: 高级搜索已选状态
   * tabsShow ['organ', 'user', 'role'] 展示按照数字顺序排
   * activeTab 选中tab
   * multiple 是否多选
   * max Number - 目前支持user
   * hasTopRoot 是否包含顶级 组织
   */
  import i18n from '@/utils/i18n'
  import { ref, watch } from 'vue'
  import VTabs from '@/components/common/JyTabs.vue'
  import KDepartTab from './modules/KDepartTab.vue'
  import KUserTab from './modules/KUserTab.vue'
  import KRoleTab from './modules/KRoleTab.vue'
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
      default: ''
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
    tabsShow: {
      type: Array,
      default: () => {
        return ['organ', 'user', 'role']
      }
    },
    activeTab: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number
    },
    userMin: {
      type: Number
    },
    hasTopRoot: {
      type: Boolean,
      default: false
    },
    haveIncluded: {
      type: Boolean,
      default: true
    }
  })

  // 消息 tabs
  const active = ref(props.activeTab || props.tabsShow[0])
  const title = ref('')

  watch(
    () => active.value,
    val => {
      const str = i18n.global.t('t-zgj-list.PleaseChoose')
      let newStr = ''
      props.tabsShow.forEach((item, index) => {
        if (index === 0) {
          if (item === 'user') {
            newStr = i18n.global.t('t-zgj-sync.Person')
          }
          if (item === 'organ') {
            newStr = i18n.global.t('t-zgj-sync.Department')
          }
          if (item === 'role') {
            newStr = i18n.global.t('t-zgj-person.Role')
          }
        } else {
          if (item === 'user') {
            newStr = newStr + '/' + i18n.global.t('t-zgj-sync.Person')
          }
          if (item === 'organ') {
            newStr = newStr + '/' + i18n.global.t('t-zgj-sync.Department')
          }
          if (item === 'role') {
            newStr = newStr + '/' + i18n.global.t('t-zgj-person.Role')
          }
        }
      })
      title.value = str + ' ' + newStr
    },
    {
      deep: true,
      immediate: true
    }
  )
  const tabsLabel = ref([
    {
      name: 't-zgj-person.Role',
      value: 'role'
    },
    {
      name: 't-zgj-sync.Department',
      value: 'organ'
    },
    {
      name: 't-zgj-sync.Person',
      value: 'user'
    }
  ])

  // 按照参数排序
  const labelCache = JSON.parse(JSON.stringify(tabsLabel.value))
  tabsLabel.value = labelCache
    .filter(item => props.tabsShow.includes(item.value))
    .sort((prev, next) => {
      return (
        props.tabsShow.indexOf(prev.value) - props.tabsShow.indexOf(next.value)
      )
    })

  // 选中数据
  // const allSelected = ref([])
  const selectedDepart = ref([])
  const selectedUser = ref([])
  const selectedRole = ref([])
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
      selectedDepart.value = res.data.organs ? res.data.organs : []
      selectedUser.value = res.data.users ? res.data.users : []
      selectedRole.value = res.data.roles ? res.data.roles : []
      firstShow.value = true
    })
  } else {
    firstShow.value = true
  }

  if (props.searchSelected.length > 0) {
    // allSelected.value = toRefs(props.searchSelected)
    selectedDepart.value = props.searchSelected.filter(
      item => item.type === 'organ'
    )
    selectedUser.value = props.searchSelected.filter(
      item => item.type === 'user'
    )
    selectedRole.value = props.searchSelected.filter(
      item => item.type === 'role'
    )
  }

  const kdepart = ref(null)
  const kuser = ref(null)
  const krole = ref(null)
  // 清空选中项
  const clearSelected = () => {
    kdepart.value.clearSelected()
    kuser.value.clearSelected()
    krole.value.clearSelected()
  }

  // 取消选中项
  const concelSelected = attr => {
    kdepart.value.concelSelected(attr)
    kuser.value.concelSelected(attr)
    krole.value.concelSelected(attr)
  }

  // 监听 向下包含 切换
  const changeSwitch = (switchStatus, attr) => {
    kdepart.value && kdepart.value.changeSwitch(switchStatus, attr)
  }

  // 关闭弹窗
  const closeDialog = () => {
    emits('update:show', false)
  }
  // 导出数据
  const changeResult = ref([])
  const confirmDialog = () => {
    // userMin
    if (props.userMin && props.userMin > selectedUser.value.length) {
      ElMessage.warning(`人员至少需要${props.userMin}个！`)
      return
    }
    // 编辑
    if (props.editDeploy) {
      const userid = selectedUser.value.map(item => item.id)
      const organsid = selectedDepart.value.map(item => {
        return {
          includeChild: item.includeChild,
          id: item.id
        }
      })
      const saveParams = {
        ...props.queryParams,
        organs: organsid,
        userIds: userid
      }
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
    props.tabsShow.forEach(item => {
      item === 'organ' &&
        (changeResult.value = changeResult.value.concat(selectedDepart.value))

      item === 'user' &&
        (changeResult.value = changeResult.value.concat(selectedUser.value))

      item === 'role' &&
        (changeResult.value = changeResult.value.concat(selectedRole.value))
    })
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
      height: calc(100% + 18px);
      width: 1px;
      background: rgba($color: #000000, $alpha: 0.05);
    }
    .selection-left {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .null-img {
      height: calc(100% - 40px);
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 171px;
        height: 122.5px;
      }
    }

    .select-right-column {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .select-right-label {
        display: flex;
      }

      .select-label {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        width: 280px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .select-close {
        cursor: pointer;
        height: 20px;
        display: flex;
        align-items: center;
      }

      .clear-t {
        color: #d04d3e;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .clear-n {
      color: rgba(0, 0, 0, 0.85);
    }

    .p {
      padding: 8px 24px 8px 24px;
    }

    .c-p {
      padding: 6px 24px 12px 24px;
    }
  }
</style>

<style lang="scss">
  .el-scrollbar__view {
    height: 100%;
  }

  .select-right-column {
    .el-switch {
      height: 20px;
    }
  }
</style>

<template>
  <div class="k-custom-tree">
    <!-- 全部 -->
    <div class="k-select-all user-select" v-if="showAllIcon && props.multiple">
      <div class="k-column">
        <div class="k-tree-left">
          <!-- checkbox -->
          <div style="margin-right: 10px">
            <!-- 未选 -->
            <div class="" v-show="allSelected === 0" @click="checkAll(2)">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect opacity="0.01" width="16" height="16" fill="black" />
                <g clip-path="url(#clip0_543_108426)">
                  <rect width="16" height="16" rx="2" fill="white" />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="15"
                    height="15"
                    rx="1.5"
                    stroke="black"
                    stroke-opacity="0.15"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_543_108426">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <!-- 禁用状态 -->
            <div class="" v-show="allSelected === 1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect opacity="0.01" width="16" height="16" fill="black" />
                <rect
                  width="16"
                  height="16"
                  rx="2"
                  fill="black"
                  fill-opacity="0.04"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="15"
                  height="15"
                  rx="1.5"
                  stroke="black"
                  stroke-opacity="0.15"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.7703 5.254L7.55825 11.094C7.30425 11.448 6.77825 11.448 6.52425 11.094L4.03025 7.638C3.95425 7.532 4.03025 7.384 4.16025 7.384H5.09825C5.30225 7.384 5.49625 7.482 5.61625 7.65L7.04025 9.626L10.1843 5.266C10.3043 5.1 10.4963 5 10.7023 5H11.6403C11.7703 5 11.8463 5.148 11.7703 5.254Z"
                  fill="black"
                  fill-opacity="0.25"
                />
              </svg>
            </div>
            <!-- 全选 -->
            <div class="" v-show="allSelected === 2" @click="checkAll(0)">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect opacity="0.01" width="16" height="16" fill="black" />
                <rect width="16" height="16" rx="2" fill="#D0963E" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.7703 5.254L7.55825 11.094C7.30425 11.448 6.77825 11.448 6.52425 11.094L4.03025 7.638C3.95425 7.532 4.03025 7.384 4.16025 7.384H5.09825C5.30225 7.384 5.49625 7.482 5.61625 7.65L7.04025 9.626L10.1843 5.266C10.3043 5.1 10.4963 5 10.7023 5H11.6403C11.7703 5 11.8463 5.148 11.7703 5.254Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <!-- 标题 -->
          <div class="k-label user-select">全选</div>
        </div>

        <!-- 右侧 -->
        <div class="k-tree-right"></div>
      </div>
    </div>

    <!-- 列表 -->
    <div class="k-select-list">
      <div class="k-column" v-for="(item, index) in cacheShowList" :key="index">
        <div class="k-tree-left">
          <!-- checkbox -->
          <div>
            <!-- 占位 -->

            <div v-if="props.tabActive === 'user'">
              <!-- 未选 -->
              <div
                v-show="item.selectedStatus === 0 && item.type === 'user'"
                @click="checkPart(2, item)"
                class="check-box"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect opacity="0.01" width="16" height="16" fill="black" />
                  <g clip-path="url(#clip0_543_108426)">
                    <rect width="16" height="16" rx="2" fill="white" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="15"
                      height="15"
                      rx="1.5"
                      stroke="black"
                      stroke-opacity="0.15"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_543_108426">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <!-- 全选 -->
              <div
                v-show="item.selectedStatus === 2 && item.type === 'user'"
                @click="checkPart(0, item)"
                class="check-box"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect opacity="0.01" width="16" height="16" fill="black" />
                  <rect width="16" height="16" rx="2" fill="#D0963E" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.7703 5.254L7.55825 11.094C7.30425 11.448 6.77825 11.448 6.52425 11.094L4.03025 7.638C3.95425 7.532 4.03025 7.384 4.16025 7.384H5.09825C5.30225 7.384 5.49625 7.482 5.61625 7.65L7.04025 9.626L10.1843 5.266C10.3043 5.1 10.4963 5 10.7023 5H11.6403C11.7703 5 11.8463 5.148 11.7703 5.254Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div v-else-if="props.tabActive === 'document'">
              <!-- 未选 -->
              <div
                v-show="item.selectedStatus === 0 && !item.disabled"
                @click="checkPart(2, item)"
                class="check-box"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect opacity="0.01" width="16" height="16" fill="black" />
                  <g clip-path="url(#clip0_543_108426)">
                    <rect width="16" height="16" rx="2" fill="white" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="15"
                      height="15"
                      rx="1.5"
                      stroke="black"
                      stroke-opacity="0.15"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_543_108426">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <!-- 全选 -->
              <div
                v-show="item.selectedStatus === 2 && !item.disabled"
                @click="checkPart(0, item)"
                class="check-box"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect opacity="0.01" width="16" height="16" fill="black" />
                  <rect width="16" height="16" rx="2" fill="#D0963E" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.7703 5.254L7.55825 11.094C7.30425 11.448 6.77825 11.448 6.52425 11.094L4.03025 7.638C3.95425 7.532 4.03025 7.384 4.16025 7.384H5.09825C5.30225 7.384 5.49625 7.482 5.61625 7.65L7.04025 9.626L10.1843 5.266C10.3043 5.1 10.4963 5 10.7023 5H11.6403C11.7703 5 11.8463 5.148 11.7703 5.254Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div v-else-if="props.tabActive === 'role'">
              <!-- 未选 -->
              <div
                v-show="item.selectedStatus === 0 && item.type === 'role'"
                @click="checkPart(2, item)"
                class="check-box"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect opacity="0.01" width="16" height="16" fill="black" />
                  <g clip-path="url(#clip0_543_108426)">
                    <rect width="16" height="16" rx="2" fill="white" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="15"
                      height="15"
                      rx="1.5"
                      stroke="black"
                      stroke-opacity="0.15"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_543_108426">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <!-- 全选 -->
              <div
                v-show="item.selectedStatus === 2 && item.type === 'role'"
                @click="checkPart(0, item)"
                class="check-box"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect opacity="0.01" width="16" height="16" fill="black" />
                  <rect width="16" height="16" rx="2" fill="#D0963E" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.7703 5.254L7.55825 11.094C7.30425 11.448 6.77825 11.448 6.52425 11.094L4.03025 7.638C3.95425 7.532 4.03025 7.384 4.16025 7.384H5.09825C5.30225 7.384 5.49625 7.482 5.61625 7.65L7.04025 9.626L10.1843 5.266C10.3043 5.1 10.4963 5 10.7023 5H11.6403C11.7703 5 11.8463 5.148 11.7703 5.254Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div v-else>
              <!-- 未选 -->
              <div
                v-show="item.selectedStatus === 0 && !item.disabled"
                @click="checkPart(2, item)"
                class="check-box"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect opacity="0.01" width="16" height="16" fill="black" />
                  <g clip-path="url(#clip0_543_108426)">
                    <rect width="16" height="16" rx="2" fill="white" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="15"
                      height="15"
                      rx="1.5"
                      stroke="black"
                      stroke-opacity="0.15"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_543_108426">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <!-- 全选 -->
              <div
                v-show="item.selectedStatus === 2 && !item.disabled"
                @click="checkPart(0, item)"
                class="check-box"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect opacity="0.01" width="16" height="16" fill="black" />
                  <rect width="16" height="16" rx="2" fill="#D0963E" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.7703 5.254L7.55825 11.094C7.30425 11.448 6.77825 11.448 6.52425 11.094L4.03025 7.638C3.95425 7.532 4.03025 7.384 4.16025 7.384H5.09825C5.30225 7.384 5.49625 7.482 5.61625 7.65L7.04025 9.626L10.1843 5.266C10.3043 5.1 10.4963 5 10.7023 5H11.6403C11.7703 5 11.8463 5.148 11.7703 5.254Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <!-- 禁用状态 -->
            <div v-show="item.disabled" class="check-box">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect opacity="0.01" width="16" height="16" fill="black" />
                <rect
                  width="16"
                  height="16"
                  rx="2"
                  fill="black"
                  fill-opacity="0.04"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="15"
                  height="15"
                  rx="1.5"
                  stroke="black"
                  stroke-opacity="0.15"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.7703 5.254L7.55825 11.094C7.30425 11.448 6.77825 11.448 6.52425 11.094L4.03025 7.638C3.95425 7.532 4.03025 7.384 4.16025 7.384H5.09825C5.30225 7.384 5.49625 7.482 5.61625 7.65L7.04025 9.626L10.1843 5.266C10.3043 5.1 10.4963 5 10.7023 5H11.6403C11.7703 5 11.8463 5.148 11.7703 5.254Z"
                  fill="black"
                  fill-opacity="0.25"
                />
              </svg>
            </div>
          </div>

          <!-- 类型 -->
          <div class="cloumn-type">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              v-show="item.type === 'organ'"
            >
              <rect opacity="0.01" width="16" height="16" fill="#3E78D0" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 1H10V5H8.5V5.86365H14H14.5V6.36365V10H16V14H12V10H13.5V6.86365H8.5V10H10V14H6V10H7.5V6.86365H2.5V10H4V14H0V10H1.5V6.36365V5.86365H2H7.5V5H6V1Z"
                fill="#3E78D0"
              />
            </svg>

            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              v-show="item.type === 'user'"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.45074 6.56143C3.49208 6.00794 2.90152 4.98507 2.90152 3.8781C2.90152 2.77114 3.49208 1.74826 4.45074 1.19477C5.4094 0.641292 6.59052 0.641292 7.54918 1.19477C8.50784 1.74826 9.0984 2.77114 9.0984 3.8781C9.0984 4.98507 8.50784 6.00794 7.54918 6.56143C6.59052 7.11491 5.4094 7.11491 4.45074 6.56143ZM11.1625 13.2203C11.4234 13.2203 11.6343 12.9984 11.6125 12.7359C11.4 10.1453 9.50933 8.04216 7.05308 7.56716C6.96715 7.55154 6.87965 7.58279 6.8234 7.64841C6.8234 7.64841 6.19996 8.3781 6.07184 8.53435C6.05777 8.55154 6.05465 8.57498 6.06246 8.59685L7.01402 11.0703C7.03121 11.1125 7.0234 11.1609 6.99371 11.1953L6.04059 12.5515C6.02183 12.5781 5.98277 12.5781 5.96246 12.5515L5.00934 11.1953C4.97965 11.1609 4.97184 11.1125 4.98902 11.0703L5.94059 8.59685C5.94996 8.57654 5.94527 8.55154 5.93121 8.53435C5.80308 8.3781 5.17965 7.64841 5.17965 7.64841C5.1234 7.58279 5.03434 7.54998 4.94996 7.56716C2.49215 8.04216 0.59996 10.1453 0.389022 12.7359C0.367147 12.9969 0.576522 13.2203 0.839022 13.2203H11.1625Z"
                fill="black"
                fill-opacity="0.45"
              />
            </svg>

            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              v-show="item.type === 'role'"
            >
              <path
                d="M7.34854 9.25581V13.7209H3C3 12.5367 3.45815 11.401 4.27366 10.5636C5.08917 9.72624 6.19523 9.25581 7.34854 9.25581ZM7.34854 8.69767C5.54661 8.69767 4.08713 7.19907 4.08713 5.34884C4.08713 3.4986 5.54661 2 7.34854 2C9.15046 2 10.6099 3.4986 10.6099 5.34884C10.6099 7.19907 9.15046 8.69767 7.34854 8.69767ZM8.75909 11.9416C8.69017 11.6438 8.69017 11.3335 8.75909 11.0357L8.21987 10.7159L8.76344 9.74921L9.30266 10.069C9.51909 9.85854 9.7807 9.70329 10.0664 9.61581V8.97674H11.1535V9.61581C11.4427 9.704 11.7036 9.8614 11.9172 10.069L12.4564 9.74921L13 10.7159L12.4608 11.0357C12.5296 11.3334 12.5296 11.6434 12.4608 11.941L13 12.2608L12.4564 13.2275L11.9172 12.9077C11.7008 13.1182 11.4392 13.2735 11.1535 13.3609V14H10.0664V13.3609C9.7807 13.2735 9.51909 13.1182 9.30266 12.9077L8.76344 13.2275L8.21987 12.2608L8.75909 11.9416ZM10.6099 10.9302C10.4658 10.9302 10.3275 10.989 10.2256 11.0937C10.1236 11.1984 10.0664 11.3403 10.0664 11.4884C10.0664 11.6364 10.1236 11.7784 10.2256 11.883C10.3275 11.9877 10.4658 12.0465 10.6099 12.0465C10.7541 12.0465 10.8924 11.9877 10.9943 11.883C11.0962 11.7784 11.1535 11.6364 11.1535 11.4884C11.1535 11.3403 11.0962 11.1984 10.9943 11.0937C10.8924 10.989 10.7541 10.9302 10.6099 10.9302Z"
                fill="#F7A54B"
              />
            </svg>

            <svg
              width="12"
              height="19"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              v-show="item.type === 'document'"
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

          <!-- 标题 -->
          <div class="k-label user-select">
            {{ item.name || item.fileTypeName }}
          </div>
        </div>

        <!-- 右侧 -->
        <div
          class="k-tree-right user-select"
          @click="openInner(item)"
          v-if="item.haveChildren || item.fileDirectory === '1'"
        >
          下级
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  /**
   * props:
   * --- lists: [ {
   *  name: 名称、
   *  selectedStatus: 0(未选中)  2（选中）
   *  tabActive: 当前选中tab
   *  }]
   */

  import { onMounted, ref, computed, watch } from 'vue'

  const emits = defineEmits(['open', 'emitsDemo'])

  const props = defineProps({
    lists: {
      type: Array,
      default: () => {
        return []
      }
    },
    rootNode: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tabActive: {
      type: String,
      default: ''
    },
    showAllIcon: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    }
  })
  const cacheShowList = computed(() => {
    return JSON.parse(JSON.stringify(props.lists))
  })
  // 全选状态
  const allSelected = ref(0)
  const showAllIcon = ref(true)
  // 判断 当前层级 全部选择状态
  const initAllSelectedStatus = data => {
    // user时，判断显示不显示全选
    if (props.tabActive === 'user') {
      if (!Array.isArray(data) || data.length === 0) {
        return
      }
      showAllIcon.value = data.filter(item => item.type === 'user').length > 0

      // 员工选中状态
      const userData = data.filter(item => item.type === 'user')
      const userSelectedData = userData.filter(
        item => item.selectedStatus === 2
      )
      if (userData.length === userSelectedData.length) {
        allSelected.value = 2
      } else {
        allSelected.value = 0
      }
    } else {
      if (!Array.isArray(data) || data.length === 0) {
        return (allSelected.value = 0)
      }

      const disabledNum = data.filter(item => item.disabled)
      if (disabledNum.length > 0) return (allSelected.value = 1)
      // 部门、角色 和 文件类型
      const str = data.filter(item => item.selectedStatus === 2)
      if (str.length === data.length) {
        allSelected.value = 2
      } else {
        allSelected.value = 0
      }
    }
    // 文件类型时 showAllIcon 为 true
    if (props.showAllIcon) {
      showAllIcon.value = true
    }
  }
  // 监听 显示数据列 动态展示 每层级全选状态
  watch(
    () => props.lists,
    newVal => {
      initAllSelectedStatus(newVal)
    },
    {
      deep: true
    }
  )
  // 初始化全选状态
  initAllSelectedStatus(props.lists)

  // 监听 全选 切换
  const checkAll = val => {
    emits('emitsDemo', props.lists, val, 'all')
  }

  // 监听 列表选择 切换
  const checkPart = (val, attr) => {
    emits('emitsDemo', attr, val)
  }

  // 打开 下级
  const openInner = attr => {
    // 更新面包屑
    emits('open', attr)
  }

  // 初始化默认展开下一级
  onMounted(() => {
    openInner(props.rootNode[0])
  })
</script>

<style lang="scss" scoped>
  svg {
    vertical-align: middle;
  }
  .k-custom-tree {
    display: flex;
    flex-direction: column;
    height: 100%;
    .k-select-all {
      height: 35px;
    }

    .k-select-list {
      flex: 1;
      overflow-y: auto;
    }
    .k-column {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 35px;

      .k-tree-left {
        display: flex;
        flex: 1;
        flex-shrink: 0;
        .check-box {
          margin-right: 10px;
          // cursor: pointer;
        }

        .cloumn-type {
          margin-right: 10px;
        }

        .k-label {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
        }
      }

      .k-tree-right {
        width: 32px;
        flex-shrink: 0;
        color: #3e78d0;
        cursor: pointer;
      }
    }
  }
</style>

<template>
  <div class="k-custom-tree">
    <!-- 全部 -->
    <div class="k-select-all user-select">
      <div class="k-column">
        <div class="k-tree-left">
          <!-- checkbox -->
          <div class="check-box">
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
          <div class="check-box">
            <!-- 未选 -->
            <div
              v-show="item.selectedStatus === 0 && !item.disabled"
              @click="checkPart(2, item.id, item.pid)"
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

            <!-- 禁用状态 -->
            <div v-show="item.disabled">
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
            <div
              v-show="item.selectedStatus === 2 && !item.disabled"
              @click="checkPart(0, item.id, item.pid)"
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

          <!-- 类型 -->
          <div class="cloumn-type">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect opacity="0.01" width="16" height="16" fill="#3E78D0" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 1H10V5H8.5V5.86365H14H14.5V6.36365V10H16V14H12V10H13.5V6.86365H8.5V10H10V14H6V10H7.5V6.86365H2.5V10H4V14H0V10H1.5V6.36365V5.86365H2H7.5V5H6V1Z"
                fill="#3E78D0"
              />
            </svg>
          </div>

          <!-- 标题 -->
          <div class="k-label user-select">{{ item.name }}</div>
        </div>

        <!-- 右侧 -->
        <div
          class="k-tree-right user-select"
          @click="openInner(item)"
          v-if="item.haveChildren"
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
   *  selectedStatus: 0(未选中) 1（选中不可选） 2（全部）,
   *  id: 标识
   *  parentId： 父id
   *  }]
   */

  import { computed, onMounted, ref, watch } from 'vue'

  const emits = defineEmits(['update:lists', 'open'])

  const props = defineProps({
    lists: {
      type: Array,
      default: () => {
        return []
      }
    },
    departRoot: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })

  // 全选状态
  const allSelected = ref(0)

  const cacheShowList = computed(() => {
    return JSON.parse(JSON.stringify(props.lists))
  })

  // 判断 当前层级 全部选择状态
  const initAllSelectedStatus = data => {
    if (!Array.isArray(data) || data.length === 0) {
      return (allSelected.value = 0)
    }

    const disabledNum = data.filter(item => item.disabled)
    if (disabledNum.length > 0) return (allSelected.value = 1)
    // 部门、角色
    const str = data.filter(item => item.selectedStatus === 2)
    if (str.length === data.length) {
      allSelected.value = 2
    } else {
      allSelected.value = 0
    }
  }

  // 监听 显示数据列 动态展示 每层级全选状态
  watch(
    () => cacheShowList.value,
    newVal => {
      initAllSelectedStatus(newVal)
    },
    {
      deep: true
    }
  )

  // 初始化全选状态
  initAllSelectedStatus(cacheShowList.value)

  // 列表切换选中
  // 递归处理内部状态
  const cycleList = (data, val, attrId) => {
    if (!Array.isArray(data) || data.length === 0) return

    data.forEach(item => {
      if (item.id === attrId) {
        item.selectedStatus = val
      }
      if (item.children && item.children.length > 0) {
        return cycleList(item.children, val)
      }
    })
  }

  // 替换 cacheShowList -> cacheShowList 选择状态
  const replaceChildNode = (data, attrId) => {
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.id === attrId) {
          item.children = cacheShowList.value
        }
        if (item.children && item.children.length > 0) {
          return replaceChildNode(item.children, attrId)
        }
      })
    }
  }

  const commonCheckFn = (val, attrId, pId) => {
    // 处理树型数据下所有状态
    cycleList(cacheShowList.value, val, attrId)

    replaceChildNode(cacheShowList.value, pId)
    // 更新 props
    emits('update:lists', cacheShowList.value)
  }

  // ====== 全部
  // 递归处理内部状态
  const cycleListAll = (data, val, attrId) => {
    if (!Array.isArray(data) || data.length === 0) return
    for (let item = 0; item <= data.length; item++) {
      if (data[item].pid === attrId) {
        data.forEach(value => {
          value.selectedStatus = val
        })
        return
      }
      if (item.children && item.children.length > 0) {
        return cycleListAll(item.children, val)
      }
    }
  }

  // 替换 cacheShowList -> cacheShowList 选择状态
  const replaceChildNodeAll = (data, attrId) => {
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.id === attrId) {
          item.children = cacheShowList.value
        }
        if (item.children && item.children.length > 0) {
          return replaceChildNodeAll(item.children, attrId)
        }
      })
    }
  }

  const commonCheckFnAll = (val, attrId, pId) => {
    // 处理树型数据下所有状态
    cycleListAll(cacheShowList.value, val, attrId)

    replaceChildNodeAll(cacheShowList.value, pId)
    // 更新 props
    emits('update:lists', cacheShowList.value)
  }

  // 监听 全选 切换
  const checkAll = val => {
    allSelected.value = val
    if (!Array.isArray(cacheShowList.value) || cacheShowList.value.length === 0)
      return
    commonCheckFnAll(val, cacheShowList.value[0].pid)
  }

  // 监听 列表选择 切换
  const checkPart = (val, attrId, pId) => {
    commonCheckFn(val, attrId, pId)
  }

  // 打开 下级
  const openInner = attr => {
    // 更新面包屑
    emits('open', attr)
  }

  // 初始化默认展开下一级
  onMounted(() => {
    openInner(props.departRoot[0])
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

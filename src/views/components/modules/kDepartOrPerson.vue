<template>
  <KDialog
    @update:show="props.show"
    :show="props.show"
    :title="$t('t-zgj-list.SelectionDepartment')"
    @close="closeDialog"
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
        <div>
          <VTabs
            :active="active"
            :label="tabsLabel"
            @update:active="active = $event"
            :border="false"
          ></VTabs>
        </div>

        <!-- search -->
        <div class="select-search">
          <el-input
            v-model="searchQuery"
            placeholder="搜索部门/成员"
            :prefix-icon="Search"
            size="large"
          />
        </div>

        <!-- crumbs -->
        <div class="select-crumbs user-select">
          <!-- 隐藏 -->
          <el-breadcrumb :separator-icon="ArrowRight" v-show="false">
            <el-breadcrumb-item @click="changeCrumb('all')">
              组织架构
            </el-breadcrumb-item>
            <el-breadcrumb-item
              v-for="(item, index) in curmbs"
              :key="index"
              @click="changeCrumb(item.id)"
              >{{ item.curmbsName }}
            </el-breadcrumb-item>
          </el-breadcrumb>

          <!-- 自定义面包屑 -->
          <div class="custom-bread" v-show="true">
            <!-- 组织架构 -->
            <div class="bread-home bread-item">
              <div class="item" @click="changeCrumb('all')">组织架构</div>
            </div>

            <!-- 循环 -->
            <div class="bread-item" v-for="(item, i) in curmbs" :key="i">
              <div class="item-arrow">
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.78132 5.00001L0.481323 1.70001L1.42399 0.757342L5.66666 5.00001L1.42399 9.24268L0.481323 8.30001L3.78132 5.00001Z"
                    fill="black"
                    fill-opacity="0.25"
                  />
                </svg>
              </div>

              <el-tooltip :content="item.curmbsName" placement="bottom">
                <div class="item-text" @click="changeCrumb(item.id)">
                  {{ item.curmbsName }}
                </div>
              </el-tooltip>
            </div>
          </div>
        </div>

        <!-- select-list -->
        <div class="select-list user-select">
          <kTree
            :lists="treeColumnData"
            @update:lists="treeColumnData = $event"
            @open="openInner"
            ref="UpdateSonFun"
          ></kTree>
        </div>
      </div>

      <!-- right -->
      <div class="selection-right user-select">
        <div class="select-right-column c-p">
          <div class="clear-n">已选（{{ selectedData.length }}）</div>
          <div class="select-close clear-t" @click="clearSelected">清空</div>
        </div>
        <div
          class="select-right-column p"
          v-for="(item, index) in selectedData"
          :key="index"
        >
          <div class="select-right-label">
            <div style="margin-right: 10px">
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                v-show="true"
              >
                <path
                  d="M4.34854 7.25581V11.7209H0C0 10.5367 0.458148 9.40099 1.27366 8.56362C2.08917 7.72624 3.19523 7.25581 4.34854 7.25581ZM4.34854 6.69767C2.54661 6.69767 1.08713 5.19907 1.08713 3.34884C1.08713 1.4986 2.54661 0 4.34854 0C6.15046 0 7.60994 1.4986 7.60994 3.34884C7.60994 5.19907 6.15046 6.69767 4.34854 6.69767ZM5.75909 9.94158C5.69017 9.64377 5.69017 9.33353 5.75909 9.03572L5.21987 8.71591L5.76344 7.74921L6.30266 8.06902C6.51909 7.85854 6.7807 7.70329 7.06637 7.61581V6.97674H8.1535V7.61581C8.44268 7.704 8.70359 7.8614 8.91722 8.06902L9.45643 7.74921L10 8.71591L9.46078 9.03572C9.52962 9.33335 9.52962 9.6434 9.46078 9.94102L10 10.2608L9.45643 11.2275L8.91722 10.9077C8.70079 11.1182 8.43917 11.2735 8.1535 11.3609V12H7.06637V11.3609C6.7807 11.2735 6.51909 11.1182 6.30266 10.9077L5.76344 11.2275L5.21987 10.2608L5.75909 9.94158ZM7.60994 8.93023C7.46577 8.93023 7.32752 8.98904 7.22558 9.09371C7.12364 9.19838 7.06637 9.34035 7.06637 9.48837C7.06637 9.6364 7.12364 9.77837 7.22558 9.88304C7.32752 9.98771 7.46577 10.0465 7.60994 10.0465C7.7541 10.0465 7.89236 9.98771 7.9943 9.88304C8.09624 9.77837 8.1535 9.6364 8.1535 9.48837C8.1535 9.34035 8.09624 9.19838 7.9943 9.09371C7.89236 8.98904 7.7541 8.93023 7.60994 8.93023Z"
                  fill="#777777"
                />
              </svg>

              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                v-show="false"
              >
                <rect
                  opacity="0.01"
                  width="16"
                  height="16"
                  fill="black"
                  fill-opacity="0.45"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6 1H10V5H8.5V5.86365H14H14.5V6.36365V10H16V14H12V10H13.5V6.86365H8.5V10H10V14H6V10H7.5V6.86365H2.5V10H4V14H0V10H1.5V6.36365V5.86365H2H7.5V5H6V1Z"
                  fill="#777777"
                />
              </svg>

              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                v-show="false"
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
            <div class="select-label">{{ item.labelName }}</div>
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
      </div>
    </div>
  </KDialog>
</template>

<script setup>
  /**
   * selectedStatus 0(未选中) 1（部分） 2（全部）
   */
  import { defineProps, defineEmits, reactive, ref, watch } from 'vue'
  import { treeDataTranslate } from '@/hooks/handleTreeData.js'
  import { Search, ArrowRight } from '@element-plus/icons-vue'
  import KDialog from '@/views/components/modules/kdialog.vue'
  import kTree from './kTree.vue'
  import VTabs from '@/components/modules/tabs.vue'
  const emits = defineEmits(['update:show'])

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })

  // 消息 tabs
  const active = ref('first')
  const tabsLabel = ref([
    {
      name: 't-zgj-person.Role',
      value: 'first'
    },
    {
      name: 't-zgj-sync.Department',
      value: 'second'
    },
    {
      name: 't-zgj-sync.Person',
      value: 'third'
    }
  ])

  // 选中数据
  const selectedData = ref([])

  // 关闭弹窗
  const closeDialog = () => {
    emits('update:show', false)
  }

  // 静态数据
  const state = reactive({
    lists: [
      // {
      //   id: 1,
      //   dataType: 1,
      //   parentId: 0,
      //   labelName: '建业科技'
      // },
      {
        id: 2,
        dataType: 2,
        parentId: 0,
        labelName: '研发中心'
      },
      {
        id: 3,
        dataType: 2,
        parentId: 2,
        labelName: '交付中心'
      },
      {
        id: 4,
        dataType: 2,
        parentId: 2,
        labelName: '技术中心'
      },
      {
        id: 5,
        dataType: 2,
        parentId: 0,
        labelName: '建业科技测试中心'
      },
      {
        id: 6,
        dataType: 2,
        parentId: 0,
        labelName: '财务部'
      },
      {
        id: 7,
        dataType: 2,
        parentId: 6,
        labelName: '会计'
      },
      {
        id: 8,
        dataType: 2,
        parentId: 6,
        labelName: '出纳'
      },
      {
        id: 9,
        dataType: 2,
        parentId: 8,
        labelName: '出纳-test1'
      },
      {
        id: 10,
        dataType: 2,
        parentId: 8,
        labelName: '出纳-test2'
      },
      {
        id: 11,
        dataType: 2,
        parentId: 5,
        labelName: '测试-test1'
      },
      {
        id: 12,
        dataType: 2,
        parentId: 5,
        labelName: '测试-test2'
      }
    ]
  })

  // 列表
  const treeColumnData = ref([])
  state.lists.forEach(item => {
    item.selectedStatus = 0
  })

  // 处理 成树型结构
  treeColumnData.value = treeDataTranslate(state.lists)

  // 搜索条件
  const searchQuery = ref('')

  // 筛选出 右侧选中数据
  const findSelectedStatus = data => {
    data.forEach(item => {
      if (item.selectedStatus === 2) {
        selectedData.value.push(item)
      } else if (
        item.selectedStatus === 1 &&
        item.children &&
        item.children.length > 0
      ) {
        return findSelectedStatus(item.children)
      }
    })
  }

  // 监听 组织架构 props
  watch(
    treeColumnData,
    val => {
      // 全选 不查 children、 部分选 查
      if (val && val.length > 0) {
        selectedData.value = []
        findSelectedStatus(val)
      }
    },
    {
      deep: true,
      immediate: false
    }
  )
  // 处理面包屑 - 递归展示
  const handleCurmbs = (attr, attrId) => {
    var path = []
    if (!attr) return []
    var forFn = function (tree, id) {
      for (var i = 0; i < tree.length; i++) {
        // 存放最后返回的内容,返回text集合
        var data = tree[i]
        path.push({
          curmbsName: data.labelName,
          id: data.id
        })
        if (data.id === id) return path
        if (data.children) {
          const findChildren = forFn(data.children, id)
          if (findChildren) return findChildren
        }
        path.pop()
      }
    }
    forFn(attr, attrId)
    return path
  }
  // 面包屑
  const curmbs = ref([])
  const cacheRootLists = JSON.parse(JSON.stringify(treeColumnData.value))
  // 打开 下级 更新面包屑
  const openInner = attrId => {
    // 处理面包屑 - 递归展示
    const result = handleCurmbs(cacheRootLists, attrId)

    curmbs.value = result
  }
  // 调用子组件方法
  const UpdateSonFun = ref()

  const changeCrumb = attrId => {
    UpdateSonFun.value.updateSonFun(attrId)
    if (attrId === 'all') {
      curmbs.value = []
      return
    }
    const result = handleCurmbs(cacheRootLists, attrId)
    curmbs.value = result
  }

  // 处理取消后 树型数据 选中状态
  const handleSelectedStatus = (data, attrId) => {
    data.forEach(item => {
      if (item.id === attrId || !attrId) {
        item.selectedStatus = 0

        // 处理其下级 所有选择状态
        if (item.children && item.children.length > 0) {
          return handleSelectedStatus(item.children)
        }
      }
      if (item.children && item.children.length > 0) {
        return handleSelectedStatus(item.children, attrId)
      }
    })
  }
  // 子切换 处理 父状态 callback 0、 1 、2
  const handleParentStatus = data => {
    if (!Array.isArray(data.children) || data.children.length === 0) return 0

    const objItem = ref({
      allItems: 0,
      nullItems: 0,
      partItems: 0,
      selectedItems: 0
    })
    function handleParentStatus(val) {
      val.forEach(item => {
        objItem.value.allItems++
        if (item.selectedStatus === 0) {
          objItem.value.nullItems++
        }
        if (item.selectedStatus === 1) {
          objItem.value.partItems++
        }
        if (item.selectedStatus === 2) {
          objItem.value.selectedItems++
        }
      })
    }

    handleParentStatus(data.children)
    if (objItem.value.allItems === objItem.value.nullItems) {
      return 0
    } else if (objItem.value.allItems === objItem.value.selectedItems) {
      return 2
    } else {
      return 1
    }
  }

  // 修改父级选中状态
  const handleAllStatus = (val, valId) => {
    val.forEach(item => {
      if (item.id === valId) {
        item.selectedStatus = handleParentStatus(item)
        if (item.children && item.children.length > 0) {
          return handleAllStatus(treeColumnData.value, item.parentId)
        }
      }
      if (item.children && item.children.length > 0) {
        return handleAllStatus(item.children, valId)
      }
    })
  }

  // 全部取消状态
  const clearAllStatus = val => {
    val.forEach(item => {
      item.selectedStatus = 0

      if (item.children && item.children.length > 0) {
        return clearAllStatus(item.children)
      }
    })
  }

  // 取消选中项
  const concelSelected = attr => {
    if (selectedData.value.length > 0) {
      selectedData.value = selectedData.value.filter(
        item => item.id !== attr.id
      )
    }

    handleSelectedStatus(treeColumnData.value, attr.id)

    handleAllStatus(treeColumnData.value, attr.parentId)
  }

  // 清空选中项
  const clearSelected = () => {
    selectedData.value = []

    clearAllStatus(treeColumnData.value)
  }
</script>

<style lang="scss" scoped>
  .selection-content {
    display: flex;
    height: 100%;

    .selection-left {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      .select-search {
        padding: 10px 20px 10px 0;
      }

      .select-crumbs {
        padding: 6px 20px 6px 0;

        .custom-bread {
          display: flex;

          .bread-item {
            display: flex;
            align-items: center;
          }

          .bread-home {
            .item {
              margin-right: 10px;
              padding: 1px 4px;
              border-radius: 2px;
              height: 24px;
              line-height: 23px;
            }

            .item:hover {
              color: #d0963e;
              background: rgba(208, 150, 62, 0.1);
            }
          }
          .item-text {
            padding: 1px 4px;
            border-radius: 2px;
            height: 24px;
            line-height: 23px;
            margin: 0 10px;
            max-width: 103px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .item-text:hover {
            color: #d0963e;
            background: rgba(208, 150, 62, 0.1);
          }
        }
      }

      .select-list {
        padding: 4px 24px 0 0;
        flex: 1;
      }

      &::after {
        content: '';
        position: absolute;
        right: -1px;
        top: -14px;
        width: 1px;
        height: 462px;
        background-color: rgba($color: #d8d8d8, $alpha: 0.6);
      }
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
        padding: 12px 0px 12px 24px;
      }

      .c-p {
        padding: 6px 0px 12px 24px;
      }
    }
  }
</style>

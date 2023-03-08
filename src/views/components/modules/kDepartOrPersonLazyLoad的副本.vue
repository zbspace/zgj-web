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
          <!-- 自定义面包屑 -->
          <div class="custom-bread" v-show="true">
            <!-- 循环 -->
            <div class="bread-item" v-for="(item, i) in curmbs" :key="i">
              <el-tooltip :content="item.curmbsName" placement="bottom">
                <div class="item-text" @click="changeCrumb(item.id)">
                  {{ item.curmbsName }}
                </div>
              </el-tooltip>

              <div class="item-arrow">
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  v-show="i !== curmbs.length - 1"
                >
                  <path
                    d="M3.78132 5.00001L0.481323 1.70001L1.42399 0.757342L5.66666 5.00001L1.42399 9.24268L0.481323 8.30001L3.78132 5.00001Z"
                    fill="black"
                    fill-opacity="0.25"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- select-list -->
        <div class="select-list user-select">
          <KTreeModel
            :lists="treeColumnData.data"
            @update:lists="treeColumnData.data = $event"
            @open="openInner"
            @emitsDemo="emitsDemo"
            ref="UpdateSonFun"
            :departRoot="departRoot"
          ></KTreeModel>
        </div>
      </div>

      <!-- right -->
      <div class="selection-right user-select">
        <div class="select-right-column c-p">
          <div class="clear-n">已选（{{ selectedData.length }}）</div>
          <div class="select-close clear-t" @click="clearSelected">清空 </div>
        </div>

        <!-- 部门 -->
        <div
          class="select-right-column p"
          v-for="(item, index) in selectedData"
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
                <rect opacity="0.01" width="16" height="16" fill="#3E78D0" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6 1H10V5H8.5V5.86365H14H14.5V6.36365V10H16V14H12V10H13.5V6.86365H8.5V10H10V14H6V10H7.5V6.86365H2.5V10H4V14H0V10H1.5V6.36365V5.86365H2H7.5V5H6V1Z"
                  fill="#3E78D0"
                />
              </svg>
            </div>
            <div class="select-label">{{ item.name }}</div>
          </div>
          <div style="display: flex; height: 25px">
            <el-switch
              v-model="item.included"
              v-if="item.haveChildren"
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
          v-for="(item, index) in selectedData"
          :key="index"
          v-show="false"
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
            <div class="select-label">{{ item.name }}</div>
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
          v-for="(item, index) in selectedData"
          :key="index"
          v-show="false"
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
            <div class="select-label">{{ item.name }}</div>
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
   * selectedStatus 0(未选中) 2（全部）
   * included 向下包含 Boolean
   * apiModule: api对应的模块
   */
  import { reactive, ref } from 'vue'
  import {
    treeDataTranslate,
    deconstructedArray
  } from '@/utils/handleTreeData.js'
  import { Search } from '@element-plus/icons-vue'
  import KDialog from '@/views/components/modules/kdialog.vue'
  import KTreeModel from './KTreeModel.vue'
  import VTabs from '@/components/modules/tabs.vue'
  import Api from '@/api/common/organOrPerson'
  const emits = defineEmits(['update:show'])

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    apiModule: {
      type: String,
      default: 'systemOrganOrPerson'
    }
  })

  // 消息 tabs
  const active = ref('organ')
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

  // 选中数据
  const selectedData = ref([
    {
      id: 'o1',
      pid: '-1',
      name: '部门1',
      sort: '1',
      checked: true,
      haveChildren: true,
      type: 'organ',
      selectedStatus: 2,
      included: false,
      disabled: false
    },
    {
      id: 'o4',
      pid: 'o1',
      name: '部门1-1',
      sort: '1',
      checked: true,
      haveChildren: true,
      type: 'organ',
      selectedStatus: 2,
      included: true,
      disabled: false
    },
    {
      id: 'o2',
      pid: '-1',
      name: '部门2',
      sort: '2',
      checked: true,
      haveChildren: false,
      type: 'organ',
      selectedStatus: 2,
      included: false,
      disabled: false
    },
    {
      id: 'o3',
      pid: '-1',
      name: '部门3',
      sort: '3',
      checked: false,
      haveChildren: false,
      type: 'organ',
      selectedStatus: 2,
      included: false,
      disabled: false
    }
  ])

  // 关闭弹窗
  const closeDialog = () => {
    emits('update:show', false)
  }
  // 部门选择新增根节点（不展示）
  const departRoot = [
    {
      id: '-1',
      pid: '0',
      name: '组织架构',
      sort: 3,
      checked: false,
      haveChildren: true,
      type: 'organ'
    }
  ]
  // 静态数据
  const state = reactive({
    lists: []
  })

  // 列表 - 初始化
  const treeColumnData = reactive({
    data: []
  })

  // 面包屑缓存树
  const cacheRootLists = ref([])
  // 动态获取部门接口
  const resultOrgan = params => {
    return new Promise((resolve, reject) => {
      Api[props.apiModule]
        [active.value](params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 搜索条件
  const searchQuery = ref('')

  // 自定义事件
  function emitsDemo(attr, val, type) {
    if (type && type === 'all') {
      handleRootChangeByAll(attr, val)
      handleSelectedChangeByAll(attr, val)
      return
    }
    handleRootChangeByPart(attr, val)
    handleSelectedChangeByPart(attr, val)
  }

  // 监听处理 全选 - 部分选择
  const handleRootChangeByAll = (attr, val) => {
    const pid = attr[0].pid
    function handleAll(data) {
      data.forEach(item => {
        if (item.id === pid) {
          item.children.forEach(key => {
            key.selectedStatus = val
          })
        }
        if (item.children && item.children.length > 0) {
          return handleAll(item.children)
        }
      })
    }

    handleAll(cacheRootLists.value)
  }

  const handleSelectedChangeByAll = (attr, val) => {
    const arr = ref([])
    attr.forEach(item => {
      arr.value.push(item.id)
    })
    selectedData.value = selectedData.value.filter(
      item => !arr.value.includes(item.id)
    )
    if (val === 0) {
      treeColumnData.data.forEach(item => {
        item.selectedStatus = 0
      })
    } else {
      selectedData.value = selectedData.value.concat(attr)
      console.log(selectedData.value, attr, 'fanafnan')
      treeColumnData.data.forEach(item => {
        item.selectedStatus = 2
      })
    }
  }

  const handleRootChangeByPart = (attr, val) => {
    function handlePart(data) {
      data.forEach(item => {
        if (item.id === attr.id) {
          item.selectedStatus = val
        }
        if (item.children && item.children.length > 0) {
          return handlePart(item.children)
        }
      })
    }

    handlePart(cacheRootLists.value)
  }

  const handleSelectedChangeByPart = (attr, val) => {
    if (val === 0) {
      selectedData.value = selectedData.value.filter(
        item => item.id !== attr.id
      )
      treeColumnData.data.forEach(item => {
        if (item.id === attr.id) {
          item.selectedStatus = 0
        }
      })
    } else {
      selectedData.value.push(attr)
      treeColumnData.data.forEach(item => {
        if (item.id === attr.id) {
          item.selectedStatus = 2
        }
      })
    }
  }

  // 处理面包屑 - 递归展示
  const handleCurmbs = (attr, attrId) => {
    const path = []
    if (!attr) return []

    if (attr.length === 0) {
      path.push({
        curmbsName: '组织架构',
        id: '-1'
      })
      return path
    }

    const forFn = function (tree, id) {
      for (let i = 0; i < tree.length; i++) {
        // 存放最后返回的内容,返回text集合
        const data = tree[i]
        path.push({
          curmbsName: data.name,
          id: data.id
        })
        if (data.id === id) return path
        if (data.children) {
          const findChildren = forFn(data.children, id)
          if (findChildren) return findChildren
        }
        path.pop() // 非常牛批的点
      }
    }
    forFn(attr, attrId)
    return path
  }

  // 面包屑
  const curmbs = ref([])

  // 打开 下级 更新面包屑
  const openInner = attr => {
    // 是否发起请求
    const flag = ref([])

    function findAlreadySearch(data) {
      data.forEach(item => {
        if (item.id === attr.id) {
          flag.value = item.children
        }
        if (item.children && item.children.length > 0) {
          return findAlreadySearch(item.children)
        }
      })
    }
    findAlreadySearch(cacheRootLists.value)

    if (flag.value && flag.value.length > 0) {
      treeColumnData.data = handleShowListStatus(flag.value, selectedData.value)
      // 处理面包屑 - 递归展示
      const result = handleCurmbs(cacheRootLists.value, attr.id)
      curmbs.value = result
      return
    }

    // 是
    const queryParams = {
      roleId: 'r1',
      organId: attr.id
    }
    resultOrgan(queryParams).then(result => {
      const res = result.data
      res.forEach(item => {
        item.selectedStatus = item.checked ? 2 : 0
        item.included = !!item.included
        item.disabled = !!item.disabled
      })

      // 展示时，需要对比右侧选择状态
      treeColumnData.data = handleShowListStatus(res, selectedData.value)
      if (attr.id === '-1') {
        state.lists = res.concat(departRoot)
        cacheRootLists.value = treeDataTranslate(state.lists)
        return
      }

      // 缓存树 - 对比右侧选择状态
      cacheRootLists.value = treeDataTranslate(
        unique([
          ...deconstructedArray(cacheRootLists.value),
          ...treeColumnData.data
        ])
      )
    })

    // 处理面包屑 - 递归展示
    const result = handleCurmbs(cacheRootLists.value, attr.id)
    curmbs.value = result
  }
  // 展示数据状态处理
  function handleShowListStatus(data, selectedData) {
    data.forEach(item => {
      if (selectedData.length === 0) {
        item.selectedStatus = 0
      } else {
        selectedData.forEach(val => {
          if (item.id === val.id) {
            item.selectedStatus = 2
          }
          // 向下包含反选
          if (item.pid === val.id) {
            if (val.included) {
              item.disabled = true
            }
          }
        })
      }
    })
    return data
  }
  // 数组去重
  function unique(arr, id = 'id') {
    if (!Array.isArray(arr)) {
      console.log('type error!')
      return
    }
    const newArr = arr.reduce(
      (all, next) =>
        all.some(item => item[id] === next[id]) ? all : [...all, next],
      []
    )
    return newArr
  }

  // 监听切换面包屑
  const changeCrumb = attrId => {
    function circleOne(data, id) {
      for (let item = 0; item <= data.length - 1; item++) {
        if (data[item].id === attrId) {
          treeColumnData.data = data[item].children
          return
        }
        if (data[item].children && data[item].children.length > 0) {
          return circleOne(data[item].children, id)
        }
      }
    }

    circleOne(cacheRootLists.value, attrId)
    const result = handleCurmbs(cacheRootLists.value, attrId)
    curmbs.value = result
  }

  // 处理取消后 树型数据 选中状态
  const handleSelectedStatus = (data, attrId) => {
    data.forEach(item => {
      if (item.id === attrId) {
        item.selectedStatus = 0
      }
      if (item.children && item.children.length > 0) {
        return handleSelectedStatus(item.children, attrId)
      }
    })
  }

  // 全部取消状态
  const clearAllStatus = val => {
    val.forEach(item => {
      item.selectedStatus = 0
      item.disabled = false
      if (item.children && item.children.length > 0) {
        return clearAllStatus(item.children)
      }
    })
  }
  // 取消选中项
  const concelSelected = attr => {
    // 删除右侧选择项
    selectedData.value = selectedData.value.filter(item => item.id !== attr.id)
    handleSelectedStatus(cacheRootLists.value, attr.id)
    treeColumnData.data.forEach(item => {
      if (item.id === attr.id) {
        item.selectedStatus = 0
      }
    })
  }

  // 清空选中项
  const clearSelected = () => {
    selectedData.value = []

    clearAllStatus(treeColumnData.data)
    clearAllStatus(cacheRootLists.value)
  }

  const changeChildrenAllStatus = (data, switchStatus) => {
    if (!Array.isArray(data) || data.length === 0) return
    data.forEach(item => {
      item.selectedStatus = switchStatus ? 2 : 0
      item.disabled = switchStatus
      if (item.children && item.children.length > 0) {
        return changeChildrenAllStatus(item.children, switchStatus)
      }
    })
  }

  // 监听 向下包含 切换
  const changeSwitch = (switchStatus, attr) => {
    // 处理树状态
    function recursionData(data, id) {
      if (!Array.isArray(data) || data.length === 0) return
      data.forEach(item => {
        if (item.id === id) {
          // 向下包含
          changeChildrenAllStatus(item.children, switchStatus)
        }
        if (item.children && item.children.length > 0) {
          return recursionData(item.children, id)
        }
      })
    }

    recursionData(cacheRootLists.value, attr.id)

    // 处理展示状态
    function recursionTreeData(data, id) {
      if (!Array.isArray(data) || data.length === 0) return
      data.forEach(item => {
        if (item.id === id) {
          treeColumnData.data = item.children
        }
        if (item.children && item.children.length > 0) {
          return recursionTreeData(item.children, id)
        }
      })
    }
    // 重置 treeColumnData
    const pid = treeColumnData.data[0].pid
    recursionTreeData(cacheRootLists.value, pid)

    // 处理选中值
  }
</script>

<style lang="scss" scoped>
  svg {
    vertical-align: middle;
  }
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
        padding: 6px 10px 6px 0;
        margin-left: -12px;
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

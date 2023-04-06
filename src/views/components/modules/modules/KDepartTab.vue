<template>
  <div>
    <!-- search -->
    <div class="select-search">
      <el-input
        v-model="searchQuery"
        placeholder="搜索部门/成员"
        :prefix-icon="Search"
        size="large"
        @input="changeInput"
      />
    </div>
    <!-- crumbs -->
    <div class="select-crumbs user-select" v-show="!searchType">
      <!-- 自定义面包屑 -->
      <div class="custom-bread" v-show="true">
        <!-- 循环 -->
        <div class="bread-item" v-for="(item, i) in curmbs" :key="i">
          <el-tooltip
            :content="item.curmbsName"
            placement="bottom"
            :show-after="200"
          >
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
        :rootNode="rootNode"
        tabActive="organ"
        :multiple="props.multiple"
        v-show="!searchType"
      ></KTreeModel>

      <KSearchTree
        :lists="treeColumnSearchData.data"
        @update:lists="treeColumnSearchData.data = $event"
        @open="openInner"
        @searchSelected="searchSelected"
        tabActive="organ"
        v-if="searchType"
      ></KSearchTree>
    </div>
  </div>
</template>

<script setup>
  /**
   * selectedStatus 0(未选中) 2（全部）
   * includeChild 向下包含 String 0 \1
   * apiModule: api对应的模块
   * initQueryParams 初始化参数
   * selectedDepart 选中项
   */
  import { reactive, ref, computed } from 'vue'
  import {
    treeDataTranslate,
    deconstructedArray
  } from '@/utils/handleTreeData.js'
  import { Search } from '@element-plus/icons-vue'
  import KTreeModel from '../KTreeModel.vue'
  import KSearchTree from '../KSearchTree.vue'
  import Api from '@/api/common/organOrPerson'
  import { ElMessage } from 'element-plus'
  import { throttle } from '@/utils/tools'
  const props = defineProps({
    apiModule: {
      type: String,
      default: ''
    },
    selectedDepart: {
      type: Array,
      default: () => {
        return []
      }
    },
    initQueryParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    multiple: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number
    }
  })
  const emits = defineEmits(['update:selectedDepart'])

  const selectedData = computed({
    get() {
      return JSON.parse(JSON.stringify(props.selectedDepart))
    },
    set(val) {
      emits('update:selectedDepart', val)
    }
  })

  // 部门选择新增根节点（不展示）
  const rootNode = [
    {
      id: '-1',
      pid: '0',
      name: '组织架构',
      sort: 3,
      haveChildren: true,
      type: 'organ',
      idFullPathSet: '-1'
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
        .organ(params)
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
  const searchType = ref(false)
  const treeColumnSearchData = reactive({
    data: []
  })

  const searchFn = () => {
    // 获取列表
    Api[props.apiModule]
      .search({
        type: 'organ',
        keyWord: searchQuery.value
      })
      .then(res => {
        treeColumnSearchData.data = res.data
        searchType.value = true
        if (!searchQuery.value) {
          searchType.value = false
        }
        // 已经选中状态
        if (
          selectedData.value.length !== 0 &&
          treeColumnSearchData.data !== 0
        ) {
          treeColumnSearchData.data.forEach(val => {
            selectedData.value.forEach(item => {
              if (val.id === item.id) {
                val.selectedStatus = item.selectedStatus
              }
            })
          })
        }
      })
  }

  const handleInp = throttle(searchFn, 800)

  const changeInput = () => {
    if (!searchQuery.value) {
      searchType.value = false
    } else {
      handleInp()
    }
  }

  // 自定义事件
  const emitsDemo = (attr, val, type) => {
    if (props.max && selectedData.value.length > props.max && props.multiple) {
      ElMessage.warning(`只能选择${props.max}个角色`)
      return
    }

    if (type && type === 'all') {
      // 判断限制人数 - all
      const cacheUser = JSON.parse(JSON.stringify(attr))
      const userData = cacheUser.filter(item => (item.type = 'role'))

      if (
        props.max &&
        selectedData.value.length + userData.length > props.max &&
        props.multiple
      ) {
        ElMessage.warning(`只能选择${props.max}个角色`)
        return
      }

      handleRootChangeByAll(attr, val)
      handleSelectedChangeByAll(attr, val)
      treeColumnSearchData.data.forEach(item => {
        if (item.id === attr.id) {
          item.selectedStatus = val
        }
      })

      return
    }

    if (
      selectedData.value.length > 0 &&
      !props.multiple &&
      selectedData.value[0].id !== attr.id
    ) {
      ElMessage.warning('只能选择1个部门')
      return
    }

    // 判断限制人数 - part
    if (
      selectedData.value.length > 0 &&
      props.max &&
      selectedData.value.length + 1 > props.max &&
      props.multiple
    ) {
      // 排除已经选中后 取消
      const i = selectedData.value.findIndex(item => item.id === attr.id)
      if (i === -1 || i === '-1') {
        ElMessage.warning(`只能选择${props.max}个部门`)
        return
      }
    }

    handleRootChangeByPart(attr, val)
    handleSelectedChangeByPart(attr, val)
    treeColumnSearchData.data.forEach(item => {
      if (item.id === attr.id) {
        item.selectedStatus = val
      }
    })
  }

  // 搜索选择
  const searchSelected = (attr, val) => {
    emitsDemo(attr, val)
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
    if (val === 0) {
      const array = []
      treeColumnData.data.forEach(item => {
        item.selectedStatus = 0
        array.push(item.id)
      })
      selectedData.value = selectedData.value.filter(
        item => !array.includes(item.id)
      )
    } else {
      treeColumnData.data.forEach(item => {
        item.selectedStatus = 2
      })
      const arr = []
      attr.forEach(item => {
        arr.push(item.id)
      })
      selectedData.value = selectedData.value
        .filter(item => !arr.includes(item.id))
        .concat(attr)
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
      treeColumnData.data.forEach(item => {
        if (item.id === attr.id) {
          item.selectedStatus = 0
        }
      })
      selectedData.value = selectedData.value.filter(
        item => item.id !== attr.id
      )

      const { includeChild } = selectedData.value.find(
        item => item.id === attr.id
      )
      // 取消状态 - 特殊情况 包含状态 且 root树已加载
      function cancelIsChildrenStatus(data) {
        data.forEach(item => {
          if (item.id === attr.id && includeChild === '1') {
            function innerChange(lists) {
              lists.forEach(key => {
                key.selectedStatus = 0
                key.disabled = false
                if (key.children && key.children.length > 0) {
                  return innerChange(key.children)
                }
              })
            }
            innerChange(item.children)
          }

          if (item.children && item.children.length > 0) {
            return cancelIsChildrenStatus(item.children)
          }
        })
      }

      cancelIsChildrenStatus(cacheRootLists.value)
    } else {
      const cacheSelectedData = JSON.parse(JSON.stringify(selectedData.value))

      if (searchType.value) {
        treeColumnSearchData.data.forEach(item => {
          if (item.id === attr.id) {
            item.selectedStatus = 2
            cacheSelectedData.splice(selectedData.value.length, 0, item)
          }
        })
      }

      treeColumnData.data.forEach(item => {
        if (item.id === attr.id) {
          item.selectedStatus = 2
          if (!searchType.value) {
            cacheSelectedData.splice(selectedData.value.length, 0, item)
          }
        }
      })
      selectedData.value = cacheSelectedData
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
    resultOrgan({ ...props.initQueryParams, organId: attr.id }).then(result => {
      const res = result.data
      res.forEach(item => {
        item.selectedStatus = 0
        item.includeChild =
          typeof item.includeChild !== 'string' ? '0' : item.includeChild
        item.disabled = !!item.disabled
      })
      // 展示时，需要对比右侧选择状态
      treeColumnData.data = handleShowListStatus(res, selectedData.value)
      if (attr.id === '-1') {
        state.lists = res.concat(rootNode)
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
          if (
            item.idFullPathSet.includes(val.id) &&
            val.includeChild === '1' &&
            item.id !== val.id
          ) {
            item.disabled = true
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
  const handleSelectedStatus = (data, attr) => {
    data.forEach(item => {
      if (item.id === attr.id) {
        item.selectedStatus = 0
        item.disabled = false
        item.includeChild = '0'
      }
      if (item.idFullPathSet.includes(attr.id) && attr.includeChild === '1') {
        item.selectedStatus = 0
        item.disabled = false
      }
      if (item.children && item.children.length > 0) {
        return handleSelectedStatus(item.children, attr)
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
    handleChangeIncluded1(false, attr)

    handleSelectedStatus(cacheRootLists.value, attr)

    treeColumnData.data.forEach(item => {
      if (item.id === attr.id) {
        item.selectedStatus = 0
        item.disabled = false
      }
      if (item.idFullPathSet.includes(attr.id) && attr.includeChild === '1') {
        item.selectedStatus = 0
        item.disabled = false
      }
    })
    treeColumnSearchData.data.forEach(item => {
      if (item.id === attr.id) {
        item.selectedStatus = 0
        item.disabled = false
      }
      if (item.idFullPathSet.includes(attr.id) && attr.includeChild === '1') {
        item.selectedStatus = 0
        item.disabled = false
      }
    })
  }

  const handleChangeIncluded1 = (status, attr) => {
    // 1.是否有children
    if (!attr.haveChildren) {
      selectedData.value = selectedData.value.filter(val => val.id !== attr.id)
      return
    }
    const aplication = ref([])
    // 2.判断已选中是否被包含
    const str = JSON.parse(JSON.stringify(selectedData.value))
    str.forEach(item => {
      if (item.idFullPathSet.includes(attr.id)) {
        aplication.value.push(item.id)
      }
    })

    selectedData.value = selectedData.value.filter(
      item => !aplication.value.includes(item.id)
    )
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
      item.selectedStatus = switchStatus === '1' ? 2 : 0
      item.disabled = switchStatus === '1'
      if (item.children && item.children.length > 0) {
        return changeChildrenAllStatus(item.children, switchStatus)
      }
    })
  }

  // 监听 向下包含 切换
  const changeSwitch = (switchStatus, attr) => {
    // 处理选中值
    handleChangeIncluded(switchStatus, attr)

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
  }

  const handleChangeIncluded = (status, attr) => {
    // 1.是否有children
    if (!attr.haveChildren) return false
    const aplication = ref([])
    // 2.判断已选中是否被包含
    const str = JSON.parse(JSON.stringify(selectedData.value))
    str.forEach(item => {
      if (item.idFullPathSet.includes(attr.id) && item.id !== attr.id) {
        aplication.value.push(item.id)
      }
    })

    selectedData.value = selectedData.value.filter(
      item => !aplication.value.includes(item.id)
    )
  }
  defineExpose({
    concelSelected,
    clearSelected,
    changeSwitch,
    searchSelected
  })
</script>

<style scoped lang="scss">
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
        cursor: pointer;
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
          color: var(--jy-primary-6);
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
        color: var(--jy-primary-6);
        background: rgba(208, 150, 62, 0.1);
      }
    }
  }

  .select-list {
    padding: 4px 24px 0 0;
    flex: 1;
  }

  // &::after {
  //   content: '';
  //   position: absolute;
  //   right: -1px;
  //   top: -14px;
  //   width: 1px;
  //   height: 462px;
  //   background-color: rgba($color: #d8d8d8, $alpha: 0.6);
  // }
</style>

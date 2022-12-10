<template>
  <div class="k-custom-tree">

    <!-- 全部 -->
    <div class="k-select-all">
      <div class="k-column">
      
        <div class="k-tree-left">
          <!-- checkbox -->
          <div class="check-box">
      
            <!-- 未选 -->
            <div class="" v-show="(allSelected === 0)" @click="checkAll(2)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.01" width="16" height="16" fill="black" />
                <g clip-path="url(#clip0_543_108426)">
                  <rect width="16" height="16" rx="2" fill="white" />
                  <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="black" stroke-opacity="0.15" />
                </g>
                <defs>
                  <clipPath id="clip0_543_108426">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
      
            <!-- 部分 -->
            <div v-show="(allSelected===1)" @click="checkAll(2)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="16" rx="2" fill="#D0963E" />
                <path
                  d="M11.68 7H4.32C4.143 7 4 7.03575 4 7.08V8.92C4 8.96425 4.143 9 4.32 9H11.68C11.857 9 12 8.96425 12 8.92V7.08C12 7.03575 11.857 7 11.68 7Z"
                  fill="white" />
                <mask id="mask0_543_108431" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="7" width="8"
                  height="2">
                  <path
                    d="M11.68 7H4.32C4.143 7 4 7.03575 4 7.08V8.92C4 8.96425 4.143 9 4.32 9H11.68C11.857 9 12 8.96425 12 8.92V7.08C12 7.03575 11.857 7 11.68 7Z"
                    fill="white" />
                </mask>
                <g mask="url(#mask0_543_108431)">
                </g>
              </svg>
            </div>
            
            <!-- 全选 -->
            <div class="" v-show="(allSelected===2)" @click="checkAll(0)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.01" width="16" height="16" fill="black" />
                <rect width="16" height="16" rx="2" fill="#D0963E" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.7703 5.254L7.55825 11.094C7.30425 11.448 6.77825 11.448 6.52425 11.094L4.03025 7.638C3.95425 7.532 4.03025 7.384 4.16025 7.384H5.09825C5.30225 7.384 5.49625 7.482 5.61625 7.65L7.04025 9.626L10.1843 5.266C10.3043 5.1 10.4963 5 10.7023 5H11.6403C11.7703 5 11.8463 5.148 11.7703 5.254Z"
                  fill="white" />
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
            <div v-show="(item.selectedStatus === 0)" @click="checkPart(2, item.id)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.01" width="16" height="16" fill="black" />
                <g clip-path="url(#clip0_543_108426)">
                  <rect width="16" height="16" rx="2" fill="white" />
                  <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="black" stroke-opacity="0.15" />
                </g>
                <defs>
                  <clipPath id="clip0_543_108426">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          
            <!-- 部分 -->
            <div v-show="(item.selectedStatus === 1)" @click="checkPart(2, item.id)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="16" rx="2" fill="#D0963E" />
                <path
                  d="M11.68 7H4.32C4.143 7 4 7.03575 4 7.08V8.92C4 8.96425 4.143 9 4.32 9H11.68C11.857 9 12 8.96425 12 8.92V7.08C12 7.03575 11.857 7 11.68 7Z"
                  fill="white" />
                <mask id="mask0_543_108431" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="7" width="8" height="2">
                  <path
                    d="M11.68 7H4.32C4.143 7 4 7.03575 4 7.08V8.92C4 8.96425 4.143 9 4.32 9H11.68C11.857 9 12 8.96425 12 8.92V7.08C12 7.03575 11.857 7 11.68 7Z"
                    fill="white" />
                </mask>
                <g mask="url(#mask0_543_108431)">
                </g>
              </svg>
            </div>
          
            <!-- 全选 -->
            <div v-show="(item.selectedStatus === 2)" @click="checkPart(0, item.id)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.01" width="16" height="16" fill="black" />
                <rect width="16" height="16" rx="2" fill="#D0963E" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.7703 5.254L7.55825 11.094C7.30425 11.448 6.77825 11.448 6.52425 11.094L4.03025 7.638C3.95425 7.532 4.03025 7.384 4.16025 7.384H5.09825C5.30225 7.384 5.49625 7.482 5.61625 7.65L7.04025 9.626L10.1843 5.266C10.3043 5.1 10.4963 5 10.7023 5H11.6403C11.7703 5 11.8463 5.148 11.7703 5.254Z"
                  fill="white" />
              </svg>
            </div>
          </div>
          
          <!-- 标题 -->
          <div class="k-label user-select">{{ item.labelName }}</div>
        </div>
        

        <!-- 右侧 -->
        <div class="k-tree-right user-select" @click="openInner(item.id)">下级</div>

      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * props:
 * --- lists: [ { 
 *  label: 名称、 
 *  selected: 0(未选中) 1（部分） 2（全部）,
 *  dataType: 类型 - 部门、员工
 *  id: 标识
 *  }]
 * --- @changed 复选框切换事件
 * --- @changedAll 全部
 */

import { defineEmits, defineProps, ref, defineExpose, watch } from 'vue';

const emits = defineEmits(['update:lists', 'open'])

const props = defineProps({
  lists: {
    type: Array,
    default:() => {
      return []
    }
  },
})
const parentId = ref('outer')
// 全选状态
const allSelected = ref(0)
let cacheShowList = ref(JSON.parse(JSON.stringify(props.lists)))
let cacheList = ref(JSON.parse(JSON.stringify(props.lists)))

const initAllSelectedStatus = (data) => {
  const str = data.filter(item => item.selectedStatus === 0)

  if (str.length === 0) {
    const str1 = data.filter(item => item.selectedStatus === 2)
    if (str1.length === data.length) {
      allSelected.value = 2
    } else {
      allSelected.value = 1
    }
  } else if (str.length === data.length) {
    allSelected.value = 0
  } else {
    allSelected.value = 1
  }
}

watch(() => cacheShowList.value, (newVal) => {
  initAllSelectedStatus(newVal)
}, {
  deep: true,
  immediate: true
})

// 初始化全选状态
initAllSelectedStatus(cacheShowList.value)

// 递归处理内部状态
const cycleList = (data, val) => {
  if (!Array.isArray(data) || data.length === 0) return

  data.forEach(item => {
    item.selectedStatus = val
    if (item.children && item.children.length > 0) {
      return cycleList(item.children, val)
    }
  })
}
const cycleAllDemo = (data, attrId) => {
  if (Array.isArray(data)) {

    data.forEach(item => {
      if (item.id === attrId) {
        item = cacheShowList.value
      }
      if (item.children && item.children.length > 0) {
        return cycleAllDemo(item.children, attrId)
      }
    })
  }
}


// 子切换 处理 父状态 callback 0、 1 、2
const handleParentStatus = (data) => {
  if (!Array.isArray(data.children) || data.children.length === 0) return 0

  let objItem = ref({
    allItems: 0,
    nullItems: 0,
    partItems: 0,
    selectedItems: 0
  })
  function handle_parent_status(val) {
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

  handle_parent_status(data.children)
  if (objItem.value.allItems === objItem.value.nullItems) {
    return 0
  } else if (objItem.value.allItems === objItem.value.selectedItems) {
    return 2
  } else {
    return 1
  }
}

// 递归处理child内部状态
const cycleChildList = (data, val, attrId) => {
  if (!Array.isArray(data) || data.length === 0) return

  data.forEach(item => {
    if (item.id === attrId || !attrId) {
      item.selectedStatus = val
      if (item.children && item.children.length > 0) {
        return cycleChildList(item.children, val)
      }
    }
  })

}

const cyclePartDemo = (data, attrId) =>{
  if (Array.isArray(data)) {

    data.forEach(item => {
      if (item.id === attrId) {
        item = cacheShowList.value
      }

      if (item.children && item.children.length > 0) {
        return cyclePartDemo(item.children, attrId)
      }
    })
  }
}

const handle_all_status = (val, valId) => {
  val.forEach(item => {
    if (item.id === valId) {

      item.selectedStatus = handleParentStatus(item)
      if (item.children && item.children.length > 0) {

        return handle_all_status(cacheList.value, item.parentId)
      }
    }
    if (item.children && item.children.length > 0) {
      return handle_all_status(item.children, valId)
    }
  })
}

// 监听 全选
const checkAll = (val) => {

  // 递归
  cycleList(cacheShowList.value, val)

  if (parentId.value === 'outer') {
    cacheList.value = cacheShowList.value
  } else {
    cacheList.value.forEach(item => {
      if (item.id === parentId.value) {
        item.children = cacheShowList.value
      }
    })
    cycleAllDemo(cacheList.value, parentId.value)
  }
  
  handle_all_status(cacheList.value, parentId.value)

  emits('update:lists', cacheList.value)
  allSelected.value = val
}
// 部分 切换
const checkPart = (val, attrId) => {
  cycleChildList(cacheShowList.value, val, attrId)
  
  cacheList.value.forEach(item => {
    if (item.id === attrId) {
      item = cacheShowList.value
    }
  })

  // function handle_all_status(val, valId) {
  //   val.forEach(item => {
  //     if (item.id === valId) {

  //       item.selectedStatus = handleParentStatus(item)
  //       if (item.children && item.children.length > 0) {

  //         return handle_all_status(cacheList.value, item.parentId)
  //       }
  //     }
  //     if (item.children && item.children.length > 0) {
  //       return handle_all_status(item.children, valId)
  //     }
  //   })
  // }
  handle_all_status(cacheList.value, parentId.value)

  cyclePartDemo(cacheList.value, attrId)

  emits('update:lists', cacheList.value)

}

// 打开 内部
const openInner = (attrId) => {
  // children
  emits('open', attrId)
  parentId.value = attrId

  let res = cacheShowList.value
  
  if (res && res.length > 0) {

    res.forEach(item => {
      if (item.id === attrId && item.children && item.children.length > 0) {
        cacheShowList.value = item.children
      }
    })
  }
}

// 处理递归面包屑
const cycleCurmbsList = (data, attrId) => {
  parentId.value = attrId === 'all' ? 'outer' : attrId
  if (attrId === 'all') {
    cacheShowList.value = data
    return
  }
  if (!Array.isArray(data) || data.length === 0) return
  
  for(let i=0; i < data.length; i++) {
    if (data[i].id === attrId) {
      cacheShowList.value = data[i].children
    }
    cycleCurmbsList(data[i].children, attrId)
    
  }
}

// 监听 面包屑 切换
// eslint-disable-next-line no-unused-vars
const updateSonFun = (val) => {
  let res = props.lists

  // console.log(props.lists, '发豆腐脑', cacheShowList.value)
  if (res && res.length > 0) {
    cycleCurmbsList(res, val)
  }
}
defineExpose({
  updateSonFun
})
</script>

<style lang="scss" scoped>
.k-custom-tree {

  // .k-select-all {}

  // .k-select-list {

  // }
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

      .k-label {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85)
      }
    }

    .k-tree-right {
      width: 32px;
      flex-shrink: 0;
      color: #3E78D0;
      cursor: pointer;
    }

  }
  
}
</style>
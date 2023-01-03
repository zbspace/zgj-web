<template>
  <div class="k-custom-tree">

    <!-- 全部 -->
    <div class="k-select-all user-select">
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
            <div v-show="(item.selectedStatus === 0)" @click="checkPart(2, item.id, item.parentId)">
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
            <div v-show="(item.selectedStatus === 1)" @click="checkPart(2, item.id, item.parentId)">
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
            <div v-show="(item.selectedStatus === 2)" @click="checkPart(0, item.id, item.parentId)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.01" width="16" height="16" fill="black" />
                <rect width="16" height="16" rx="2" fill="#D0963E" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.7703 5.254L7.55825 11.094C7.30425 11.448 6.77825 11.448 6.52425 11.094L4.03025 7.638C3.95425 7.532 4.03025 7.384 4.16025 7.384H5.09825C5.30225 7.384 5.49625 7.482 5.61625 7.65L7.04025 9.626L10.1843 5.266C10.3043 5.1 10.4963 5 10.7023 5H11.6403C11.7703 5 11.8463 5.148 11.7703 5.254Z"
                  fill="white" />
              </svg>
            </div>
          </div>
          
          <!-- 类型 -->
          <div class="cloumn-type">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg" v-show="true">
              <path
                d="M4.34854 7.25581V11.7209H0C0 10.5367 0.458148 9.40099 1.27366 8.56362C2.08917 7.72624 3.19523 7.25581 4.34854 7.25581ZM4.34854 6.69767C2.54661 6.69767 1.08713 5.19907 1.08713 3.34884C1.08713 1.4986 2.54661 0 4.34854 0C6.15046 0 7.60994 1.4986 7.60994 3.34884C7.60994 5.19907 6.15046 6.69767 4.34854 6.69767ZM5.75909 9.94158C5.69017 9.64377 5.69017 9.33353 5.75909 9.03572L5.21987 8.71591L5.76344 7.74921L6.30266 8.06902C6.51909 7.85854 6.7807 7.70329 7.06637 7.61581V6.97674H8.1535V7.61581C8.44268 7.704 8.70359 7.8614 8.91722 8.06902L9.45643 7.74921L10 8.71591L9.46078 9.03572C9.52962 9.33335 9.52962 9.6434 9.46078 9.94102L10 10.2608L9.45643 11.2275L8.91722 10.9077C8.70079 11.1182 8.43917 11.2735 8.1535 11.3609V12H7.06637V11.3609C6.7807 11.2735 6.51909 11.1182 6.30266 10.9077L5.76344 11.2275L5.21987 10.2608L5.75909 9.94158ZM7.60994 8.93023C7.46577 8.93023 7.32752 8.98904 7.22558 9.09371C7.12364 9.19838 7.06637 9.34035 7.06637 9.48837C7.06637 9.6364 7.12364 9.77837 7.22558 9.88304C7.32752 9.98771 7.46577 10.0465 7.60994 10.0465C7.7541 10.0465 7.89236 9.98771 7.9943 9.88304C8.09624 9.77837 8.1535 9.6364 8.1535 9.48837C8.1535 9.34035 8.09624 9.19838 7.9943 9.09371C7.89236 8.98904 7.7541 8.93023 7.60994 8.93023Z"
                fill="#777777" />
            </svg>

            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" v-show="false">
              <rect opacity="0.01" width="16" height="16" fill="black" fill-opacity="0.45" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M6 1H10V5H8.5V5.86365H14H14.5V6.36365V10H16V14H12V10H13.5V6.86365H8.5V10H10V14H6V10H7.5V6.86365H2.5V10H4V14H0V10H1.5V6.36365V5.86365H2H7.5V5H6V1Z"
                fill="#777777" />
            </svg>

            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg"  v-show="false">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M4.45074 6.56143C3.49208 6.00794 2.90152 4.98507 2.90152 3.8781C2.90152 2.77114 3.49208 1.74826 4.45074 1.19477C5.4094 0.641292 6.59052 0.641292 7.54918 1.19477C8.50784 1.74826 9.0984 2.77114 9.0984 3.8781C9.0984 4.98507 8.50784 6.00794 7.54918 6.56143C6.59052 7.11491 5.4094 7.11491 4.45074 6.56143ZM11.1625 13.2203C11.4234 13.2203 11.6343 12.9984 11.6125 12.7359C11.4 10.1453 9.50933 8.04216 7.05308 7.56716C6.96715 7.55154 6.87965 7.58279 6.8234 7.64841C6.8234 7.64841 6.19996 8.3781 6.07184 8.53435C6.05777 8.55154 6.05465 8.57498 6.06246 8.59685L7.01402 11.0703C7.03121 11.1125 7.0234 11.1609 6.99371 11.1953L6.04059 12.5515C6.02183 12.5781 5.98277 12.5781 5.96246 12.5515L5.00934 11.1953C4.97965 11.1609 4.97184 11.1125 4.98902 11.0703L5.94059 8.59685C5.94996 8.57654 5.94527 8.55154 5.93121 8.53435C5.80308 8.3781 5.17965 7.64841 5.17965 7.64841C5.1234 7.58279 5.03434 7.54998 4.94996 7.56716C2.49215 8.04216 0.59996 10.1453 0.389022 12.7359C0.367147 12.9969 0.576522 13.2203 0.839022 13.2203H11.1625Z"
                fill="black" fill-opacity="0.45" />
            </svg>

          </div>

          <!-- 标题 -->
          <div class="k-label user-select">{{ item.labelName }}</div>
        </div>
        

        <!-- 右侧 -->
        <div class="k-tree-right user-select" @click="openInner(item.id)" v-if="(item.children && item.children.length > 0)">下级</div>

      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * props:
 * --- lists: [ { 
 *  labelName: 名称、 
 *  selectedStatus: 0(未选中) 1（部分） 2（全部）,
 *  id: 标识
 *  parentId： 父id
 *  }]
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
// 当前层级的父id
const parentId = ref('outer')
// 全选状态
const allSelected = ref(0)
let cacheShowList = ref(JSON.parse(JSON.stringify(props.lists)))
let cacheList = ref(JSON.parse(JSON.stringify(props.lists)))

// 判断 当前层级 全部选择状态
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

// 监听 显示数据列 动态展示 每层级全选状态
watch(() => cacheShowList.value, (newVal) => {
  initAllSelectedStatus(newVal)
}, {
  deep: true,
})

// 初始化全选状态
initAllSelectedStatus(cacheShowList.value)

// 递归处理内部状态
const cycleList = (data, val, attrId) => {
  if (!Array.isArray(data) || data.length === 0) return

  data.forEach(item => {
    if (item.id === attrId || !attrId) {
      item.selectedStatus = val
      if (item.children && item.children.length > 0) {
        return cycleList(item.children, val)
      }
    }
  })
}

// 替换 cacheShowList -> cacheList 选择状态
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

// 修改父级选中状态
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

const commonCheckFn = (val, attrId, pId) => {

  // 处理树型数据下所有状态
  cycleList(cacheShowList.value, val, attrId)

  if (parentId.value === 'outer') {
    cacheList.value = cacheShowList.value
  } else {
    replaceChildNode(cacheList.value, pId ? pId : parentId.value)
  }

  // 递归处理上级节点状态
  handle_all_status(cacheList.value, parentId.value)

  // 更新 props
  emits('update:lists', cacheList.value)
}

// 监听 全选 切换
const checkAll = (val) => {
  commonCheckFn(val)
  // // 处理树型数据下所有状态
  // cycleList(cacheShowList.value, val)

  // if (parentId.value === 'outer') {
  //   cacheList.value = cacheShowList.value
  // } else {
  //   replaceChildNode(cacheList.value, parentId.value)
  // }
  
  // // 递归处理上级节点状态
  // handle_all_status(cacheList.value, parentId.value)

  // // 更新 props
  // emits('update:lists', cacheList.value)

  allSelected.value = val
}

// 监听 部分 切换
const checkPart = (val, attrId, pId) => {
  commonCheckFn(val, attrId, pId)
}

// 打开 下级
const openInner = (attrId) => {

  // 更新面包屑
  emits('open', attrId)

  // 更新 父id
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

// 处理 切换面包屑 展示数据
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
const updateSonFun = (val) => {
  let res = props.lists
  // let res = cacheList.value
  if (res && res.length > 0) {
    cycleCurmbsList(res, val)
  }
}
defineExpose({
  updateSonFun,
})
</script>

<style lang="scss" scoped>
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
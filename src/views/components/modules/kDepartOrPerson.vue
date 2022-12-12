<template>
  <KDialog @update:show="props.show" :show="props.show" :title="$t('t-zgj-list.SelectionDepartment')" @close="closeDialog" :confirmText="$t('t-zgj-select.confirm')" :concelText="$t('t-zgj-operation.cancel')">
   <div class="selection-content">

    <!-- left -->
    <div class="selection-left user-select">
    
      <!-- search -->
      <div class="select-search">
        <el-input v-model="searchQuery" placeholder="搜索部门/成员" :prefix-icon="Search" size="large" />
      </div>

      <!-- crumbs -->
      <div class="select-crumbs user-select">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item @click="changeCrumb('all')">组织架构</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in curmbs" :key="index" @click="changeCrumb(item.id)">{{ item.curmbsName }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- select-list -->
      <div class="select-list user-select">
        <kTree :lists="treeColumnData" @update:lists="(treeColumnData = $event)" @open="openInner"  ref="UpdateSonFun"></kTree>
      </div>

    </div>
    
    <!-- right -->
    <div class="selection-right user-select">
      <div class="select-right-column" v-for="(item, index) in selectedData" :key="index">
        <div class="select-label">{{ item.labelName }}</div>
        <div class="select-close" @click="concelSelected(item)">
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M0.4375 7C0.4375 3.4375 3.4375 0.4375 7 0.4375C10.5625 0.4375 13.5625 3.4375 13.5625 7C13.5625 10.5625 10.5625 13.5625 7 13.5625C3.4375 13.5625 0.4375 10.5625 0.4375 7ZM9.8125 9.71875C10.0938 9.53125 10.0938 9.15625 9.8125 8.875L7.9375 7L9.90625 5.03125C10.1875 4.75 10.1875 4.375 9.90625 4.09375C9.625 3.8125 9.25 3.8125 8.96875 4.09375L7 6.0625L5.125 4.1875C4.9375 3.90625 4.5625 3.90625 4.28125 4.1875C4 4.46875 4 4.84375 4.28125 5.03125L6.15625 6.90625L4.1875 8.875C3.90625 9.0625 3.90625 9.53125 4.1875 9.8125C4.46875 10.0938 4.84375 10.0938 5.125 9.8125L7.09375 7.84375L8.96875 9.71875C9.15625 10 9.53125 10 9.8125 9.71875Z"
              fill="black" fill-opacity="0.25" />
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
import { defineProps, defineEmits, reactive, ref, watch } from 'vue';
import { treeDataTranslate } from '@/hooks/handleTreeData.js';
import { Search, ArrowRight } from '@element-plus/icons-vue'
import kTree from './kTree.vue';

const emits = defineEmits(['update:show']);

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
})

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
      labelName: '测试中心'
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
    },
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
const findSelectedStatus = (data) => {
  data.forEach(item => {
    if (item.selectedStatus === 2) {
      selectedData.value.push(item)
    } else if (item.selectedStatus === 1 && item.children && item.children.length > 0) {
      return findSelectedStatus(item.children)
    }
  })
}

// 监听 组织架构 props
watch(treeColumnData, (val) => {
  // 全选 不查 children、 部分选 查
  if (val && val.length > 0) {
    selectedData.value = []
    findSelectedStatus(val)
  }
}, {
  deep: true,
  immediate: false
})
// 处理面包屑 - 递归展示
const handleCurmbs = (attr, attrId) => {
  var path = [];
  if (!attr) return [];
  var forFn = function (tree, id) {
    for (var i = 0; i < tree.length; i++) {
      // 存放最后返回的内容,返回text集合
      var data = tree[i];
      path.push({
        curmbsName: data.labelName,
        id: data.id
      });
      if (data.id === id) return path;
      if (data.children) {
        const findChildren = forFn(data.children, id);
        if (findChildren) return findChildren
      }
      path.pop()
    }
  }
  forFn(attr, attrId);
  return path;
}
// 面包屑
const curmbs = ref([])
let cacheRootLists = JSON.parse(JSON.stringify(treeColumnData.value))
// 打开 下级 更新面包屑
const openInner = (attrId) => {
  // 处理面包屑 - 递归展示
  let result = handleCurmbs(cacheRootLists, attrId)
  
  curmbs.value = result
}
// 调用子组件方法
const UpdateSonFun = ref()

const changeCrumb = (attrId) => {

  UpdateSonFun.value.updateSonFun(attrId)
  if (attrId === 'all') {
    curmbs.value = []
    return
  }
  let result = handleCurmbs(cacheRootLists, attrId)
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

        return handle_all_status(treeColumnData.value, item.parentId)
      }
    }
    if (item.children && item.children.length > 0) {
      return handle_all_status(item.children, valId)
    }
  })
}
// 取消选中项
const concelSelected = (attr) => {
  
  if (selectedData.value.length > 0) {
    selectedData.value = selectedData.value.filter(item => item.id !== attr.id)
  }

  handleSelectedStatus(treeColumnData.value, attr.id)

  handle_all_status(treeColumnData.value, attr.parentId)
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
      padding: 10px 20px;
    }

    .select-crumbs {
      padding: 6px 20px;
    }

    .select-list {
      padding: 4px 24px;
      flex: 1;
    }

    &::after {
      content: "";
      position: absolute;
      right: -1px;
      top: 0;
      width: 1px;
      height: 100%;
      background-color: rgba($color: #D8D8D8, $alpha: 0.6);
    }
  }

  .selection-right {
    flex: 1;
    height: 380px;
    overflow-y: auto;

    .select-right-column {
      display: flex;
      justify-content: space-between;
      padding: 14px 20px;
      .select-label {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
      }

      .select-close {
        cursor: pointer;
      }
    }
  }
}
</style>
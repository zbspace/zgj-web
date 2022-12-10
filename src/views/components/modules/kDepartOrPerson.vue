<template>
  <KDialog @update:show="props.show" :show="props.show" :title="$t('t-zgj-list.SelectionDepartment')" @close="closeDialog" :confirmText="$t('t-zgj-select.confirm')" :concelText="$t('t-zgj-operation.cancel')">
   <div class="selection-content">

    <!-- left -->
    <div class="selection-left">
    
      <!-- search -->
      <div class="select-search">
        <el-input v-model="searchQuery" placeholder="搜索部门/成员" :prefix-icon="Search" size="large" />
      </div>

      <!-- crumbs -->
      <div class="select-crumbs">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item @click="changeCrumb('all')">组织架构</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in curmbs" :key="index" @click="changeCrumb(item.id)">{{ item.curmbsName }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- select-list -->
      <div class="select-list">
        <kTree :lists="treeColumnData" @update:lists="(treeColumnData = $event)" @open="openInner"  ref="UpdateSonFun"></kTree>
      </div>

    </div>
    
    <!-- right -->
    <div class="selection-right">
    
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

// 监听 组织架构 props
// watch(treeColumnData, (val, old) => {
//   console.log(val, '变化了', old, treeColumnData)
// }, {
//   deep: true,
//   immediate: true
// })
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
// 调用子组件方法 - 
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
</script>

<style lang="scss" scoped>
.selection-content {
  display: flex;
  height: 100%;
  
  .selection-left {
    position: relative;
    flex: 1;

    .select-search {
      padding: 10px 20px;
    }

    .select-crumbs {
      padding: 6px 20px;
    }

    .select-list {
      padding: 4px 24px;
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
  }
}
</style>
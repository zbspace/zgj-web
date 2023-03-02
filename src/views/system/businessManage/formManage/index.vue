<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,tree,batch">
      <template #title>
        <div class="title">
          <div>表单管理</div>
          <div>
            <el-button type="primary" @click="showAddForm">+ 新建</el-button>
          </div>
        </div>
      </template>

      <template #searchForm>
        <div>
          <componentsSearchForm
            :data="state.componentsSearchForm.data"
            :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style"
            @clickSubmit="getFormPage"
            @click="clearFormPage"
          >
          </componentsSearchForm>
        </div>
      </template>

      <template #batch>
        <div class="batch">
          <componentsBatch 
            :data="state.componentsBatch.data"
            :defaultAttribute="state.componentsBatch.defaultAttribute"
            @clickBatchButton="batchDel"
            >
          </componentsBatch>
        </div>
      </template>

      <template #tree>
        <div>
          <componentsTree
            :data="state.componentsTree.data"
            :defaultAttribute="state.componentsTree.defaultAttribute"
            @node-click="clickTreeNode"
          >
          </componentsTree>
        </div>
      </template>

      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            :isSelection="true"
            @cellClick="cellClick"
            @custom-click="customClick"
            @selection-change="selectionChange"
          >
          </componentsTable>
        </div>
      </template>

      <template #pagination>
        <componentsPagination
          :data="state.componentsPagination.data"
          :defaultAttribute="state.componentsPagination.defaultAttribute"
          @size-change="sizeChange"
          @current-change="currentChange"
        >
        </componentsPagination>
      </template>
    </componentsLayout>
    <!-- 表单管理详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>
    <!-- 新增表单 -->
    <AddFrom
      v-model="dialogVisible"
      v-if="dialogVisible"
      :addTitle="addFormtitle"
      :columnData = "state.JyElMessageBox.data"
      @close="dialogVisible = false"
    />
    <!-- 弹窗提示 -->
    <JyElMessageBox
      v-model="state.JyElMessageBox.show"
      :show="state.JyElMessageBox.show"
      :defaultAttribute="{}"
    >
      <template #header>
         <div class="header-div">
              <img :src='state.JyElMessageBox.header.icon' alt="" />
              <span>{{ state.JyElMessageBox.header.data }}</span>
          </div>
      </template>
      <template #content>
        <div class="content-div">{{ state.JyElMessageBox.content.data }}</div>
      </template>
      <template #footer>
        <el-button type="primary" @click="submitDel"> 提交 </el-button>
          <el-button @click="state.JyElMessageBox.show = false">取消</el-button>
      </template>
    </JyElMessageBox>
    <!-- 复制表单提示 -->
    <JyElMessageBox
      v-model="state.showFormDialog.show"
      :show="state.showFormDialog.show"
      :defaultAttribute="{}"
    >
      <template #header>
         {{ state.showFormDialog.header.data }}
      </template>
      <template #content>
        <el-form
          label-position="left"
          label-width="100px"
          :model="state.copyTable"
          hide-required-asterisk
        >
          <el-form-item
            prop="tableName"
            :rules="[
              {
                required: true,
                message: '表单名称不能为空',
                trigger: 'blur'
              }
            ]"
          >
            <template #label>
              <div class="from-label">表单名称</div>
            </template>
            <el-input
              v-model="state.copyTable.tableName"
              placeholder="请输入"
              style="width: 210px"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="submitCopyTabel"> 提交 </el-button>
          <el-button @click="closeCopyTabel">取消</el-button>
      </template>
    </JyElMessageBox>
    <!-- 批量操作弹框提示 -->
    <JyElMessageBox
      v-model="state.showToastDialog.show"
      :show="state.showToastDialog.show"
      :defaultAttribute="{}"
    >
      <template #header>
        <div class="header-div">
              <img :src='state.showToastDialog.header.icon' alt="" />
              <span>{{ state.showToastDialog.header.data }}</span>
            </div>
      </template>
      <template #content>
        <div class="content-div">{{ state.showToastDialog.content.data }}</div>
        <el-scrollbar class="scrollbar" max-height="200px">
          <p v-for="item in state.componentsBatch.selectionData" :key="item"  class="scrollbar-demo-item">{{ item.formName }}</p>
        </el-scrollbar>
      </template>
      <template #footer>
          <el-button @click="closeBatchTabel">知道了</el-button>
      </template>
    </JyElMessageBox>
  </div>
</template>

<script setup>
  import { reactive, ref, defineAsyncComponent, onBeforeMount } from 'vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination.vue'
  import componentsLayout from '@/views/components/Layout.vue'
  import componentsTree from '@/views/components/tree'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import api from '@/api/system/formManagement'
import { functions } from 'lodash'
  const AddFrom = defineAsyncComponent(() => import('./AddForm'))
  const dialogVisible = ref(false)
  const addFormtitle = ref('')
  const state = reactive({
    componentsSearchForm: {
      style: {
        lineStyle: {
          width: '30%'
        },
        labelStyle: {
          width: '100px'
        }
      },

      data: [
        {
          id: 'name',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '表单名称/创建人'
          },
          options: [
            {
              value: '1',
              label: '全部'
            }
          ]
        },
        {
          id: 'name',
          label: '状态',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: [
            {
              value: '1',
              label: '全部'
            }
          ]
        },
        {
          id: 'picker',
          label: '更新时间',
          type: 'picker',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间'
          },
          style: {}
        },
        {
          id: 'name',
          label: '业务类型',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: [
            {
              value: '1',
              label: '全部'
            }
          ]
        },
        {
          id: 'name',
          label: '文件类型',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: [
            {
              value: '1',
              label: '全部'
            }
          ]
        },
        {
          id: 'name',
          label: '用印类型',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: [
            {
              value: '1',
              label: '全部'
            }
          ]
        }
      ],
      butData: [
        {
          id: 'more',
          name: '展开',
          type: 'unfold',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'primary'
          },
          style: {}
        },
        {
          id: 'inquire',
          name: '查询',
          type: 'click',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'primary'
          },
          style: {}
        },
        {
          id: 'reset',
          name: '重置',
          type: 'click',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {},
          style: {}
        }
      ]
    },
    copyTable: {
      tableName:''
    },
    componentsTable: {
      header: [
        {
          prop: 'formName',
          label: '表单名称',
          sortable: true,
          'min-width': 150,
          fixed: true
        },
        {
          prop: 'applyTypeName',
          label: '业务类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'sealUseTypeName',
          label: '用印类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'relationFlow',
          label: '状态',
          width: 90,
          sortable: true
        },
        {
          prop: 'createUserName',
          label: '创建人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'modifyDatetime',
          label: '更新时间',
          width: 190,
          sortable: true
        },

        {
          prop: '8',
          label: '操作',
          fixed: 'right',
          width: 150,
          rankDisplayData: [
            {
              name: '修改'
            },
            {
              name: '删除'
            },
            {
              name: '复制'
            }
          ]
        }
      ],
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          // console.log({ row, column, rowIndex, columnIndex });
          if (column.property === 'formName') {
            return {
              color: 'var(--jy-info-6)',
              cursor: 'pointer'
            }
          }
        }
      }
    },
    
    componentsBatch: {
      selectionData: [],
      defaultAttribute: {
        disabled: true
      },
      data: [
        {
          name: '批量删除'
        }
      ]
    },
    componentsPagination: {
      data: {
        amount: 400,
        index: 1,
        pageNumber: 80
      },
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        layout: 'prev, pager, next, jumper',
        total: 500,
        'page-sizes': [10, 100, 200, 300, 400],
        background: true
      }
    },

    componentsTree: {
      data: [
        // {
        //   label: '用印申请',
        //   children: [
        //     {
        //       label: '用印申请'
        //     },
        //     {
        //       label: '转办申请'
        //     },
        //     {
        //       label: '重置用印申请'
        //     }
        //   ]
        // },
        // {
        //   label: '印章申请',
        //   children: [
        //     {
        //       label: '刻章申请'
        //     },
        //     {
        //       label: '停用申请'
        //     },
        //     {
        //       label: '启用申请'
        //     },
        //     {
        //       label: '销毁申请'
        //     },
        //     {
        //       label: '变更申请'
        //     },
        //     {
        //       label: '换章申请'
        //     }
        //   ]
        // }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': false,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'check-strictly': true,
        'highlight-current':true,
        'auto-expand-parent':true
      }
    },
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '表单详情',
          name: 'Form-Details'
        },
        {
          label: '操作记录',
          name: 'operating-record'
        },
        {
          label: '历史版本',
          name: 'Process-Version'
        }
      ]
    },
    JyElMessageBox: {
      show: false,
      header: {
        data: '',
        icon: '/src/assets/svg/common/warning.svg'
      },
      content: {
        data: ''
      },
      data: {
      }
    },
    showFormDialog: {
      show: false,
      header: {
        data: ''
      },
      content: {
        data: ''
      }
    },
    showToastDialog: {
      show: false,
      header: {
        data: '',
        icon: '/src/assets/svg/common/warning.svg'
      },
      content: {
        data: ''
      }
    }
  })
  // 点击树节点
  function clickTreeNode(data) {
    console.log(data)
    getFormPage()
  }
  // 请求表单树
  function getListApplyTypeTree() {
    api.listApplyTypeTree().then(res => {
      console.log(res)
      const { code, data } = res
      if (code === 200) {
        const listApplyTypeTree = []
        const applyTypeId = []
        data.forEach(element => {
          element.label = element.applyTypeName
          if (element.parent_id === '') {
            element.children = []
            listApplyTypeTree.push(element)
            applyTypeId.push(element.applyTypeId)
          }
        })
        data.forEach(element => {
          const index = applyTypeId.indexOf(element.parent_id)
          if (index > -1) {
            listApplyTypeTree[index].children.push(element)
          }
        })
        state.componentsTree.data = listApplyTypeTree
      }
    })
  }
  // 请求表单列表
  function getFormPage() {
    const searchData = state.componentsSearchForm.data
    const queryParams = {
      keyword: '',
      updateStartTime: '',
      updateEndTime: '',
      applyTypeId: '',
      sealUseTypeId: '',
      relationFlow: ''
    }
    searchData.map((item, index) => {
      switch (item.label) {
        case '关键词':
          queryParams.keyword = item.value
          break
        case '状态':
          queryParams.relationFlow = item.value
          break
        case '更新时间':
          queryParams.updateStartTime = item.value && item.value[0]
          queryParams.updateEndTime = item.value && item.value[1]
          break
        case '业务类型':
          queryParams.applyTypeId = item.value
          break
        case '用印类型':
          queryParams.sealUseTypeId = item.value
          break
      }
    })
    console.log(queryParams)
    api.formPage(queryParams).then(res => {
      console.log('表格数据',res)
      const { code, data } = res
      if (code === 200) {
        state.componentsTable.data = data
        state.componentsPagination.data.amount = data.length
        state.componentsPagination.defaultAttribute.total = data.length
      }
    })
  }
  //清除筛选条件
  function clearFormPage() {
    console.log('清除筛选项')
  }
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event)
    if (column.property === 'formName') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    console.log(cell)
    console.log(row)
    console.log(column)
    if (cell.name === '修改') {
      console.log('修改')
      dialogVisible.value = true
      addFormtitle.value = '修改'
      state.JyElMessageBox.data = column
    }
    if (cell.name === '删除') {
      console.log('删除')
      state.JyElMessageBox.header.data = '删除'
      state.JyElMessageBox.content.data =
        '请问确定要删除该表单吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.data.tableId = column.formMessageId
    }
    if (cell.name === '复制') {
      // console.log('复制')
      state.showFormDialog.header.data = '表单复制'
      state.copyTable.tableName = `${column.formName}-副本`
        state.showFormDialog.show = true;
    }
  }
  // 删除提交
  function submitDel() {
    console.log('提交删除')
    let data = {
      formMessageId:state.JyElMessageBox.data.tableId
    }
    api.formPage(data).then(res =>{
        if(res.code==200){
          console.log('删除成功')
          getFormPage();
        }
    })
    state.JyElMessageBox.show = false
  }
  // 批量删除
  function batchDel() {
    console.log(state.componentsBatch.selectionData)
    state.showToastDialog.header.data = '批量删除'
    state.showToastDialog.content.data = '已选中以下表单，请问确定要批量删除吗？'
    state.showToastDialog.show = true;
    state.showToastDialog.header.icon = '/src/assets/svg/common/danger.svg'
      console.log('批量删除')
  }
  //关闭表单复制弹窗
  function closeBatchTabel() {
    state.showToastDialog.show = false
  }
  //关闭表单复制弹窗
  function closeCopyTabel() {
    state.showFormDialog.show = false
  }
  //提交表单名称
  function submitCopyTabel() {
    console.log(state.copyTable.tableName)
    console.log("提交表单")
    state.showFormDialog.show = false
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }
  // 当选择项发生变化时会触发该事件
  function selectionChange(selection) {
    //    console.log(selection);
    state.componentsBatch.selectionData = selection
    if (state.componentsBatch.selectionData.length > 0) {
      state.componentsBatch.defaultAttribute.disabled = false
    } else {
      state.componentsBatch.defaultAttribute.disabled = true
    }
  }
  // 分页页数变化
  function currentChange(data) {
      console.log(data)
      state.componentsPagination.index = data;
      getFormPage()
  }
  // 每页请求数量变化
  function sizeChange(data) {
      console.log(data)
      state.componentsPagination.pageNumber = data;
      getFormPage()
  }
  //打开新增
  function showAddForm() {
    dialogVisible.value = true
    addFormtitle.value = '新建'
    state.JyElMessageBox.data= {}
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 加载表单列表
    getListApplyTypeTree()
    getFormPage()
  })
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .header-div {
          display: flex;
          align-items: center;
        }
        img {
          width: 21px;
          margin-right: 18px;
        }
        span {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: rgba(0, 0, 0, 0.85);
        }
  .content-div {
      padding-left:40px;
      margin-bottom:10px;
      font-size:16px; 
  }
  .scrollbar {
    padding:0 20px;
    .scrollbar-demo-item {
      display: flex;align-items: center;
      justify-content: center;
      height: 50px;
      margin: 20px;
      text-align: center;
      border-radius: 4px;
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);      
    }
  }
</style>

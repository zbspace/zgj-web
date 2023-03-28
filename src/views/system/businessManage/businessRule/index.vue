<template>
  <div>
    <JyTable
      url="/biz/rule/page"
      ref="table"
      method="POST"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      tableClick="ruleBusinessName"
      statusColoum="flag"
      openValue="1"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
    >
      <template #title>
        <div class="title">
          <div>业务规则管理</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="addBussinessRule"
                >+ 增加</el-button
              >
            </div>
          </div>
        </div>
      </template>
    </JyTable>
    <!-- 业务规则详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>

    <!-- 业务规则 -->
    <Add :showAdd="showFormDialog" @on-cancel="closeAddForm"></Add>
  </div>
</template>

<script setup>
  import { reactive, ref, onMounted } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import tabHeaderJson from '@/views/tableHeaderJson/system/companyManage/departmentStaff/businessRule.json'
  import Add from '@/views/system/businessManage/businessRule/modules/add.vue'
  import { useRouter } from 'vue-router'

  const showFormDialog = ref(false)
  const router = useRouter()

  const state = reactive({
    componentsSearchForm: {
      data: [
        {
          id: 'keyword',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '业务规则名称/业务规则编码/创建人'
          }
        },
        {
          id: 'status',
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
              label: '启用'
            },
            {
              value: '0',
              label: '停用'
            }
          ]
        },
        {
          id: 'updateTime',
          label: '更新时间',
          type: 'picker',
          inCommonUse: true,
          requestType: 'array',
          startRequest: 'updateStartTime',
          endRequest: 'updateEndTime',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
            'value-format': 'YYYY-MM-DD',
            'disabled-date': time => {
              return time.getTime() > Date.now() // 如果有后面的-8.64e7就是不可以选择今天的
            },
            'default-value': [
              new Date(new Date().setMonth(new Date().getMonth() - 1)),
              new Date()
            ]
          },
          style: {}
        },
        {
          id: 'sealUseTypeId',
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
              label: '物理用印'
            },
            {
              value: '2',
              label: '电子签章'
            }
          ]
        },
        {
          id: 'fileTypeId',
          label: '文件类型',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择',
            filterable: true
          },
          optionValue: 'fileTypeId',
          optionLabel: 'fileTypeName',
          options: [],
          requestObj: {
            url: '/fileType/queryList',
            method: 'POST'
          }
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

    componentsTable: {
      header: tabHeaderJson
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
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '业务规则详情',
          name: 'Business-Rule-Details'
        },
        {
          label: '流程记录',
          name: 'operating-record'
        }
      ]
    }
  })

  const addBussinessRule = () => {
    router.push({
      name: 'EditBusinessRule'
    })
  }

  const closeAddForm = () => {
    showFormDialog.value = false
  }

  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    console.log(row, column, cell, event)
    if (column.property === 'ruleBusinessName') {
      state.componentsDocumentsDetails.show = true
    }
  }
  function customClick(row, column, cell, event) {
    console.log(cell.name)
    if (cell.name === 't-zgj-Edit') {
      router.push({
        name: 'EditBusinessRule',
        query: {
          ruleBusinessId: column.ruleBusinessId
        }
      })
    }
    if (cell.name === 't-zgj-Delete') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '您确定要删除该记录吗？'
      state.JyElMessageBox.show = true
    }
  }
  // 点击关闭
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }

  onMounted(() => {})
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

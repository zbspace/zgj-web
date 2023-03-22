<template>
  <div>
    <!-- <componentsLayout Layout="title,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">
          <div>业务规则管理</div>
          <div>
            <el-button type="primary" @click="showFormDialog = true"
              >+ 新建</el-button
            >
          </div>
        </div>
      </template>

      <template #searchForm>
        <div>
          <componentsSearchForm
            :data="state.componentsSearchForm.data"
            :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style"
          >
          </componentsSearchForm>
        </div>
      </template>

      <template #batch>
        <div class="batch">
          <componentsBatch
            :data="state.componentsBatch.data"
            :defaultAttribute="state.componentsBatch.defaultAttribute"
          >
          </componentsBatch>
        </div>
      </template>

      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            :paginationData="state.componentsPagination.data"
            isSelection
            isNo
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
        >
        </componentsPagination>
      </template>
    </componentsLayout> -->
    <JyTable
      url="/biz/rule/page"
      ref="table"
      :needAutoRequest="false"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      tableClick="ruleBusinessName"
      statusColoum="status"
      openValue="0"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
    >
      <template #title>
        <div class="title">
          <div>业务规则管理</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="showFormDialog = true"
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

    <!-- 业务规则弹框 -->
    <!-- <JyDialog
      @update:show="showFormDialog = $event"
      :show="showFormDialog"
      title="新增业务规则"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="1000"
      :height="600"
      @confirm="submitForm(true)"
    >
      <v-form-render
        :form-json="formJson"
        :form-data="formData"
        :option-data="optionData"
        ref="vFormRef"
      >
      </v-form-render>
    </JyDialog> -->
    <Add :showAdd="showFormDialog" @on-cancel="closeAddForm"></Add>
  </div>
</template>

<script setup>
  import { reactive, ref, onMounted } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination.vue'
  import componentsLayout from '@/views/components/Layout.vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import tabHeaderJson from '@/views/tableHeaderJson/system/companyManage/departmentStaff/businessRule.json'
  import componentsBatch from '@/views/components/batch.vue'
  import FormJson from '@/views/addDynamicFormJson/documentType.json'
  import Add from '@/views/system/businessManage/businessRule/modules/add.vue'
  import { fileManageService } from '@/api/frontDesk/fileManage'
  import { messageError, messageSuccess } from '@/hooks/useMessage'

  const formJson = reactive(FormJson)
  const formData = reactive({})
  const optionData = reactive({})
  const showFormDialog = ref(false)

  const vFormRef = ref(null)
  const submitForm = type => {
    console.log(type)
    if (!type) {
      vFormRef.value.resetForm()
      return
    }
    vFormRef.value
      .getFormData()
      .then(formData => {
        // Form Validation OK
        alert(JSON.stringify(formData))
        // showFormDialog.value = false
      })
      .catch(error => {
        // Form Validation failed

        messageError(error)
      })
  }

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
              value: '0',
              label: '全部'
            },
            {
              value: '1',
              label: '启用'
            },
            {
              value: '2',
              label: '停用'
            }
          ]
        },
        {
          id: 'picker',
          label: '创建时间',
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
              value: '0',
              label: '全部'
            },
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

    componentsTable: {
      header: tabHeaderJson,
      data: [
        {
          1: '业务规则1',
          2: '202302280001',
          3: '是',
          4: '否',
          5: '是',
          6: '是',
          7: '否',
          8: '是',
          9: '盖中 盖后 归档中',
          10: '2022/10/30 15:00:00',
          11: '小红'
        },
        {
          1: '业务规则2',
          2: '202302280002',
          3: '否',
          4: '是',
          5: '否',
          6: '否',
          7: '否',
          8: '是',
          9: '盖中 盖后 归档中',
          10: '2022/10/30 15:00:00',
          11: '小红'
        },
        {
          1: '业务规则3',
          2: '202302280003',
          3: '是',
          4: '是',
          5: '否',
          6: '是',
          7: '是',
          8: '是',
          9: '盖中 盖后 归档中',
          10: '2022/10/30 15:00:00',
          11: '小红'
        },
        {
          1: '业务规则4',
          2: '202302280004',
          3: '是',
          4: '是',
          5: '否',
          6: '是',
          7: '否',
          8: '否',
          9: '盖中 盖后 归档中',
          10: '2022/10/30 15:00:00',
          11: '小红'
        },
        {
          1: '业务规则5',
          2: '202302280005',
          3: '是',
          4: '是',
          5: '否',
          6: '是',
          7: '否',
          8: '是',
          9: '盖中 盖后 归档中',
          10: '2022/10/30 15:00:00',
          11: '小红'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          // console.log({ row, column, rowIndex, columnIndex });
          if (column.property === '1') {
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
  const closeAddForm = () => {
    showFormDialog.value = false
  }
  const getFileTypeTree = async () => {
    try {
      const res = await fileManageService.getTreeList({})
      console.log(res)
    } catch (error) {
      messageError(error)
    }
  }
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    console.log(row, column, cell, event)
    if (column.property === '1') {
      state.componentsDocumentsDetails.show = true
    }
  }
  function customClick(row, column, cell, event) {
    console.log(cell.name)
    if (cell.name === '修改') {
      showFormDialog.value = true
    }
    if (cell.name === '删除') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '您确定要删除该记录吗？'
      state.JyElMessageBox.show = true
    }
  }
  // 点击关闭
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
  onMounted(() => {
    getFileTypeTree()
  })
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

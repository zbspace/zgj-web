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
                >+ {{ $t('t-zgj-add') }}
              </el-button>
            </div>
          </div>
        </div>
      </template>
    </JyTable>
    <!-- 业务规则详情 -->
    <Detail
      v-model="state.componentsDocumentsDetails.show"
      :ruleBusinessId="ruleBusinessId"
    />
    <!-- 单个操作弹框 -->
    <actionOneDialog
      v-model="state.JyElMessageBox.show"
      :JyElMessageBox="state.JyElMessageBox"
      @update:modelValue="state.JyElMessageBox.show"
      @submitElMessageBox="submitElMessageBox"
    ></actionOneDialog>
    <!-- 批量操作弹框提示 -->
    <actionMoreDialog
      @update:modelValue="state.showToastDialog.show = false"
      :show="state.showToastDialog.show"
      :selectionData="state.componentsBatch.selectionData"
      :showToastDialogContent="state.showToastDialog"
      label="formName"
      @sureAction="moreSureAction"
      :curKey="state.showToastDialog.curKey"
    ></actionMoreDialog>
    <!-- 复制 -->
    <!-- 复制表单提示 -->
    <JyElMessageBox
      v-model="state.showFormDialog.show"
      :show="state.showFormDialog.show"
      :defaultAttribute="{}"
    >
      <template #header> 业务规则复制 </template>
      <template #content>
        <el-form
          ref="formRef"
          label-position="left"
          label-width="100px"
          :model="state.showFormDialog"
          hide-required-asterisk
        >
          <el-form-item
            prop="ruleBusinessName"
            :rules="[
              {
                required: true,
                message: '业务规则名称不能为空',
                trigger: 'change'
              }
            ]"
          >
            <template #label>
              <div class="from-label">业务规则名称</div>
            </template>
            <el-input
              v-model="state.showFormDialog.ruleBusinessName"
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
    <JyActionErrorDialog
      :show="state.showToastDialogContent.show"
      :showToastDialogContent="state.showToastDialogContent"
      @update:modelValue="state.showToastDialogContent.show = false"
    ></JyActionErrorDialog>
  </div>
</template>

<script setup>
  import { reactive, ref, onMounted } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import actionOneDialog from '@/views/components/actionOneDialog.vue'
  import actionMoreDialog from '@/views/components/actionMoreDialog'
  import tabHeaderJson from '@/views/tableHeaderJson/system/companyManage/departmentStaff/businessRule.json'
  import { useRouter } from 'vue-router'
  import ruleApi from '@/api/system/businessManage/businessRule'
  import { messageSuccess } from '@/hooks/useMessage'
  import Detail from './detail'

  const router = useRouter()
  const ruleBusinessId = ref('')

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
          id: 'flag',
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
          inCommonUse: false,
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
          inCommonUse: false,
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
          requestParams: 'fileTypeId',
          label: '文件类型',
          type: 'derivable',
          inCommonUse: false,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择',
            type: 'fileType',
            multiple: true,
            joinStr: ','
          },
          options: []
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
          name: 't-zgj-seal.BatchDelete'
        },
        {
          name: 't-zgj-dept.BatchEnable'
        },
        {
          name: 't-zgj-dept.BatchDeactivation'
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
    },
    JyElMessageBox: {
      type: '',
      id: '',
      flag: '',
      show: false,
      header: {
        data: ''
      },
      content: {
        data: ''
      }
    },
    showToastDialog: {
      curKey: '',
      type: '',
      show: false,
      header: {
        data: ''
      },
      content: {
        data: ''
      }
    },
    showFormDialog: {
      show: false,
      header: {
        data: '业务规则复制'
      },
      content: {
        data: ''
      },
      ruleBusinessName: ''
    },
    showToastDialogContent: {
      show: false,
      header: '',
      content: '',
      selectionTableData: {
        headers: [
          {
            prop: 'fileTypeName',
            label: '文件类型',
            align: 'center'
          },
          {
            prop: 'ruleBusinessName',
            label: '关联业务规则(已启用)',
            align: 'center'
          }
        ],
        data: []
      }
    }
  })
  const table = ref(null)
  const formRef = ref(null)

  const addBussinessRule = () => {
    router.push({
      name: 'EditBusinessRule'
    })
  }

  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    if (column.property === 'ruleBusinessName') {
      ruleBusinessId.value = row.ruleBusinessId
      state.componentsDocumentsDetails.show = true
    }
  }

  // 表格操作按钮点击
  function customClick(row, column, cell, event) {
    if (cell.name === 't-zgj-Edit') {
      router.push({
        name: 'EditBusinessRule',
        query: {
          ruleBusinessId: column.ruleBusinessId
        }
      })
    }
    if (cell.name === 't-zgj-Delete') {
      state.JyElMessageBox.type = cell.name
      state.JyElMessageBox.id = column.ruleBusinessId
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '您确定要删除该记录吗？'
      state.JyElMessageBox.show = true
    }
    if (cell.name === 'status') {
      state.JyElMessageBox.type = cell.name
      state.JyElMessageBox.flag = column.flag
      state.JyElMessageBox.id = column.ruleBusinessId
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = `您确定要${
        column.flag === '1' ? '停用' : '启用'
      }该记录吗？`
      state.JyElMessageBox.show = true
    }
    if (cell.name === 't-zgj-qyWechat.Copy') {
      state.showFormDialog.show = true
      state.showFormDialog.id = column.ruleBusinessId
      state.showFormDialog.ruleBusinessName =
        column.ruleBusinessName + ' - 副本'
    }
  }

  const submitCopyTabel = () => {
    formRef.value.validate(valid => {
      if (valid) {
        ruleApi
          .ruleCopy({
            ruleBusinessId: state.showFormDialog.id,
            ruleBusinessName: state.showFormDialog.ruleBusinessName
          })
          .then(() => {
            messageSuccess('复制成功')
            state.showFormDialog.show = false
            table.value.reloadData()
          })
      }
    })
  }

  const closeCopyTabel = () => {
    state.showFormDialog.show = false
  }

  // 单个弹框确认
  const submitElMessageBox = () => {
    if (state.JyElMessageBox.type === 't-zgj-Delete') {
      ruleApi
        .ruleBatchDelete({
          ruleBusinessIds: [state.JyElMessageBox.id]
        })
        .then(
          () => {
            messageSuccess('删除成功')
            table.value.reloadData()
          },
          err => {
            if (err.data) {
              state.showToastDialogContent.show = true
            }
          }
        )
        .finally(() => {
          state.JyElMessageBox.show = false
        })
    } else if (state.JyElMessageBox.type === 'status') {
      ruleApi
        .ruleDisable({
          ruleBusinessId: state.JyElMessageBox.id,
          flag: state.JyElMessageBox.flag === '1' ? '0' : '1'
        })
        .then(
          () => {
            messageSuccess(
              state.JyElMessageBox.flag === '1' ? '停用成功' : '启用成功'
            )
            table.value.reloadData()
          },
          err => {
            if (err.data) {
              state.showToastDialogContent.show = true
              state.showToastDialogContent.header =
                state.JyElMessageBox.flag === '1' ? '停用失败' : '启用失败'
              state.showToastDialogContent.content =
                '当前业务规则中关联的一下文件类型已用于其他已启用的业务规则，请确保一个文件类型仅关联一个已启用的业务规则'
              state.showToastDialogContent.selectionTableData.data = err.data
            }
          }
        )
        .finally(() => {
          state.JyElMessageBox.show = false
        })
    }
  }

  // 批量操作点击
  const clickBatchButton = (item, selectionData) => {
    state.componentsBatch.selectionData = selectionData
    if (item.name === 't-zgj-seal.BatchDelete') {
      state.showToastDialog.show = true
      state.showToastDialog.type = item.name
      state.showToastDialog.curKey = 'ruleBusinessName'
      state.showToastDialog.header = {
        data: '批量删除'
      }
      state.showToastDialog.content = {
        data: '是否删除以下业务规则？'
      }
    } else if (item.name === 't-zgj-dept.BatchEnable') {
      state.showToastDialog.show = true
      state.showToastDialog.type = item.name
      state.showToastDialog.curKey = 'ruleBusinessName'
      state.showToastDialog.header = {
        data: '批量启用'
      }
      state.showToastDialog.content = {
        data: '是否启用以下业务规则？'
      }
    } else if (item.name === 't-zgj-dept.BatchDeactivation') {
      state.showToastDialog.show = true
      state.showToastDialog.type = item.name
      state.showToastDialog.curKey = 'ruleBusinessName'
      state.showToastDialog.header = {
        data: '批量停用'
      }
      state.showToastDialog.content = {
        data: '是否停用以下业务规则？'
      }
    }
  }

  // 批量弹框确认
  const moreSureAction = () => {
    if (state.showToastDialog.type === 't-zgj-seal.BatchDelete') {
      ruleApi
        .ruleBatchDelete({
          ruleBusinessIds: state.componentsBatch.selectionData.map(
            i => i.ruleBusinessId
          )
        })
        .then(() => {
          messageSuccess('删除成功')
          table.value.reloadData()
        })
        .finally(() => {
          state.showToastDialog.show = false
        })
    } else if (state.showToastDialog.type === 't-zgj-dept.BatchEnable') {
      ruleApi
        .ruleBatchEnable({
          ruleBusinessIds: state.componentsBatch.selectionData.map(
            i => i.ruleBusinessId
          )
        })
        .then(
          () => {
            messageSuccess('启用成功')
            table.value.reloadData()
          },
          err => {
            if (err.data) {
              state.showToastDialogContent.show = true
            }
          }
        )
        .finally(() => {
          state.showToastDialog.show = false
        })
    } else if (state.showToastDialog.type === 't-zgj-dept.BatchDeactivation') {
      ruleApi
        .ruleBatchDisable({
          ruleBusinessIds: state.componentsBatch.selectionData.map(
            i => i.ruleBusinessId
          )
        })
        .then(
          () => {
            messageSuccess('停用成功')
            table.value.reloadData()
          },
          err => {
            console.log(err)
            if (err.data) {
              state.showToastDialogContent.show = true
            }
          }
        )
        .finally(() => {
          state.showToastDialog.show = false
        })
    }
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

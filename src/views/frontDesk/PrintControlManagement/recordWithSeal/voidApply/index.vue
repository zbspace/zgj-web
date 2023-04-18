<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 
* @LastEditTime 2023-04-18 10:34:58
!-->
<template>
  <div>
    <componentsLayout Layout="breadcrumb,title,custom,fixed,table">
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>用印记录 </el-breadcrumb-item>
            <el-breadcrumb-item>查看已作废单据</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <template #title>
        <div class="title">
          <div class="title-desc">
            <img
              class="title-desc-img"
              src="@/assets/svg/front/sealApply/back.svg"
              alt=""
              @click="router.go(-1)"
            />
            查看已作废单据
          </div>
          <div> </div>
        </div>
      </template>
      <template #table>
        <JyTable
          :url="`/sealApply/listInvalid`"
          ref="jyTable"
          hasTabs
          :componentsSearchForm="state.componentsSearchForm"
          :componentsTableHeader="state.componentsTable.header"
          :componentsBatch="state.componentsBatch"
          :computedData="
            currentActiveName === 'listApproving' ? state.computedData : []
          "
          tableClick="useSealFileName"
          @cellClick="cellClick"
          @customClick="customClick"
          @clickBatchButton="batchDel"
        >
        </JyTable>
      </template>
    </componentsLayout>

    <!-- 单据详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>

    <!-- 批量操作弹框提示 -->
    <actionMoreDialog
      @update:modelValue="state.showToastDialog.show = false"
      :show="state.showToastDialog.show"
      :selectionData="state.componentsBatch.selectionData"
      :showToastDialogContent="showToastDialogContent"
      label="useSealFileName"
      @sureAction="deleteMore"
    ></actionMoreDialog>

    <!-- 单个操作 -->
    <actionOneDialog
      v-model="state.JyElMessageBox.show"
      :JyElMessageBox="state.JyElMessageBox"
      @update:modelValue="state.JyElMessageBox.show"
      @submitElMessageBox="submitElMessageBox"
    ></actionOneDialog>
  </div>
</template>

<script setup>
  import componentsLayout from '@/views/components/Layout.vue'
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import JyTable from '@/views/components/JyTable.vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import sealApplyIntellect from '@/api/frontDesk/printControl/sealApplyIntellect'
  import listApprovingJson from '@/views/frontDesk/PrintControlManagement/recordWithSeal/searchFormJson/listApprovingJson'
  import actionOneDialog from '@/views/components/actionOneDialog.vue'
  import { messageSuccess } from '@/hooks/useMessage'
  import actionMoreDialog from '@/views/components/actionMoreDialog'

  const showToastDialogContent = ref(null)
  const router = useRouter()
  const jyTable = ref(null)

  const state = reactive({
    componentsTitle: {
      more: {
        data: [
          {
            name: '查看已作废的单据',
            codle: '1'
          }
        ]
      }
    },

    componentsSearchForm: {
      data: listApprovingJson,
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
      header: [
        {
          prop: 'useSealFileName',
          label: '文件名称',
          'min-width': 150,
          fixed: 'left',
          show: true
        },
        {
          prop: 'useSealApplyNo',
          label: '单据编号',
          width: 180,
          show: true
        },
        {
          prop: 'fileTypeName',
          label: '文件类型',
          'min-width': 150,
          show: true
        },
        {
          prop: 'sealName',
          label: '印章名称',
          'min-width': 150,
          show: true
        },
        {
          prop: 'applyUserName',
          label: '申请人',
          'min-width': 150,
          show: true
        },
        {
          prop: 'applyOrganName',
          label: '申请部门',
          'min-width': 150,
          show: true
        },
        {
          prop: 'applyStatus',
          label: '审批状态',
          align: 'center',
          width: 150,
          show: true
        },
        {
          prop: 'useSealStateName',
          label: '用印状态',
          align: 'center',
          width: 150,
          show: true
        },
        {
          prop: 'applyDatetime',
          label: '申请时间',
          width: 180,
          show: true
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          show: true,
          align: 'center',
          rankDisplayData: [
            {
              name: 't-zgj-sealInfoDelete.restore'
            },
            {
              name: 't-zgj-File.Delete'
            }
          ]
        }
      ]
    },
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '用印详情',
          name: 'Details-of-Printing'
        },
        {
          label: '审批流程',
          name: 'approval-process'
        },
        {
          label: '领用记录',
          name: 'Record-of-requisition'
        },
        {
          label: '操作记录',
          name: 'operating-record'
        }
      ]
    },
    componentsBatch: {
      selectionData: [],
      defaultAttribute: {
        disabled: true
      },
      data: [
        {
          name: 't-zgj-seal.BatchDelete'
        }
      ]
    },
    JyElMessageBox: {
      type: '',
      column: {},
      flag: '',
      show: false,
      header: {
        data: ''
      },
      content: {
        data: ''
      }
    },
    computedData: [
      // {
      //   computedData: 'instanceId',
      //   prop: 'approvalStatus',
      //   request: {
      //     url: '/ruInstance/detail',
      //     method: 'GET'
      //   }
      // }
    ],
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
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    if (column.property === 'useSealFileName') {
      state.componentsDocumentsDetails.show = true
      sealApplyIntellect
        .sealBaseInfo({
          useSealApplyId: row.useSealApplyId
        })
        .then(res => {
          const data = res.data
          const detail = [
            {
              label: '文件名称',
              value: data.useSealFileName
            },
            {
              label: '单据编码',
              value: data.useSealApplyNo
            },
            {
              label: '文件类型',
              value: data.fileTypeName
            },
            {
              label: '文件份数',
              value: (data.useSealFileNum || 0) + '份'
            },
            {
              label: '金额',
              value: data.totalMoney || '-'
            },
            {
              label: '申请事由',
              value: data.useSealInfo
            },
            {
              label: '盖章码',
              value: data.sealCode || '-'
            },
            {
              label: '申请人员',
              value: data.applyUserName
            },
            {
              label: '申请时间',
              value: data.applyDatetime
            },
            {
              label: '所属部门',
              value: data.applyOrganName
            },
            {
              label: '单据状态',
              value:
                data.useSealStateId === 'APPROVAL'
                  ? '用印审批中'
                  : data.useSealStateId === 'USING'
                  ? '智能用印中'
                  : '',
              iconPath: '@/assets/svg/common/yuan-lv.svg',
              iconStyle: {},
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            }
          ]
          if (data.listSeal.length) {
            if (data.listSeal.length === 1) {
              detail.splice(
                detail.length - 5,
                0,
                {
                  label: '印章名称',
                  value: data.listSeal[0].useSealApplySealInfoDto.sealName
                },
                {
                  label: '常规盖章',
                  value:
                    data.listSeal[0].useSealApplySealNumDto.applySealNum + '次'
                }
              )
            } else {
              data.listSeal.forEach((item, index) => {
                detail.splice(
                  detail.length - 5,
                  0,
                  {
                    label: `印章${index + 1}名称`,
                    value: item.useSealApplySealInfoDto.sealName
                  },
                  {
                    label: '常规盖章',
                    value: item.useSealApplySealNumDto.applySealNum + '次'
                  }
                )
              })
            }
          }
          state.componentsDocumentsDetails.visible[0].basicInformation = {
            show: true,
            data: detail
          }
        })
      sealApplyIntellect
        .intellect({
          useSealApplyId: row.useSealApplyId
          // useSealApplyId: '1641248927057453058'
        })
        .then(res => {
          console.log(res.data)
          if (res.data?.length) {
            state.componentsDocumentsDetails.visible[0].IntelligentPrinting = {
              show: true,
              data: res.data
            }
          } else {
            state.componentsDocumentsDetails.visible[0].IntelligentPrinting = {
              show: false,
              data: []
            }
          }
        })
      sealApplyIntellect
        .attachment({
          useSealApplyId: row.useSealApplyId
          // useSealApplyId: '222'
        })
        .then(res => {
          console.log(res.data)
          if (res.data.fileInfos?.length || res.data.fileInfoAdds?.length) {
            state.componentsDocumentsDetails.visible[0].accessory = {
              show: true,
              printedData: res.data.fileInfos,
              additionalData: res.data.fileInfoAdds
            }
          } else {
            state.componentsDocumentsDetails.visible[0].accessory = {
              show: false,
              printedData: [],
              additionalData: []
            }
          }
        })
    }
  }

  // 点击表格按钮
  function customClick(row, column, cell, event) {
    state.JyElMessageBox.type = cell.name
    state.JyElMessageBox.column = column
    if (cell.name === 't-zgj-sealInfoDelete.restore') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data =
        '还原后本次申请送审将被还原，请问确定要还原吗？'
      state.JyElMessageBox.show = true
    }
    if (cell.name === 't-zgj-File.Delete') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data =
        '删除会把申请单连同对应的附件均删除，删除后可释放存储空间，请问确定要删除么？'
      state.JyElMessageBox.show = true
    }
  }

  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }

  const submitElMessageBox = () => {
    if (state.JyElMessageBox.type === 't-zgj-sealInfoDelete.restore') {
      console.log(state.JyElMessageBox.column)
      sealApplyIntellect
        .return({
          sealUseApplyIds: [state.JyElMessageBox.column.useSealApplyId]
        })
        .then(() => {
          messageSuccess('还原成功')
          jyTable.value.reloadData()
        })
        .finally(() => {
          state.JyElMessageBox.show = false
        })
    } else if (state.JyElMessageBox.type === 't-zgj-File.Delete') {
      sealApplyIntellect
        .delete({
          sealUseApplyIds: [state.JyElMessageBox.column.useSealApplyId]
        })
        .then(() => {
          jyTable.value.reloadData()
          messageSuccess('删除成功')
        })
        .finally(() => {
          state.JyElMessageBox.show = false
        })
    }
  }

  // 批量删除
  function batchDel(item, selectionData) {
    console.log(selectionData)
    state.componentsBatch.selectionData = selectionData
    showToastDialogContent.value = {
      header: {
        data: '批量删除'
      },
      content: {
        data: '删除会把申请单，连同对应的附件均删除，删除后可释放存储空间，请问确定批量删除么？'
      }
    }
    state.showToastDialog.show = true
  }

  // 确定批量删除
  const deleteMore = () => {
    const list = state.componentsBatch.selectionData
    const idList = []
    list.forEach(v => {
      idList.push(v.useSealApplyId)
    })
    sealApplyIntellect.delete({ sealUseApplyIds: idList }).then(res => {
      jyTable.value.reloadData()
      messageSuccess('删除成功')
      state.showToastDialog.show = false
    })
  }
</script>

<script>
  export default { name: 'VoidApply' }
</script>
<style lang="scss" scoped></style>

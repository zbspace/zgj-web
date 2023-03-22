<!--
* @Descripttion 流程管理
* @FileName index.vue
* @Author WalterXsk
* @LastEditTime 2023-03-20 16:37:56
!-->
<template>
  <div class="flowManage-index">
    <JyTable
      url="/flow/page"
      ref="table"
      :hasTree="true"
      :needAutoRequest="false"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      :queryParams="queryParams"
      statusColoum="flag"
      openValue="0"
      tableClick="flowName"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="batchOpt"
    >
      <template #title>
        <div class="title">
          <div>{{ $t('t-zgj-cg-menu-liucheng-guanli') }}</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="openAddFlow">
                + {{ $t('t-zgj-sync.add') }}
              </el-button>
            </div>
            <div class="title-more-down"> </div>
          </div>
        </div>
      </template>
      <template #tree>
        <div>
          <componentsTree
            v-model="state.componentsTree.value"
            :data="state.componentsTree.data"
            :defaultAttribute="state.componentsTree.defaultAttribute"
            :defaultProps="state.componentsTree.defaultProps"
            @current-change="currentChange"
            v-if="state.componentsTree.value"
          >
          </componentsTree>
        </div>
      </template>
    </JyTable>

    <!-- 流程详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        v-model="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>
    <!-- 新建弹框 -->
    <Addflow
      v-if="addFlowModalShow"
      v-model="addFlowModalShow"
      :openType="openType"
      :treeSelectedId="state.componentsTree.value"
      @update:treeSelectedId="state.componentsTree.value = $event"
      :businessList="state.componentsTree.data"
    ></Addflow>
    <!-- 弹窗提示 -->
    <JyElMessageBox
      v-model="state.MessageBox.show"
      :show="state.MessageBox.show"
      :defaultAttribute="{}"
    >
      <template #header>
        <div class="header-div">
          <img :src="state.MessageBox.header.icon" alt="" />
          <span>{{ state.MessageBox.header.data }}</span>
        </div>
      </template>
      <template #content>
        <div class="content-div">{{ state.MessageBox.content.data }}</div>
      </template>
      <template #footer>
        <el-button
          type="primary"
          @click="submitElMessageBox(state.MessageBox.type)"
        >
          确认
        </el-button>
        <el-button @click="state.MessageBox.show = false">取消</el-button>
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
          <img :src="state.showToastDialog.header.icon" alt="" />
          <span>{{ state.showToastDialog.header.data }}</span>
        </div>
      </template>
      <template #content>
        <div class="content-div">{{ state.showToastDialog.content.data }}</div>
        <el-scrollbar class="scrollbar" max-height="200px">
          <p
            v-for="item in state.batchColumnData"
            :key="item"
            class="scrollbar-demo-item"
            >{{ item }}</p
          >
        </el-scrollbar>
      </template>
      <template #footer>
        <el-button
          v-for="item in state.componentsBatch.butDatas"
          :key="item.name"
          :type="item.type"
          @click="item.clickName"
          >{{ item.name }}</el-button
        >
      </template>
    </JyElMessageBox>
  </div>
</template>

<script setup>
  /**
   * openType edit、add
   * treeValue 树型选择值 - 携带；编辑时不生效
   */
  import { reactive, onBeforeMount, ref, watch } from 'vue'
  import componentsTree from '@/views/components/tree'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import Addflow from './AddOrEditFlow.vue'
  import apiFlow from '@/api/system/flowManagement'
  import apiForm from '@/api/system/formManagement'
  import JyTable from '@/views/components/JyTable.vue'
  import { ElMessage } from 'element-plus'
  // =========↓
  const addFlowModalShow = ref(false)
  const openType = ref(null)

  const openAddFlow = () => {
    addFlowModalShow.value = true
    openType.value = 'add'
  }
  // =========↑

  const table = ref(null)
  const queryParams = ref({ sealTypeIds: '2' })

  const state = reactive({
    columnData: {},
    batchColumnData: [],
    MessageBox: {
      show: false,
      header: {
        data: '',
        icon: '/src/assets/svg/common/warning.svg'
      },
      content: {
        data: ''
      },
      type: '删除'
    },
    showToastDialog: {
      show: false,
      header: {
        data: '',
        icon: '/src/assets/svg/common/warning.svg'
      },
      content: {
        data: ''
      },
      type: '删除'
    },
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
          id: 'status',
          label: '状态',
          type: 'select',
          optionLabel: 'label',
          optionValue: 'value',
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
          id: 'fileTypeId',
          label: '文件类型',
          type: 'select',
          inCommonUse: true,
          optionLabel: 'label',
          optionValue: 'value',
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
          id: 'sealUseTypeId',
          label: '用印类型',
          type: 'select',
          optionLabel: 'label',
          optionValue: 'value',
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
          id: 'relationForm',
          label: '关联表单名称',
          type: 'select',
          optionLabel: 'label',
          optionValue: 'value',
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
      header: [
        {
          prop: 'flowName',
          label: '流程名称',
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
          prop: 'fileTypeName',
          label: '文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'status',
          label: '状态',
          sortable: true,
          'min-width': 150
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
          sortable: true,
          width: 180
        },

        {
          prop: '8',
          label: '操作',
          width: 180,
          fixed: 'right',
          rankDisplayData: [
            {
              name: '修改'
            },
            {
              name: '删除'
            },
            {
              name: '状态'
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
          if (column.property === 'flowName') {
            return {
              color: 'var(--jy-info-6)',
              cursor: 'pointer'
            }
          }
        }
      }
    },

    componentsPagination: {
      data: {
        amount: 0,
        index: 1,
        pageNumber: 10
      },
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        layout: 'prev, pager, next, jumper',
        total: 0,
        'page-sizes': [10, 100, 200, 300, 400],
        background: true
      }
    },

    componentsTree: {
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': false,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'check-strictly': true,
        'highlight-current': true,
        'node-key': 'applyTypeId',
        'current-node-key': '2'
      },
      defaultProps: {
        label: 'applyTypeName',
        children: 'children'
      },
      value: ''
    },
    componentsBatch: {
      selectionData: [],
      defaultAttribute: {
        disabled: true
      },
      data: [
        {
          name: '批量删除'
        },
        {
          name: '批量启用'
        },
        {
          name: '批量停用'
        }
      ],
      butDatas: [
        {
          name: '知道了',
          type: '',
          clickName: closeBatchTabel
        }
      ]
    },
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '流程详情',
          name: 'Process-Details'
        },
        {
          label: '流程版本',
          name: 'Process-Version'
        },
        {
          label: '流程记录',
          name: 'operating-record'
        }
      ]
    }
  })

  // 点击表格单元格
  const cellClick = (row, column, cell, event) => {
    if (column.property === 'flowName') {
      state.componentsDocumentsDetails.show = true
    }
  }
  const customClick = (row, column, cell, event) => {
    console.log(cell)
    state.sealIds = column.id
    state.columnData = column
    if (cell.name === '修改') {
      state.title = '修改'
      // showLibraryDialog.value = true
    }
    if (cell.name === '复制') {
      state.title = '复制'
      // showLibraryDialog.value = true
    }
    if (cell.name === '删除') {
      state.MessageBox.header.data = '确认要删除流程吗？'
      state.MessageBox.show = true
      state.MessageBox.content.data = ''
      state.MessageBox.type = '删除'
    }
    if (cell.name === '停用') {
      state.MessageBox.header.data = '停用'
      state.MessageBox.content.data = '请问确定停用该流程吗？'
      state.MessageBox.show = true
      state.MessageBox.type = '停用'
    }
    if (cell.name === '启用') {
      state.MessageBox.header.data = '启用'
      state.MessageBox.content.data = '请问确定启用该流程吗？'
      state.MessageBox.show = true
      state.MessageBox.type = '启用'
    }
  }

  // 关闭表单复制弹窗
  function closeBatchTabel() {
    state.showToastDialog.show = false
  }

  // 提交弹窗
  const submitElMessageBox = type => {
    if (type === '取消删除') {
      state.MessageBox.show = false
    }
    if (type === '删除') {
      console.log(state.columnData)
      console.log(state.columnData)
      if (state.columnData.flag === '1') {
        state.MessageBox.header.data = '提示'
        state.MessageBox.content.data = '请将流程停用后再进行删除'
        state.MessageBox.show = true
        state.MessageBox.type = '取消删除'
        return
      }
      apiOpt(type, apiFlow.flowDelete(type, { ids: state.sealId }))
    }
    if (type === '停用') {
      apiOpt(
        type,
        apiFlow.flowEnable(type, { processId: state.sealId, processStatus: 0 })
      )
    }
    if (type === '启用') {
      apiOpt(
        type,
        apiFlow.flowEnable(type, { processId: state.sealId, processStatus: 1 })
      )
    }
  }

  const apiOpt = (typeName, apiName) => {
    apiName.then(res => {
      if (res.code === 200) {
        ElMessage.success(`${typeName}成功！`)
      } else {
        ElMessage.success(`${typeName}失败，请重试`)
      }
    })
  }

  // 批量删除
  function batchOpt(item) {
    state.batchColumnData = []
    state.componentsBatch.selectionData.forEach(v => {
      state.batchColumnData.push(v.flowName)
    })
    state.showToastDialog.header.data = item.name
    state.showToastDialog.content.data = `已选中以下流程，请问确定要${item.name}吗？`
    state.showToastDialog.show = true
    state.showToastDialog.type = item.name
    // state.showToastDialog.header.icon = '/src/assets/svg/common/danger.svg'
    state.componentsBatch.butDatas = [
      {
        name: '确定',
        type: 'primary',
        clickName: sureBatchOpt
      },
      {
        name: '取消',
        type: '',
        clickName: closeBatchTabel
      }
    ]
  }

  // 确定批量操作
  const sureBatchOpt = () => {
    const list = state.componentsBatch.selectionData
    const idList = []
    switch (state.showToastDialog.type) {
      case '批量删除':
        state.batchColumnData = []
        list.forEach(v => {
          if (v.flag === '1') {
            state.batchColumnData.push(v.flowName)
          }
          idList.push(v.flowMessageId)
        })
        if (state.batchColumnData.length > 0) {
          state.showToastDialog.header.data = state.showToastDialog.type
          state.showToastDialog.content.data = `请将以下流程停用后再进行删除`
          state.showToastDialog.show = false
          setTimeout(() => {
            state.showToastDialog.show = true
          }, 300)
          // state.showToastDialog.header.icon = '/src/assets/svg/common/danger.svg'
          state.componentsBatch.butDatas = [
            {
              name: '知道了',
              type: 'primary',
              clickName: closeBatchTabel
            }
          ]
        } else {
          batchOptApi('批量删除', apiFlow.batchDelete(idList))
        }
        break
      case '批量停用':
        list.forEach(v => {
          idList.push({ processId: v.flowMessageId })
        })
        batchOptApi('批量停用', apiFlow.batachDisable(idList))
        break
      case '批量启用':
        list.forEach(v => {
          idList.push({ processId: v.flowMessageId })
        })
        batchOptApi('批量启用', apiFlow.batachEnable(idList))
        break
    }
  }

  const batchOptApi = (type, apiName) => {
    apiName.then(res => {
      if (res.code === 200) {
        ElMessage.success(`${type}成功！`)
      } else {
        ElMessage.error(`${type}失败，请重试！`)
      }
    })
  }

  // 点击关闭
  const clickClose = () => {
    console.log('--->', state.componentsDocumentsDetails.show)
    // state.componentsDocumentsDetails.show = false
  }

  // 发送api请求 查询表单树解构
  const listApplyTypeTreeApi = () => {
    apiForm.listApplyTypeTree({}).then(result => {
      const listApplyTypeTree = []
      result.data.forEach(element => {
        if (!element.applyTypePid) {
          element.children = []
          listApplyTypeTree.push(element)
        } else {
          const index = listApplyTypeTree.findIndex(
            i => i.applyTypeId === element.applyTypePid
          )
          if (index > -1) {
            listApplyTypeTree[index].children.push(element)
          }
        }
      })
      state.componentsTree.data = listApplyTypeTree
      state.componentsTree.value = listApplyTypeTree[0].children[0].applyTypeId
      table.value.reloadData()
    })
  }

  const currentChange = e => {
    queryParams.value = e.sealTypeId ? { sealTypeIds: e.sealTypeId } : null
    table.value.reloadData()
    state.componentsTree.value = e.applyTypeId
  }

  watch(
    () => state.componentsTree.value,
    val => {
      // 重新加载
      state.componentsTree.value = val
      table.value.reloadData()
    }
  )
  onBeforeMount(() => {
    // 发送api请求 查询表单树解构
    listApplyTypeTreeApi()
  })
</script>

<style lang="scss" scoped>
  .flowManage-index {
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-more {
        height: 100%;
        display: flex;
        align-items: center;

        .title-more-add {
          // margin-right: 0.5rem;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .title-more-down {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>

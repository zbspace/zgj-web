<template>
  <div>
    <JyTable
      url="/form/page"
      ref="table"
      :hasTree="true"
      :needAutoRequest="false"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      :queryParams="queryParams"
      statusColoum="flag"
      openValue="0"
      tableClick="formName"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="batchDel"
    >
      <template #title>
        <div class="title">
          <div>表单管理</div>
          <div>
            <el-button type="primary" @click="showAddForm"
              >+ {{ $t('t-zgj-add') }}</el-button
            >
          </div>
        </div>
      </template>
      <template #tree>
        <div>
          <componentsTree
            ref="tree"
            :data="state.componentsTree.data"
            :defaultAttribute="state.componentsTree.defaultAttribute"
            :defaultProps="state.componentsTree.defaultProps"
            @current-change="currentChange"
          >
          </componentsTree>
        </div>
      </template>
    </JyTable>
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
      v-model="state.componentsAddForm.dialogVisible"
      v-if="state.componentsAddForm.dialogVisible"
      :addTitle="state.componentsAddForm.addTitle"
      :columnData="state.componentsAddForm.data"
      @close="state.componentsAddForm.dialogVisible = false"
      @reloadData="reloadData"
      :optionData="optionData"
    />
    <!-- 弹窗提示 -->
    <JyElMessageBox
      v-model="state.JyElMessageBox.show"
      :show="state.JyElMessageBox.show"
      :defaultAttribute="{}"
    >
      <template #header>
        <div class="header-div">
          <img :src="state.JyElMessageBox.header.icon" alt="" />
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
          ref="formRef"
          label-position="left"
          label-width="100px"
          :model="state.componentsAddForm.data"
          hide-required-asterisk
        >
          <el-form-item
            prop="formName"
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
              v-model="state.componentsAddForm.data.formName"
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
    <actionMoreDialog
      @update:modelValue="state.showToastDialog.show = false"
      :show="state.showToastDialog.show"
      :selectionData="state.componentsBatch.selectionData"
      :showToastDialogContent="showToastDialogContent"
      label="formName"
      @sureAction="deleteMore"
    ></actionMoreDialog>
  </div>
</template>

<script setup>
  import { reactive, ref, defineAsyncComponent, onBeforeMount } from 'vue'
  import componentsTree from '@/views/components/tree'
  import JyTable from '@/views/components/JyTable.vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import actionMoreDialog from '@/views/components/actionMoreDialog'
  import api from '@/api/system/formManagement'
  const AddFrom = defineAsyncComponent(() => import('./AddForm'))
  const optionData = ref([])
  const table = ref(null)
  const queryParams = ref(null)
  const showToastDialogContent = ref(null)
  const tree = ref(null)
  const state = reactive({
    componentsAddForm: {
      dialogVisible: false,
      addTitle: '新增',
      data: {}
    },
    componentsSearchForm: {
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
              sealUseTypeId: '1',
              sealUseTypeIdLabel: '物理用印'
            },
            {
              sealUseTypeId: '2',
              sealUseTypeIdLabel: '电子签章'
            }
          ],
          optionLabel: 'sealUseTypeIdLabel',
          optionValue: 'sealUseTypeId'
        },
        // {
        //   id: 'name',
        //   label: '状态',
        //   type: 'select',
        //   inCommonUse: true,
        //   // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        //   defaultAttribute: {
        //     placeholder: '请选择'
        //   },
        //   options: [
        //     {
        //       value: '1',
        //       label: '全部'
        //     }
        //   ]
        // },
        {
          id: 'modifyDatetime',
          label: '更新时间',
          type: 'picker',
          pickerType: 'date',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间'
          },
          style: {}
        },
        // {
        //   id: 'sealUseTypeName',
        //   label: '业务类型',
        //   type: 'select',
        //   inCommonUse: true,
        //   // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        //   defaultAttribute: {
        //     placeholder: '请选择'
        //   },
        //   options: [
        //     {
        //       value: '1',
        //       label: '全部'
        //     }
        //   ]
        // },
        {
          id: 'modifyDatetime',
          label: '是否关联流程',
          type: 'select',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: [
            {
              relationFlow: '1',
              relationFlowLabel: '是'
            },
            {
              relationFlow: '2',
              relationFlowLabel: '否'
            }
          ],
          optionLabel: 'relationFlowLabel',
          optionValue: 'relationFlow'
        }
        // {
        //   id: 'name',
        //   label: '文件类型',
        //   type: 'select',
        //   inCommonUse: true,
        //   // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        //   defaultAttribute: {
        //     placeholder: '请选择'
        //   },
        //   options: [
        //     {
        //       value: '1',
        //       label: '全部'
        //     }
        //   ]
        // }
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
      ]
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
      ],
      butDatas: [
        {
          name: '知道了',
          type: '',
          clickName: closeBatchTabel
        }
      ]
    },

    componentsTree: {
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': false,
        'show-checkbox': false,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'check-strictly': true,
        'highlight-current': true,
        'node-key': 'applyTypeId',
        'current-node-key': '2'
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
      data: {}
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

  const currentChange = (e, node) => {
    if (node.level === 1) {
      tree.value.setCurrentKey(e.applyTypeId === '5' ? '6' : '2')
      return
    }
    queryParams.value = e.applyTypeId ? { applyTypeId: e.applyTypeId } : null
    if (e.applyTypePid === '5') {
      state.componentsTable.header = [
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
      ]
      state.componentsSearchForm.data = [
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
          id: 'modifyDatetime',
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
          id: 'modifyDatetime',
          label: '是否关联流程',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: [
            {
              relationFlow: '1',
              relationFlowLabel: '是'
            },
            {
              relationFlow: '2',
              relationFlowLabel: '否'
            }
          ],
          optionLabel: 'relationFlowLabel',
          optionValue: 'relationFlow'
        }
      ]
    } else {
      state.componentsTable.header = [
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
      ]
      state.componentsSearchForm.data = [
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
              sealUseTypeId: '1',
              sealUseTypeIdLabel: '物理用印'
            },
            {
              sealUseTypeId: '2',
              sealUseTypeIdLabel: '电子签章'
            }
          ],
          optionLabel: 'sealUseTypeIdLabel',
          optionValue: 'sealUseTypeId'
        },
        {
          id: 'modifyDatetime',
          label: '更新时间',
          type: 'picker',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间'
          },
          style: {}
        },
        {
          id: 'relationFlow',
          label: '是否关联流程',
          type: 'select',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: [
            {
              relationFlow: '1',
              relationFlowLabel: '是'
            },
            {
              relationFlow: '2',
              relationFlowLabel: '否'
            }
          ],
          optionLabel: 'relationFlowLabel',
          optionValue: 'relationFlow'
        }
      ]
    }
    table.value.reloadData()
  }
  // 请求表单树
  function getListApplyTypeTree() {
    api.listApplyTypeTree().then(res => {
      console.log(res)
      const { code, data } = res
      if (code === 200) {
        const listApplyTypeTree = []
        optionData.value = data
        data.forEach(element => {
          element.label = element.applyTypeName
          if (element.applyTypePid === null) {
            element.children = []
            element.disabled = false
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
        queryParams.value = { applyTypeId: '2' }
        table.value.reloadData()
      }
    })
  }

  // 打开新增
  function showAddForm() {
    state.componentsAddForm.dialogVisible = true
    state.componentsAddForm.addTitle = '新建'
    state.componentsAddForm.data = {}
  }

  // 点击表格按钮
  function customClick(row, column, cell, event) {
    if (cell.name === '修改') {
      state.componentsAddForm.dialogVisible = true
      state.componentsAddForm.addTitle = '修改'
      state.componentsAddForm.data = column
    }
    if (cell.name === '删除') {
      state.JyElMessageBox.header.data = '删除'
      state.JyElMessageBox.content.data = '请问确定要删除该表单吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.data.tableId = column.formMessageId
    }
    if (cell.name === '复制') {
      state.showFormDialog.header.data = '表单复制'
      state.showFormDialog.show = true
      state.componentsAddForm.data = JSON.parse(JSON.stringify(column))
      state.componentsAddForm.data.formMessageId = ''
      state.componentsAddForm.data.formName = `${column.formName}-副本`
    }
  }

  // 删除提交
  function submitDel() {
    const data = {
      formMessageId: state.JyElMessageBox.data.tableId
    }
    api.formDelete(data).then(res => {
      console.log(res)
      if (res.data.length > 0) {
        state.showToastDialog.header.data = '删除'
        state.showToastDialog.content.data =
          '当前表单关联了以下流程，不允许删除'
        state.showToastDialog.show = true
        state.showToastDialog.header.icon = '/src/assets/svg/common/danger.svg'
        state.componentsBatch.butDatas = [
          {
            name: '知道了',
            type: 'primary',
            clickName: closeBatchTabel
          }
        ]
      } else {
        api.formPage(data).then(res => {
          table.value.reloadData()
        })
      }
    })
    state.JyElMessageBox.show = false
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
        data: '是否删除表单？'
      }
    }
    state.showToastDialog.show = true
    // state.showToastDialog.header.icon = '/src/assets/svg/common/danger.svg'
    // state.componentsBatch.butDatas = [
    //   {
    //     name: '确定',
    //     type: 'primary',
    //     clickName: sureBatchDel
    //   },
    //   {
    //     name: '取消',
    //     type: '',
    //     clickName: closeBatchTabel
    //   }
    // ]
    console.log('批量删除')
  }

  // 点击表格单元格
  const cellClick = (row, column, cell, event) => {
    if (column.property === 'formName') {
      state.componentsDocumentsDetails.show = true
    }
  }

  const reloadData = () => {
    table.value.reloadData()
  }

  // 确定批量删除
  const deleteMore = () => {
    const list = state.componentsBatch.selectionData
    const idList = []
    const idObj = { formMessageId: '' }
    list.forEach(v => {
      idObj.formMessageId = v.formMessageId
      idList.push(idObj)
    })
    api.batchDelete(idList).then(res => {
      if (res.code === 200) {
        if (res.data.length > 0) {
          state.showToastDialog.header.data = '删除'
          state.showToastDialog.content.data =
            '选中的以下表单已关联了流程，不允许删除'
          state.showToastDialog.show = true
          state.showToastDialog.header.icon =
            '/src/assets/svg/common/danger.svg'
          state.componentsBatch.butDatas = [
            {
              name: '知道了',
              type: 'primary',
              clickName: closeBatchTabel
            }
          ]
        } else {
          api.batchDelete(idList).then(res => {
            table.value.reloadData()
          })
        }
      } else {
        console.log(res)
      }
    })
  }
  // 关闭表单复制弹窗
  function closeBatchTabel() {
    state.showToastDialog.show = false
  }
  // 关闭表单复制弹窗
  function closeCopyTabel() {
    state.showFormDialog.show = false
  }
  const formRef = ref(null)
  // 提交表单名称
  function submitCopyTabel() {
    console.log('复制表单')
    formRef.value.validate(valid => {
      console.log(valid)
      if (valid) {
        state.showFormDialog.show = false
        state.componentsAddForm.dialogVisible = true
        state.componentsAddForm.addTitle = '复制'
      } else {
        // ElMessage.warning('表单名称不能为空')
        return false
      }
    })
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 加载表单列表
    getListApplyTypeTree()
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
    padding-left: 40px;
    margin-bottom: 10px;
    font-size: 14px;
  }
  .scrollbar {
    padding: 0 20px;
    .scrollbar-demo-item {
      display: flex;
      align-items: center;
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

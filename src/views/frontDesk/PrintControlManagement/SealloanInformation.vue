<!-- 印章外借信息 -->
<template>
  <div class="PrintControlManagement-SealloanInformation">
    <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
      <template #title>
        <div class="title"> 印章外借信息 </div>
      </template>
      <template #tabs>
        <div>
          <componentsTabs
            :activeName="currentType"
            :data="state.componentsTabs.data"
            @tab-change="tabChange"
          >
          </componentsTabs>
        </div>
      </template>
      <template #searchForm>
        <div>
          <componentsSearchForm
            :data="state.componentsSearchForm.data"
            :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style"
            @clickElement="clickElement"
            @clickSubmit="clickSubmit"
          >
          </componentsSearchForm>
        </div>
      </template>
      <template #batch>
        <div class="batch">
          <componentsBatch> </componentsBatch>
        </div>
      </template>
      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            refs="tables"
            ref="table"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            :paginationData="state.componentsPagination.data"
            :loading="loading"
            :isSelection="false"
            @cellClick="cellClick"
            @custom-click="customClick"
            @sort-change="sortChange"
          >
          </componentsTable>
        </div>
      </template>
      <template #pagination>
        <componentsPagination
          :data="state.componentsPagination.data"
          :defaultAttribute="state.componentsPagination.defaultAttribute"
          @current-change="currentPageChange"
          @size-change="sizeChange"
        >
        </componentsPagination>
      </template>
    </componentsLayout>
    <!-- 印章外借详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>
    <!-- 动态表单 - 印章申请 -->
    <JyDialog
      @update:show="fromState.showDialog = $event"
      :show="fromState.showDialog"
      :title="fromState.title"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="1000"
      :height="600"
      @close="submitLibraryForm"
      :key="fromState.title"
    >
      <JyVform
        :formJson="fromState.formJson"
        :formData="fromState.formJson"
        :optionData="fromState.optionData"
        :ref="fromState.vFormLibraryRef"
        mode="render"
        @buttonClick="clickSelect"
        @on-loaded="onLoaded"
      >
      </JyVform>
    </JyDialog>
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
    >
    </kDepartOrPersonVue>
    <!-- 历史记录 -->
    <JyDialog
      @update:show="historyState.showDialog = $event"
      :show="historyState.showDialog"
      :title="historyState.title"
      :footer="false"
      :width="1000"
      :height="600"
      :key="historyState.title"
    >
      <componentsTable
        :defaultAttribute="state.historyTable.defaultAttribute"
        :data="state.historyTable.data"
        :header="state.historyTable.header"
        :paginationData="state.historyPagination.data"
        :loading="historyLoading"
        :isSelection="false"
      >
      </componentsTable>
      <componentsPagination
        :data="state.historyPagination.data"
        :defaultAttribute="state.historyPagination.defaultAttribute"
        @current-change="historyCurrentPageChange"
        @size-change="historySizeChange"
        style="margin-top: 15px"
      >
      </componentsPagination>
    </JyDialog>
  </div>
</template>
<script setup>
  import {
    ref,
    reactive,
    // defineProps,
    // defineEmits,
    onBeforeMount,
    onMounted
  } from 'vue'
  import componentsTable from '../../components/table'
  import componentsSearchForm from '../../components/searchForm'
  import componentsPagination from '../../components/pagination'
  import componentsTabs from '../../components/tabs'
  import componentsLayout from '../../components/Layout'
  import componentsBatch from '@/views/components/batch'
  import componentsDocumentsDetails from '../../components/documentsDetails'
  import { ElMessage } from 'element-plus'
  import SealLendingJson from '@/views/addDynamicFormJson/SealLending.json'
  // import { useRouter } from 'vue-router'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import apis from '@/api/frontDesk/sealManage/sealloanInformation'
  import typeOfSeal from '@/api/frontDesk/sealManage/typeOfSeal'
  import dayjs from 'dayjs'
  // const router = useRouter()
  // const props = defineProps({
  //   // 处理类型
  //   type: {
  //     type: String,
  //     default: '0'
  //   }
  // })

  // 印章申请 新增弹框
  const fromState = reactive({
    title: '',
    formJson: SealLendingJson, // 动态表单内容
    optionData: null,
    vFormLibraryRef: 'vFormLibraryRef',
    showDialog: false
  })
  // 历史记录
  const historyState = reactive({
    title: '历史记录',
    showDialog: false
  })
  const vFormLibraryRef = ref(null)
  const showDepPerDialog = ref(false)
  const loading = ref(false)
  const historyLoading = ref(false)
  const orderBy = ref(null)
  const table = ref(null)
  const currentId = ref(null)
  const currentType = ref(1)

  const submitLibraryForm = type => {
    if (!type) {
      vFormLibraryRef.value.resetForm()
      return
    }
    vFormLibraryRef.value
      .getFormData()
      .then(formData => {
        alert(JSON.stringify(formData))
        fromState.showDialog = false
      })
      .catch(error => {
        // Form Validation failed
        ElMessage.error(error)
      })
  }

  // const emit = defineEmits([])
  const state = reactive({
    componentsTabs: {
      data: [
        {
          label: '待归还的印章',
          name: 1
        },
        {
          label: '已归还的印章',
          name: 2
        }
      ]
    },
    componentsSearchForm: {
      style: {
        lineStyle: {
          width: 'calc(100% / 3)'
        },
        labelStyle: {
          width: '100px'
        }
      },
      data: [
        {
          id: 'searchKey',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '印章名称'
          }
        },
        {
          id: 'outDate',
          label: '外带时间',
          type: 'picker',
          pickerType: 'date',
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
          id: 'sealTypeIds',
          label: '印章类型',
          type: 'select',
          options: [],
          optionLabel: 'sealTypeName',
          optionValue: 'sealTypeId',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择印章类型',
            multiple: true
          }
        },
        {
          id: 'custodianId',
          label: '保管人',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+保管人'
          }
        },
        {
          id: 'custodianDeptId',
          label: '保管部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+保管部门'
          }
        },
        {
          id: 'outUserId',
          label: '外借人',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+外借人'
          }
        },
        {
          id: 'outUserDeptId',
          label: '外借部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+外借部门'
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
      header: [
        {
          prop: 'sealName',
          label: '印章名称',
          sortable: 'custom',
          'min-width': 150
        },
        {
          prop: 'sealTypeName',
          label: '印章类型',
          sortable: 'custom',
          'min-width': 150
        },
        {
          prop: 'custodianName',
          label: '保管人',
          sortable: 'custom',
          'min-width': 150
        },
        {
          prop: 'custodianDeptName',
          label: '保管部门',
          sortable: 'custom',
          'min-width': 150
        },
        {
          prop: 'outUserName',
          label: '外借人',
          sortable: 'custom',
          'min-width': 150
        },
        {
          prop: 'outUserDeptName',
          label: '外借部门',
          sortable: 'custom',
          'min-width': 150
        },
        {
          prop: 'outDatetime',
          label: '外借时间',
          sortable: 'custom',
          'min-width': 200
        },
        {
          prop: 'outLocation',
          label: '外借地点',
          sortable: 'custom',
          'min-width': 200
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          width: 180,
          rankDisplayData: [
            {
              id: 'guihuan',
              name: '归还'
            },
            {
              id: 'history',
              name: '查看历史记录'
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
          if (column.property === 'sealName') {
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
    historyTable: {
      header: [
        {
          prop: 'outUserName',
          label: '外借人'
        },
        {
          prop: 'takeUserName',
          label: '取章人'
        },
        {
          prop: 'outDatetime',
          label: '外带时间'
        },
        {
          prop: 'outLocation',
          label: '外带地址'
        },
        {
          prop: 'returnUserName',
          label: '归还人'
        },
        {
          prop: 'returnDatetime',
          label: '归还时间'
        }
      ],
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        }
      }
    },
    historyPagination: {
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
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '印章详情',
          name: 'Particulars-of-Seal'
        },
        {
          label: '保管记录',
          name: 'Record-of-custody'
        },
        {
          label: '操作记录',
          name: 'operating-record'
        }
      ]
    }
  })
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event);
    if (column.property === 'sealName') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    if (cell.id === 'guihuan') {
      fromState.title = cell.name
      fromState.showDialog = true
      fromState.formJson = SealLendingJson
    } else if (cell.id === 'history') {
      console.log(JSON.parse(JSON.stringify(column)))
      historyState.showDialog = true
      currentId.value = column.sealId
      historyPageApi()
      // router.push({
      //   // path: '/frontDesk/SealloanInnerPage'
      //   name: 'SealloanInnerPage'
      // })
    }
  }

  // 点击搜索表单
  function clickElement(item, index) {
    // console.log(item, index)
    if (item.type === 'derivable') {
      showDepPerDialog.value = true
    }
  }

  const tabChange = type => {
    currentType.value = type
    reloadData()
  }

  const clickSubmit = item => {
    if (item.id === 'reset') {
      table.value.clearSorts()
      state.componentsSearchForm.data.forEach(item => {
        if (item.type === 'checkButton') {
          item.data.forEach(i => {
            delete i.checked
          })
        } else if (item.type === 'checkbox') {
          console.log(JSON.parse(JSON.stringify(item.checkbox)))
          item.checkbox.forEach(i => {
            i.value = false
          })
          console.log(JSON.parse(JSON.stringify(item.checkbox)))
        } else {
          delete item.value
        }
      })
    }
    reloadData()
  }

  const reloadData = () => {
    state.componentsTable.data = []
    state.componentsPagination.data.index = 1
    sealLoanInformationPageApi()
  }

  // 自定义排序
  function sortChange(orderBack) {
    console.log(JSON.parse(JSON.stringify(orderBack)))
    orderBy.value = orderBack
    reloadData()
  }

  const sealLoanInformationPageApi = () => {
    loading.value = true
    const params = {}
    state.componentsSearchForm.data.forEach(item => {
      if (item.type === 'checkButton') {
        params[item.id] = item.data
          .filter(i => i.checked)
          .map(i => i.id)
          .join(',')
      } else if (item.type === 'checkbox') {
        params[item.id] = item.checkbox[0].value ? item.checkbox[0].value : ''
      } else if (item.type === 'picker') {
        if (item.pickerType === 'date') {
          console.log(JSON.stringify(item))
          params[item.id] = item.value
            ? item.value
                .map(i => dayjs(i).format('YYYY-MM-DD HH:mm:ss'))
                .join(',')
            : ''
        }
      } else if (item.type === 'select') {
        params[item.id] = item.value ? item.value.join(',') : ''
      } else {
        params[item.id] = item.value
      }
      console.log(params)
    })
    apis
      .page({
        ...{
          current: state.componentsPagination.data.index,
          size: state.componentsPagination.data.pageNumber,
          sorts: orderBy.value
            ? orderBy.value.prop +
              ' ' +
              (orderBy.value.order === 'ascending' ? 'asc' : 'desc')
            : ''
        },
        ...params
      })
      .then(result => {
        state.componentsTable.data = result.data.records
        state.componentsPagination.data.amount = result.data.total
        state.componentsPagination.defaultAttribute.total = result.data.total
        loading.value = false
      })
  }

  const currentPageChange = e => {
    state.componentsPagination.data.index = e
    sealLoanInformationPageApi()
  }

  const sizeChange = e => {
    state.componentsPagination.data.pageNumber = e
    sealLoanInformationPageApi()
  }

  const historyPageApi = () => {
    historyLoading.value = true
    apis
      .history({
        id: currentId.value,
        current: state.historyPagination.data.index,
        size: state.historyPagination.data.pageNumber
      })
      .then(
        result => {
          state.historyTable.data = result.data.records
          state.historyPagination.data.amount = result.data.total
          state.historyPagination.defaultAttribute.total = result.data.total
          historyLoading.value = false
        },
        () => {
          historyLoading.value = false
        }
      )
  }

  const historyCurrentPageChange = e => {
    state.historyPagination.data.index = e
    historyPageApi()
  }

  const historySizeChange = e => {
    state.historyPagination.data.pageNumber = e
    historyPageApi()
  }

  const typeOfSealList = () => {
    typeOfSeal.list({ searchKey: '' }).then(res => {
      console.log(res)
      state.componentsSearchForm.data[2].options = res.data
    })
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    sealLoanInformationPageApi()
    typeOfSealList()
  })

  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .PrintControlManagement-SealloanInformation {
    margin: 0%;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>

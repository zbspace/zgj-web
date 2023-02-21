<!-- 印章外借信息 -->
<template>
  <div class="PrintControlManagement-SealloanInformation">
    <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
      <template #title>
        <div class="title"> 印章外借信息 </div>
      </template>
      <template #tabs>
        <div>
          <componentsTabs activeName="1" :data="state.componentsTabs.data">
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
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            :isSelection="true"
            @cellClick="cellClick"
            @custom-click="customClick"
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
    <KDialog
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
      <v-form-render
        :form-json="fromState.formJson"
        :form-data="fromState.formJson"
        :option-data="fromState.optionData"
        :ref="fromState.vFormLibraryRef"
      >
      </v-form-render>
    </KDialog>
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
    >
    </kDepartOrPersonVue>
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
  // import componentsTree from '../../components/tree'
  // import componentsBreadcrumb from '../../components/breadcrumb'
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/tabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import { ElMessage } from 'element-plus'
  import SealLendingJson from '@/views/addDynamicFormJson/SealLending.json'
  import KDialog from '@/views/components/modules/kdialog.vue'
  import { useRouter } from 'vue-router'
  import kDepartOrPersonVue from '@/views/components/modules/kDepartOrPerson.vue'
  const router = useRouter()
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
  const vFormLibraryRef = ref(null)
  const showDepPerDialog = ref(false)
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
          name: '1'
        },
        {
          label: '已归还的印章',
          name: '2'
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
          id: 'name',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '印章名称'
          }
        },
        {
          id: 'picker',
          label: '外带时间',
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
          label: '印章类型',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+印章类型'
          }
        },
        {
          id: 'name',
          label: '保管人',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+保管人'
          }
        },
        {
          id: 'name',
          label: '保管部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+保管部门'
          }
        },
        {
          id: 'name',
          label: '外借人',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+外借人'
          }
        },
        {
          id: 'name',
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
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 60
        },
        {
          prop: '1',
          label: '印章名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '印章类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '保管人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '保管部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '外借人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '外借部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          label: '外借时间',
          sortable: true,
          'min-width': 200
        },
        {
          prop: '8',
          label: '外借地点',
          sortable: true,
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
              name: '归还'
            },
            {
              name: '查看历史记录'
            }
          ]
        }
      ],
      data: [
        {
          0: '1',
          1: '测试章',
          2: '往往',
          3: '公章',
          4: '往往',
          5: '建业科技测试部',
          6: '建业科技研发中心',
          7: '2022-12-20 15:00:00',
          8: '上海市静安区',
          9: '上海市静安区'
        },
        {
          0: '1',
          1: '测试章',
          2: '往往',
          3: '公章',
          4: '往往',
          5: '建业科技测试部',
          6: '建业科技研发中心',
          7: '2022-12-20 15:00:00',
          8: '上海市静安区',
          9: '上海市静安区'
        },
        {
          0: '1',
          1: '测试章',
          2: '往往',
          3: '公章',
          4: '往往',
          5: '建业科技测试部',
          6: '建业科技研发中心',
          7: '2022-12-20 15:00:00',
          8: '上海市静安区',
          9: '上海市静安区'
        },
        {
          0: '1',
          1: '测试章',
          2: '往往',
          3: '公章',
          4: '往往',
          5: '建业科技测试部',
          6: '建业科技研发中心',
          7: '2022-12-20 15:00:00',
          8: '上海市静安区',
          9: '上海市静安区'
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
              color: 'var(--jy-Info-6)',
              cursor: 'pointer'
            }
          }
        }
      }
    },
    componentsTree: {
      data: [
        {
          label: 'Level one 1',
          children: [
            {
              label: 'Level two 1-1',
              children: [
                {
                  label: 'Level three 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: 'Level one 2',
          children: [
            {
              label: 'Level two 2-1',
              children: [
                {
                  label: 'Level three 2-1-1'
                }
              ]
            },
            {
              label: 'Level two 2-2',
              children: [
                {
                  label: 'Level three 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: 'Level one 3',
          children: [
            {
              label: 'Level two 3-1',
              children: [
                {
                  label: 'Level three 3-1-1'
                }
              ]
            },
            {
              label: 'Level two 3-2',
              children: [
                {
                  label: 'Level three 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': true,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'check-strictly': true
      }
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
    componentsBreadcrumb: {
      data: [
        {
          name: 'ceshi'
        },
        {
          name: 'ceshi'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        separator: '/'
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
    if (column.property === '1') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    if (cell.name === '归还') {
      fromState.title = '归还'
      fromState.showDialog = true
      fromState.formJson = SealLendingJson
    }
    if (cell.name === '查看历史记录') {
      router.push({
        // path: '/frontDesk/SealloanInnerPage'
        name: 'SealloanInnerPage'
      })
    }
  }

  // 点击搜索表单
  function clickElement(item, index) {
    // console.log(item, index)
    if (item.type === 'derivable') {
      showDepPerDialog.value = true
    }
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
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

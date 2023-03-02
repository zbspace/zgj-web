<!-- 印章类型 -->
<template>
  <div class="PrintControlManagement-TypeOfSeal">
    <componentsLayout Layout="title,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">
          <div>印章类型</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="clickEditor('新增')"
                >+ 增加</el-button
              >
            </div>
            <div class="title-more-down"> </div>
          </div>
        </div>
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
            @clickSubmit="clickSubmit"
          >
          </componentsSearchForm>
        </div>
      </template>

      <template #batch>
        <div class="batch">
          <componentsBatch
            :data="state.componentsBatch.data"
            :defaultAttribute="state.componentsBatch.defaultAttribute"
            @clickBatchButton="clickBatchButton"
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
            :loading="loading"
            isSelection
            @selection-change="selectionChange"
            @custom-click="customClick"
          >
            <template #custom_intelligentCount="scope">
              <span>{{ scope.value }}枚</span>
            </template>
            <template #custom_ordinaryCount="scope">
              <span>{{ scope.value }}枚</span>
            </template>
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
    <!-- 动态表单 - 印章类型新增/修改 -->
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
    <JyElMessageBox
      v-model="state.JyElMessageBox.show"
      :show="state.JyElMessageBox.show"
      :defaultAttribute="{}"
      @confirmClick="confirmClick"
    >
      <template #header>
        {{ state.JyElMessageBox.header.data }}
      </template>
      <template #content>
        {{ state.JyElMessageBox.content.data }}
      </template>
    </JyElMessageBox>
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
  // import componentsBreadcrumb from '../../components/breadcrumb'
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/tabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import StampTypeApplicationJson from '@/views/addDynamicFormJson/StampTypeApplication.json'
  import KDialog from '@/views/components/modules/kdialog.vue'
  import { ElMessage } from 'element-plus'
  import apis from '@/api/frontDesk/sealManage/typeOfSeal'
  import dayjs from 'dayjs'
  // const props = defineProps({
  //   // 处理类型
  //   type: {
  //     type: String,
  //     default: '0'
  //   }
  // })

  // 印章类型 新增弹框
  const fromState = reactive({
    title: '',
    formJson: StampTypeApplicationJson, // 动态表单内容
    optionData: null,
    vFormLibraryRef: 'vFormLibraryRef',
    showDialog: false
  })
  const vFormLibraryRef = ref(null)
  const loading = ref(false)
  const sealTypeId = ref(null)

  // const emit = defineEmits([])
  const state = reactive({
    componentsTabs: {
      data: [
        {
          label: '待签章',
          name: '1'
        },
        {
          label: '已签章',
          name: '2'
        },
        {
          label: '不可用',
          name: '3'
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
            placeholder: '请输入印章类型名称或编码'
          }
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
          prop: 'sealTypeNo',
          label: '印章类型编码',
          sortable: true,
          'min-width': 180
        },
        {
          prop: 'sealTypeName',
          label: '印章类型名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'readme',
          label: '描述',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'intelligentCount',
          label: '智能印章',
          align: 'center',
          customDisplayType: 'custom',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'ordinaryCount',
          label: '普通印章',
          align: 'center',
          customDisplayType: 'custom',
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
          prop: 'createDatetime',
          label: '创建时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          rankDisplayData: [
            {
              name: '修改'
            },
            {
              name: '删除'
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
    componentsBatch: {
      selectionData: [],
      defaultAttribute: {
        disabled: true
      },
      data: [
        {
          id: 'deleteMore',
          name: '批量删除'
        }
      ]
    },
    JyElMessageBox: {
      show: false,
      header: {
        data: ''
      },
      content: {
        data: ''
      }
    }
  })
  function clickEditor(title, column) {
    fromState.title = title
    vFormLibraryRef.value.resetForm()
    if (title === '新增') {
      fromState.formJson.widgetList[0].options.defaultValue =
        dayjs().format('YYYYMMDD') + Math.random().toString().slice(2, 11)
    } else {
      if (column) {
        fromState.formJson.widgetList.forEach(i => {
          i.options.defaultValue = column[i.id]
        })
      }
    }
    fromState.showDialog = true
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    console.log(JSON.stringify(cell))
    if (cell.name === '修改') {
      sealTypeId.value = column.sealTypeId
      clickEditor(cell.name, column)
    }
    if (cell.name === '删除') {
      sealTypeId.value = column.sealTypeId
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '请问确定要删除吗？'
      state.JyElMessageBox.show = true
    }
  }

  const confirmClick = () => {
    apis
      .delete({
        ids:
          sealTypeId.value ||
          state.componentsBatch.selectionData.map(i => i.sealTypeId).join(',')
      })
      .then(res => {
        state.JyElMessageBox.show = false
        reloadData()
      })
      .catch(() => {
        sealTypeId.value = null
      })
  }

  // 当选择项发生变化时会触发该事件
  function selectionChange(selection) {
    state.componentsBatch.selectionData = selection
    if (state.componentsBatch.selectionData.length > 0) {
      state.componentsBatch.defaultAttribute.disabled = false
    } else {
      state.componentsBatch.defaultAttribute.disabled = true
    }
  }

  function clickBatchButton(item) {
    if (item.id === 'deleteMore') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '请问确定要删除吗？'
      state.JyElMessageBox.show = true
    }
  }

  const submitLibraryForm = type => {
    if (!type) {
      sealTypeId.value = null
      vFormLibraryRef.value.resetForm()
      return
    }
    vFormLibraryRef.value
      .getFormData()
      .then(formData => {
        if (sealTypeId.value) {
          apis
            .edit({
              ...{
                sealTypeId: sealTypeId.value
              },
              ...formData
            })
            .then(res => {
              sealTypeId.value = null
              fromState.showDialog = false
              reloadData()
            })
        } else {
          apis.add(formData).then(res => {
            sealTypeId.value = null
            fromState.showDialog = false
            reloadData()
          })
        }
      })
      .catch(error => {
        // Form Validation failed
        ElMessage.error(error)
      })
  }

  const clickSubmit = item => {
    if (item.id === 'reset') {
      state.componentsSearchForm.data.forEach(item => {
        delete item.value
      })
    }
    reloadData()
  }

  const reloadData = () => {
    state.componentsTable.data = []
    state.componentsPagination.data.index = 1
    flowPageApi()
  }

  const flowPageApi = () => {
    loading.value = true
    return apis
      .page({
        searchKey: state.componentsSearchForm.data[0].value,
        current: state.componentsPagination.data.index,
        size: state.componentsPagination.data.pageNumber,
        createDate: state.componentsSearchForm.data[1].value
      })
      .then(result => {
        console.log(result)
        state.componentsTable.data = result.data.records
        state.componentsPagination.data.amount = result.data.total
        state.componentsPagination.defaultAttribute.total = result.data.total
        loading.value = false
        return result
      })
  }

  const currentPageChange = e => {
    state.componentsPagination.data.index = e
    flowPageApi()
  }

  const sizeChange = e => {
    state.componentsPagination.data.pageNumber = e
    flowPageApi()
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    flowPageApi()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .PrintControlManagement-TypeOfSeal {
    margin: 0%;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-more {
        height: 100%;
        display: flex;
        align-items: center;

        .title-more-add {
          margin-right: 0.5rem;
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

    .batch {
      display: flex;
      align-items: center;

      .batch-desc {
        @include mixin-margin-right(12);
      }
    }
  }
</style>

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
            refs="tables"
            ref="table"
            :header="state.componentsTable.header"
            :paginationData="state.componentsPagination.data"
            :loading="loading"
            isSelection
            @selection-change="selectionChange"
            @custom-click="customClick"
            @sort-change="sortChange"
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
      @update:show="showDialog = $event"
      :show="showDialog"
      :title="fromStateTitle"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="800"
      :height="600"
      @confirm="submitLibraryForm"
      :key="fromStateTitle"
    >
      <el-form
        :model="formData"
        :rules="formRules"
        ref="vFormLibraryRef"
        label-width="120px"
      >
        <el-form-item label="印章类型编码" prop="sealTypeNo">
          <el-input v-model="formData.sealTypeNo" disabled />
        </el-form-item>
        <el-form-item label="印章类型名称" prop="sealTypeName">
          <el-input v-model="formData.sealTypeName" />
        </el-form-item>
        <el-form-item label="描述" prop="readme">
          <el-input v-model="formData.readme" type="textarea" />
        </el-form-item>
      </el-form>
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
    <!-- 批量操作弹框提示 -->
    <JyElMessageBox
      v-model="state.showToastDialog.show"
      :show="state.showToastDialog.show"
      :defaultAttribute="{}"
      @confirmClick="confirmClick"
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
            v-for="item in state.componentsBatch.selectionData"
            :key="item"
            class="scrollbar-demo-item"
            >{{ item.sealTypeName }}</p
          >
        </el-scrollbar>
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
  import componentsPagination from '../../components/pagination'
  import componentsTabs from '../../components/tabs'
  import componentsLayout from '../../components/Layout'
  import componentsBatch from '@/views/components/batch'
  import KDialog from '@/views/components/modules/KDialog'
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
  const formData = ref({
    sealTypeNo: '',
    sealTypeName: '',
    readme: ''
  })
  const formRules = ref({
    sealTypeName: [
      {
        required: true,
        message: '请输入印章类型名称',
        trigger: 'change'
      }
    ]
  })
  const fromStateTitle = ref('新增')
  const showDialog = ref(false)
  const vFormLibraryRef = ref(null)
  const loading = ref(false)
  const sealTypeId = ref(null)
  const orderBy = ref(null)
  const table = ref(null)

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
          id: 'createDate',
          label: '创建时间',
          type: 'picker',
          pickerType: 'date',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
            'value-format': 'YYYY-MM-DD',
            'disabled-date': disabledDate,
            'default-value': [
              new Date(new Date().setMonth(new Date().getMonth() - 1)),
              new Date()
            ]
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
  function clickEditor(title, column) {
    fromStateTitle.value = title
    showDialog.value = true
    vFormLibraryRef.value.resetFields()
    if (title === '新增') {
      formData.value = {
        sealTypeNo:
          dayjs().format('YYYYMMDD') + Math.random().toString().slice(2, 11),
        sealTypeName: '',
        readme: ''
      }
    } else {
      if (column) {
        const columns = JSON.parse(JSON.stringify(column))
        formData.value = {
          sealTypeNo: columns.sealTypeNo,
          sealTypeName: columns.sealTypeName,
          readme: columns.readme
        }
      }
    }
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
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

  function disabledDate(time) {
    return time.getTime() > Date.now() // 如果没有后面的-8.64e7就是不可以选择今天的
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
        state.showToastDialog.show = false
        reloadData()
      })
      .catch(() => {
        sealTypeId.value = null
        state.showToastDialog.show = false
        state.JyElMessageBox.show = false
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
      state.showToastDialog.header.data = '批量删除？'
      state.showToastDialog.content.data =
        '已选中以下表单，请问确定要批量删除吗？'
      state.showToastDialog.show = true
    }
  }

  const submitLibraryForm = () => {
    vFormLibraryRef.value.validate(valid => {
      if (valid) {
        if (sealTypeId.value) {
          apis
            .edit({
              ...{
                sealTypeId: sealTypeId.value
              },
              ...formData.value
            })
            .then(() => {
              sealTypeId.value = null
              showDialog.value = false
              reloadData()
            })
        } else {
          apis.add(formData.value).then(res => {
            sealTypeId.value = null
            showDialog.value = false
            reloadData()
          })
        }
      }
    })
  }

  const clickSubmit = item => {
    if (item.id === 'reset') {
      table.value.clearSorts()
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

  // 自定义排序
  function sortChange(orderBack) {
    console.log(JSON.parse(JSON.stringify(orderBack)))
    orderBy.value = orderBack
    reloadData()
  }

  const flowPageApi = () => {
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
        if (item.pickerType === 'date' && item.value) {
          params[item.id] =
            item.value[0] + ' 00:00:00,' + item.value[1] + ' 23:59:59'
        }
      } else {
        params[item.id] = item.value
      }
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
      .then(
        result => {
          state.componentsTable.data = result.data.records
          state.componentsPagination.data.amount = result.data.total
          state.componentsPagination.defaultAttribute.total = result.data.total
          loading.value = false
        },
        () => {
          loading.value = false
        }
      )
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

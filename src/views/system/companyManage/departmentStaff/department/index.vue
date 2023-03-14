<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,tree,batch">
      <template #title>
        <div class="title">
          <div>部门管理</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="add">+ 新增部门</el-button>
            </div>
            <div class="title-more-down">
              <el-dropdown popper-class="more-operation-dropdown">
                <el-button>
                  <img
                    class="button-icon"
                    src="@/assets/svg/gengduo-caozuo.svg"
                    alt=""
                    srcset=""
                  />
                  <span>更多操作</span>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>导入</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
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

      <!-- <template #batch>
        <div class="batch">
          <componentsBatch>
            <el-button>批量删除</el-button>
            <el-button>批量启用</el-button>
            <el-button>批量停用</el-button>
          </componentsBatch>
        </div>
      </template> -->
      <template #batch>
        <div class="batch">
          <componentsBatch
            :data="state.componentsBatch.data"
            :defaultAttribute="state.componentsBatch.defaultAttribute"
          >
          </componentsBatch>
        </div>
      </template>

      <template #tree>
        <div>
          <componentsTree
            :data="state.componentsTree.data"
            :defaultAttribute="state.componentsTree.defaultAttribute"
          >
          </componentsTree>
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
            :isSelection="true"
            :loading="loading"
            @cellClick="cellClick"
            @custom-click="customClick"
            @selection-change="selectionChange"
            @sort-change="sortChange"
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
    <!-- 部门与单位详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>
    <!-- 新增部门 -->
    <JyDialog
      @update:show="showFormDialog = $event"
      :show="showFormDialog"
      title="新增"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="800"
      :height="450"
      @confirm="submitLibraryForm"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="vFormLibraryRef"
        label-width="80px"
      >
        <el-form-item label="部门名称" prop="organName">
          <el-input v-model="form.organName" clearable />
        </el-form-item>
        <el-form-item label="组织类型" prop="organTypeNo">
          <el-radio-group v-model="form.organTypeNo">
            <el-radio :label="1" size="large">部门</el-radio>
            <el-radio :label="2" size="large">单位</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门编码" prop="organNo">
          <el-input v-model="form.organNo" clearable />
        </el-form-item>
        <el-form-item label="上级部门" prop="organPid">
          <div class="select-box-contBox">
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              v-model="form.organPName"
              placeholder="请选择"
            />
            <div class="ap-box-contBox-icon">
              <el-icon
                v-if="form.organPid"
                style="margin-right: 5px"
                color="#aaaaaa"
                @click="clear('organP')"
                ><CircleClose
              /></el-icon>
              <img
                @click="chooseOrgan('organP')"
                class="ap-box-contBox-icon-img"
                src="@/assets/svg/ketanchude.svg"
                alt=""
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="部门领导" prop="leaderUserId">
          <div class="select-box-contBox">
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              v-model="form.leaderUserName"
              placeholder="请选择"
            />
            <div class="ap-box-contBox-icon">
              <el-icon
                v-if="form.leaderUserId"
                style="margin-right: 5px"
                color="#aaaaaa"
                @click="clear('leaderUser')"
                ><CircleClose
              /></el-icon>
              <img
                @click="chooseOrgan('leaderUser')"
                class="ap-box-contBox-icon-img"
                src="@/assets/svg/ketanchude.svg"
                alt=""
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="readme">
          <el-input v-model="form.readme" type="textarea" clearable />
        </el-form-item>
      </el-form>
    </JyDialog>
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      v-if="showDeptDialog"
      :show="showDepPerDialog"
      @update:show="closeShow"
      :searchSelected="searchSelected"
      @update:searchSelected="submit"
      :tabsShow="tabsShow"
    />
  </div>
</template>

<script setup>
  import { reactive, onBeforeMount, ref } from 'vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination'
  import componentsLayout from '@/views/components/Layout'
  import componentsTree from '@/views/components/tree'
  import JyDialog from '@/views/components/modules/JyDialog.vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails'
  import componentsBatch from '@/views/components/batch'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import department from '@/api/system/companyManagement/department'
  import { CircleClose } from '@element-plus/icons-vue'

  const showFormDialog = ref(false)
  const showDepPerDialog = ref(false)
  const showDeptDialog = ref(false)
  const vFormLibraryRef = ref(null)
  const loading = ref(false)
  const table = ref(null)
  const orderBy = ref(null)
  const searchSelected = ref([])
  const tabsShow = ref(['organ'])
  const kDepartOrPerson = ref(null)

  const form = reactive({
    organNo: '',
    organName: '',
    organTypeNo: 1,
    organPid: '',
    organPName: '',
    leaderUserId: '',
    leaderUserName: '',
    readme: ''
  })
  const rules = reactive({
    organName: [
      {
        required: true,
        message: '请输入部门名称',
        trigger: 'change'
      }
    ]
  })

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
          id: 'keyWord',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '部门名称/部门编码'
          }
        },
        {
          id: 'status',
          label: '状态',
          type: 'select',
          inCommonUse: true,
          options: [
            {
              label: '启用',
              value: 1
            },
            {
              label: '停用',
              value: 2
            }
          ],
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
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
          prop: '2',
          label: '部门名称',
          'min-width': 150,
          fixed: true
        },
        {
          prop: '1',
          label: '部门编码',
          'min-width': 150
        },
        {
          prop: '3',
          label: '组织类型',
          'min-width': 150
        },
        {
          prop: '4',
          label: '部门人数',
          sortable: 'custom',
          'min-width': 150
        },
        {
          prop: '5',
          label: '部门主管',
          'min-width': 150
        },
        {
          prop: '6',
          label: '上级组织',
          'min-width': 150
        },
        {
          prop: '7',
          label: '操作',
          width: 150,
          fixed: 'right',
          rankDisplayData: [
            {
              name: '修改'
            },
            {
              name: '上移'
            },
            {
              name: '下移'
            },
            {
              name: '停用'
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
          if (column.property === 'organName') {
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
      data: [
        {
          label: '企业名称',
          children: [
            {
              label: '单位名称',
              children: [
                {
                  label: '部门名称'
                },
                {
                  label: '部门名称'
                },
                {
                  label: '部门名称'
                },
                {
                  label: '部门名称'
                }
              ]
            }
          ]
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': false,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'check-strictly': true
      }
    },
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '单位与部门详情',
          name: 'Unit-Department-Details'
        },
        {
          label: '组织人员',
          name: 'organization-Person'
        },
        {
          label: '流程记录',
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
          name: '批量停用'
        },
        {
          name: '批量启用'
        },
        {
          name: '批量删除'
        }
      ]
    }
  })
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    console.log(row, column, cell, event)
    if (column.property === '2') {
      state.componentsDocumentsDetails.show = true
    }
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
  // 自定义排序
  function sortChange(orderBack) {
    console.log(JSON.parse(JSON.stringify(orderBack)))
    orderBy.value = orderBack
    reloadData()
  }
  // 点击关闭
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }
  const reloadData = () => {
    state.componentsPagination.data.index = 1
    state.componentsTable.data = []
    state.componentsPagination.data.amount = 0
    departPage()
  }
  const departPage = () => {
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
    department
      .page({
        pageNo: state.componentsPagination.data.index,
        pageSize: state.componentsPagination.data.pageNumber,
        sorts: orderBy.value
          ? orderBy.value.prop +
            ',' +
            (orderBy.value.order === 'ascending' ? 'asc' : 'desc')
          : '',
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
  const chooseOrgan = type => {
    showDeptDialog.value = true
    kDepartOrPerson.value = type
    if (type === 'organP') {
      tabsShow.value = ['organ']
      searchSelected.value = form.organPid
        ? [
            {
              id: form.organPid,
              name: form.organPName
            }
          ]
        : []
    } else {
      tabsShow.value = ['user']
      searchSelected.value = form.leaderUserId
        ? [
            {
              id: form.leaderUserId,
              name: form.leaderUserName
            }
          ]
        : []
    }
    setTimeout(() => {
      showDepPerDialog.value = true
    }, 200)
  }

  const closeShow = () => {
    showDepPerDialog.value = false
    setTimeout(() => {
      showDeptDialog.value = false
    }, 200)
  }

  const clear = type => {
    if (type === 'organP') {
      form.organPid = ''
      form.organPName = ''
    } else {
      form.leaderUserId = ''
      form.leaderUserName = ''
    }
  }
  const add = () => {
    // vFormLibraryRef.value.resetFields()
    showFormDialog.value = true
  }
  const submitLibraryForm = () => {
    vFormLibraryRef.value.validate(valid => {
      if (valid) {
        console.log(form)
        department.add(form).then(() => {
          showFormDialog.value = false
          reloadData()
        })
      }
    })
  }
  const submit = value => {
    if (kDepartOrPerson.value === 'organP') {
      form.organPid = value.length ? value[0].id : ''
      form.organPName = value.length ? value[0].name : ''
    } else {
      form.leaderUserId = value.length ? value[0].id : ''
      form.leaderUserName = value.length ? value[0].name : ''
    }
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    departPage()
  })
</script>

<style lang="scss" scoped>
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
</style>

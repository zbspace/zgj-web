<!-- 印章库 -->
<template>
  <div class="PrintControlManagement-LibraryOfSeals">
    <componentsLayout Layout="title,searchForm,table,pagination,tree,batch">
      <template #title>
        <div class="title">
          印章库
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="showLibraryDialog = true"
                >+ 增加</el-button
              >
            </div>
            <div class="title-more-down">
              <el-dropdown>
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
                    <el-dropdown-item>印章解绑</el-dropdown-item>
                    <el-dropdown-item>导入</el-dropdown-item>
                    <el-dropdown-item>导出台账</el-dropdown-item>
                    <el-dropdown-item>查看已删除的印章</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
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
            @clickElement="clickElement"
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
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
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

    <!-- 动态表单 - 印章库 -->
    <KDialog
      @update:show="showLibraryDialog = $event"
      :show="showLibraryDialog"
      title="新增"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="1000"
      :height="600"
      @close="submitLibraryForm"
    >
      <v-form-render
        :form-json="formLibraryJson"
        :form-data="formLibraryData"
        :option-data="optionLibraryData"
        ref="vFormLibraryRef"
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
    reactive,
    // defineProps,
    // defineEmits,
    onBeforeMount,
    onMounted,
    ref
  } from 'vue'
  import componentsTable from '../../components/table'
  import componentsSearchForm from '../../components/searchForm'
  import componentsTree from '../../components/tree'
  // import componentsBreadcrumb from '../../components/breadcrumb'
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/tabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import LibraryJson from '@/views/addDynamicFormJson/LibraryOfSeals.json'
  import KDialog from '@/views/components/modules/kdialog.vue'
  import kDepartOrPersonVue from '@/views/components/modules/kDepartOrPerson.vue'
  import { ElMessage } from 'element-plus'
  // const props = defineProps({
  //   // 处理类型
  //   type: {
  //     type: String,
  //     default: '0'
  //   }
  // })
  // 印章库 新增弹框
  const formLibraryJson = reactive(LibraryJson)
  const formLibraryData = reactive({})
  const optionLibraryData = reactive({})
  const vFormLibraryRef = ref(null)
  const showLibraryDialog = ref(false)

  const submitLibraryForm = type => {
    if (!type) {
      vFormLibraryRef.value.resetForm()
      return
    }
    vFormLibraryRef.value
      .getFormData()
      .then(formData => {
        // Form Validation OK
        alert(JSON.stringify(formData))
        showLibraryDialog.value = false
      })
      .catch(error => {
        // Form Validation failed
        ElMessage.error(error)
      })
  }
  const showDepPerDialog = ref(false)

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
          id: 'name',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '印章名称/保管部门/保管人/印章编码'
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
        },
        {
          id: 'derivable',
          label: '保管人',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+保管人'
          }
        },
        {
          id: 'derivable',
          label: '保管部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+保管部门'
          }
        },
        {
          id: 'shenqingr',
          label: '印章状态',
          type: 'checkButton',
          data: [
            {
              name: '正常  '
            },
            {
              name: '停用'
            },
            {
              name: '已销毁'
            }
          ]
        },
        {
          id: 'shenqingr',
          label: '印章种类',
          type: 'checkButton',
          data: [
            {
              name: '普通印章'
            },
            {
              name: '智能印章'
            }
          ]
        },
        {
          id: 'wdyy',
          label: '',
          type: 'checkbox',
          checkbox: [
            {
              // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
              defaultAttribute: {
                label: '印章外带'
              },
              style: {}
            }
          ]
        },
        {
          id: 'wdyy',
          label: '',
          type: 'checkbox',
          checkbox: [
            {
              // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
              defaultAttribute: {
                label: '我保管的印章'
              },
              style: {}
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
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
          align: 'center'
        },
        {
          prop: '1',
          label: '印章名称',
          sortable: true,
          'min-width': 210,
          'show-overflow-tooltip': true
        },
        {
          prop: '2',
          label: '印章类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '印章状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '保管人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '保管部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '创建时间',
          sortable: true,
          'min-width': 180
        },

        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          width: '250',
          rankDisplayData: [
            {
              name: '修改'
            },
            {
              name: '设置维护范围'
            },
            {
              name: '设置可用范围'
            }
          ]
        }
      ],
      data: [
        {
          0: 1,
          1: '二代章_新结构_全称',
          2: '公章',
          3: '正常',
          4: '岳海涛',
          5: '测试部',
          6: '2022-10-30 08:00:08'
        },
        {
          0: 2,
          1: '二代章_新结构_全称',
          2: '公章',
          3: '正常',
          4: '岳海涛',
          5: '测试部',
          6: '2022-10-30 08:00:08'
        },
        {
          0: 3,
          1: '二代章_新结构_全称',
          2: '测试章',
          3: '正常',
          4: '肖世康',
          5: '技术部',
          6: '2022-10-30 08:00:08'
        },
        {
          0: 4,
          1: '【智】测试专用章-自动版-Joel-243（全称）',
          2: '公章',
          3: '正常',
          4: '汤博',
          5: '技术部',
          6: '2022-10-30 08:00:08'
        },
        {
          0: 5,
          1: '【智】研发-易全程二代',
          2: '合同章',
          3: '正常',
          4: '岳海涛',
          5: '测试部',
          6: '2022-10-30 08:00:08'
        },
        {
          0: 6,
          1: '二代章_新结构_全称',
          2: '公章',
          3: '正常',
          4: '周斌',
          5: '技术部',
          6: '2022-08-23 18:00:08'
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
          label: 'A层级菜单1',
          children: [
            {
              label: 'B层级菜单1',
              children: [
                {
                  label: 'C层级菜单1'
                }
              ]
            }
          ]
        },
        {
          label: 'A层级菜单2',
          children: [
            {
              label: 'B层级菜单1',
              children: [
                {
                  label: 'C层级菜单1'
                }
              ]
            },
            {
              label: 'B层级菜单2',
              children: [
                {
                  label: 'C层级菜单1'
                }
              ]
            }
          ]
        },
        {
          label: 'A层级菜单3',
          children: [
            {
              label: 'B层级菜单1',
              children: [
                {
                  label: 'C层级菜单1'
                }
              ]
            },
            {
              label: 'B层级菜单2',
              children: [
                {
                  label: 'C层级菜单1'
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
    },
    componentsBatch: {
      selectionData: [],
      defaultAttribute: {
        disabled: true
      },
      data: [
        {
          name: '批量设置可见范围'
        },
        {
          name: '批量设置可用范围'
        },
        {
          name: '批量删除'
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
    if (cell.name === '修改') {
      showLibraryDialog.value = true
    }
    if (cell.name === '设置维护范围' || cell.name === '设置可用范围') {
      showDepPerDialog.value = true
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
  .PrintControlManagement-LibraryOfSeals {
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

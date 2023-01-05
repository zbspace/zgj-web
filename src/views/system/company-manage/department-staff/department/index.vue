<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,tree,batch">
      <template #title>
        <div class="title">
          <div>部门管理</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="showFormDialog = true"
                >+ 新增子部门</el-button
              >
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
          >
          </componentsSearchForm>
        </div>
      </template>

      <template #batch>
        <div class="batch">
          <componentsBatch>
            <el-button>批量删除</el-button>
            <el-button>批量启用</el-button>
            <el-button>批量停用</el-button>
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
            :isSelection="true"
            @cellClick="cellClick"
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
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination.vue'
  import componentsLayout from '@/views/components/Layout.vue'
  import componentsTree from '@/views/components/tree'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import componentsBatch from '@/views/components/batch.vue'
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
          id: 'name',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '部门名称/部门编码'
          }
        },
        {
          id: 'name',
          label: '状态',
          type: 'select',
          inCommonUse: true,
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
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 80,
          align: 'center'
        },
        {
          prop: '1',
          label: '部门编码',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '部门名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '组织类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '部门人数',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '部门主管',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '上级组织',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          label: '操作',
          width: 150,
          flex: 'right',
          rankDisplayData: [
            {
              name: '修改'
            },
            {
              name: '删除'
            },
            {
              name: '停用'
            }
          ]
        }
      ],
      data: [
        {
          0: 1,
          1: 'TradeCode21',
          2: '建业科技',
          3: '往往',
          4: 22,
          5: '小红',
          6: '牛牛'
        },
        {
          0: 1,
          1: 'TradeCode21',
          2: '建业科技',
          3: '往往',
          4: 22,
          5: '小红',
          6: '牛牛'
        },
        {
          0: 1,
          1: 'TradeCode21',
          2: '建业科技',
          3: '往往',
          4: 22,
          5: '小红',
          6: '牛牛'
        },
        {
          0: 1,
          1: 'TradeCode21',
          2: '建业科技',
          3: '往往',
          4: 22,
          5: '小红',
          6: '牛牛'
        },
        {
          0: 1,
          1: 'TradeCode21',
          2: '建业科技',
          3: '往往',
          4: 22,
          5: '小红',
          6: '牛牛'
        },
        {
          0: 1,
          1: 'TradeCode21',
          2: '建业科技',
          3: '往往',
          4: 22,
          5: '小红',
          6: '牛牛'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--color-fill--1)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          // console.log({ row, column, rowIndex, columnIndex });
          if (column.property === '2') {
            return {
              color: 'var(--Info-6)',
              cursor: 'pointer'
            }
          }
        }
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
        layout: 'sizes, prev, pager, next, jumper',
        total: 500,
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
    }
  })
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    console.log(row, column, cell, event)
    if (column.property === '2') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }
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

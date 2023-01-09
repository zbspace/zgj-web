<template>
  <div class="update-license">
    <componentsLayout Layout="title,custom">
      <template #title>
        <div class="title">
          <div>更新license</div>
          <div class="title-more"> </div>
        </div>
      </template>
      <template #custom>
        <div class="custom">
          <div class="custom-input">
            <div class="custom-input-val">
              <el-input v-model="input" placeholder="输入license" />
              <el-button type="primary">获取</el-button>
            </div>
            <div class="custom-input-desc"
              >说明：请输入新的许可证密钥（license）来获取系统使用权限
            </div>
          </div>
          <div class="custom-table">
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
          <div class="custom-pagination">
            <componentsPagination
              :data="state.componentsPagination.data"
              :defaultAttribute="state.componentsPagination.defaultAttribute"
            >
            </componentsPagination>
          </div>
        </div>
      </template>
    </componentsLayout>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import componentsTable from '@/views/components/table'
  // import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination'
  import componentsLayout from '@/views/components/Layout'
  // import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import { ElMessageBox } from 'element-plus'
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
            placeholder: '企业名称/企业编码/联系人/联系方式'
          }
        },
        {
          id: 'name',
          label: '所属部门',
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
          prop: '0',
          label: '序号',
          width: 80,
          align: 'center',
          fixed: true
        },
        {
          prop: '1',
          label: 'license密钥',
          sortable: true,
          'min-width': 150,
          fixed: true,
          'show-overflow-tooltip': true
        },
        {
          prop: '2',
          label: '更新人',
          sortable: true,
          'min-width': 150
        },

        {
          prop: '3',
          label: '更新时间',
          sortable: true,
          'min-width': 180
        }
      ],
      data: [
        {
          0: 1,
          1: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          2: '王往',
          3: '2022-12-26 18:00:00'
        },
        {
          0: 1,
          1: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          2: '里斯',
          3: '2022-12-26 18:00:00'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          // console.log({ row, column, rowIndex, columnIndex });
          if (column.property === '1') {
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
        layout: 'prev, pager, next, jumper',
        total: 500,
        'page-sizes': [10, 100, 200, 300, 400],
        background: true
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
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '往来企业详情',
          name: 'Current-Business-Details'
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
    // console.log(row, column, cell, event)
    if (column.property === '1') {
      // state.componentsDocumentsDetails.show = true
    }
  }
  // // 点击关闭
  // function clickClose() {
  //   state.componentsDocumentsDetails.show = false
  // }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    console.log(cell.name)
    if (cell.name === '修改') {
      // showFormDialog.value = true
    }
    if (cell.name === '删除') {
      ElMessageBox.confirm('您确定要删除该记录吗？', {
        confirmButtonText: '确认',
        cancelButtonText: '关闭',
        type: 'warning'
      }).then(() => {})
    }
  }
</script>

<style lang="scss" scoped>
  .update-license {
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
    .custom-input {
      margin: 0.5rem 0rem;
    }
    .custom-pagination {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 1.5rem 0;
      box-sizing: border-box;
      padding-right: 0rem;
      box-sizing: border-box;
    }
  }
</style>

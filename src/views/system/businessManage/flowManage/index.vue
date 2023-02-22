<template>
  <div class="flowManage-index">
    <componentsLayout Layout="title,searchForm,table,pagination,tree,batch">
      <template #title>
        <div class="title">
          <div>流程管理</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button
                type="primary"
                @click="state.JyElMessageBox.show = true"
                >+ 新建</el-button
              >
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
    <!-- 流程详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>
    <!-- 新建弹框 -->
    <div v-if="state.JyElMessageBox.show">
      <AntModalBox
        v-model="state.JyElMessageBox.show"
        :custom-content="true"
        :defaultAttribute="{
          fullscreen: true,
          height: '100%'
        }"
      >
        <newlyIncreased
          @close="state.JyElMessageBox.show = false"
        ></newlyIncreased>
      </AntModalBox>
    </div>
  </div>
</template>

<script setup>
  import { reactive, onBeforeMount, onMounted, defineAsyncComponent } from 'vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination.vue'
  import componentsLayout from '@/views/components/Layout.vue'
  import componentsTree from '@/views/components/tree'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import newlyIncreased from './newly-increased.vue'
  import AntModalBox from '@/views/components/modules/AntModalBox.vue'
  import apiFlow from '@/api/system/flowManagement'
  import apiForm from '@/api/system/formManagement'
  // 异步组件
  // const newlyIncreased = defineAsyncComponent(() =>
  //   import('./newly-increased.vue')
  // )
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
          id: 'name',
          label: '状态',
          type: 'select',
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
          id: 'name',
          label: '业务类型',
          type: 'select',
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
          id: 'name',
          label: '文件类型',
          type: 'select',
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
          id: 'name',
          label: '用印类型',
          type: 'select',
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
          width: 50,
          type: 'selection',
          fixed: true
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
          fixed: true
        },
        {
          prop: '1',
          label: '流程名称',
          sortable: true,
          'min-width': 150,
          fixed: true
        },
        {
          prop: '2',
          label: '业务类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '创建人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
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
              name: '启用'
            },
            {
              name: '复制'
            }
          ]
        }
      ],
      data: [
        {
          0: 1,
          1: '部门专用',
          2: '用印申请',
          3: '电子签章',
          4: '文件类型',
          5: '禁用',
          6: '小红',
          7: '2022/10/30  15:00:00'
        },
        {
          0: 1,
          1: '部门专用',
          2: '用印申请',
          3: '电子签章',
          4: '文件类型',
          5: '禁用',
          6: '小红',
          7: '2022/10/30  15:00:00'
        },
        {
          0: 1,
          1: '部门专用',
          2: '用印申请',
          3: '电子签章',
          4: '文件类型',
          5: '禁用',
          6: '小红',
          7: '2022/10/30  15:00:00'
        },
        {
          0: 1,
          1: '部门专用',
          2: '用印申请',
          3: '电子签章',
          4: '文件类型',
          5: '禁用',
          6: '小红',
          7: '2022/10/30  15:00:00'
        },
        {
          0: 1,
          1: '部门专用',
          2: '用印申请',
          3: '电子签章',
          4: '文件类型',
          5: '禁用',
          6: '小红',
          7: '2022/10/30  15:00:00'
        },
        {
          0: 1,
          1: '部门专用',
          2: '用印申请',
          3: '电子签章',
          4: '文件类型',
          5: '禁用',
          6: '小红',
          7: '2022/10/30  15:00:00'
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
              color: 'var(--jy-info-6)',
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
          label: '用印申请',
          children: [
            {
              label: '用印申请'
            },
            {
              label: '转办申请'
            },
            {
              label: '重置用印申请'
            }
          ]
        },
        {
          label: '印章申请',
          children: [
            {
              label: '刻章申请'
            },
            {
              label: '停用申请'
            },
            {
              label: '启用申请'
            },
            {
              label: '销毁申请'
            },
            {
              label: '变更申请'
            },
            {
              label: '换章申请'
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
  // 点击表格单元格
  const cellClick = (row, column, cell, event) => {
    console.log(row, column, cell, event)
    if (column.property === '1') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭
  const clickClose = () => {
    state.componentsDocumentsDetails.show = false
  }
  // 发送api请求 查询表单树解构
  const listApplyTypeTreeApi = () => {
    return apiForm.listApplyTypeTree({}).then(result => {
      console.log(result)
      return result
    })
  }
  // 发送api请求 流程列表
  const flowPageApi = () => {
    return apiFlow
      .page({
        keyword: '',
        status: '',
        updateStartTime: '',
        updateEndTime: '',
        applyTypeId: '',
        fileTypeId: '',
        relationForm: '',
        sealUseTypeId: ''
      })
      .then(result => {
        console.log(result)
        return result
      })
  }
  // 发送api请求 删除流程
  const flowDeleteApi = () => {
    return apiFlow
      .delete({
        processId: ''
      })
      .then(result => {
        console.log(result)
        return result
      })
  }
  // 发送api请求 启用/停用
  const flowEnableApi = () => {
    return apiFlow
      .enable({
        processId: '',
        processStatus: ''
      })
      .then(result => {
        console.log(result)
        return result
      })
  }
  // 发送api请求 复制流程
  const flowCopyApi = () => {
    return apiFlow
      .copy({
        processId: '',
        processName: ''
      })
      .then(result => {
        console.log(result)
        return result
      })
  }
  // 发送api请求 批量删除
  const batchDeleteApi = () => {
    return apiFlow
      .batchDelete([
        {
          processId: '主键'
        },
        {
          processId: '主键'
        }
      ])
      .then(result => {
        console.log(result)
        return result
      })
  }
  // 发送api请求 批量启用
  const batachEnableApi = () => {
    return apiFlow
      .batachEnable([
        {
          processId: '主键'
        },
        {
          processId: '主键'
        }
      ])
      .then(result => {
        console.log(result)
        return result
      })
  }
  // 发送api请求 批量停用
  const batachDisableApi = () => {
    return apiFlow
      .batachDisable([
        {
          processId: '主键'
        },
        {
          processId: '主键'
        }
      ])
      .then(result => {
        console.log(result)
        return result
      })
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 发送api请求 查询表单树解构
    // listApplyTypeTreeApi()
    // // 发送api请求 流程列表
    // flowPageApi()
    // // 发送api请求 删除流程
    // flowDeleteApi()
    // // 发送api请求 启用/停用
    // flowEnableApi()
    // // 发送api请求 复制流程
    // flowCopyApi()
    // // 发送api请求 批量删除
    // batchDeleteApi()
    // // 发送api请求 批量启用
    // batachEnableApi()
    // // 发送api请求 批量停用
    // batachDisableApi()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
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

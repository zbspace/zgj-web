<!-- 抄送给我 -->
<template>
  <div class="approvalFlow-carbonCopyToMe">
    <componentsLayout Layout="title,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">
          <div>抄送给我</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary">导出台账</el-button>
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
          <componentsBatch> </componentsBatch>
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
            isSelection
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
  import { ref, reactive, onBeforeMount, onMounted } from 'vue'
  import componentsTable from '../../components/table'
  import componentsSearchForm from '../../components/searchForm'
  import componentsTree from '../../components/tree'
  import componentsBreadcrumb from '../../components/breadcrumb'
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/tabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import kDepartOrPersonVue from '@/views/components/modules/kDepartOrPerson.vue'
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const emit = defineEmits([])
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
            placeholder: '流程主题/申请人/抄送人'
          }
        },
        {
          id: 'picker',
          label: '申请时间',
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
          label: '所属部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+选择部门'
          }
        },
        {
          id: 'wjlx',
          label: '流程类型',
          type: 'select',
          options: [
            {
              label: '用印申请',
              value: '1'
            },
            {
              label: '刻章申请',
              value: '2'
            },
            {
              label: '销毁申请',
              value: '3'
            },
            {
              label: '停用申请',
              value: '4'
            },
            {
              label: '变更申请',
              value: '5'
            },
            {
              label: '启用申请',
              value: '6'
            }
          ]
        },
        {
          id: 'picker',
          label: '抄送时间',
          type: 'picker',
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
          prop: '1',
          label: '流程主题',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '流程类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '所属部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '申请人员',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '6',
          label: '抄送人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          label: '抄送时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '8',
          label: '审批状态',
          sortable: true,
          'min-width': 150
        }
      ],
      data: [
        {
          0: 1,
          1: '110102',
          2: '用印申请',
          3: '建业科技',
          4: '李慧斌',
          5: '2022/10/30  15:00:00',
          6: '李慧斌',
          7: '2022/10/30  15:00:00',
          8: '已通过'
        },
        {
          0: 2,
          1: '110102',
          2: '用印申请',
          3: '建业科技',
          4: '李慧斌',
          5: '2022/10/30  15:00:00',
          6: '李慧斌',
          7: '2022/10/30  15:00:00',
          8: '已通过'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
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
    componentsBatch: {
      selectionData: [],
      data: [
        {
          name: '批量操作'
        }
      ]
    }
  })
  const showDepPerDialog = ref(false)

  // 当选择项发生变化时会触发该事件
  function selectionChange(selection) {
    //    console.log(selection);
    state.componentsBatch.selectionData = selection
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
  .approvalFlow-carbonCopyToMe {
    margin: 0%;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
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

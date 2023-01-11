<!-- 文件库 下载记录 -->
<template>
  <div class="documentLibrary-Download-record">
    <componentsLayout Layout="breadcrumb,searchForm,table,pagination,title">
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>文件库 </el-breadcrumb-item>
            <el-breadcrumb-item>下载记录</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <template #title>
        <div class="title">
          <div class="title-desc">
            <img
              class="title-desc-img"
              src="@/assets/svg/jiantou-zuo.svg"
              alt=""
              @click="clickBackPage"
            />
            下载记录
          </div>
          <div> </div>
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
      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
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
  </div>
</template>
<script setup>
  import {
    reactive,
    defineProps,
    defineEmits,
    onBeforeMount,
    onMounted,
    inject,
    ref
  } from 'vue'
  import { useRouter } from 'vue-router'
  import componentsLayout from '../../../components/Layout.vue'
  import componentsTable from '../../../components/table'
  import componentsSearchForm from '../../../components/searchForm'
  import componentsTree from '../../../components/tree'
  import componentsBreadcrumb from '../../../components/breadcrumb'
  import componentsPagination from '../../../components/pagination.vue'
  import componentsTabs from '../../../components/tabs.vue'
  import componentsDocumentsDetails from '../../../components/documentsDetails.vue'
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const router = useRouter()
  const commonFun = inject('commonFun')
  const emit = defineEmits([])
  const state = reactive({
    cache: {},
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
            placeholder: '文件名称'
          }
        },
        {
          id: 'picker',
          label: '操作时间',
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
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 100
        },
        {
          prop: '1',
          label: '任务名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '任务包大小',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '文件个数',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '操作人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          label: '操作时间',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          rankDisplayData: [
            {
              name: '下载'
            }
          ]
        }
      ],
      data: [
        {
          1: '文件',
          2: '',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30'
        },
        {
          1: '文件',
          2: '',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30'
        },
        {
          1: '文件',
          2: '',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30'
        },
        {
          1: '文件',
          2: '',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30'
        },
        {
          1: '文件',
          2: '',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30'
        },
        {
          1: '文件',
          2: '',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30'
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
          if (column.property == '1') {
            return {
              color: 'var(--Info-6)',
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
        },
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
        },
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
        },
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
        },
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
    }
  })

  //点击返回上一页
  function clickBackPage() {
    commonFun.routerPage(router, -1)
  }

  //点击提交
  function clickSubmit() {
    commonFun.routerPage(router, {
      // path: '/frontDesk/PrintControlManagement/Seal-application/accomplish'
      name: 'Accomplish'
    })
  }

  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event);
  }

  //点击表格按钮
  function customClick(row, column, cell, event) {
    console.log(cell.name)
    if (cell.name === '修改') {
      showFormDialog.value = true
    }
    if (cell.name == '删除') {
      ElMessageBox.confirm('您确定要删除该记录吗？', {
        confirmButtonText: '确认',
        cancelButtonText: '关闭',
        type: 'warning'
      }).then(() => {})
    }
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // vFormLibraryRef.value.resetForm()
    // vFormLibraryRef.value.getFormData().then()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .documentLibrary-Download-record {
    margin: 0%;
    position: relative;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-desc {
        display: flex;
        align-items: center;

        .title-desc-img {
          margin-right: 0.5rem;
          cursor: pointer;
        }
      }
    }

    .custom {
      // padding-right: 1.25rem;
      box-sizing: border-box;
      text-align: center;
      padding-bottom: 4rem;

      .custom-buzhou {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 0;
        box-sizing: border-box;

        .custom-buzhou-list {
          display: flex;
          justify-content: center;
          align-items: center;

          .custom-buzhou-list-desc {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10rem;

            .custom-buzhou-list-desc-index {
              width: 1.5rem;
              height: 1.5rem;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: var(--color-fill--3);
              color: var(--color-text-3);
              border-radius: var(--border-radius-2);
              margin-right: 0.5rem;
            }

            .custom-buzhou-list-desc-text {
              font-size: var(--font-size-title-1);
              color: var(--color-text-3);
            }
          }

          .custom-buzhou-list-jiantou {
            width: 7rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .indexActive {
          background-color: var(--primary-6) !important;
          color: var(--in-common-use-1) !important;
        }

        .textActive {
          color: var(--color-text-1) !important;
        }

        .font-color-45 {
          color: var(--color-text-3) !important;
        }
      }

      .PrintingProcess {
        .PrintingProcess-content {
          display: flex;
          flex-flow: wrap;

          // align-items: flex-start;
          .PrintingProcess-content-list {
            // margin-right: 1rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;

            .PrintingProcess-content-list-cont {
              height: 15rem;
              align-self: flex-start;
              width: 13rem;
              border: 1px solid var(--color-border-1);
              background-color: var(--color-fill--1);
              padding: 1rem;
              box-sizing: border-box;

              .PrintingProcess-content-list-cont-title {
                display: flex;
                justify-content: center;
                height: 2rem;
                align-items: center;
                font-size: var(--font-size-title-1);

                .PrintingProcess-content-list-cont-title-img {
                  margin-right: 0.5rem;
                }
              }

              .PrintingProcess-content-list-cont-list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.5rem 1rem;
                box-sizing: border-box;
              }
            }

            .PrintingProcess-content-list-iocn {
              margin-left: 1rem;
              margin-right: 1rem;
              width: 3rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }

    .ap-fixed {
      width: calc(100%);
      position: absolute;
      bottom: 0%;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid var(--color-border-2);
      background-color: var(--in-common-use-1);
      z-index: 999;
    }
  }
</style>

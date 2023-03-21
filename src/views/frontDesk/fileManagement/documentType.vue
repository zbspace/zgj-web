<!-- 文件类型 -->
<template>
  <div class="fileManagement-documentType">
    <componentsLayout Layout="title,searchForm,table,pagination,batch,tree">
      <template #title>
        <div class="title">
          <div>文件类型</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="dialogVisible = true"
                >+ 增加</el-button
              >
            </div>
            <div class="title-more-down"> </div>
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
            :defaultProps="{ children: 'child', label: 'fileTypeName' }"
            @node-click="nodeClick"
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
            :paginationData="state.componentsPagination.data"
            isSelection
            @cellClick="cellClick"
            @custom-click="customClick"
            @selection-change="selectionChange"
            :loading="loading"
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

    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
      :searchSelected="userSelected"
      :tabsShow="['user', 'organ', 'role']"
    >
    </kDepartOrPersonVue>

    <JyElMessageBox
      v-model="state.JyElMessageBox.show"
      :show="state.JyElMessageBox.show"
      :defaultAttribute="{}"
      @confirmClick="deleteFileType"
    >
      <template #header>
        {{ state.JyElMessageBox.header.data }}
      </template>
      <template #content>
        {{ state.JyElMessageBox.content.data }}
      </template>
    </JyElMessageBox>
  </div>

  <!-- 新增/修改文件类型 -->
  <AddFileType
    v-model="dialogVisible"
    :optionsTree="state.componentsTree.data"
    @refresh="refresh"
    :curFromData="curFromData"
  />

  <!-- 设置可见范围 -->
  <!-- <kDepartOrPersonVue
    :show="xzyzDialogVisible"
    @update:show="xzyzDialogVisible = $event"
    :searchSelected="[]"
    @update:searchSelected="submit"
    :tabsShow="tabsShow"
    apiModule="systemOrganOrPerson"
    :queryParams="queryParams"
    v-if="xzyzDialogVisible"
  /> -->
</template>

<script setup>
  import { reactive, onMounted, ref } from 'vue'
  import componentsTable from '../../components/table'
  import componentsSearchForm from '../../components/searchForm'
  import componentsTree from '../../components/tree'
  import componentsPagination from '../../components/pagination.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import { fileManageService } from '@/api/frontDesk/fileManage'
  import { messageError, messageSuccess } from '@/hooks/useMessage'
  import AddFileType from './addFileType'
  import { GetFileTypeList } from '@/utils/domain/fileManage'
  import { PaginationInfo } from '@/utils/domain/paginationInfo'
  import { getArrFromTree } from '@/utils/tools'

  const showDepPerDialog = ref(false)
  const searchForm = ref(new GetFileTypeList())
  const paginationInfo = ref(new PaginationInfo())

  const dialogVisible = ref(false)
  const loading = ref(false)
  const curFromData = ref({})
  const curFileTypeId = ref('')
  const userSelected = ref([])

  const state = reactive({
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
          id: 'keyword',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请输入文件类型名称或编码'
          }
        },
        {
          id: 'beginTime',
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
          prop: 'fileTypeName',
          label: '文件类型名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'fileTypeSn',
          label: '文件类型说明',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'fileSum',
          label: '文件数',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'createUser',
          label: '创建人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'createDatetime',
          label: '创建时间',
          sortable: true,
          'min-width': 160
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 250,
          rankDisplayData: [
            {
              name: '修改'
            },
            {
              name: '删除'
            },
            {
              name: '设置可见范围'
            },
            {
              name: '特殊类型隐私配置'
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
          if (column.property === '1') {
            return {
              color: 'var(--jy-info-6)',
              cursor: 'pointer'
            }
          }
        }
      }
    },
    componentsTree: {
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': false,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'check-strictly': true
      },
      defaultProps: {
        label: 'fileTypeName',
        children: 'child',
        isLeaf: 'haveChildren',
        nodeKey: 'fileTypeId'
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
          label: '文件详情',
          name: 'Details-of-Document'
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
          name: '批量删除'
        },
        {
          name: '批量设置可见范围'
        },
        {
          name: '批量设置可用范围'
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

  const nodeClick = (NodeObjects, node, TreeNode, event) => {
    console.log('--->', getArrFromTree([NodeObjects], 'child', 'fileTypeId'))
    searchForm.value.fileTypeIds = getArrFromTree(
      [NodeObjects],
      'child',
      'fileTypeId'
    )
    getFileTypeList()
  }

  const getFileTypeList = async () => {
    try {
      loading.value = true
      const res = await fileManageService.getFileTypeListPage({
        ...searchForm.value,
        ...paginationInfo
      })
      state.componentsTable.data = res.data.records || []
      paginationInfo.value.total = res.data && res.data.total
      paginationInfo.value.pages = res.data && res.data.pages
    } catch (error) {
      messageError(error)
    }
    loading.value = false
  }

  const getFileTypeTree = async () => {
    try {
      const res = await fileManageService.getTreeList({})
      state.componentsTree.data = res.data || []
    } catch (error) {
      messageError(error)
    }
  }

  const refresh = () => {
    getFileTypeList()
    getFileTypeTree()
    curFromData.value = {}
  }

  const deleteFileType = async () => {
    try {
      await fileManageService.fileTypeDelete(curFileTypeId.value)
      messageSuccess('成功删除文件类型')
      state.JyElMessageBox.show = false
      refresh()
    } catch (error) {
      messageError(error)
    }
  }

  const queryVisibleRByFileType = async fileTypeId => {
    try {
      const res = await fileManageService.queryVisibleRByFileType(fileTypeId)
      userSelected.value = [
        ...res.data.visibleOrganR,
        ...res.data.visibleRoleR,
        ...res.data.visibleUserR
      ]
    } catch (error) {
      messageError(error)
    }
  }

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
    console.log(cell.name, column)
    if (cell.name === '修改') {
      dialogVisible.value = true
      curFromData.value = { ...curFromData.value, ...column }
    }
    if (cell.name === '删除') {
      curFileTypeId.value = column.fileTypeId
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '您确定要删除该记录吗？'
      state.JyElMessageBox.show = true
    }
    if (cell.name === '设置可见范围') {
      showDepPerDialog.value = true
      queryVisibleRByFileType(column.fileTypeId)
    }
    if (cell.name === '特殊类型隐私配置') {
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

  onMounted(() => {
    refresh()
  })
</script>

<style lang="scss" scoped>
  .fileManagement-documentType {
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
    .components-tree {
      margin: 0%;
      .custom-tree-node {
        display: flex;
        align-items: center;
        .custom-tree-node-icon {
          margin-right: 0.4rem;
        }
      }
      :deep {
        margin-bottom: 0%;
        .el-tree-node__content {
          @include mixin-height(32);
        }
        .el-tree .el-icon svg {
          //原有的箭头 去掉
          display: none !important;
          height: 0;
          width: 0;
        }
        .el-tree-node__expand-icon {
          //引入的图标（图片）size大小 => 树节点前的预留空间大小
          font-size: 16px;
        }

        //图标是否旋转，如果是箭头类型的，可以设置旋转90度。如果是两张图片，则设为0
        .el-tree .el-tree-node__expand-icon.expanded {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }

        .el-tree .el-tree-node__expand-icon:before {
          // 未展开的节点
          background: url('~@/assets/svg/tree-fangxiang-zuo.svg') no-repeat 0;
          content: '';
          display: block;
          width: 18px;
          height: 18px;
        }

        .el-tree .el-tree-node__expand-icon.expanded:before {
          //展开的节点
          background: url('~@/assets/svg/tree-fangxiang-xia.svg') no-repeat 0 0;
          content: '';
          display: block;
          width: 18px;
          height: 18px;
          margin-top: 4px;
        }

        .el-tree .is-leaf.el-tree-node__expand-icon::before {
          //叶子节点（不显示图标）
          display: block;
          background: none !important;
          content: '';
          width: 18px;
          height: 18px;
        }

        .el-tree-node__expand-icon.is-leaf {
          width: 0px;
        }
      }
    }
  }
</style>

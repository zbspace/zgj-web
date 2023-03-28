<!-- 文件类型 -->
<template>
  <div class="fileManagement-documentType">
    <JyTable
      url="/fileType/page"
      ref="table"
      method="POST"
      :hasTree="true"
      :needAutoRequest="false"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      :queryParams="searchForm"
      tableClick="sealName"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
    >
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
    </JyTable>

    <!-- 单据详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>

    <!-- 设置可见范围  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      @update:searchSelected="submit"
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
    @on-closed="closed"
  />

  <!-- 特殊类型隐私配置 -->
  <PrivacySet v-model="privacyVisible" :fileTypeId="curFileTypeId"></PrivacySet>

  <!-- 批量操作弹框提示 -->
  <actionMoreDialog
    @update:modelValue="state.showToastDialog.show = false"
    :show="state.showToastDialog.show"
    :selectionData="state.componentsBatch.selectionData"
    :showToastDialogContent="showToastDialogContent"
    label="formName"
    @sureAction="deleteFileType"
    curKey="fileTypeName"
  ></actionMoreDialog>
</template>

<script setup>
  import { reactive, onMounted, ref } from 'vue'
  import componentsTree from '../../components/tree'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import { fileManageService } from '@/api/frontDesk/fileManage'
  import actionMoreDialog from '@/views/components/actionMoreDialog'
  import {
    messageError,
    messageSuccess,
    messageWarning
  } from '@/hooks/useMessage'
  import AddFileType from './addFileType'
  import PrivacySet from './privacySet'
  import { GetFileTypeList, ViewRangSetInfo } from '@/utils/domain/fileManage'
  import { PaginationInfo } from '@/utils/domain/paginationInfo'
  import { getArrFromTree } from '@/utils/tools'
  import JyTable from '@/views/components/JyTable.vue'

  const showDepPerDialog = ref(false)
  const searchForm = ref(new GetFileTypeList())
  const paginationInfo = ref(new PaginationInfo())

  const dialogVisible = ref(false)
  const loading = ref(false)
  const curFromData = ref({})
  const curFileTypeId = ref('')
  const userSelected = ref([])
  const viewRangSetInfo = ref(new ViewRangSetInfo())
  const curFileTypeIds = ref([])
  const privacyVisible = ref(false)
  const table = ref(null)
  const showToastDialogContent = ref(null)

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
            'end-placeholder': '结束时间',
            'value-format': 'YYYY-MM-DD',
            'disabled-date': time => {
              return time.getTime() > Date.now() // 如果有后面的-8.64e7就是不可以选择今天的
            },
            'default-value': [
              new Date(new Date().setMonth(new Date().getMonth() - 1)),
              new Date()
            ]
          },
          style: {},
          requestType: 'array'
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
              name: '修改',
              code: 1
            },
            {
              name: '删除',
              code: 2
            },
            {
              name: '设置可见范围',
              code: 3
            },
            {
              name: '特殊类型隐私配置',
              code: 4
            }
          ]
        }
      ]
    },
    componentsTree: {
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': false,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'check-strictly': true,
        'highlight-current': true
      },
      defaultProps: {
        label: 'fileTypeName',
        children: 'child',
        isLeaf: 'haveChildren',
        nodeKey: 'fileTypeId'
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
          name: '批量删除',
          code: 1
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

  const nodeClick = (NodeObjects, node, TreeNode, event) => {
    console.log('--->', getArrFromTree([NodeObjects], 'child', 'fileTypeId'))
    searchForm.value.fileTypeIds = getArrFromTree(
      [NodeObjects],
      'child',
      'fileTypeId'
    )
    table.value.reloadData()
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
      state.componentsTree.data = [
        {
          fileTypeName: '文件类型',
          fileTypeId: '-1',
          child: res.data || []
        }
      ]
      table.value.reloadData()
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
      if (curFileTypeIds.value.length) {
        await fileManageService.batchDelete({
          fileTypeIds: curFileTypeIds.value
        })
        messageSuccess('批量删除成功')
        state.showToastDialog.show = false
      } else {
        await fileManageService.fileTypeDelete(curFileTypeId.value)
        messageSuccess('成功删除文件类型')
      }
      state.JyElMessageBox.show = false
      refresh()
    } catch (error) {
      //
    }
  }

  const queryVisibleRByFileType = async fileTypeId => {
    try {
      const res = await fileManageService.queryVisibleRByFileType(fileTypeId)
      userSelected.value = [
        ...res.data.organs,
        ...res.data.roles,
        ...res.data.users
      ]
      showDepPerDialog.value = true
    } catch (error) {
      messageError(error)
    }
  }

  const submit = async list => {
    list.forEach(v => {
      if (v.type === 'user') {
        viewRangSetInfo.value.users = list.filter(v => v.type === 'user')
      }
      if (v.type === 'organ') {
        viewRangSetInfo.value.organs = list.filter(v => v.type === 'organ')
      }
      if (v.type === 'role') {
        viewRangSetInfo.value.roles = list.filter(v => v.type === 'role')
      }
    })
    try {
      await fileManageService.viewRangSet(viewRangSetInfo.value)
      showDepPerDialog.value = false
      messageSuccess('可见范围设置成功')
    } catch (error) {
      messageError(error)
    }
  }

  const closed = () => {
    curFromData.value = {}
  }

  const clickBatchButton = async (item, selectionData) => {
    const row = table.value.getSelectionRows()
    curFileTypeIds.value = row.map(v => v.fileTypeId)
    // 批量删除
    if (item.code === 1) {
      state.componentsBatch.selectionData = selectionData
      showToastDialogContent.value = {
        header: {
          data: '批量删除'
        },
        content: {
          data: '是否删除以下文件类型？'
        }
      }
      state.showToastDialog.show = true
    }
    // 批量设置可见范围
    if (item.code === 2) {
      messageWarning('待产品确认回显功能')
    }
  }

  // 点击表格单元格
  function cellClick(row, column, cell, event) {
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
    curFileTypeId.value = column.fileTypeId
    console.log(cell.name, column)
    if (cell.code === 1) {
      dialogVisible.value = true
      curFromData.value = { ...curFromData.value, ...column }
    }
    if (cell.code === 2) {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '您确定要删除该记录吗？'
      state.JyElMessageBox.show = true
    }
    if (cell.code === 3) {
      viewRangSetInfo.value.fileTypeId = column.fileTypeId
      queryVisibleRByFileType(column.fileTypeId)
    }
    if (cell.code === 4) {
      privacyVisible.value = true
    }
  }

  onMounted(() => {
    refresh()
  })
</script>

<script>
  export default {
    name: 'DocumentType'
  }
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

<template>
  <div>
    <JyTable
      url="/organ/page"
      ref="table"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      :queryParams="{ organId }"
      statusColoum="flag"
      openValue="启用"
      hasTree
      tableClick="organName"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
    >
      <template #title>
        <div class="title">
          <div>部门管理</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="add"
                >+ {{ $t('t-zgj-add') }}</el-button
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
      <template #tree>
        <div class="components-tree">
          <el-tree
            ref="deptTreeRef"
            :data="state.componentsTree.data"
            :props="state.componentsTree.defaultProps"
            v-bind="state.componentsTree.defaultAttribute"
            lazy
            :load="loadFn"
            @current-change="currentChange"
            @node-contextmenu="nodeContextmenu"
            v-if="loadTree"
          ></el-tree>
          <el-card
            class="box-card"
            ref="card"
            v-show="menuVisible"
            :body-style="{ padding: '0 10px' }"
          >
            <div class="add" @click="addChildNode">添加子部门</div>
            <div class="delete" @click="editNode" v-show="firstLevel">
              编辑部门
            </div>
            <div class="edit" @click="deleteNode" v-show="firstLevel">
              删除部门
            </div>
          </el-card>
        </div>
      </template>
    </JyTable>
    <!-- </componentsLayout> -->
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
      :title="form.organId ? $t('t-zgj-Edit') : $t('t-zgj-add')"
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
          <el-input v-model="form.organName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="组织类型" prop="organTypeId">
          <el-radio-group v-model="form.organTypeId">
            <el-radio label="ot1" size="large">部门</el-radio>
            <el-radio label="ot2" size="large">单位</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门编码" prop="organNo">
          <el-input v-model="form.organNo" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="上级部门" prop="organPName">
          <div class="select-box-contBox">
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              v-model="form.organPName"
              placeholder="请选择"
              @click="chooseOrgan('organP')"
            />
            <div class="ap-box-contBox-icon">
              <img
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
              @click="chooseOrgan('leaderUser')"
            />
            <div class="ap-box-contBox-icon">
              <img
                class="ap-box-contBox-icon-img"
                src="@/assets/svg/ketanchude.svg"
                alt=""
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="readme">
          <el-input v-model="form.readme" type="textarea" />
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
      :multiple="false"
      :hasTopRoot="false"
    />
    <!-- 批量操作 -->
    <actionMoreDialog
      @update:modelValue="showToastDialog = false"
      :show="showToastDialog"
      :selectionData="state.componentsBatch.selectionData"
      :showToastDialogContent="showToastDialogContent"
      label="organName"
      @sureAction="deleteMore"
    ></actionMoreDialog>
    <!-- 单个操作 -->
    <JyElMessageBox
      v-model="state.showOneAction.show"
      :mode="1"
      :showClose="false"
      :defaultAttribute="{}"
      @confirmClick="confirmOneClick"
    >
      <template #header>
        <div class="header-div">
          <img src="@/assets/svg/common/warning.svg" />
          <span>{{ state.showOneAction.header.data }}</span>
        </div>
      </template>
      <template #content>
        <div class="content-div">{{ state.showOneAction.content.data }}</div>
      </template>
    </JyElMessageBox>
  </div>
</template>

<script setup>
  import { reactive, onBeforeMount, ref, nextTick } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import department from '@/api/system/companyManagement/department'
  import actionMoreDialog from '@/views/components/actionMoreDialog'
  import tableHeader from '@/views/tableHeaderJson/system/companyManage/departmentStaff/department.json'
  import { getItem } from '@/utils/storage'

  const showFormDialog = ref(false)
  const showDepPerDialog = ref(false)
  const showDeptDialog = ref(false)
  const vFormLibraryRef = ref(null)
  const searchSelected = ref([])
  const tabsShow = ref(['organ'])
  const kDepartOrPerson = ref(null)
  const organId = ref('-1')
  const table = ref(null)
  const menuVisible = ref(false)
  const firstLevel = ref(false)
  const card = ref(null)
  const currentDept = ref(null)
  const showToastDialog = ref(false)
  const currentActionType = ref(null)
  const showToastDialogContent = ref(null)
  const currentActionDept = ref(null)
  const currentAction = ref(null)
  const firstNode = ref(null)
  const firstTreeData = ref([])
  const deptTreeRef = ref(null)

  const form = reactive({
    organId: '',
    organNo: '',
    organName: '',
    organTypeId: 'ot1',
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
    ],
    organPName: [
      {
        required: true,
        message: '请选择上级部门',
        trigger: 'change'
      }
    ]
  })

  const state = reactive({
    showOneAction: {
      show: false,
      header: {
        data: ''
      },
      content: {
        data: ''
      }
    },
    componentsSearchForm: {
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
          id: 'flag',
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
              value: 0
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
      header: tableHeader
    },

    componentsTree: {
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': false,
        'expand-on-click-node': false,
        'check-strictly': true,
        'highlight-current': true,
        'node-key': 'organId',
        'current-node-key': '-1',
        accordion: true
      },
      defaultProps: {
        label: 'organName',
        children: 'children',
        isLeaf: 'haveChildren'
      },
      value: ''
    },
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '单位与部门详情',
          name: 'Unit-Department-Details',
          'basicInformation-data': null
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
      data: [
        {
          name: 't-zgj-dept.BatchDeactivation'
        },
        {
          name: 't-zgj-dept.BatchEnable'
        },
        {
          name: 't-zgj-seal.BatchDelete'
        }
      ]
    }
  })
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    department.detail(row.organId).then(res => {
      const data = res.data
      const detail = [
        {
          label: '部门名称',
          value: data.organName
        },
        {
          label: '部门编码',
          value: data.organNo
        },
        {
          label: '组织类型',
          value: data.organTypeName
        },
        {
          label: '组织人数',
          value: data.organUserNum || 0
        },
        {
          label: '组织主管',
          value: data.leaderUserName
        },
        {
          label: '上级组织',
          value: data.organPName
        },
        {
          label: '更新时间',
          value: data.modifyDatetime,
          lineStyle: {
            width: '100%'
          }
        },
        {
          label: '备注',
          value: data.readme,
          lineStyle: {
            width: '100%'
          }
        }
      ]
      state.componentsDocumentsDetails.visible[0]['basicInformation-data'] =
        detail
      state.componentsDocumentsDetails.show = true
    })
  }

  function customClick(row, column, cell, event) {
    if (cell.name === 't-zgj-Edit') {
      showFormDialog.value = true
      form.organId = column.organId
      nextTick(() => {
        vFormLibraryRef.value.resetFields()
        department.detail(column.organId).then(res => {
          const data = res.data
          form.organId = data.organId
          form.organNo = data.organNo
          form.organName = data.organName
          form.organTypeId = data.organTypeId
          form.organPid = data.organPid
          form.organPName =
            data.organPName ||
            (getItem('accountInfo') && getItem('accountInfo').userDepartName)
          form.leaderUserId = data.leaderUserId
          form.leaderUserName = data.leaderUserName
          form.readme = data.readme
        })
      })
    } else if (cell.name === 't-zgj-F_SEAL_INFO_UP') {
      console.log('t-zgj-F_SEAL_INFO_UP')
    } else if (cell.name === 't-zgj-F_SEAL_INFO_DOWN') {
      console.log('t-zgj-F_SEAL_INFO_DOWN')
    } else if (cell.name === 'status') {
      currentAction.value =
        column.flag === '启用' ? 't-zgj-Disable' : 't-zgj-Enable'
      currentActionDept.value = column.organId
      state.showOneAction.show = true
      state.showOneAction.header.data = '提示'
      if (column.flag === '启用') {
        state.showOneAction.content.data = '是否停用该部门？'
      } else {
        state.showOneAction.content.data = '是否启用该部门？'
      }
    }
  }

  function confirmOneClick() {
    if (currentAction.value === 't-zgj-Enable') {
      department
        .batchEnable([currentActionDept.value])
        .then(res => {
          table.value.reloadData()
        })
        .finally(() => {
          state.showOneAction.show = false
        })
    } else if (currentAction.value === 't-zgj-Disable') {
      department
        .batchDisable([currentActionDept.value])
        .then(res => {
          table.value.reloadData()
        })
        .finally(() => {
          state.showOneAction.show = false
        })
    } else if (currentAction.value === 't-zgj-Delete') {
      department
        .batchDelete([currentActionDept.value])
        .then(res => {
          table.value.reloadData()
          firstNode.value.loaded = false
          firstNode.value.expand()
          table.value.reloadData()
        })
        .finally(() => {
          showToastDialog.value = false
          state.showOneAction.show = false
        })
    }
  }

  function clickBatchButton(item, selectionData) {
    console.log(item.name)
    currentActionType.value = item.name
    if (item.name === 't-zgj-dept.BatchDeactivation') {
      showToastDialogContent.value = {
        header: {
          data: '批量停用'
        },
        content: {
          data: '是否批量停用这些部门？'
        }
      }
    } else if (item.name === 't-zgj-dept.BatchEnable') {
      showToastDialogContent.value = {
        header: {
          data: '批量启用'
        },
        content: {
          data: '是否批量启用这些部门？'
        }
      }
    } else if (item.name === 't-zgj-seal.BatchDelete') {
      showToastDialogContent.value = {
        header: {
          data: '批量删除'
        },
        content: {
          data: '是否批量删除这些部门？'
        }
      }
    }
    state.componentsBatch.selectionData = selectionData
    showToastDialog.value = true
  }

  // 点击关闭
  function clickClose() {
    state.componentsDocumentsDetails.show = false
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

  const add = () => {
    showFormDialog.value = true
    nextTick(() => {
      form.organPid = ''
      form.organId = ''
      vFormLibraryRef.value.resetFields()
    })
  }
  const loadTree = ref(true)
  const submitLibraryForm = () => {
    vFormLibraryRef.value.validate(valid => {
      if (valid) {
        if (form.organId) {
          loadTree.value = false
          department
            .edit(form)
            .then(() => {
              showFormDialog.value = false
              firstNode.value.loaded = false
              firstNode.value.expand()
              table.value.reloadData()
              loadTree.value = true
            })
            .catch(() => {
              loadTree.value = true
            })
        } else {
          firstNode.value = deptTreeRef.value.getNode(form.organPid)
          loadTree.value = false
          department
            .add(form)
            .then(() => {
              if (firstNode.value) {
                state.componentsTree.defaultAttribute['current-node-key'] =
                  form.organPid
                organId.value = form.organPid
                showFormDialog.value = false
                firstNode.value.loaded = false
                firstNode.value.expand()
              }

              table.value.reloadData()
              loadTree.value = true
            })
            .catch(() => {
              loadTree.value = true
            })
        }
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

  function loadFn(node, resolve) {
    if (node.level === 0) {
      firstNode.value = node
      department
        .subOrganList(-1)
        .then(res => {
          res.data.forEach(i => (i.haveChildren = !i.haveChildren))
          firstTreeData.value = res.data
          return resolve([
            {
              organName:
                getItem('accountInfo') && getItem('accountInfo').userDepartName,
              organId: '-1',
              haveChildren: false,
              children: []
            }
          ])
        })
        .then(() => {
          nextTick(() => {
            const nodeData = firstNode.value.childNodes[0]
            nodeData.expanded = true
            nodeData.loadData()
          })
        })
    } else if (node.level === 1) {
      return resolve(firstTreeData.value)
    } else {
      department.subOrganList(node.data.organId).then(res => {
        res.data.forEach(i => (i.haveChildren = !i.haveChildren))
        return resolve(res.data)
      })
    }
  }

  function currentChange(type, node) {
    firstNode.value = node
    organId.value = type.organId
    table.value.reloadData()
  }

  function nodeContextmenu(event, data, node) {
    if (node.level === 1) {
      firstLevel.value = false
    } else {
      firstLevel.value = true
    }
    menuVisible.value = true
    currentDept.value = data
    card.value.$el.style.right = 0
    card.value.$el.style.top = event.layerY + 10 + 'px'
    document.addEventListener('click', foo)
  }

  //  取消鼠标监听事件 菜单栏
  function foo() {
    menuVisible.value = false
    //  要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    document.removeEventListener('click', foo)
  }

  // 添加子部门
  function addChildNode() {
    showFormDialog.value = true
    nextTick(() => {
      vFormLibraryRef.value.resetFields()
      form.organPid = currentDept.value.organId
      form.organPName = currentDept.value.organName
    })
  }

  // 编辑部门
  function editNode() {
    showFormDialog.value = true
    form.organId = currentDept.value.organId
    nextTick(() => {
      vFormLibraryRef.value.resetFields()
      department.detail(currentDept.value.organId).then(res => {
        const data = res.data
        form.organId = data.organId
        form.organNo = data.organNo
        form.organName = data.organName
        form.organTypeId = data.organTypeId
        form.organPid = data.organPid
        form.organPName =
          data.organPName ||
          JSON.parse(localStorage.getItem('departLists')).find(
            i => i.tenantId === localStorage.getItem('tenantId')
          ).tenantName
        form.leaderUserId = data.leaderUserId
        form.leaderUserName = data.leaderUserName
        form.readme = data.readme
      })
    })
  }

  // 删除部门
  function deleteNode() {
    currentActionDept.value = currentDept.value.organId
    currentAction.value = 't-zgj-Delete'
    state.showOneAction.show = true
    state.showOneAction.header.data = '提示'
    state.showOneAction.content.data = '是否删除该部门'
  }

  const deleteMore = () => {
    if (currentActionType.value === 't-zgj-dept.BatchDeactivation') {
      department
        .batchDisable(state.componentsBatch.selectionData.map(i => i.organId))
        .then(res => {
          table.value.reloadData()
        })
        .finally(() => {
          showToastDialog.value = false
        })
    } else if (currentActionType.value === 't-zgj-dept.BatchEnable') {
      department
        .batchEnable(state.componentsBatch.selectionData.map(i => i.organId))
        .then(res => {
          table.value.reloadData()
        })
        .finally(() => {
          showToastDialog.value = false
        })
    } else if (currentActionType.value === 't-zgj-seal.BatchDelete') {
      department
        .batchDelete(state.componentsBatch.selectionData.map(i => i.organId))
        .then(res => {
          table.value.reloadData()
        })
        .finally(() => {
          showToastDialog.value = false
        })
    }
  }

  onBeforeMount(() => {})
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

  .components-Layout .ap-box-tree {
    position: relative;
  }

  .box-card {
    width: 110px;
    position: absolute;
    z-index: 1000;

    div {
      height: 35px;
      line-height: 35px;
      border-bottom: 1px solid var(--el-color-primary);
      text-align: center;
      cursor: pointer;
    }

    div:nth-last-of-type(1) {
      border-bottom: none;
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
</style>

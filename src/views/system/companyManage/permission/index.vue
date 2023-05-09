<!--
* @Descripttion 角色权限管理
* @FileName index.vue
* @Author WalterXsk
 * @LastEditTime: 2023-04-20
!-->
<template>
  <div>
    <JyTable
      url="/role/page"
      ref="table"
      method="POST"
      :hasTree="false"
      tableClick=""
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      @clickBatchButton="clickBatchButton"
      @cellClick="cellClick"
      @customClick="customClick"
    >
      <template #title>
        <div class="title">
          <div>角色权限管理</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="add"> + 新建 </el-button>
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
                    <el-dropdown-item @click="settingShow">
                      基础数据权限配置
                    </el-dropdown-item>
                  </el-dropdown-menu>
                  <el-dropdown-menu>
                    <el-dropdown-item>导入</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </template>
    </JyTable>
    <!-- 新增部门 -->
    <JyDialog
      @update:show="showFormDialog = $event"
      :show="showFormDialog"
      :title="isEdit ? $t('t-zgj-Edit') : $t('t-zgj-add')"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="600"
      :height="160"
      @confirm="submitLibraryForm"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="vFormLibraryRef"
        label-width="80px"
      >
        <el-form-item label="角色编码" prop="roleNo">
          <el-input v-model="form.roleNo" disabled />
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" clearable maxlength="128" />
        </el-form-item>
      </el-form>
    </JyDialog>
    <!-- 基础数据配置 -->
    <JyDialog
      @update:show="showSettingDialog = $event"
      :show="showSettingDialog"
      title="基础数据权限配置"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="1000"
      :height="160"
      @confirm="submitSettingForm"
    >
      <el-form :model="settingForm" ref="vFormSettingRef" label-width="280px">
        <el-form-item
          label="用户基础权限"
          prop="userBaseAuth"
          style="margin: 10px 0 38px 0"
        >
          <el-radio-group v-model="settingForm.userBaseAuth">
            <el-radio label="1">
              <template #default>
                <div class="custom-label">
                  <div>向上继承</div>
                  <div class="msg">可以查看下级部门员工创建的数据</div>
                </div>
              </template>
            </el-radio>
            <el-radio label="2">
              <template #default>
                <div class="custom-label">
                  <div>仅自己</div>
                  <div class="msg">仅可以查看创建人为自己的数据</div>
                </div>
              </template>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="部门主管是否拥有部门员工权限"
          prop="leaderLowerAuth"
        >
          <el-switch v-model="settingForm.leaderLowerAuth" />
        </el-form-item>
      </el-form>
    </JyDialog>
    <JyElMessageBox
      v-model="state.JyElMessageBox.show"
      :show="state.JyElMessageBox.show"
      :defaultAttribute="{}"
      @confirmClick="onConfirmDelete"
    >
      <template #header>
        {{ state.JyElMessageBox.header.data }}
      </template>
      <template #content>
        {{ state.JyElMessageBox.content.data }}
      </template>
    </JyElMessageBox>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import tableHeader from '@/views/tableHeaderJson/system/companyManage/departmentStaff/roleAuth.json'
  import { useRouter } from 'vue-router'
  import roleApis from '@/api/system/companyManagement/authorityManagement'
  import { ElMessage } from 'element-plus'

  const router = useRouter()
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
            placeholder: '角色编码/角色名称'
          }
        }
      ],
      butData: [
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
      header: tableHeader,
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          // console.log({ row, column, rowIndex, columnIndex });
          if (column.property === '2') {
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

    componentsBatch: {
      selectionData: [],
      defaultAttribute: {
        disabled: true
      },
      data: [
        {
          name: '批量删除'
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
  const showFormDialog = ref(false)
  const showSettingDialog = ref(false)
  const vFormLibraryRef = ref(null)
  const vFormSettingRef = ref(null)
  const isEdit = ref(false)
  const table = ref(null)
  const form = reactive({
    roleNo: '',
    roleName: ''
  })
  const rules = reactive({
    roleName: [
      {
        required: true,
        message: '请输入角色名称',
        trigger: 'change'
      }
    ]
  })

  const settingForm = reactive({
    userBaseAuth: '1',
    leaderLowerAuth: true,
    roleConfigId: ''
  })

  const deletId = ref(null)
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // if (column.property === '2') {
    // }
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    if (cell.name === 't-zgj-Edit') {
      showFormDialog.value = true
      isEdit.value = true
      form.roleNo = column.roleNo
      form.roleName = column.roleName
      form.roleId = column.roleId
    }
    if (cell.name === 't-zgj-Delete') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '您确定要删除该记录吗？'
      state.JyElMessageBox.show = true
      deletId.value = column.roleId
    }
    if (cell.name === 't-zgj-sync.AuthSetting') {
      router.push({
        path: '/system/companyManage/departmentStaff/config',
        query: {
          roleId: column.roleId,
          roleName: encodeURIComponent(column.roleName)
        }
      })
    }
    if (cell.name === 't-zgj-sync.PersonManage') {
      router.push({
        path: '/system/companyManage/departmentStaff/person',
        query: {
          roleId: column.roleId,
          roleName: encodeURIComponent(column.roleName)
        }
      })
    }
  }

  // 删除角色
  const onConfirmDelete = () => {
    roleApis.roleDelete(deletId.value).then(res => {
      ElMessage.success('操作成功')
      state.JyElMessageBox.show = false
      table.value.reloadData()
    })
  }

  // 批量删除
  const clickBatchButton = (val, attr) => {
    const roleIds = []
    attr.forEach(item => {
      roleIds.push(item.roleId)
    })
    roleApis.batchDelete({ roleIds }).then(() => {
      ElMessage.success('操作成功')
      table.value.reloadData()
    })
  }

  const settingShow = () => {
    roleApis.getSetting().then(val => {
      settingForm.userBaseAuth = val.data.userBaseAuth
      settingForm.leaderLowerAuth = val.data.leaderLowerAuth === '1'
      settingForm.roleConfigId = val.data.roleConfigId
      showSettingDialog.value = true
    })
  }

  const submitLibraryForm = () => {
    vFormLibraryRef.value.validate(valid => {
      if (valid) {
        let queryApi = ''
        if (isEdit.value) {
          queryApi = 'roleEdit'
        } else {
          queryApi = 'roleData'
        }
        roleApis[queryApi]({ ...form }).then(res => {
          ElMessage.success('操作成功')
          showFormDialog.value = false
          table.value.reloadData()
        })
      }
    })
  }

  const submitSettingForm = () => {
    vFormSettingRef.value.validate(valid => {
      if (valid) {
        roleApis
          .editSetting({
            userBaseAuth: settingForm.userBaseAuth,
            leaderLowerAuth: settingForm.leaderLowerAuth ? '1' : '0',
            roleConfigId: settingForm.roleConfigId
          })
          .then(res => {
            ElMessage.success('操作成功')
            showSettingDialog.value = false
            table.value.reloadData()
          })
      }
    })
  }

  const add = () => {
    showFormDialog.value = true
    isEdit.value = false
    roleApis.generateBizNo().then(res => {
      form.roleNo = res.data
      form.roleName = ''
    })
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

  .custom-label {
    position: relative;
    width: 280px;
    color: rgba($color: #000000, $alpha: 0.85);
    .msg {
      position: absolute;
      bottom: -20px;
      left: 0px;
      font-size: 12px;
      color: rgba($color: #000000, $alpha: 0.45);
    }
  }
</style>

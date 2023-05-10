<!--
* @Descripttion 人员管理
* @FileName personManage.vue
* @Author WalterXsk
 * @LastEditTime: 2023-04-20
!-->
<template>
  <div class="PrintControlManagement-LibraryOfSeals">
    <JyTable
      url="/role/user/page"
      ref="table"
      :hasTree="false"
      :breadcrumb="true"
      :needAutoRequest="true"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      :queryParams="queryParams"
      tableClick=""
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
      @clickElement="clickElement"
    >
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              style="--el-text-color-regular: rgba(0, 0, 0, 0.65)"
            >
              角色权限管理
            </el-breadcrumb-item>
            <el-breadcrumb-item
              style="--el-text-color-regular: rgba(0, 0, 0, 0.25)"
            >
              人员管理
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <template #title>
        <div class="title">
          <div class="title">
            <div class="title-desc">
              <img
                class="title-desc-img"
                src="@/assets/svg/front/sealApply/back.svg"
                alt=""
                @click="clickBackPage"
              />
              人员管理<span class="role">（{{ roleName }}）</span>
            </div>
          </div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="add">+ 新增人员</el-button>
            </div>
            <div class="title-more-down"> </div>
          </div>
        </div>
      </template>
    </JyTable>

    <!-- 人员选择  -->
    <kDepartOrPersonVue
      v-model:show="showDepPerDialog"
      v-model:searchSelected="state.searchSelected"
      v-if="showDepPerDialog"
      :tabsShow="state.tabsShow"
      :activeTab="state.activeTab"
    >
    </kDepartOrPersonVue>
    <!-- 弹窗提示 -->
    <JyElMessageBox
      v-model="state.JyElMessageBox.show"
      :show="state.JyElMessageBox.show"
      :defaultAttribute="{}"
    >
      <template #header>
        <div class="header-div">
          <img :src="state.JyElMessageBox.header.icon" alt="" />
          <span>{{ state.JyElMessageBox.header.data }}</span>
        </div>
      </template>
      <template #content>
        <div class="content-div">{{ state.JyElMessageBox.content.data }}</div>
      </template>
      <template #footer>
        <el-button type="primary" @click="onConfirmDelete">
          {{ $t('t-zgj-operation.submit') }}
        </el-button>
        <el-button @click="state.JyElMessageBox.show = false">
          {{ $t('t-zgj-operation.cancel') }}
        </el-button>
      </template>
    </JyElMessageBox>
  </div>
</template>
<script setup>
  import { reactive, ref, watch } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import tableHeader from '@/views/tableHeaderJson/system/companyManage/departmentStaff/roleManage.json'
  import roleApis from '@/api/system/companyManagement/authorityManagement'
  import { useRouter, useRoute } from 'vue-router'
  import { ElMessage } from 'element-plus'
  const router = useRouter()
  const route = useRoute()
  const table = ref(null)
  const queryParams = ref({})
  const roleName = ref(decodeURIComponent(route.query.roleName))
  const state = reactive({
    sealIds: '',
    msg: '',
    tabsShow: [],
    searchSelected: [],
    typeList: [],
    activeTab: '',
    JyElMessageBox: {
      show: false,
      header: {
        data: '',
        icon: '/src/assets/svg/common/warning.svg'
      },
      content: {
        data: ''
      },
      type: '删除'
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
          id: 'searchKey',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '姓名/账号/职位'
          }
        },
        {
          id: 'hostOrganId',
          label: '所属部门',
          type: 'derivable',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+所属部门'
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
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          if (column.property === '') {
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
        amount: 0,
        index: 1,
        pageNumber: 10
      },
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        layout: 'prev, pager, next, jumper',
        total: 0,
        'page-sizes': [10, 50, 100],
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
          name: '批量移除'
        }
      ]
    }
  })

  const add = () => {
    state.activeTab = 'user'
    state.tabsShow = ['user']
    showDepPerDialog.value = true
  }

  queryParams.value = {
    roleId: route.query.roleId
  }

  const showDepPerDialog = ref(false)

  let deleteUserId = ''
  // 点击表格按钮
  const customClick = (row, column, cell, event) => {
    if (cell.name === 't-zgj-role.Removal') {
      state.JyElMessageBox.header.data = '移除'
      state.JyElMessageBox.content.data = '请问确定要移除吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '移除'
      deleteUserId = column.userId
    }
  }

  const clickBackPage = () => {
    router.go(-1)
  }

  // 移除角色对应人员
  const onConfirmDelete = () => {
    roleApis
      .roleDelete(`${queryParams.value.roleId}/${deleteUserId}`)
      .then(res => {
        ElMessage.success('操作成功')
        state.JyElMessageBox.show = false
        table.value.reloadData()
      })
  }

  // 添加角色人员
  watch(
    () => state.searchSelected,
    val => {
      if (!val || val.length === 0) return
      if (state.activeTab === 'user') {
        const params = []
        val.forEach(item => {
          params.push(item.id)
        })
        roleApis
          .addRoleUser({ roleId: queryParams.value.roleId, userIds: params })
          .then(res => {
            ElMessage.success('操作成功')
            state.JyElMessageBox.show = false
            state.searchSelected = []
            table.value.reloadData()
          })
      } else if (state.activeTab === 'organ') {
        // const selectedDepartName = ''
        // val.forEach(item => {
        //   selectedDepartName = selectedDepartName + '、' + item.name
        // })
        // state.componentsSearchForm.data[1].defaultAttribute.value =
        //   selectedDepartName
      }
    }
  )

  // 批量移除
  const clickBatchButton = (val, attr) => {
    const userIds = []
    attr.forEach(item => {
      userIds.push(item.userId)
    })
    roleApis
      .batchDeleteRoleUser({
        roleId: queryParams.value.roleId,
        userIds
      })
      .then(() => {
        ElMessage.success('操作成功')
        table.value.reloadData()
      })
  }

  const clickElement = attr => {
    if (attr.id === 'hostOrganId') {
      state.activeTab = 'organ'
      state.tabsShow = ['organ']
      showDepPerDialog.value = true
    }
  }
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

      .title-desc {
        display: flex;
        align-items: center;
        font-size: 22px;
        color: rgba(0, 0, 0, 0.85);
        .title-desc-img {
          margin-right: 0.5rem;
          cursor: pointer;
        }

        .role {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.65);
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

  .waixian {
    margin-left: 25px;
    font-size: 13px;
    color: #666666;
  }
</style>
<style lang="scss">
  // .upload-demo {
  //   width: 100%;
  //   box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
  //     inset;
  //   border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  //   min-height: 100px;

  //   .el-upload {
  //     width: 100%;
  //   }
  // }
  // .el-icon {
  //   color: #aaaaaa;
  //   margin-right: 5px;
  // }
  // .btnContainer {
  //   width: 100%;
  //   border-bottom: 1px solid var(--el-border-color);
  // }
</style>

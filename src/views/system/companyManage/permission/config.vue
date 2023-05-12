<!-- 用印申请 选中表单 -->
<template>
  <div class="accomplish-container">
    <componentsLayout
      Layout="breadcrumb,title,custom,fixed"
      :cardStyle="cardStyle"
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
              权限配置
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <template #title>
        <div class="title">
          <div class="title-desc">
            <img
              class="title-desc-img"
              src="@/assets/svg/front/sealApply/back.svg"
              alt=""
              @click="clickBackPage"
            />
            权限配置
            <span class="role">（{{ roleName }}）</span>
          </div>
          <div></div>
        </div>
      </template>

      <template #noScroll>
        <!-- tab -->
        <div class="custom-tabs">
          <VTabs
            :active="active"
            :label="tabsLabel"
            @update:active="active = $event"
          ></VTabs>
        </div>

        <!-- 功能数据权限 -->
        <div class="function" v-show="active === 'first'">
          <Functions />
        </div>
        <!-- 数据权限 -->
        <div class="custom-data" v-if="active === 'second'">
          <div class="item">
            <div class="item-label">默认数据权限</div>
            <div>
              {{ indx.label }}
              <span class="i"> （{{ indx.msg }}） </span>
            </div>
          </div>

          <div class="item">
            <div class="item-label">自定义数据权限</div>
            <el-button type="primary" @click="openDialog">编辑</el-button>
          </div>
          <div class="item">
            <div class="item-label"></div>
            <Selected />
          </div>
        </div>
      </template>
    </componentsLayout>

    <!-- 人员选择  -->
    <KDepartOrPersonDialog
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
      :tabsShow="tabsShow"
      @update:searchSelected="callBack"
      :searchSelected="searchSelected"
      editDeploy
      apiModule="systemOrganOrPerson"
      :queryParams="queryParams"
    >
    </KDepartOrPersonDialog>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  import componentsLayout from '../../../components/Layout.vue'
  import VTabs from '@/components/common/JyTabs.vue'
  import KDepartOrPersonDialog from '@/views/components/modules/KDepartOrPersonDialog.vue'
  import { useRouter, useRoute } from 'vue-router'
  import roleApis from '@/api/system/companyManagement/authorityManagement'
  import Selected from './selected'
  import Functions from './functions'
  import { messageError } from '@/hooks/useMessage'
  import api from '@/api/system/companyManagement/departmentStaff'

  const router = useRouter()
  const route = useRoute()

  // 消息 tabs
  const active = ref('first')
  const roleName = ref(route.query.roleName)
  const tabsLabel = ref([
    {
      name: 't-zgj-person.FunctionalPermissions',
      value: 'first'
    },
    {
      name: 't-zgj-person.DataPermissions',
      value: 'second'
    }
  ])

  const queryParams = ref({
    roleId: ''
  })

  queryParams.value = {
    id: route.query.roleId
  }

  const labelInfo = ref([
    { label: '向上继承', msg: '可以查看下级部门员工创建数据' },
    { label: '仅自己', msg: '仅可以查看创建人自己的数据' }
  ])
  const indx = ref(null)
  const permissionData = ref([])

  roleApis.getSetting().then(val => {
    const i = val.data.userBaseAuth === '1' ? 0 : 1
    indx.value = labelInfo.value[i]
  })

  const getAllPublic = async () => {
    try {
      const res = await api.getAllPublic()
      permissionData.value = res.data
    } catch (error) {
      messageError(error)
    }
  }

  getAllPublic()

  const clickBackPage = () => {
    router.go(-1)
  }
  const tabsShow = ref(['user', 'organ'])
  const showDepPerDialog = ref(false)
  const searchSelected = ref([])
  const openDialog = () => {
    showDepPerDialog.value = true
  }

  const callBack = attr => {
    console.log(attr, '===')
  }

  const cardStyle = ref({
    padding: '10px 0 0px 0px'
  })
</script>
<script>
  export default { name: 'PermissionSelect' }
</script>

<style lang="scss" scoped>
  .accomplish-container {
    margin: 0%;
    position: relative;

    .breadcrumb {
      padding-left: 24px;
      padding-top: 16px;
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 24px;
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

    .custom-tabs {
      margin-top: 12px;
      margin-left: 16px;
    }

    .function {
      .tab-container {
        margin-top: 10px;
        ul {
          border-left: 1px solid rgba(0, 0, 0, 0.06);
          border-right: 1px solid rgba(0, 0, 0, 0.06);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .el-checkbox {
          height: 44px;
        }
        .tab-name {
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.02);
          height: 46px;
          line-height: 46px;
          list-style: none;
          li:first-child {
            flex: 20%;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
            border-right: 1px solid rgba(0, 0, 0, 0.06);
            padding-left: 12px;
          }
          li:last-child {
            flex: 80%;
            padding-left: 12px;
          }
        }
        .tab-grant {
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 25px;
          line-height: 25px;
          list-style: none;
          li:first-child {
            flex: 20%;
            text-align: left;
            height: 44px;
            line-height: 44px;
            padding-left: 20px;
          }
          li:last-child {
            flex: 80%;
            border-left: 1px solid rgba(0, 0, 0, 0.06);
            padding-left: 2%;
            line-height: 25px;
          }
        }
        .tab-system {
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 25px;
          line-height: 25px;
          list-style: none;
          li:first-child {
            flex: 20%;
            line-height: 44px;
          }
          li:last-child {
            flex: 80%;
            border-left: 1px solid rgba(0, 0, 0, 0.06);
            padding-left: 2%;
            line-height: 44px;
            min-height: 22px;
          }
        }
      }
    }

    .custom-data {
      padding-left: 24px;
      .item {
        display: flex;
        margin: 20px 0;
        line-height: 32px;
        .item-label {
          width: 100px;
          margin-right: 18px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
        }
        .i {
          color: rgba(0, 0, 0, 0.45);
        }

        .empty {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 80%;
          height: 520px;
          border: 2px dashed rgba(0, 0, 0, 0.15);
          border-radius: 4px;

          .box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(-50%);

            .inner {
              width: 154px;
              height: 132px;
              // background: #d9d9d9;
            }

            .empty-msg {
              margin-top: 24px;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>

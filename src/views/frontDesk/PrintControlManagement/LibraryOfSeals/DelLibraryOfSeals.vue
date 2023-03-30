<!--
* @Descripttion 已删除印章
* @FileName DelLibraryOfSeals.vue
* @Author Guanpf
* @LastEditTime 2023-03-29 17:08:28
!-->
<template>
  <div class="PrintControlManagement-LibraryOfSeals">
    <!-- <componentsLayout Layout="breadcrumb,title,custom,fixed">
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>用印申请 </el-breadcrumb-item>
            <el-breadcrumb-item>新建用印申请</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <template #title>
        <div class="title">
          <div class="title-desc">
            <img
              class="title-desc-img"
              src="../../../../assets/svg/jiantou-zuo.svg"
              alt=""
              @click="clickBackPage"
            />
            新建用印申请
          </div>
          <div> </div>
        </div>
      </template>
    </componentsLayout> -->
    <JyTable
      url="/sealInfo/deleted/page"
      ref="table"
      :breadcrumb="true"
      :needAutoRequest="false"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
    >
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>印章库 </el-breadcrumb-item>
            <el-breadcrumb-item>已删除的印章</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <template #title>
        <div class="title">
          <div class="title-desc">
            <img
              class="title-desc-img"
              src="../../../../assets/svg/jiantou-zuo.svg"
              alt=""
              @click="clickBackPage"
            />
            已删除的印章
          </div>
          <div> </div>
        </div>
      </template>
      <template #custom_sealStateId="scope">
        <div class="flag-cell center">
          <div
            class="diot diot-0"
            v-show="scope.value.sealStateId === '0'"
          ></div>
          <div
            class="diot diot-1"
            v-show="
              scope.value.sealStateId === '1' || scope.value.sealStateId === '2'
            "
          ></div>
          <span v-if="scope.value.sealStateId === '0'">{{
            $t('t-zgj-seal.normal')
          }}</span>
          <span v-else-if="scope.value.sealStateId === '1'">{{
            $t('t-zgj-seal.deactivated')
          }}</span>
          <span v-else-if="scope.value.sealStateId === '2'">{{
            $t('t-zgj-seal.destroyed')
          }}</span>
        </div>
      </template>
      <template #custom_caozuo="scope">
        <!-- {{ scope.value.sealName }}
        <span v-for="(item, i) in state.rankDisplayData" :key="i">{{
          $t(item.name)
        }}</span> -->
        <div
          class="rankDisplayData"
          :class="{ 'rankDisplayData-add': scope.value.sealStateId === '2' }"
          v-if="state.rankDisplayData && state.rankDisplayData.length > 0"
        >
          <div
            class="rankDisplayData-node"
            v-for="(data, num) in state.rankDisplayData.slice(0, 4)"
            :key="num"
            @click="customClick(num, scope.value, data)"
          >
            <span>
              {{
                data.name === 'status'
                  ? scope.value.sealStateId === '1'
                    ? $t('t-zgj-Enable')
                    : $t('t-zgj-seal.deactivated')
                  : $t(data.name)
              }}
            </span>
          </div>
          <div
            class="rankDisplayData-more"
            v-if="state.rankDisplayData.length > 4"
          >
            <el-dropdown>
              <span class="el-dropdown-link">
                <img
                  class="rankDisplayData-node"
                  :src="
                    scope.value.sealStateId === '2'
                      ? state.downIconGray
                      : state.downIcon
                  "
                  alt=""
                />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    :class="{
                      'el-dropdown-item-add': scope.value.sealStateId === '2'
                    }"
                    v-for="(data, num) in state.rankDisplayData.slice(4)"
                    :key="num"
                    @click="customClick(num, scope.value, data)"
                  >
                    {{
                      data.name === 'status'
                        ? scope.value.sealStateId === '1'
                          ? $t('t-zgj-Enable')
                          : $t('t-zgj-seal.deactivated')
                        : $t(data.name)
                    }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
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
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
      :tabsShow="state.tabsShow"
      @update:searchSelected="submitSelectDepart"
      :searchSelected="state.searchSelected"
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
          <span>{{ $t(state.JyElMessageBox.header.data) }}</span>
        </div>
      </template>
      <template #content>
        <div class="content-div">{{ state.JyElMessageBox.content.data }}</div>
      </template>
      <template #footer>
        <el-button
          type="primary"
          @click="submitElMessageBox(state.JyElMessageBox.type)"
        >
          提交
        </el-button>
        <el-button @click="state.JyElMessageBox.show = false">取消</el-button>
      </template>
    </JyElMessageBox>
    <!-- 批量操作弹框提示 -->
    <JyElMessageBox
      v-model="state.showToastDialog.show"
      :show="state.showToastDialog.show"
      :defaultAttribute="{}"
    >
      <template #header>
        <div class="header-div">
          <img :src="state.showToastDialog.header.icon" alt="" />
          <span>{{ state.showToastDialog.header.data }}</span>
        </div>
      </template>
      <template #content>
        <div class="content-div">{{ state.showToastDialog.content.data }}</div>
        <el-scrollbar class="scrollbar" max-height="200px">
          <p
            v-for="item in state.componentsBatch.selectionData"
            :key="item"
            class="scrollbar-demo-item"
            >{{ item.sealName }}</p
          >
        </el-scrollbar>
      </template>
      <template #footer>
        <el-button
          v-for="item in state.butDatas"
          :key="item.name"
          :type="item.type"
          @click="item.clickName"
          >{{ item.name }}</el-button
        >
      </template>
    </JyElMessageBox>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted, ref } from 'vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails'
  import JyTable from '@/views/components/JyTable.vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import { ElMessage } from 'element-plus'
  import api from '@/api/frontDesk/sealManage/libraryOfSeals'
  import tableHeader from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/libraryOfSealsDel.json'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  // 印章库 新增弹框
  const depChoose = ref(null)
  const table = ref(null)
  const showDepPerDialog = ref(false)
  const submitSelectDepart = data => {
    if (data) {
      state.form[depChoose.value + 'Id'] = data[0].id
      state.form[depChoose.value + 'Name'] = data[0].name
    }
    console.log(data)
  }
  // const emit = defineEmits([])
  const state = reactive({
    downIcon: '/src/assets/svg/sangedian.svg',
    downIconGray: '/src/assets/svg/sangedian-gray.svg',
    butDatas: [],
    sealIds: '',
    msg: '',
    tabsShow: [],
    searchSelected: [],
    title: '新增',
    typeList: [],
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
          id: 'searchKey',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '印章名称/保管部门/保管人/印章编码'
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
      header: tableHeader,
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          if (column.property === 'sealName' || column.property === 'caozuo') {
            return {
              color: 'var(--jy-info-6)',
              cursor: 'pointer'
            }
          }
        }
      }
    },
    rankDisplayData: [
      {
        name: 't-zgj-sealInfoDelete.restore',
        label: '还原'
      }
    ],
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
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '印章详情',
          name: 'Particulars-of-Seal'
        },
        {
          label: '保管记录',
          name: 'Record-of-custody'
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
          name: 't-zgj-seal.BatchSetVisibility',
          label: '批量设置可见范围'
        },
        {
          name: 't-zgj-seal.BatchSetAvailable',
          label: '批量设置可用范围'
        },
        {
          name: 't-zgj-seal.BatchDelete',
          label: '批量删除'
        },
        {
          name: 't-zgj-view.SealUnbind',
          label: '印章解绑'
        }
      ]
    }
  })
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event);
    if (column.property === 'sealName') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    console.log(column)
    console.log(cell)
    state.sealIds = column.sealId
    if (cell.name === 't-zgj-sealInfoDelete.restore') {
      state.JyElMessageBox.header.data = 't-zgj-sealInfoDelete.restore'
      state.JyElMessageBox.content.data = '请问确定还原该印章吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '还原'
    }
  }
  // 提交弹窗
  const submitElMessageBox = type => {
    console.log('state.sealIds', state.sealIds)
    state.JyElMessageBox.show = false
    if (type === '还原') {
      apiOpt(type, api.sealRollback(state.sealIds))
    }
  }
  const apiOpt = (typeName, apiName) => {
    apiName.then(res => {
      if (res.code === 200) {
        ElMessage.success(`${typeName}成功！`)
        table.value.reloadData()
      } else {
        ElMessage.success(`${typeName}失败，请重试`)
      }
    })
  }
  onBeforeMount(() => {})
  onMounted(() => {
    table.value.reloadData()
  })
  function clickBackPage() {
    router.go(-1)
  }
</script>
<style lang="scss" scoped>
  .rankDisplayData {
    display: flex;
    // justify-content: space-around;
    // text-align: center;
    color: var(--jy-info-6);

    .rankDisplayData-node {
      cursor: pointer;
      margin-right: 0.5rem;
    }

    .rankDisplayData-more {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  :deep {
    .el-dropdown-item-add {
      color: var(--jy-secondary-5) !important;
    }
    .el-dropdown-item-add:hover {
      background: #fff;
    }
  }

  .rankDisplayData-add {
    color: var(--jy-secondary-5);
  }
  .flag-cell {
    display: flex;
    align-items: center;
    .diot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 5px;
    }
    .diot-1 {
      background: rgba($color: #000000, $alpha: 0.45);
    }

    .diot-0 {
      background: rgba($color: green, $alpha: 0.65);
    }
  }

  .center {
    justify-content: center;
  }
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
        .title-desc-img {
          cursor: pointer;
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
  .upload-demo {
    width: 100%;
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
      inset;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    min-height: 100px;

    .el-upload {
      width: 100%;
    }
  }
  .el-icon {
    color: #aaaaaa;
    margin-right: 5px;
  }
  .btnContainer {
    width: 100%;
    border-bottom: 1px solid var(--el-border-color);
  }
</style>

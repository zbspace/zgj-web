<!-- 智能印章盒格口管理 -->
<template>
  <div class="PrintControlManagement-IntelligentSealBoxManagement">
    <componentsLayout Layout="title,searchForm,custom">
      <template #title>
        <div class="title">
          <div>格口管理</div>
        </div>
        <div class="search">
          <div class="select-wrap">
            <span class="search-label">终端名称</span>
            <el-select
              v-model="state.terminalGrid"
              placeholder="请选择终端名称"
              size="small"
              @change="changeSelect"
            >
              <el-option
                v-for="item in state.termialOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="box-card">
            <!-- status -->
            <div class="status" v-if="state.mouthLists.length !== 0">
              <div class="columns-check">
                <u class="check-flex">
                  <div class="check-last" @click="lastTimeCheck">
                    查看最近一次盘点结果<span>({{ state.lastCheckTime }})</span>
                  </div>
                </u>
                <div class="check-button" @click="checkAll">一键盘点</div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns-status">
          <MouthStatus></MouthStatus>
        </div>
      </template>
      <template #custom>
        <div class="el-row-wrap">
          <el-row
            type="flex"
            :gutter="16"
            justify="space-between"
            style="flex-wrap: wrap; min-width: 1000px"
          >
            <el-col
              :span="8"
              style="margin-bottom: 16px"
              v-for="(item, index) in state.mouthLists"
              :key="index"
            >
              <MouthCard
                :platform="'pc'"
                :state="item.state"
                :inBoxState="item.inBoxState"
                :bindState="item.bindState"
                :cancel="item.link"
                :ignoreException="item.ignoreException"
                :boxCode="item.boxCode"
                :productName="item.productName"
                @goDetail="goDetail(item)"
                @unlock="handleUnlock(item)"
                @check="handlePan(item)"
                @cancel="handleCancel(item)"
              >
              </MouthCard>
            </el-col>
            <!-- 尾行占位 -->
            <el-col
              :span="8"
              style="margin-bottom: 16px"
              v-for="item in 3"
              :key="item * 9"
            >
            </el-col>
          </el-row>
        </div>
      </template>
    </componentsLayout>
    <JyElMessageBox
      v-model="state.JyElMessageBox.show"
      :show="state.JyElMessageBox.show"
      :defaultAttribute="{}"
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
  import { reactive, onBeforeMount, onMounted, ref } from 'vue'
  import componentsTable from '../../../components/table'
  import componentsSearchForm from '../../../components/searchForm'
  import componentsTree from '../../../components/tree'
  import componentsBreadcrumb from '../../../components/breadcrumb'
  import componentsPagination from '../../../components/pagination.vue'
  import componentsTabs from '../../../components/tabs.vue'
  import componentsLayout from '../../../components/Layout.vue'
  import KDialog from '@/views/components/modules/KDialog.vue'
  import FormJson from '@/views/addDynamicFormJson/IntelligentSealBoxManagement.json'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import componentsDocumentsDetails from '../../../components/documentsDetails.vue'
  import MouthStatus from '@/views/frontDesk/PrintControlManagement/Grid-management/components/MouthStatus'
  import MouthCard from '@/views/frontDesk/PrintControlManagement/Grid-management/components/mouthCard'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const state = reactive({
    lastCheckTime: '2022-12-26 12:00:00',
    terminalGrid: '243印章盒001',
    termialOptions: [
      {
        id: 1,
        name: '243印章盒001',
        label: 1
      },
      {
        id: 2,
        name: '243印章盒002',
        label: 2
      },
      {
        id: 3,
        name: '243印章盒003',
        label: 3
      }
    ],
    mouthLists: [
      {
        state: 0,
        inBoxState: 1,
        bindState: 1,
        link: '',
        ignoreException: false,
        boxCode: 'A-1-1',
        productName: '243测试章'
      },
      {
        state: -1,
        inBoxState: 1,
        bindState: 1,
        link: '',
        ignoreException: false,
        boxCode: 'A-1-2',
        productName: '243测试章'
      },
      {
        state: -2,
        inBoxState: 1,
        bindState: 1,
        link: '',
        ignoreException: false,
        boxCode: 'A-1-3',
        productName: '243测试章'
      },
      {
        state: 0,
        inBoxState: 0,
        bindState: 0,
        link: '',
        ignoreException: false,
        boxCode: 'A-1-4',
        productName: '243测试章'
      },
      {
        state: 0,
        inBoxState: 0,
        bindState: 1,
        link: '',
        ignoreException: false,
        boxCode: 'A-1-5',
        productName: '243测试章'
      },
      {
        state: -2,
        inBoxState: 0,
        bindState: 1,
        link: '',
        ignoreException: true,
        boxCode: 'A-1-6',
        productName: '243测试章'
      },
      {
        state: 1,
        inBoxState: 1,
        bindState: 1,
        link: false,
        ignoreException: false,
        boxCode: 'A-1-7',
        productName: '243测试章'
      },
      {
        state: 1,
        inBoxState: 1,
        bindState: 1,
        link: '',
        ignoreException: false,
        boxCode: 'A-1-8',
        productName: '243测试章'
      },
      {
        state: 1,
        inBoxState: 1,
        bindState: 1,
        link: '',
        ignoreException: false,
        boxCode: 'A-1-9',
        productName: '243测试章'
      }
    ],
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
  const formJson = reactive(FormJson)
  const formData = reactive({})
  const optionData = reactive({})
  const dialogVisible = ref(false)
  const vFormRef = ref(null)
  const submitForm = type => {
    if (!type) {
      vFormRef.value.resetForm()
      return
    }
    vFormRef.value
      .getFormData()
      .then(formData => {
        // Form Validation OK
        alert(JSON.stringify(formData))
        showFormDialog.value = false
      })
      .catch(error => {
        // Form Validation failed

        ElMessage.error(error)
      })
  }

  const emit = defineEmits([])

  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    console.log(row, column, cell, event)
    if (column.property == '3') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    console.log(cell.name)
    if (cell.name === '修改') {
      showFormDialog.value = true
    }
    if (cell.name == '删除') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '您确定要删除该记录吗？'
      state.JyElMessageBox.show = true
    }
  }
  function goDetail(item) {
    router.push({
      path: '/frontDesk/printControlManage/equipmentManage/intelligentSealBoxManagement/sealBoxGridInfo'
    })
  }
  function lastTimeCheck() {
    router.push({
      // path: "/frontDesk/PrintControlManagement/Grid-management/ViewCheckInfo"
      name: 'ViewCheckInfo'
    })
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .PrintControlManagement-IntelligentSealBoxManagement {
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

  .container-mouth {
    min-width: 1100px;
  }

  .box-card {
    .header-title {
      position: relative;
      line-height: 25px;
      font-size: 16px;
      font-weight: 500;

      &::before {
        content: '';
        height: 26px;
        width: 4px;
        background: #e2b062;
        position: absolute;
        top: 0px;
        left: -15px;
      }
    }

    .emtype-list {
      display: flex;
      height: 500px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 24px;
      color: #666666;
      text-align: center;

      img {
        width: 540px;
        height: 234px;
      }
    }

    .status {
      display: flex;

      .columns-check {
        display: flex;
        margin: 15px 0;

        .check-button {
          width: 118px;
          height: 36px;
          color: #ffffff;
          background: #d0963e;
          border-radius: 4px;
          text-align: center;
          line-height: 36px;
          cursor: pointer;
          font-size: 14px;
        }

        .check-flex {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: #3e78d0;
          margin-right: 12px;
        }

        .check-last {
          font-weight: 400;
          font-size: 12px;
          color: #3e78d0;
          text-align: center;
          cursor: pointer;

          > span {
            margin-left: 10px;
          }
        }
      }

      .columns-status {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
      }
    }
  }

  .search {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-label {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      margin-right: 16px;
    }
  }

  .el-row-wrap {
    padding-right: 16px;
    box-sizing: border-box;
  }

  :deep(.el-input__inner) {
    height: 32px;
  }

  :deep.el-card .el-card__header {
    padding: 14px 15px 7px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }

  .clearfix:after {
    clear: both;
  }
</style>

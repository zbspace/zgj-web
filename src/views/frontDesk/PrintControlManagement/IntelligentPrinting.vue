<!-- 智能用印 -->
<template>
  <div class="PrintControlManagement-recordWithSeal">
    <JyTable
      :url="`/sealApply/intellect/${currentActiveName}`"
      ref="jyTable"
      hasTabs
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      tableClick="useSealFileName"
      @cellClick="cellClick"
    >
      <template #title>
        <div class="title">
          <div>用印记录</div>
          <div class="title-more">
            <div class="title-more-add"> </div>
          </div>
        </div>
      </template>
      <template #tabs>
        <div>
          <componentsTabs
            :activeName="currentActiveName"
            :data="state.componentsTabs.data"
            @tab-change="tabChange"
          >
          </componentsTabs>
        </div>
      </template>
      <template #custom_caozuo="scope">
        <div class="rankDisplayData">
          <template v-if="currentActiveName === 'pageNoUse'">
            <el-button
              type="info"
              plain
              @click="customClick(scope, '申请转办')"
              link
              text
            >
              申请转办
            </el-button>
            <el-button
              type="info"
              plain
              @click="customClick(scope, '申请重置')"
              link
              text
            >
              申请重置
            </el-button>
          </template>
          <template v-if="currentActiveName === 'pageUsing'">
            <el-button
              type="info"
              plain
              @click="customClick(scope, '结束用印')"
              link
              text
            >
              结束用印
            </el-button>
            <el-button
              type="info"
              plain
              @click="customClick(scope, '申请重置')"
              link
              text
            >
              申请重置
            </el-button>
          </template>
          <template v-if="currentActiveName === 'pageUseDone'">
            <el-button
              type="info"
              plain
              @click="customClick(scope, '申请重置')"
              link
              text
            >
              申请重置
            </el-button>
          </template>
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
  import { ref, reactive, onBeforeMount, onMounted, nextTick } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import componentsTabs from '@/views/components/JyTabs.vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import { useRouter } from 'vue-router'
  import sealApplyIntellect from '@/api/frontDesk/printControl/sealApplyIntellect'
  import intelligentPrintingJson from '@/views/frontDesk/PrintControlManagement/intelligentPrinting/searchFormJson/intelligentPrintingJson.js'

  import intelligentPrinting from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/intelligentPrinting/intelligentPrinting.json'

  const router = useRouter()

  const currentActiveName = ref('pageNoUse')
  const jyTable = ref(null)

  const state = reactive({
    componentsTabs: {
      data: [
        {
          label: '待智能用印',
          name: 'pageNoUse'
        },
        {
          label: '智能用印中',
          name: 'pageUsing'
        },
        {
          label: '已完成用印',
          name: 'pageUseDone'
        }
      ]
    },
    componentsSearchForm: {
      data: intelligentPrintingJson,
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
      header: intelligentPrinting
    },
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '用印详情',
          name: 'Details-of-Printing'
        },
        {
          label: '审批流程',
          name: 'approval-process'
        },
        {
          label: '领用记录',
          name: 'Record-of-requisition'
        },
        {
          label: '操作记录',
          name: 'operating-record'
        }
      ]
    },
    JyElMessageBox: {
      type: '',
      column: {},
      flag: '',
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
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    if (column.property === 'useSealFileName') {
      state.componentsDocumentsDetails.show = true
      sealApplyIntellect
        .sealBaseInfo({
          useSealApplyId: row.useSealApplyId
        })
        .then(res => {
          const data = res.data
          const detail = [
            {
              label: '文件名称',
              value: data.useSealFileName
            },
            {
              label: '单据编码',
              value: data.useSealApplyNo
            },
            {
              label: '文件类型',
              value: data.fileTypeName
            },
            {
              label: '文件份数',
              value: (data.useSealFileNum || 0) + '份'
            },
            {
              label: '金额',
              value: data.totalMoney || '-'
            },
            {
              label: '申请事由',
              value: data.useSealInfo
            },
            {
              label: '盖章码',
              value: data.sealCode || '-'
            },
            {
              label: '申请人员',
              value: data.applyUserName
            },
            {
              label: '申请时间',
              value: data.applyDatetime
            },
            {
              label: '所属部门',
              value: data.applyOrganName
            },
            {
              label: '单据状态',
              value: data.useSealStateName,
              iconPath: 'yuanLv',
              iconStyle: {},
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            }
          ]
          if (data.listSeal.length) {
            if (data.listSeal.length === 1) {
              detail.splice(
                detail.length - 5,
                0,
                {
                  label: '印章名称',
                  value: data.listSeal[0].useSealApplySealInfoDto.sealName
                },
                {
                  label: '常规盖章',
                  value:
                    data.listSeal[0].useSealApplySealNumDto.applySealNum + '次'
                }
              )
            } else {
              data.listSeal.forEach((item, index) => {
                detail.splice(
                  detail.length - 5,
                  0,
                  {
                    label: `印章${index + 1}名称`,
                    value: item.useSealApplySealInfoDto.sealName
                  },
                  {
                    label: '常规盖章',
                    value: item.useSealApplySealNumDto.applySealNum + '次'
                  }
                )
              })
            }
          }
          state.componentsDocumentsDetails.visible[0].basicInformation = {
            show: true,
            data: detail
          }
        })
      sealApplyIntellect
        .intellect({
          useSealApplyId: row.useSealApplyId
          // useSealApplyId: '1641248927057453058'
        })
        .then(res => {
          console.log(res.data)
          if (res.data?.length) {
            state.componentsDocumentsDetails.visible[0].IntelligentPrinting = {
              show: true,
              data: res.data
            }
          } else {
            state.componentsDocumentsDetails.visible[0].IntelligentPrinting = {
              show: false,
              data: []
            }
          }
        })
      sealApplyIntellect
        .attachment({
          useSealApplyId: row.useSealApplyId
          // useSealApplyId: '222'
        })
        .then(res => {
          console.log(res.data)
          if (res.data.fileInfos?.length || res.data.fileInfoAdds?.length) {
            state.componentsDocumentsDetails.visible[0].accessory = {
              show: true,
              printedData: res.data.fileInfos,
              additionalData: res.data.fileInfoAdds
            }
          } else {
            state.componentsDocumentsDetails.visible[0].accessory = {
              show: false,
              printedData: [],
              additionalData: []
            }
          }
        })
    }
  }
  // 点击表格按钮
  function customClick(column, type) {
    console.log(column)
    if (type === '申请转办') {
      // goInnerPage('/frontDesk/transferApplication', 'transfer')
      goInnerPage(
        '/frontDesk/printControlManage/useSealManage/intelligentPrinting/transferApplication',
        'transfer'
      )
    }
    if (type === '申请重置') {
      // goInnerPage('/frontDesk/transferApplication')
      goInnerPage(
        '/frontDesk/printControlManage/useSealManage/intelligentPrinting/transferApplication',
        'transfer'
      )
    }
    if (type === '撤销转办') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '请问确定要撤销转办申请吗？'
      state.JyElMessageBox.show = true
    }
    if (type === '撤销重置') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '请问确定要撤销重置用印申请吗？'
      state.JyElMessageBox.show = true
      // console.log('--->', state.JyElMessageBox)
    }
    if (type === '结束用印') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '请问确定要结束用印吗？'
      state.JyElMessageBox.show = true
    }
    if (type === '查看历史记录') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '请问确定要催办吗？'
      state.JyElMessageBox.show = true
    }
  }

  const goInnerPage = (path, params) => {
    const routeObj = { path }
    if (params) {
      routeObj.query = { transfer: params }
    }
    router.push(routeObj)
  }

  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }

  // 切换tab
  function tabChange(activeName) {
    currentActiveName.value = activeName
    nextTick(() => {
      jyTable.value.reloadData()
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
  .PrintControlManagement-recordWithSeal {
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
  }
</style>

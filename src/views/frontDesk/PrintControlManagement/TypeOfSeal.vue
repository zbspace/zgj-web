<!-- 印章类型 -->
<template>
  <div class="PrintControlManagement-TypeOfSeal">
    <JyTable
      url="/sealType/page"
      ref="jyTable"
      :hasTree="false"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      tableClick="organName"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
    >
      <template #title>
        <div class="title">
          <div>印章类型</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="clickEditor('新增')"
                >+ 增加</el-button
              >
            </div>
            <div class="title-more-down"> </div>
          </div>
        </div>
      </template>
    </JyTable>
    <!-- 动态表单 - 印章类型新增/修改 -->
    <JyDialog
      @update:show="showDialog = $event"
      :show="showDialog"
      :title="fromStateTitle"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="800"
      :height="600"
      @confirm="submitLibraryForm"
      :key="fromStateTitle"
    >
      <el-form
        :model="formData"
        :rules="formRules"
        ref="vFormLibraryRef"
        label-width="120px"
      >
        <el-form-item label="印章类型编码" prop="sealTypeNo">
          <el-input v-model="formData.sealTypeNo" disabled />
        </el-form-item>
        <el-form-item label="印章类型名称" prop="sealTypeName">
          <el-input v-model="formData.sealTypeName" />
        </el-form-item>
        <el-form-item label="描述" prop="readme">
          <el-input v-model="formData.readme" type="textarea" />
        </el-form-item>
      </el-form>
    </JyDialog>
    <JyElMessageBox
      v-model="state.JyElMessageBox.show"
      :show="state.JyElMessageBox.show"
      :defaultAttribute="{}"
      @confirmClick="confirmClick"
    >
      <template #header>
        {{ state.JyElMessageBox.header.data }}
      </template>
      <template #content>
        {{ state.JyElMessageBox.content.data }}
      </template>
    </JyElMessageBox>
    <!-- 批量操作弹框提示 -->
    <JyElMessageBox
      v-model="state.showToastDialog.show"
      :show="state.showToastDialog.show"
      :defaultAttribute="{}"
      @confirmClick="confirmClick"
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
            >{{ item.sealTypeName }}</p
          >
        </el-scrollbar>
      </template>
    </JyElMessageBox>
  </div>
</template>
<script setup>
  import { ref, reactive, nextTick } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import JyDialog from '@/views/components/modules/JyDialog'
  import apis from '@/api/frontDesk/sealManage/typeOfSeal'
  import dayjs from 'dayjs'
  import tableHeader from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/typeOfSeal.json'
  // const props = defineProps({
  //   // 处理类型
  //   type: {
  //     type: String,
  //     default: '0'
  //   }
  // })

  // 印章类型 新增弹框
  const formData = ref({
    sealTypeNo: '',
    sealTypeName: '',
    readme: ''
  })
  const formRules = ref({
    sealTypeName: [
      {
        required: true,
        message: '请输入印章类型名称',
        trigger: 'change'
      }
    ]
  })
  const fromStateTitle = ref('新增')
  const showDialog = ref(false)
  const vFormLibraryRef = ref(null)
  const sealTypeId = ref(null)
  const jyTable = ref(null)

  // const emit = defineEmits([])
  const state = reactive({
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
      data: [
        {
          id: 'searchKey',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请输入印章类型名称或编码'
          }
        },
        {
          id: 'createDate',
          label: '创建时间',
          type: 'picker',
          pickerType: 'date',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
            'value-format': 'YYYY-MM-DD',
            'disabled-date': disabledDate,
            'default-value': [
              new Date(new Date().setMonth(new Date().getMonth() - 1)),
              new Date()
            ]
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
      header: tableHeader,
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        }
      }
    },

    componentsBatch: {
      selectionData: [],
      data: [
        {
          id: 'deleteMore',
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
  function clickEditor(title, column) {
    fromStateTitle.value = title
    showDialog.value = true
    nextTick(() => {
      vFormLibraryRef.value.resetFields()
    })
    if (title === '新增') {
      sealTypeId.value = null
      formData.value.sealTypeNo =
        dayjs().format('YYYYMMDD') + Math.random().toString().slice(2, 11)
    } else {
      if (column) {
        const columns = JSON.parse(JSON.stringify(column))
        formData.value = {
          sealTypeNo: columns.sealTypeNo,
          sealTypeName: columns.sealTypeName,
          readme: columns.readme
        }
      }
    }
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    if (cell.name === '修改') {
      sealTypeId.value = column.sealTypeId
      clickEditor(cell.name, column)
    }
    if (cell.name === '删除') {
      sealTypeId.value = column.sealTypeId
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '请问确定要删除吗？'
      state.JyElMessageBox.show = true
    }
  }

  function disabledDate(time) {
    return time.getTime() > Date.now() // 如果没有后面的-8.64e7就是不可以选择今天的
  }

  const confirmClick = () => {
    apis
      .delete({
        ids:
          sealTypeId.value ||
          state.componentsBatch.selectionData.map(i => i.sealTypeId).join(',')
      })
      .then(res => {
        state.JyElMessageBox.show = false
        state.showToastDialog.show = false
        reloadData()
      })
      .catch(() => {
        sealTypeId.value = null
        state.showToastDialog.show = false
        state.JyElMessageBox.show = false
      })
  }

  function clickBatchButton(item, list) {
    state.componentsBatch.selectionData = list
    if (item.id === 'deleteMore') {
      state.showToastDialog.header.data = '批量删除？'
      state.showToastDialog.content.data =
        '已选中以下表单，请问确定要批量删除吗？'
      state.showToastDialog.show = true
    }
  }

  const submitLibraryForm = () => {
    vFormLibraryRef.value.validate(valid => {
      if (valid) {
        if (sealTypeId.value) {
          apis
            .edit({
              ...{
                sealTypeId: sealTypeId.value
              },
              ...formData.value
            })
            .then(() => {
              sealTypeId.value = null
              showDialog.value = false
              reloadData()
            })
        } else {
          apis.add(formData.value).then(res => {
            sealTypeId.value = null
            showDialog.value = false
            reloadData()
          })
        }
      }
    })
  }

  const reloadData = () => {
    jyTable.value.reloadData()
  }
</script>
<style lang="scss" scoped>
  .PrintControlManagement-TypeOfSeal {
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

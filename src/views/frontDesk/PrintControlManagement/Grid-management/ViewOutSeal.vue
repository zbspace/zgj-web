<!-- 用印申请 选中表单 -->
<template>
  <div class="Seal-application-fill-form">
    <componentsLayout Layout="breadcrumb,title,custom">
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>格口管理 </el-breadcrumb-item>
            <el-breadcrumb-item>盘点汇总详情</el-breadcrumb-item>
            <el-breadcrumb-item>实被取出印章列表</el-breadcrumb-item>
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
            实被取出印章列表
          </div>
        </div>
      </template>
      <template #custom>
        <div class="custom">
          <componentsTable
            :defaultAttribute="state.outSealList.defaultAttribute"
            :data="state.outSealList.data"
            :header="state.outSealList.header"
            @cellClick="cellClick"
            @custom-click="customClick"
            @selection-change="selectionChange"
          >
          </componentsTable>
        </div>
      </template>
    </componentsLayout>
  </div>
</template>
<script setup>
  import {
    reactive,
    defineProps,
    defineEmits,
    onBeforeMount,
    onMounted,
    inject,
    ref
  } from 'vue'
  import { useRouter } from 'vue-router'
  import componentsLayout from '../../../components/Layout.vue'
  import componentsTable from '../../../components/table'

  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const router = useRouter()
  const commonFun = inject('commonFun')
  const emit = defineEmits([])
  const state = reactive({
    outSealList: {
      header: [
        {
          width: 50
          // type: "selection"
        },
        {
          prop: '0',
          label: '序号',
          width: 100
        },
        {
          prop: '1',
          label: '印章名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '印章类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '绑定标签',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '状态',
          sortable: true,
          'min-width': 150
        }
      ],
      data: [
        {
          0: 1,
          1: '243测试章',
          2: '智能印章',
          3: 'EAC0D12789A2',
          4: '异常放入'
        },
        {
          0: 2,
          1: '243测试章',
          2: '智能印章',
          3: 'EAC0D12789A2',
          4: '异常放入'
        },
        {
          0: 3,
          1: '243测试章',
          2: '智能印章',
          3: 'EAC0D12789A2',
          4: '异常放入'
        },
        {
          0: 4,
          1: '243测试章',
          2: '智能印章',
          3: 'EAC0D12789A2',
          4: '异常放入'
        },
        {
          0: 5,
          1: '243测试章',
          2: '智能印章',
          3: 'EAC0D12789A2',
          4: '异常放入'
        },
        {
          0: 6,
          1: '243测试章',
          2: '智能印章',
          3: 'EAC0D12789A2',
          4: '异常放入'
        },
        {
          0: 7,
          1: '243测试章',
          2: '智能印章',
          3: 'EAC0D12789A2',
          4: '异常放入'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          // console.log({ row, column, rowIndex, columnIndex });
          // if (column.property == "2") {
          //     return {
          //         "color": "var(--jy-Info-6)",
          //         "cursor": "pointer",
          //     }
          // }
        }
      }
    }
  })
  const refFillFormInformation = ref(null)

  // 点击返回上一页
  function clickBackPage() {
    commonFun.routerPage(router, -1)
  }

  function tabChange(activeName) {
    state.componentsDetails.activeName = activeName
    if (activeName == 1) {
    } else if (activeName == 2) {
    }
  }

  function selectSealBox(index) {
    state.sealBoxIndex = index
  }
  function viewOutSeal() {
    router.push({
      // path: "/frontDesk/PrintControlManagement/Grid-management/ViewCheckInfo"
      name: 'ViewCheckInfo'
    })
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // vFormLibraryRef.value.resetForm()
    // vFormLibraryRef.value.getFormData().then()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .Seal-application-fill-form {
    margin: 0%;
    position: relative;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-desc {
        display: flex;
        align-items: center;

        .title-desc-img {
          margin-right: 0.5rem;
          cursor: pointer;
        }
      }
    }

    .custom {
      // padding-right: 1.25rem;
      box-sizing: border-box;
      text-align: center;
      padding-bottom: 4rem;
    }
  }
</style>

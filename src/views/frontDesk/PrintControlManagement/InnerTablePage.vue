<template>
  <div class="inner-page-content">
    <!-- 面包屑 -->
    <div class="inner-crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>一级页面</el-breadcrumb-item>
        <el-breadcrumb-item>二级表格页面</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- title -->
    <div class="inner-page-title">
      <div class="inner-title" @click="router.go(-1)">
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.313093 8.72017C-0.104364 8.32243 -0.104364 7.67757 0.313093 7.27983L7.11595 0.798304C7.5334 0.400565 8.21024 0.400565 8.62769 0.798304C9.04515 1.19604 9.04515 1.8409 8.62769 2.23864L3.64968 6.98153H18V9.01847H3.64968L8.62769 13.7614C9.04515 14.1591 9.04515 14.804 8.62769 15.2017C8.21024 15.5994 7.5334 15.5994 7.11595 15.2017L0.313093 8.72017Z"
            fill="black"
            fill-opacity="0.85"
          />
        </svg>
        <div style="margin-left: 6px">二级页面</div>
      </div>
      <div class="confirm btn">提交</div>
    </div>

    <!-- content -->
    <div class="inner-page-content">
      <div class="l-title">字段标题：名称字段</div>

      <componentsTable
        :defaultAttribute="state.componentsTable.defaultAttribute"
        :data="state.componentsTable.data"
        :header="state.componentsTable.header"
        :isSelection="true"
      >
      </componentsTable>
    </div>
  </div>
</template>

<script setup>
  import componentsTable from '@/views/components/table'
  import componentsPagination from '@/views/components/pagination.vue'
  import { useRouter } from 'vue-router'
  import { reactive } from 'vue'

  const router = useRouter()
  const state = reactive({
    componentsTable: {
      header: [
        {
          prop: '0',
          label: '序号',
          width: 100
        },
        {
          prop: '1',
          label: '风险分类',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '风险项',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '风险项描述',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '开启状态',
          customDisplayType: 'switch'
        },
        {
          prop: '5',
          label: '提醒时间',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '提醒人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          rankDisplayData: [
            {
              name: '设置提醒人'
            }
          ]
        }
      ],
      data: [
        {
          1: '文件防篡改',
          2: '盖前文件OCR核验异常',
          3: '',
          4: '',
          5: '即时提醒',
          6: ''
        },
        {
          1: '文件防篡改',
          2: '盖前文件OCR核验异常',
          3: '',
          4: '',
          5: '即时提醒',
          6: ''
        },
        {
          1: '文件防篡改',
          2: '盖前文件OCR核验异常',
          3: '',
          4: '',
          5: '即时提醒',
          6: ''
        },
        {
          1: '文件防篡改',
          2: '盖前文件OCR核验异常',
          3: '',
          4: '',
          5: '即时提醒',
          6: ''
        },
        {
          1: '文件防篡改',
          2: '盖前文件OCR核验异常',
          3: '',
          4: '',
          5: '即时提醒',
          6: ''
        },
        {
          1: '文件防篡改',
          2: '盖前文件OCR核验异常',
          3: '',
          4: '',
          5: '即时提醒',
          6: ''
        },
        {
          1: '文件防篡改',
          2: '盖前文件OCR核验异常',
          3: '',
          4: '',
          5: '即时提醒',
          6: ''
        },
        {
          1: '文件防篡改',
          2: '盖前文件OCR核验异常',
          3: '',
          4: '',
          5: '即时提醒',
          6: ''
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--color-fill--1)'
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
    }
  })
</script>
<script>
  export default {
    name: 'InnerTablePage'
  }
</script>
<style lang="scss" scoped>
  .inner-page-content {
    margin: 0%;
    width: 100%;
    height: calc(100vh - 100px);

    display: flex;
    // flex-flow: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    @include mixin-padding-top(10);
    @include mixin-padding-bottom(10);
    @include mixin-padding-left(20);
    @include mixin-padding-right(0);
    box-sizing: border-box;
    border-radius: var(--border-radius-4);
    background-color: var(--in-common-use-1);
    margin-top: 20px;
    padding: 16px 20px;

    .inner-page-title {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      cursor: pointer;

      .inner-title {
        display: flex;
        align-items: center;
        font-size: 22px;
        height: 60px;
        color: rgba(0, 0, 0, 0.85);
      }
    }

    .inner-page-content {
      .l-title {
        position: relative;
        // height: 24px;
        width: 100%;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        padding-bottom: 6px;
        margin-bottom: 20px;
      }
    }

    .btn {
      min-width: 60px;
      height: 32px;
      margin: 0 8px;
      text-align: center;
      line-height: 16px;
      font-size: 14px;
      border-radius: 4px;
    }

    .confirm {
      color: #ffffff;
      background: #d0963e;
    }

    .confirm:hover {
      background: #d9ab5b;
    }

    .confirm:active {
      background: #af7427;
    }
  }
</style>

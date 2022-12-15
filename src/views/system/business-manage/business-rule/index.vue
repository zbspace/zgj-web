<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">
          <div>业务规则管理</div>
          <div>
            <el-button>
              <img class="button-icon" src="@/assets/svg/gengduo-caozuo.svg" alt="" srcset="">
              <span>更多操作</span>
            </el-button>
          </div>
        </div>
      </template>

      <template #searchForm>
        <div>
          <componentsSearchForm :data="state.componentsSearchForm.data" :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style">
          </componentsSearchForm>
        </div>
      </template>


      <template #batch>
        <div class="batch">
          <el-button type="primary">+ 新建</el-button>
          <el-button>批量操作</el-button>
        </div>
      </template>

      <template #table>
        <div>
          <componentsTable :defaultAttribute="state.componentsTable.defaultAttribute" :data="state.componentsTable.data"
            :header="state.componentsTable.header" :isSelection="true" @cellClick="cellClick">
          </componentsTable>
        </div>
      </template>

      <template #pagination>
        <componentsPagination :data="state.componentsPagination.data"
          :defaultAttribute="state.componentsPagination.defaultAttribute">
        </componentsPagination>
      </template>
    </componentsLayout>
    <!-- 业务规则详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible" @clickClose="clickClose">
      </componentsDocumentsDetails>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import componentsTable from "@/views/components/table";
import componentsSearchForm from "@/views/components/searchForm";
import componentsPagination from "@/views/components/pagination.vue";
import componentsLayout from "@/views/components/Layout.vue";
import componentsDocumentsDetails from "@/views/components/documentsDetails.vue"
const state = reactive({
  componentsSearchForm: {
    style: {
      lineStyle: {
        width: "30%",
      },
      labelStyle: {
        width: "100px",
      },
    },

    data: [
      {
        id: "name",
        label: "关键词",
        type: "input",
        inCommonUse: true,
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          placeholder: "请输入",
        },
      },
      {
        id: 'picker',
        label: "选择时间",
        type: "picker",
        inCommonUse: true,
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          type: "daterange",
          "start-placeholder": "Start date",
          "end-placeholder": "End date"
        },
        style: {

        }
      },
      {
        id: "name",
        label: "xx",
        type: "select",
        inCommonUse: true,
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          placeholder: "请选择",
        },
        options: [
          {
            value: "Option1",
            label: "Option1",
          },
          {
            value: "Option2",
            label: "Option2",
          },
        ],
      },
    ],
    butData: [
      {
        id: "more",
        name: "展开",
        type: "unfold",
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          type: "primary",
        },
        style: {},
      },
      {
        id: "inquire",
        name: "查询",
        type: "click",
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          type: "primary",
        },
        style: {},
      },
      {
        id: "reset",
        name: "重置",
        type: "click",
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {},
        style: {},
      },
    ],
  },

  componentsTable: {
    header: [
      {
        width: 50,
        type: "selection",
      },
      {
        prop: "0",
        label: "序号",
        sortable: true,
      },
      {
        prop: "1",
        width: 200,
        label: "名称",
      },
      {
        prop: "2",
        width: 200,
        label: "创建时间",
      },
      {
        prop: "7",
        label: "操作",
        rankDisplayData: [
          {
            name: "修改"
          },
          {
            name: "删除"
          },
          {
            name: "启用"
          },
          {
            name: "复制"
          },
        ],
      },
    ],
    data: [
      {
        1: "名称",
        2: "2022/10/30  15:00:00",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "名称",
        2: "2022/10/30  15:00:00",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "名称",
        2: "2022/10/30  15:00:00",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "名称",
        2: "2022/10/30  15:00:00",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },

    ],
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      stripe: true,
      "header-cell-style": {
        background: "var(--color-fill--1)",
      },
      "cell-style": ({ row, column, rowIndex, columnIndex }) => {
        // console.log({ row, column, rowIndex, columnIndex });
        if (column.property == "1") {
          return {
            "color": "var(--Info-6)",
            "cursor": "pointer",
          }
        }
      }
    },
  },

  componentsPagination: {
    data: {
      amount: 400,
      index: 1,
      pageNumber: 80,
    },
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      layout: "sizes, prev, pager, next, jumper",
      total: 500,
      "page-sizes": [10, 100, 200, 300, 400],
      background: true,
    },
  },
  componentsDocumentsDetails: {
    show: false,
    visible: [
      {
        label: '业务规则详情',
        name: "Business-Rule-Details",
      },
      {
        label: '流程记录',
        name: "operating-record",
      },
    ],
  }

});
// 点击表格单元格
function cellClick(row, column, cell, event) {
  console.log(row, column, cell, event);
  if (column.property == "1") {
    state.componentsDocumentsDetails.show = true;
  }
}
//点击关闭
function clickClose() {
  state.componentsDocumentsDetails.show = false;
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,tabs,tree">
      <template #title>
        <div class="title">消息事件</div>
      </template>

      <template #tabs>
        <div>
          <componentsTabs activeName="1" :data="state.componentsTabs.data">
          </componentsTabs>
        </div>
      </template>

      <template #searchForm>
        <div>
          <componentsSearchForm :data="state.componentsSearchForm.data" :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style">
          </componentsSearchForm>
        </div>
      </template>

      <template #tree>
        <div>
          <componentsTree :data="state.componentsTree.data" :defaultAttribute="state.componentsTree.defaultAttribute">
          </componentsTree>
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
    <!-- 消息时间详情 -->
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
import componentsTabs from "@/views/components/tabs.vue"
import componentsTree from "@/views/components/tree"
import componentsDocumentsDetails from "@/views/components/documentsDetails.vue"
const state = reactive({

  componentsTabs: {
    data: [
      {
        label: '正常登录日志',
        name: "1",
      }, {
        label: '异常登录日志',
        name: "2",
      }
    ]
  },

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
          "start-placeholder": "开始时间",
          "end-placeholder": "结束时间"
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
        width: 100,
      },
      {
        prop: "1",
        label: "xxx",
        sortable: true,
        "min-width": 150,
      },
    ],
    data: [
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
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

  componentsTree: {
    data: [
      {
        label: '用印申请',
        children: [
          {
            label: '用印申请',
          },
          {
            label: '转办申请',
          },
          {
            label: '重置用印申请',
          },
        ],
      },
      {
        label: '印章申请',
        children: [
          {
            label: '刻章申请',
          },
          {
            label: '停用申请',
          },
          {
            label: '启用申请',
          },
          {
            label: '销毁申请',
          },
          {
            label: '变更申请',
          },
          {
            label: '换章申请',
          },
        ],
      },
      {
        label: '文件申请',
        children: [
          {
            label: '借阅申请',
          },
        ],
      },
    ],
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      "check-on-click-node": true,
      "show-checkbox": false,
      "default-expand-all": true,
      "expand-on-click-node": false,
      "check-strictly": true,
    }
  },
  componentsDocumentsDetails: {
    show: false,
    visible: [
      {
        label: '通知事件详情',
        name: "Notification-Event-Details",
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

</style>

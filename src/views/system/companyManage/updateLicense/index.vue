<template>
  <div class="update-license">
    <componentsLayout Layout="title,custom">
      <template #title>
        <div class="title">
          <div>更新license</div>
          <div class="title-more"> </div>
        </div>
      </template>
      <template #custom>
        <div class="custom">
          <div class="custom-input">
            <div class="custom-input-val">
              <div class="custom-input-val-input">
                <el-input
                  v-model="state.cache.setLicense"
                  placeholder="输入license"
                />
              </div>
              <el-button
                class="custom-input-val-button"
                type="primary"
                @click="clickGain"
              >
                获取
              </el-button>
            </div>
            <div class="custom-input-desc"
              >说明：请输入新的许可证密钥（license）来获取系统使用权限
            </div>
          </div>
          <div class="custom-table">
            <componentsTable
              :defaultAttribute="state.componentsTable.defaultAttribute"
              :data="state.componentsTable.data"
              :header="state.componentsTable.header"
              :isSelection="true"
              @cellClick="cellClick"
              @custom-click="customClick"
            >
            </componentsTable>
          </div>
          <div class="custom-pagination">
            <componentsPagination
              :data="state.componentsPagination.data"
              :defaultAttribute="state.componentsPagination.defaultAttribute"
            >
            </componentsPagination>
          </div>
        </div>
      </template>
    </componentsLayout>
    <KDialog
      @update:show="showDialog = $event"
      :show="showDialog"
      title="license信息"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="1000"
      :height="700"
    >
      <div class="licenseInfo">
        <div class="licenseInfo-title">
          <div class="licenseInfo-title-cont">
            <div class="licenseInfo-title-cont-title">系统版本</div>
            <div class="licenseInfo-title-cont-v">V1.2.5</div>
            <div class="licenseInfo-title-cont-desc">
              产品识别码：254455FJFHS4585SKJAHDK444--4444555SJJXHHU887
            </div>
          </div>
        </div>
        <div class="licenseInfo-authorization">
          <div class="licenseInfo-authorization-title">授权信息</div>
          <div class="licenseInfo-authorization-cont">
            <div
              v-for="(item, index) in state.cache.authorizationMessage.list"
              :key="index"
              class="licenseInfo-authorization-cont-list"
            >
              <div class="licenseInfo-authorization-cont-list-label">
                {{ item.label }}：
              </div>
              <div class="licenseInfo-authorization-cont-list-value">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </KDialog>
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
  import { ref, reactive } from 'vue'
  import componentsTable from '@/views/components/table'
  // import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination'
  import componentsLayout from '@/views/components/Layout'
  // import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import { ElMessageBox } from 'element-plus'

  import KDialog from '@/views/components/modules/kdialog.vue'
  const state = reactive({
    cache: {
      setLicense: '',
      authorizationMessage: {
        list: [
          {
            label: 'license',
            value: '254455FJFHS4585SKJAHDK444--4444555SJJXHHU887'
          },
          {
            label: '授权用户',
            value: '章管家'
          },
          {
            label: 'license过期时间',
            value: '永不过期'
          },
          {
            label: '内部单位数',
            value: '不限'
          },
          {
            label: '外部单位数',
            value: '不限'
          },
          {
            label: '内部个人用户数',
            value: '不限'
          },
          {
            label: '外部个人用户数',
            value: '不限'
          },
          {
            label: '应用接入数',
            value: '不限'
          }
        ]
      }
    },
    componentsSearchForm: {
      style: {
        lineStyle: {
          width: '30%'
        },
        labelStyle: {
          width: '100px'
        }
      },

      data: [
        {
          id: 'name',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '企业名称/企业编码/联系人/联系方式'
          }
        },
        {
          id: 'name',
          label: '所属部门',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
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
      header: [
        {
          prop: '0',
          label: '序号',
          width: 60,
          align: 'center',
          fixed: true
        },
        {
          prop: '1',
          label: 'license密钥',
          sortable: true,
          'min-width': 150,
          fixed: true,
          'show-overflow-tooltip': true
        },
        {
          prop: '2',
          label: '更新人',
          sortable: true,
          'min-width': 150
        },

        {
          prop: '3',
          label: '更新时间',
          sortable: true,
          'min-width': 180
        }
      ],
      data: [
        {
          0: 1,
          1: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          2: '王往',
          3: '2022-12-26 18:00:00'
        },
        {
          0: 1,
          1: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          2: '里斯',
          3: '2022-12-26 18:00:00'
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
          if (column.property === '1') {
            return {
              color: 'var(--jy-Info-6)',
              cursor: 'pointer'
            }
          }
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
    },

    componentsTree: {
      data: [
        {
          label: 'A层级菜单1',
          children: [
            {
              label: 'B层级菜单1',
              children: [
                {
                  label: 'C层级菜单1'
                }
              ]
            }
          ]
        },
        {
          label: 'A层级菜单2',
          children: [
            {
              label: 'B层级菜单1',
              children: [
                {
                  label: 'C层级菜单1'
                }
              ]
            },
            {
              label: 'B层级菜单2',
              children: [
                {
                  label: 'C层级菜单1'
                }
              ]
            }
          ]
        },
        {
          label: 'A层级菜单3',
          children: [
            {
              label: 'B层级菜单1',
              children: [
                {
                  label: 'C层级菜单1'
                }
              ]
            },
            {
              label: 'B层级菜单2',
              children: [
                {
                  label: 'C层级菜单1'
                }
              ]
            }
          ]
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': false,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'check-strictly': true
      }
    },
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '往来企业详情',
          name: 'Current-Business-Details'
        },
        {
          label: '流程记录',
          name: 'operating-record'
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
    }
  })
  const showDialog = ref(false)
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event)
    if (column.property === '1') {
      // state.componentsDocumentsDetails.show = true
    }
  }
  // // 点击关闭
  // function clickClose() {
  //   state.componentsDocumentsDetails.show = false
  // }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    console.log(cell.name)
    if (cell.name === '修改') {
      // showFormDialog.value = true
    }
    if (cell.name === '删除') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '您确定要删除该记录吗？'
      state.JyElMessageBox.show = true
    }
  }

  // 点击获取
  function clickGain() {
    showDialog.value = true
  }
</script>

<style lang="scss" scoped>
  .update-license {
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
    .custom-input {
      margin: 0.5rem 0rem;
      display: flex;
      flex-flow: wrap;
      justify-content: center;
      align-content: flex-start;
      .custom-input-val {
        display: flex;
        align-items: center;
        width: 60%;
        .custom-input-val-input {
          width: calc(100% - 4rem);
          padding-right: 0.5rem;
          box-sizing: border-box;
        }
      }
      .custom-input-desc {
        display: flex;
        align-items: center;
        width: 60%;
        margin: 1rem 0;
        color: var(--jy-color-text-2);
      }
    }
    .custom-table {
      margin: 1rem 0 0.5rem 0;
    }
    .custom-pagination {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 1.5rem 0;
      box-sizing: border-box;
      padding-right: 0rem;
      box-sizing: border-box;
    }
    .licenseInfo {
      .licenseInfo-title {
        margin-bottom: 1rem;
        .licenseInfo-title-cont {
          padding: 1rem;
          box-sizing: border-box;
          background-color: var(--jy-color-fill--2);
          border-radius: var(--jy-border-radius-4);
          .licenseInfo-title-cont-title {
            font-size: var(--jy-font-size-body-2);
          }
          .licenseInfo-title-cont-v {
            padding: 0.5rem 0;
            box-sizing: border-box;
            font-size: var(--jy-font-size-title-3);
            font-weight: 500;
          }
          .licenseInfo-title-cont-desc {
            color: var(--jy-color-text-3);
          }
        }
      }
      .licenseInfo-authorization {
        .licenseInfo-authorization-title {
          color: var(--jy-color-text-1);
          margin-bottom: 0.5rem;
        }
        .licenseInfo-authorization-cont {
          padding: 1rem;
          box-sizing: border-box;
          border-radius: var(--jy-border-radius-4);
          border: 1px solid var(--jy-color-border-1);
          .licenseInfo-authorization-cont-list {
            display: flex;
            padding: 0.5rem 0rem;
            box-sizing: border-box;
            .licenseInfo-authorization-cont-list-label {
              width: 10rem;
              text-align: right;
              color: var(--jy-color-text-3);
            }
            .licenseInfo-authorization-cont-list-value {
              color: var(--jy-color-text-1);
            }
          }
        }
      }
    }
  }
</style>

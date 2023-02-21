<!-- 用印申请 选中表单 -->
<template>
  <div class="Seal-application-fill-form">
    <componentsLayout Layout="breadcrumb,title,custom">
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>水印验证 </el-breadcrumb-item>
            <el-breadcrumb-item>已验证</el-breadcrumb-item>
            <el-breadcrumb-item>查看验证记录</el-breadcrumb-item>
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
            查看验证记录
          </div>
        </div>
      </template>
      <template #custom>
        <div class="custom">
          <documentsDetailsPortion>
            <template #title>
              <div class="ap-cont-box-title-label">盖前水印验证</div>
            </template>
            <template #content>
              <div v-for="(item, index) in state.checkList.filesFront">
                <div class="files-name"
                  ><img src="../../../../assets/svg/file-icon.svg" />{{
                    item.fileName
                  }}</div
                >
                <componentsTable
                  :defaultAttribute="state.checkList.defaultAttribute"
                  :data="item.records"
                  :header="state.checkList.header"
                  @cellClick="cellClick"
                  @custom-click="customClick"
                  @selection-change="selectionChange"
                >
                </componentsTable>
              </div>
            </template>
          </documentsDetailsPortion>
          <documentsDetailsPortion>
            <template #title>
              <div class="ap-cont-box-title-label">盖中水印验证</div>
            </template>
            <template #content>
              <div v-for="(item, index) in state.checkList.filesMiddle">
                <div class="files-name"
                  ><img src="../../../../assets/svg/file-icon.svg" />{{
                    item.fileName
                  }}</div
                >
                <componentsTable
                  :defaultAttribute="state.checkList.defaultAttribute"
                  :data="item.records"
                  :header="state.checkList.header"
                  @cellClick="cellClick"
                  @custom-click="customClick"
                  @selection-change="selectionChange"
                >
                </componentsTable>
              </div>
            </template>
          </documentsDetailsPortion>
          <documentsDetailsPortion>
            <template #title>
              <div class="ap-cont-box-title-label">盖后水印验证</div>
            </template>
            <template #content>
              <div v-for="(item, index) in state.checkList.filesRear">
                <div class="files-name"
                  ><img src="../../../../assets/svg/file-icon.svg" />{{
                    item.fileName
                  }}</div
                >
                <componentsTable
                  :defaultAttribute="state.checkList.defaultAttribute"
                  :data="item.records"
                  :header="state.checkList.header"
                  @cellClick="cellClick"
                  @custom-click="customClick"
                  @selection-change="selectionChange"
                >
                </componentsTable>
              </div>
            </template>
          </documentsDetailsPortion>
          <documentsDetailsPortion>
            <template #title>
              <div class="ap-cont-box-title-label">归档水印验证</div>
            </template>
            <template #content>
              <div v-for="(item, index) in state.checkList.filesArchive">
                <div class="files-name"
                  ><img src="../../../../assets/svg/file-icon.svg" />{{
                    item.fileName
                  }}</div
                >
                <componentsTable
                  :defaultAttribute="state.checkList.defaultAttribute"
                  :data="item.records"
                  :header="state.checkList.header"
                  @cellClick="cellClick"
                  @custom-click="customClick"
                  @selection-change="selectionChange"
                >
                </componentsTable>
              </div>
            </template>
          </documentsDetailsPortion>
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
  import documentsDetailsPortion from '../../../components/documentsDetails/portion.vue'
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
    checkList: {
      header: [
        {
          width: 50
          // type: "selection"
        },
        {
          prop: '0',
          label: '文档页码'
          // width: 150,
        },
        {
          prop: '1',
          label: '核验次数',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '验证时间',
          sortable: true,
          'min-width': 150
        }
      ],
      filesFront: [
        {
          fileName: '附件名称附件名称附件名称附件名称1',
          records: [
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            },
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            }
          ]
        },
        {
          fileName: '附件名称附件名称附件名称附件名称2',
          records: [
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            },
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            }
          ]
        }
      ],
      filesMiddle: [
        {
          fileName: '附件名称附件名称附件名称附件名称1',
          records: [
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            },
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            }
          ]
        },
        {
          fileName: '附件名称附件名称附件名称附件名称2',
          records: [
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            },
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            }
          ]
        }
      ],
      filesRear: [
        {
          fileName: '附件名称附件名称附件名称附件名称1',
          records: [
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            },
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            }
          ]
        },
        {
          fileName: '附件名称附件名称附件名称附件名称2',
          records: [
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            },
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            }
          ]
        }
      ],
      filesArchive: [
        {
          fileName: '附件名称附件名称附件名称附件名称1',
          records: [
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            },
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            }
          ]
        },
        {
          fileName: '附件名称附件名称附件名称附件名称2',
          records: [
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            },
            {
              0: 1,
              1: '1',
              2: '2022-10-31 13:15:45'
            }
          ]
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
      .files-name {
        display: flex;
        align-items: center;
        margin: 12px 0;
        > img {
          margin-right: 14px;
        }
      }
    }
  }
</style>

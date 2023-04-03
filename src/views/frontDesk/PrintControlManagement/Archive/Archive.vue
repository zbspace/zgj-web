<!-- 文件归档 -->
<template>
  <div class="PrintControlManagement-Archive">
    <JyTable
      :url="`/archive/page/${currentActiveName}`"
      ref="jyTable"
      hasTabs
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      tableClick="useSealFileName"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
    >
      <template #title>
        <div class="title">
          <div>文件归档</div>
          <div class="title-more">
            <div class="title-more-add"> </div>
            <div
              class="title-more-down"
              v-if="state.componentsTitle.more.data.length > 0"
            >
              <el-dropdown>
                <el-button>
                  <img
                    class="button-icon"
                    src="@/assets/svg/gengduo-caozuo.svg"
                    alt=""
                    srcset=""
                  />
                  <span>更多操作</span>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="(item, index) in state.componentsTitle.more.data"
                      :key="index"
                      @click="moreClick(item)"
                    >
                      {{ item.name }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
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
    <!-- 文件归档弹窗 -->
    <JyDialog
      @update:show="confirmFileAchive"
      :show="dialogData.show"
      title="文件归档"
      centerBtn
      :draggable="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
    >
      <documentsDetailsPortion>
        <template #title>
          <div class="ap-cont-box-title-label">基本信息</div>
        </template>
        <template #content>
          <div class="from-wrap">
            <el-form :inline="true" label-width="70px" label-position="left">
              <el-form-item label="单据编号">
                <el-input
                  v-model="state.componentsArchiveForm.applyCode"
                  disabled
                  type="text"
                />
              </el-form-item>
              <el-form-item label="单据名称">
                <el-input
                  v-model="state.componentsArchiveForm.applyName"
                  disabled
                />
              </el-form-item>
            </el-form>
            <el-form :inline="true" label-width="70px" label-position="left">
              <el-form-item label="归档时间">
                <el-date-picker
                  v-model="state.componentsArchiveForm.time"
                  type="datetime"
                  placeholder="请选择时间"
                />
              </el-form-item>
              <el-form-item label="档案字号">
                <el-input
                  v-model="state.componentsArchiveForm.fileCode"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-form>
            <el-form label-width="70px" label-position="left">
              <el-form-item label="归档备注">
                <el-input
                  v-model="state.componentsArchiveForm.remark"
                  type="textarea"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-form>
          </div>
        </template>
      </documentsDetailsPortion>
      <documentsDetailsPortion>
        <template #title>
          <div class="ap-cont-box-title-label">文件归档</div>
        </template>
        <template #content>
          <div
            class="files-wrap content-wrap"
            v-if="state.componentsArchiveForm.files.length > 0"
          >
            <span>文件归档</span>
            <div class="files-list">
              <div
                class="files-item"
                v-for="(item, index) in state.componentsArchiveForm.files"
                :key="index"
              >
                <div>{{ item.fileName }}</div>
                <div class="add-file" v-if="item.type < 2">
                  <el-upload
                    ref="upload"
                    class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :auto-upload="false"
                    :show-file-list="false"
                  >
                    <template #trigger>
                      <svg
                        preserveAspectRatio="xMidYMid meet"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill=""
                        viewBox="0 0 16 16"
                      >
                        <g>
                          <g
                            fill-rule="nonzero"
                            fill="#1985F5"
                            data-follow-fill="#1985F5"
                          >
                            <path d="M6.155 3.84h3.2v6.368h-3.2z"></path>
                            <path d="M6.155 3.84h3.2v6.368h-3.2z"></path>
                            <path
                              d="m3.19 5.003 1.29-1.408L7.061.757 7.755 0l.693.757 2.581 2.838 1.291 1.408H3.19ZM8.32 9.77l-.395.437h-.341l-.395-.437H8.32Z"
                            ></path>
                            <path
                              d="M6.155 9.6v.608h3.2V9.6h-3.2Zm4.266 0v1.707H5.088V9.6H0V16h16V9.6h-5.579Zm1.312 5.184H9.6v-2.133h2.133v2.133Zm3.2 0H12.8v-2.133h2.133v2.133Z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      请添加归档文件
                    </template>
                  </el-upload>
                </div>
                <div class="view-file" v-if="item.type == 2">
                  <div class="upload-file">
                    <div v-if="item.isArchived">
                      <img src="@/assets/svg/upload/icon-pdf.svg" />{{
                        item.archiveAttachmentFileName
                      }}（{{ item.fileSize }}）
                    </div>
                    <div v-else>
                      <svg class="iconpark-icon">
                        <use href="#folder"></use>
                      </svg>
                      {{ item.archiveAttachmentFileName }}
                    </div>
                  </div>
                  <div class="archive-status">
                    <div class="archive-status-item" v-if="item.isArchived">
                      <svg class="iconpark-icon">
                        <use href="#finished"></use>
                      </svg>
                      完成归档
                    </div>
                    <div class="archive-status-item" v-else>
                      <svg class="iconpark-icon">
                        <use href="#waiting-arvhices"></use>
                      </svg>
                      归档中（其他终端）
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="files-add content-wrap">
            <span>补充附件</span>
            <div class="upload-archives-element">
              <el-upload
                ref="upload"
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple
                :on-exceed="handleExceed"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="uploadFiles"
              >
                <template #trigger>
                  <svg class="iconpark-icon">
                    <use href="#upload-file"></use>
                  </svg>
                  添加附件
                </template>
              </el-upload>
              <div class="upload-files-list">
                <div
                  class="upload-file-item"
                  v-for="(item, index) in state.componentsArchiveForm
                    .supplemenFiles"
                  :key="index"
                >
                  <div class="file-name" :title="item.name">{{
                    item.name
                  }}</div>
                  <div class="file-size">{{ item.size }}</div>
                  <div class="file-status file-btn">已上传</div>
                  <div class="file-view file-btn">预览</div>
                  <div class="file-down file-btn">下载</div>
                  <div class="file-delete file-btn">删除</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </documentsDetailsPortion>
    </JyDialog>
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
    >
    </kDepartOrPersonVue>
  </div>
</template>
<script setup>
  import {
    ref,
    reactive,
    // defineProps,
    // defineEmits,
    onBeforeMount,
    onMounted
  } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import componentsTabs from '@/views/components/JyTabs.vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import documentsDetailsPortion from '@/views/components/documentsDetails/portion.vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import { useRouter } from 'vue-router'
  import shallArchive from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/archive/shallArchive.json'
  import archiving from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/archive/archiving.json'
  import archived from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/archive/archived.json'
  import shallArchiveSearchForm from '@/views/frontDesk/PrintControlManagement/Archive/searchFormJson/shallArchiveSearchForm'
  import archivingSearchForm from '@/views/frontDesk/PrintControlManagement/Archive/searchFormJson/archivingSearchForm'
  import archivedSearchForm from '@/views/frontDesk/PrintControlManagement/Archive/searchFormJson/archivedSearchForm'
  const router = useRouter()
  const showDepPerDialog = ref(false)
  const currentActiveName = ref('shallArchive')
  const jyTable = ref(null)
  const tableJson = ref({
    shallArchive,
    archiving,
    archived
  })
  const searchFormJs = ref({
    shallArchiveSearchForm,
    archivingSearchForm,
    archivedSearchForm
  })
  const dialogData = reactive({
    show: false,
    title: '文件归档'
  })
  const state = reactive({
    cache: {},
    componentsTitle: {
      more: {
        data: []
      }
    },
    componentsTabs: {
      data: [
        {
          label: '待归档',
          name: 'shallArchive'
        },
        {
          label: '归档中',
          name: 'archiving'
        },
        {
          label: '已归档',
          name: 'archived'
        }
      ]
    },
    componentsSearchForm: {
      data: searchFormJs.value.shallArchiveSearchForm,
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
          name: 't-zgj-query',
          label: '查询',
          type: 'click',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'primary'
          },
          style: {}
        },
        {
          id: 'reset',
          name: 't-zgj-reset',
          label: '重置',
          type: 'click',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            plain: true
          },
          style: {}
        }
      ]
    },
    componentsTable: {
      header: tableJson.value.shallArchive
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
    componentsBatch: {
      selectionData: [],
      defaultAttribute: {
        disabled: true
      },
      data: []
    },
    componentsArchiveForm: {
      applyCode: '202302081234556',
      applyName: '单据名称',
      time: '2023-02-08 15:44:00',
      fileCode: '',
      remark: '',
      files: [
        {
          fileName: 'V3.9.5版本测试.xlsx',
          id: '',
          fileSize: '500K',
          type: -1,
          isArchived: false
        },
        {
          fileName: '居家办公管理方案.docx',
          id: '',
          fileSize: '500K',
          type: 0,
          isArchived: false
        },
        {
          fileName: '电子盖章问题.doc',
          id: '',
          fileSize: '500K',
          type: 2,
          archiveAttachmentFileName:
            'ff808081842bd69201842be2dad701241675818532806.jpg',
          isArchived: false
        },
        {
          fileName: '电子盖章问题.doc',
          id: '',
          fileSize: '500K',
          type: 2,
          archiveAttachmentFileName: 'ocr核验.pdf',
          isArchived: true
        }
      ],
      supplemenFiles: []
    }
  })
  const confirmFileAchive = data => {
    dialogData.show = false
    console.log(state.componentsArchiveForm)
  }
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    console.log(row, column, cell, event)
    if (column.property === 'useSealFileName') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }

  // 切换分页
  function tabChange(activeName) {
    currentActiveName.value = activeName
    state.componentsTable.header = tableJson.value[activeName]

    // 更多操作
    if (activeName === 'shallArchive') {
      state.componentsTitle.more.data = []
    } else if (activeName === 'archiving') {
      state.componentsTitle.more.data = []
    } else if (activeName === 'archived') {
      state.componentsTitle.more.data = [
        {
          name: '文件打包下载'
        },
        {
          name: '下载记录'
        }
      ]
    }

    // 搜索条件
    state.componentsSearchForm.data =
      searchFormJs.value[activeName + 'SearchForm']

    jyTable.value.reloadData()
  }
  // 点击表格按钮
  const customClick = (row, column, cell, event) => {
    if (cell.name === '文件归档') {
      dialogData.show = true
    }
    if (cell.name === '补传') {
      dialogData.show = true
      state.ArchiveFiles = []
    }
    if (cell.name === '申请重置') {
      router.push({
        // path: '/frontDesk/PrintControlManagement/File-Archive/ArchiveReset'
        name: 'ArchiveReset'
      })
    }
  }

  // 补充附件上传
  function uploadFiles(file) {
    console.log(file)
    state.componentsArchiveForm.supplemenFiles.push(file)
    console.log(state.componentsArchiveForm.supplemenFiles)
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .PrintControlManagement-Archive {
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
  }

  .base {
    display: flex;

    > div {
      width: 40%;
      margin: 20px 0;

      > span {
        margin-right: 16px;
      }
    }
  }

  .content-wrap {
    display: flex;
    margin-bottom: 16px;

    > span {
      margin-right: 16px;
    }

    > div {
      width: 90%;
      overflow: hidden;

      .files-item {
        border: 0.5px solid #d2d2d2;
        border-radius: 2px;
        margin-bottom: 16px;

        > div {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          padding-left: 16px;
        }

        > div:nth-child(2) {
          height: 50px;
          border-top: 1px solid #ccc;
          align-items: center;
          margin: 0;
        }

        .add-file {
          justify-content: center;
          color: #1985f5;
          cursor: pointer;

          .upload-demo {
            display: flex;
            align-items: center;

            svg {
              margin-right: 10px;
            }
          }
        }

        .view-file {
          color: #666666;
          margin-left: 5px;

          .upload-file {
            > div {
              display: flex;
              align-items: center;

              > img {
                margin-right: 10px;
              }

              > svg {
                width: 14px;
                margin-right: 10px;
              }
            }
          }

          .archive-status-item {
            margin-left: 20px;

            svg {
              width: 12px;
              height: 12px;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }

  .files-add {
    svg {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }

  .upload-archives-element {
    border: 1px solid #ccc;
    border-radius: 2px;

    // padding: 16px;
    .upload-demo {
      // height: 38px;
      padding: 5px 12px;
    }

    .upload-files-list {
      border-top: 1px solid #ccc;
      padding-left: 12px;
      min-height: 50px;
      max-height: 200px;
      overflow: auto;

      .upload-file-item {
        display: flex;
        padding: 10px 0;
        color: #666666;

        > div {
          margin-right: 20px;
        }

        > .file-btn {
          cursor: pointer;
        }

        .file-name {
          max-width: 50%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .file-status {
          color: #5fb878;
        }

        .file-view {
          color: #d8a650;
        }

        .file-down {
          color: #6d9ef6;
        }

        .file-delete {
          color: #ef1e1e;
        }
      }
    }
  }

  :deep(.el-form--inline) {
    display: flex;
    justify-content: space-between;
  }

  :deep(.el-form--inline .el-form-item) {
    width: calc(50% - 5px);
    margin-right: 5px;
  }

  :deep(.el-form-item) {
    width: calc(100% - 5px);
  }
</style>

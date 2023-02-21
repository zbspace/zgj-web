<!-- 文件归档 -->
<template>
  <div class="PrintControlManagement-Archive">
    <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
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
                    src="../../../assets/svg/gengduo-caozuo.svg"
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
            activeName="1"
            :data="state.componentsTabs.data"
            @tab-change="tabChange"
          >
          </componentsTabs>
        </div>
      </template>
      <template #searchForm>
        <div>
          <componentsSearchForm
            :data="state.componentsSearchForm.data"
            :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style"
            @clickElement="clickElement"
          >
          </componentsSearchForm>
        </div>
      </template>
      <template #batch>
        <div class="batch">
          <componentsBatch
            :data="state.componentsBatch.data"
            :defaultAttribute="state.componentsBatch.defaultAttribute"
          >
          </componentsBatch>
        </div>
      </template>
      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            @cellClick="cellClick"
            @custom-click="customClick"
            @selection-change="selectionChange"
          >
          </componentsTable>
        </div>
      </template>
      <template #pagination>
        <componentsPagination
          :data="state.componentsPagination.data"
          :defaultAttribute="state.componentsPagination.defaultAttribute"
        >
        </componentsPagination>
      </template>
    </componentsLayout>
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
    <KDialog
      @update:show="dialogData.show = $event"
      :show="dialogData.show"
      title="文件归档"
      :oneBtn="false"
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
                      <img src="../../../assets/svg/upload/icon-pdf.svg" />{{
                        item.archiveAttachmentFileName
                      }}（{{ item.fileSize }}）
                    </div>
                    <div v-else>
                      <svg class="iconpark-icon">
                        <use href="#folder"></use></svg
                      >{{ item.archiveAttachmentFileName }}
                    </div>
                  </div>
                  <div class="archive-status">
                    <div class="archive-status-item" v-if="item.isArchived">
                      <svg class="iconpark-icon">
                        <use href="#finished"></use></svg
                      >完成归档
                    </div>
                    <div class="archive-status-item" v-else>
                      <svg class="iconpark-icon">
                        <use href="#waiting-arvhices"></use></svg
                      >归档中（其他终端）
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
                    <use href="#upload-file"></use></svg
                  >添加附件
                </template>
              </el-upload>
              <div class="upload-files-list">
                <div
                  class="upload-file-item"
                  v-for="(item, index) in state.componentsArchiveForm
                    .supplemenFiles"
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
    </KDialog>
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
  import componentsTable from '../../components/table'
  import componentsSearchForm from '../../components/searchForm'
  // import componentsTree from '../../components/tree'
  // import componentsBreadcrumb from '../../components/breadcrumb'
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/tabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import KDialog from '@/views/components/modules/kdialog.vue'
  import documentsDetailsPortion from '@/views/components/documentsDetails/portion.vue'
  import kDepartOrPersonVue from '@/views/components/modules/kDepartOrPerson.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  // const props = defineProps({
  //   // 处理类型
  //   type: {
  //     type: String,
  //     default: '0'
  //   }
  // })
  // const emit = defineEmits([])
  const showDepPerDialog = ref(false)
  const dialogData = reactive({
    show: false,
    title: '文件归档'
  })
  // const vFormLibraryRef = ref(null)
  // const submitLibraryForm = (type) => {
  //     if (!type) {
  //         vFormLibraryRef.value.resetForm();
  //         return
  //     }
  //     vFormLibraryRef.value.getFormData().then(formData => {
  //         alert(JSON.stringify(formData))
  //         fromState.showDialog = false
  //     }).catch(error => {
  //         // Form Validation failed
  //         ElMessage.error(error)
  //     })
  // }
  const state = reactive({
    cache: {},
    componentsTitle: {
      more: {
        data: [
          {
            name: ''
          }
        ]
      }
    },
    componentsTabs: {
      data: [
        {
          label: '待归档',
          name: '1'
        },
        {
          label: '归档中',
          name: '2'
        },
        {
          label: '已归档',
          name: '3'
        }
      ]
    },
    componentsSearchForm: {
      style: {
        lineStyle: {
          width: 'calc(100% / 3)'
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
            placeholder: '文件名称/申请人员/用印编码'
          }
        },
        {
          id: 'picker',
          label: '申请时间',
          type: 'picker',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间'
          },
          style: {}
        },
        {
          id: 'derivable',
          label: '文件类型',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+文件类型'
          }
        },
        {
          id: 'derivable',
          label: '申请人',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+申请人'
          }
        },
        {
          id: 'derivable',
          label: '申请部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+申请部门'
          }
        },
        {
          id: 'derivable',
          label: '往来单位',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+往来单位'
          }
        },
        {
          id: 'picker',
          label: '归档时间',
          type: 'picker',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间'
          },
          style: {}
        },
        {
          id: 'wdyy',
          label: '用印状态',
          type: 'checkButton',
          data: [
            {
              name: '正常'
            },
            {
              name: '异常'
            }
          ]
        },
        {
          id: 'wdyy',
          label: '',
          type: 'checkbox',
          checkbox: [
            {
              // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
              defaultAttribute: {
                label: '我的申请单据'
              },
              style: {}
            }
          ]
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
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
          align: 'center'
        },
        {
          prop: '1',
          label: '单据编号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '单据名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '用印文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          rankDisplayData: [
            {
              name: '文件归档'
            }
          ]
        }
      ],
      data: [
        {
          0: 1,
          1: '011105',
          2: '5417692443',
          3: '普通智能用印',
          4: '汤博',
          5: '建业科技',
          6: '2022-10-30  15:00:00'
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
          if (column.property === '2') {
            return {
              color: 'var(--jy-Info-6)',
              cursor: 'pointer'
            }
          }
        }
      }
    },
    componentsTree: {
      data: [
        {
          label: 'Level one 1',
          children: [
            {
              label: 'Level two 1-1',
              children: [
                {
                  label: 'Level three 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: 'Level one 2',
          children: [
            {
              label: 'Level two 2-1',
              children: [
                {
                  label: 'Level three 2-1-1'
                }
              ]
            },
            {
              label: 'Level two 2-2',
              children: [
                {
                  label: 'Level three 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: 'Level one 3',
          children: [
            {
              label: 'Level two 3-1',
              children: [
                {
                  label: 'Level three 3-1-1'
                }
              ]
            },
            {
              label: 'Level two 3-2',
              children: [
                {
                  label: 'Level three 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': true,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'check-strictly': true
      }
    },
    componentsPagination: {
      data: {
        amount: 10,
        index: 1,
        pageNumber: 10
      },
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        layout: 'prev, pager, next, jumper',
        total: 10,
        'page-sizes': [10, 100, 200, 300, 400],
        background: true
      }
    },
    componentsBreadcrumb: {
      data: [
        {
          name: 'ceshi'
        },
        {
          name: 'ceshi'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        separator: '/'
      }
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
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event);
    if (column.property === '2') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }

  // 切换分页
  function tabChange(activeName) {
    // console.log(activeName);
    if (activeName === '1') {
      state.componentsTable.header = [
        {
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
          align: 'center'
        },
        {
          prop: '1',
          label: '单据编号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '单据名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '用印文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          rankDisplayData: [
            {
              name: '文件归档'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          0: 1,
          1: '011105',
          2: '5417692412',
          3: '智能用印',
          4: '汤博',
          5: '建业科技',
          6: '2022-10-03  13:00:00'
        },
        {
          0: 2,
          1: '011106',
          2: '5417612443',
          3: '普通智能用印',
          4: '肖世康',
          5: '技术中心',
          6: '2022-10-12  15:10:00'
        },
        {
          0: 3,
          1: '011102',
          2: '5417692498',
          3: '普通智能用印',
          4: '郭光林',
          5: '研发中心',
          6: '2022-10-30  08:00:12'
        },
        {
          0: 4,
          1: '011109',
          2: '5417692543',
          3: '普通智能用印',
          4: '汤博',
          5: '建业科技',
          6: '2022-07-30  15:00:00'
        },
        {
          0: 5,
          1: '011105',
          2: '5417692443',
          3: '智能用印',
          4: '汤博',
          5: '建业科技',
          6: '2022-10-30  15:00:00'
        }
      ]
    } else if (activeName === '2') {
      state.componentsTable.header = [
        {
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
          align: 'center'
        },
        {
          prop: '1',
          label: '单据编号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '单据名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '用印文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '7',
          label: '用印文件数',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '8',
          label: '已归档文件数',
          sortable: true,
          'min-width': 180
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          rankDisplayData: [
            {
              name: '文件归档'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          0: 1,
          1: '011105',
          2: '5417692443',
          3: '普通智能用印',
          4: '汤博',
          5: '建业科技',
          6: '2022-10-30  15:00:00'
        },
        {
          0: 2,
          1: '011106',
          2: '5417612443',
          3: '普通智能用印',
          4: '肖世康',
          5: '技术中心',
          6: '2022-10-12  15:10:00'
        },
        {
          0: 3,
          1: '011102',
          2: '5417692498',
          3: '普通智能用印',
          4: '郭光林',
          5: '研发中心',
          6: '2022-10-30  08:00:12'
        }
      ]
    } else if (activeName === '3') {
      state.componentsTable.header = [
        {
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
          align: 'center'
        },
        {
          prop: '1',
          label: '单据编号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '单据名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '用印文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '归档时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '7',
          label: '文件下载',
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
              name: '补传'
            },
            {
              name: '申请重置'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          0: 1,
          1: '011105',
          2: '5417692443',
          3: '普通智能用印',
          4: '汤博',
          5: '建业科技',
          6: '2022-10-30  15:00:00'
        },
        {
          0: 2,
          1: '011106',
          2: '5417612443',
          3: '普通智能用印',
          4: '肖世康',
          5: '技术中心',
          6: '2022-10-12  15:10:00'
        }
      ]
      state.componentsTable.defaultAttribute = {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          // console.log({ row, column, rowIndex, columnIndex });
          if (column.property === '2') {
            return {
              color: 'var(--jy-Info-6)',
              cursor: 'pointer'
            }
          }
          if (column.property === '7') {
            return {
              color: 'var(--jy-Info-6)',
              cursor: 'pointer'
            }
          }
        }
      }
    }

    // 更多操作
    if (activeName === '1') {
      state.componentsTitle.more.data = []
    } else if (activeName === '2') {
      state.componentsTitle.more.data = []
    } else if (activeName === '3') {
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
    if (activeName === '1' || activeName === '2') {
      state.componentsSearchForm.data = [
        {
          id: 'name',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '文件名称/申请人员/用印编码'
          }
        },
        {
          id: 'picker',
          label: '申请时间',
          type: 'picker',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间'
          },
          style: {}
        },
        {
          id: 'derivable',
          label: '文件类型',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+文件类型'
          }
        },
        {
          id: 'derivable',
          label: '申请人',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+申请人'
          }
        },
        {
          id: 'derivable',
          label: '申请部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+申请部门'
          }
        },
        {
          id: 'wdyy',
          label: '',
          type: 'checkbox',
          checkbox: [
            {
              // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
              defaultAttribute: {
                label: '我的申请单据'
              },
              style: {}
            }
          ]
        }
      ]
    } else if (activeName === '3') {
      state.componentsSearchForm.data = [
        {
          id: 'name',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '文件名称/申请人员/用印编码'
          }
        },
        {
          id: 'picker',
          label: '申请时间',
          type: 'picker',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间'
          },
          style: {}
        },
        {
          id: 'derivable',
          label: '文件类型',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+文件类型'
          }
        },
        {
          id: 'derivable',
          label: '申请人',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+申请人'
          }
        },
        {
          id: 'derivable',
          label: '申请部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+申请部门'
          }
        },
        {
          id: 'derivable',
          label: '往来单位',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+往来单位'
          }
        },
        {
          id: 'picker',
          label: '归档时间',
          type: 'picker',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间'
          },
          style: {}
        },
        {
          id: 'derivable',
          label: '选择印章',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+选择印章'
          }
        },
        {
          id: 'wdyy',
          label: '用印状态',
          type: 'checkButton',
          data: [
            {
              name: '正常'
            },
            {
              name: '异常'
            }
          ]
        },
        {
          id: 'wdyy',
          label: '',
          type: 'checkbox',
          checkbox: [
            {
              // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
              defaultAttribute: {
                label: '我的申请单据'
              },
              style: {}
            }
          ]
        }
      ]
    }
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
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
  // 当选择项发生变化时会触发该事件
  function selectionChange(selection) {
    //    console.log(selection);
    state.componentsBatch.selectionData = selection
    if (state.componentsBatch.selectionData.length > 0) {
      state.componentsBatch.defaultAttribute.disabled = false
    } else {
      state.componentsBatch.defaultAttribute.disabled = true
    }
  }

  // 点击搜索表单
  function clickElement(item, index) {
    // console.log(item, index)
    if (item.type === 'derivable') {
      showDepPerDialog.value = true
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
    // 切换分页
    tabChange('1')
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

<!-- 印章库 -->
<template>
  <div class="PrintControlManagement-LibraryOfSeals">
    <JyTable
      url="/sealInfo/page"
      ref="table"
      :hasTree="true"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      :queryParams="queryParams"
      tableClick="sealName"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
    >
      <template #title>
        <div class="title">
          <div>印章库</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="add">+ 增加</el-button>
            </div>
            <div class="title-more-down"> </div>
          </div>
        </div>
      </template>
      <template #tree>
        <div>
          <componentsTree
            :data="state.componentsTree.data"
            :defaultAttribute="state.componentsTree.defaultAttribute"
            :defaultProps="state.componentsTree.defaultProps"
            @current-change="currentChange"
          >
          </componentsTree>
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

    <!-- 印章库 -->
    <JyDialog
      @update:show="showLibraryDialog = $event"
      :show="showLibraryDialog"
      :title="state.title"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="1000"
      :height="600"
      @confirm="submitLibraryForm"
    >
      <el-form
        :model="state.form"
        :rules="state.rules"
        ref="vFormLibraryRef"
        label-width="100px"
      >
        <el-form-item label="印章全称" prop="sealName">
          <el-input v-model="state.form.sealName" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="印章编码" prop="sealNo">
              <el-input v-model="state.form.sealNo" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="印章类型" prop="sealTypeId">
              <el-select
                style="width: 100%"
                v-model="state.form.sealTypeId"
                filterable
              >
                <el-option
                  v-for="(item, index) in state.typeList"
                  :key="index"
                  :label="item.sealTypeName"
                  :value="item.sealTypeId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="印章简称" prop="sealAlias">
              <el-input v-model="state.form.sealAlias" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属单位" prop="subOrganId">
              <div class="select-box-contBox">
                <el-input
                  class="ap-box-contBox-input width-100"
                  readonly
                  v-model="state.form.subOrganName"
                  placeholder="请选择"
                />
                <el-input
                  class="ap-box-contBox-input width-100"
                  type="hidden"
                  v-model="state.form.subOrganId"
                  placeholder="请选择"
                />
                <div class="ap-box-contBox-icon">
                  <el-icon
                    v-if="state.form.subOrganName"
                    style="margin-right: 5px"
                    color="#aaaaaa"
                    @click="clear('subOrgan')"
                    ><CircleClose
                  /></el-icon>
                  <img
                    @click="chooseOrgan('subOrgan', ['organ'])"
                    class="ap-box-contBox-icon-img"
                    src="@/assets/svg/ketanchude.svg"
                    alt=""
                  />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="管理人" prop="manageUserId">
              <div class="select-box-contBox">
                <el-input
                  class="ap-box-contBox-input width-100"
                  readonly
                  v-model="state.form.manageUserName"
                  placeholder="请选择"
                />
                <el-input
                  class="ap-box-contBox-input width-100"
                  type="hidden"
                  v-model="state.form.manageUserId"
                  placeholder="请选择"
                />
                <div class="ap-box-contBox-icon">
                  <el-icon
                    v-if="state.form.manageUserName"
                    style="margin-right: 5px"
                    color="#aaaaaa"
                    @click="clear('manageUser')"
                    ><CircleClose
                  /></el-icon>
                  <img
                    @click="chooseOrgan('manageUser', ['user'])"
                    class="ap-box-contBox-icon-img"
                    src="@/assets/svg/ketanchude.svg"
                    alt=""
                  />
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理部门" prop="manageOrganId">
              <div class="select-box-contBox">
                <el-input
                  class="ap-box-contBox-input width-100"
                  readonly
                  v-model="state.form.manageOrganName"
                  placeholder="请选择"
                />
                <el-input
                  class="ap-box-contBox-input width-100"
                  type="hidden"
                  v-model="state.form.manageOrganId"
                  placeholder="请选择"
                />
                <div class="ap-box-contBox-icon">
                  <el-icon
                    v-if="state.form.manageOrganName"
                    style="margin-right: 5px"
                    color="#aaaaaa"
                    @click="clear('manageOrgan')"
                    ><CircleClose
                  /></el-icon>
                  <img
                    @click="chooseOrgan('manageOrgan', ['organ'])"
                    class="ap-box-contBox-icon-img"
                    src="@/assets/svg/ketanchude.svg"
                    alt=""
                  />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="保管人" prop="keepUserId">
              <div class="select-box-contBox">
                <el-input
                  class="ap-box-contBox-input width-100"
                  readonly
                  v-model="state.form.keepUserName"
                  placeholder="请选择"
                />
                <el-input
                  class="ap-box-contBox-input width-100"
                  type="hidden"
                  v-model="state.form.keepUserId"
                  placeholder="请选择"
                />
                <div class="ap-box-contBox-icon">
                  <el-icon
                    v-if="state.form.keepUserName"
                    @click="clear('keepUser')"
                    ><CircleClose
                  /></el-icon>
                  <img
                    @click="chooseOrgan('keepUser', ['user'])"
                    class="ap-box-contBox-icon-img"
                    src="@/assets/svg/ketanchude.svg"
                    alt=""
                  />
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保管部门" prop="keepOrganId">
              <div class="select-box-contBox">
                <el-input
                  class="ap-box-contBox-input width-100"
                  readonly
                  v-model="state.form.keepOrganName"
                  placeholder="请选择"
                />
                <el-input
                  class="ap-box-contBox-input width-100"
                  type="hidden"
                  v-model="state.form.keepOrganId"
                  placeholder="请选择"
                />
                <div class="ap-box-contBox-icon">
                  <el-icon
                    v-if="state.form.keepOrganName"
                    style="margin-right: 5px"
                    color="#aaaaaa"
                    @click="clear('keepOrgan')"
                    ><CircleClose
                  /></el-icon>
                  <img
                    @click="chooseOrgan('keepOrgan', ['organ'])"
                    class="ap-box-contBox-icon-img"
                    src="@/assets/svg/ketanchude.svg"
                  />
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否外显" prop="extShow">
              <el-radio-group v-model="state.form.extShow">
                <el-radio :label="1" size="large">是</el-radio>
                <el-radio :label="2" size="large">否</el-radio>
              </el-radio-group>
              <span class="waixian">外显是指在其他业务系统上显示的标识</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="印章状态" prop="sealState">
              <el-radio-group v-model="state.form.sealState" class="ml-4">
                <el-radio :label="1" size="large">正常</el-radio>
                <el-radio :label="2" size="large">停用</el-radio>
                <el-radio :label="3" size="large">已销毁</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="硬件版本号" prop="hardwareVersionId">
              <el-input v-model="state.form.hardwareVersionId" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="固件版本号" prop="firmwareVersionId">
              <el-input v-model="state.form.firmwareVersionId" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="制度链接" prop="bylawsUrl">
          <el-input
            v-model="state.form.bylawsUrl"
            clearable
            placeholder="请输入http或https开头的网址链接，如https://www.zhangin.com"
          />
        </el-form-item>
        <el-form-item label="备注" prop="sealExplain">
          <el-input
            v-model="state.form.sealExplain"
            :rows="4"
            type="textarea"
            placeholder="请输入http或https开头的网址链接，如https://www.zhangin.com"
          />
        </el-form-item>
        <el-form-item
          label="印模"
          prop="stampAttachments"
          style="margin-top: 10px"
        >
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :on-change="handleChange"
          >
            <div class="btnContainer">
              <el-button type="primary" text size="small">
                <el-icon :size="14"> <Paperclip /> </el-icon>
                <span style="margin-left: 5px">添加印模</span>
              </el-button>
            </div>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item
          label="印章可见范围"
          prop="stampAttachments"
          style="margin-top: 10px"
        >
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :on-change="handleChange"
          >
            <div class="btnContainer">
              <el-button type="primary" text size="small">
                <el-icon :size="14"> <Paperclip /> </el-icon>
                <span style="margin-left: 5px">添加印模</span>
              </el-button>
            </div>
          </el-upload>
        </el-form-item> -->
      </el-form>
    </JyDialog>
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
      :tabsShow="tabsShow"
      @update:searchSelected="submitSelectDepart"
      :searchSelected="state.searchSelected"
    >
    </kDepartOrPersonVue>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted, ref } from 'vue'
  import { Paperclip, CircleClose } from '@element-plus/icons-vue'
  import componentsTree from '../../components/tree'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import JyDialog from '@/views/components/modules/JyDialog.vue'
  import JyTable from '@/views/components/JyTable.vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import { ElMessage } from 'element-plus'
  import typeApis from '@/api/frontDesk/sealManage/typeOfSeal'
  import api from '@/api/frontDesk/sealManage/libraryOfSeals'
  import dayjs from 'dayjs'

  // 印章库 新增弹框
  const showLibraryDialog = ref(false)
  const vFormLibraryRef = ref(null)
  const depChoose = ref(null)
  const table = ref(null)
  const queryParams = ref({})
  const add = () => {
    state.title = '新增'
    if (vFormLibraryRef.value) {
      vFormLibraryRef.value.resetFields()
    }
    state.form.sealNo =
      dayjs().format('YYYYMMDD') + Math.random().toString().slice(2, 11)
    showLibraryDialog.value = true
  }
  const submitLibraryForm = type => {
    vFormLibraryRef.value.validate(valid => {
      if (valid) {
        api.add(state.form).then(res => {
          console.log(res)
          ElMessage.success('新增成功印章成功！')
        })
      } else {
        ElMessage.error('校验失败')
      }
    })
  }
  const showDepPerDialog = ref(false)
  const submitSelectDepart = data => {
    if (data) {
      state.form[depChoose.value + 'Id'] = data[0].id
      state.form[depChoose.value + 'Name'] = data[0].name
    }

    // if (depChoose.value === 'subOrgan') {
    //   state.form.subOrganName = data[0].name
    //   state.form.subOrganId = data[0].id
    // }
    // if (depChoose.value === 'manageUser') {
    //   state.form.manageUserName = data[0].name
    //   state.form.manageUserId = data[0].id
    // }
    // if (depChoose.value === 'manageOrgan') {
    //   state.form.manageOrganName = data[0].name
    //   state.form.manageOrganId = data[0].id
    // }
    // if (depChoose.value === 'keepUser') {
    //   state.form.keepUserName = data[0].name
    //   state.form.keepUserId = data[0].id
    // }
    // if (depChoose.value === 'keepOrgan') {
    //   state.form.keepOrganName = data[0].name
    //   state.form.keepOrganId = data[0].id
    // }
    console.log(data)
  }
  // const emit = defineEmits([])
  const state = reactive({
    tabsShow: ['organ'],
    searchSelected: [],
    title: '新增',
    typeList: [],
    form: {
      sealNo: '',
      sealName: '',
      sealAlias: '',
      sealTypeId: '',
      subOrganId: '',
      subOrganName: '',
      manageUserId: '',
      manageUserName: '',
      manageOrganId: '',
      manageOrganName: '',
      keepUserId: '',
      keepUserName: '',
      keepOrganId: '',
      keepOrganName: '',
      extShow: 1,
      sealState: 1,
      hardwareVersionId: '',
      firmwareVersionId: '',
      bylawsUrl: '',
      sealExplain: '',
      stampAttachments: ''
    },
    rules: {
      sealName: [
        {
          required: true,
          message: '请输入印章全称',
          trigger: 'change'
        },
        { min: 2, message: '印章全称必须大于2个字符', trigger: 'change' }
      ],
      sealNo: [
        {
          required: true,
          message: '请输入印章编码',
          trigger: 'change'
        }
      ],
      sealTypeId: [
        {
          required: true,
          message: '请选择印章类型',
          trigger: 'change'
        }
      ],
      sealAlias: [
        {
          required: true,
          message: '请输入印章简称',
          trigger: 'change'
        }
      ],
      manageUserId: [
        {
          required: true,
          message: '请选择管理人',
          trigger: 'change'
        }
      ],
      manageOrganId: [
        {
          required: true,
          message: '请选择管理部门',
          trigger: 'change'
        }
      ],
      keepUserId: [
        {
          required: true,
          message: '请选择保管人',
          trigger: 'change'
        }
      ],
      keepOrganId: [
        {
          required: true,
          message: '请选择保管部门',
          trigger: 'change'
        }
      ],
      extShow: [
        {
          required: true,
          message: '请选择是否外显',
          trigger: 'blur'
        }
      ],
      sealState: [
        {
          required: true,
          message: '请选择印章状态',
          trigger: 'blur'
        }
      ]
    },
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
          id: 'searchKey',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '印章名称/保管部门/保管人/印章编码'
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
        },
        {
          id: 'keepUserIds',
          label: '保管人',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+保管人'
          }
        },
        {
          id: 'keepOrganIds',
          label: '保管部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+保管部门'
          }
        },
        {
          id: 'sealStatus',
          label: '印章状态',
          type: 'checkButton',
          data: [
            {
              id: '1',
              name: '正常'
            },
            {
              id: '2',
              name: '停用'
            },
            {
              id: '3',
              name: '已销毁'
            }
          ]
        },
        {
          id: 'sealCategory',
          label: '印章种类',
          type: 'checkButton',
          data: [
            {
              id: '0',
              name: '普通印章'
            },
            {
              id: '1',
              name: '智能印章'
            }
          ]
        },
        {
          id: 'takeOut',
          label: '',
          type: 'checkbox',
          checkbox: [
            {
              // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
              defaultAttribute: {
                label: '印章外带'
              },
              style: {}
            }
          ]
        },
        {
          id: 'onlyMyself',
          label: '',
          type: 'checkbox',
          checkbox: [
            {
              // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
              defaultAttribute: {
                label: '我保管的印章'
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
          prop: 'sealName',
          label: '印章名称',
          sortable: 'custom',
          'min-width': 210,
          'show-overflow-tooltip': true
        },
        {
          prop: 'sealTypeName',
          label: '印章类型',
          sortable: 'custom',
          'min-width': 150
        },
        {
          prop: 'sealStatus',
          label: '印章状态',
          sortable: 'custom',
          'min-width': 150
        },
        {
          prop: 'keepUserName',
          label: '保管人',
          sortable: 'custom',
          'min-width': 150
        },
        {
          prop: 'keepOrganName',
          label: '保管部门',
          sortable: 'custom',
          'min-width': 150
        },
        {
          prop: 'createDatetime',
          label: '创建时间',
          sortable: 'custom',
          'min-width': 180
        },

        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          width: '380',
          rankDisplayData: [
            {
              name: '修改'
            },
            {
              name: '删除'
            },
            {
              name: '设置维护范围'
            },
            {
              name: '设置可用范围'
            },
            {
              name: '停用'
            },
            {
              name: '变更'
            },
            {
              name: '销毁'
            }
          ]
        }
      ],
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          if (column.property === 'sealName') {
            return {
              color: 'var(--jy-info-6)',
              cursor: 'pointer'
            }
          }
        }
      }
    },
    componentsTree: {
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': false,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'check-strictly': true,
        'highlight-current': true,
        'node-key': 'sealTypeId',
        'current-node-key': ''
      },
      defaultProps: {
        label: 'sealTypeName',
        children: 'children'
      },
      value: ''
    },
    componentsPagination: {
      data: {
        amount: 0,
        index: 1,
        pageNumber: 10
      },
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        layout: 'prev, pager, next, jumper',
        total: 0,
        'page-sizes': [10, 50, 100],
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
          label: '印章详情',
          name: 'Particulars-of-Seal'
        },
        {
          label: '保管记录',
          name: 'Record-of-custody'
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
      data: [
        {
          name: '批量设置可见范围'
        },
        {
          name: '批量设置可用范围'
        },
        {
          name: '批量删除'
        }
      ]
    }
  })
  function disabledDate(time) {
    return time.getTime() > Date.now() - 8.64e7 // 如果没有后面的-8.64e7就是不可以选择今天的
  }
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event);
    if (column.property === 'sealName') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    if (cell.name === '修改') {
      state.title = '修改'
      showLibraryDialog.value = true
    }
    if (cell.name === '设置维护范围' || cell.name === '设置可用范围') {
      showDepPerDialog.value = true
    }
  }
  const typeList = () => {
    typeApis.list({ searchKey: '' }).then(res => {
      state.typeList = res.data
      state.componentsTree.data = [
        {
          sealTypeId: 'all',
          sealTypeName: '印章类型',
          sealTypeId: '',
          children: res.data
        }
      ]
      state.componentsTree.defaultAttribute['current-node-key'] =
        res.data[0].sealTypeId
    })
  }

  const chooseOrgan = (type, tabs) => {
    depChoose.value = type
    state.searchSelected = []
    if (state.form[type + 'Id'] !== '' && state.form[type + 'Name'] !== '') {
      state.searchSelected.push({
        id: state.form[type + 'Id'],
        name: state.form[type + 'Name'],
        type: tabs[0]
      })
    }
    state.tabsShow = tabs
    showDepPerDialog.value = true
  }

  const clear = type => {
    state.form[type + 'Id'] = ''
    state.form[type + 'Name'] = ''
  }
  const currentChange = e => {
    queryParams.value = e.sealTypeId ? { sealTypeIds: e.sealTypeId } : null
    table.value.reloadData()
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    typeList()
    // librarySealPage()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .PrintControlManagement-LibraryOfSeals {
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

  .waixian {
    margin-left: 25px;
    font-size: 13px;
    color: #666666;
  }
</style>
<style lang="scss">
  .upload-demo {
    width: 100%;
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
      inset;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    min-height: 100px;

    .el-upload {
      width: 100%;
    }
  }

  .btnContainer {
    width: 100%;
    border-bottom: 1px solid var(--el-border-color);
  }
</style>

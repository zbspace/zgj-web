<!-- 印章库 -->
<template>
  <div class="PrintControlManagement-LibraryOfSeals">
    <JyTable
      url="/sealInfo/page"
      ref="table"
      :hasTree="true"
      :needAutoRequest="false"
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
        <!-- <el-row :gutter="20">
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
        </el-row> -->
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
          <!-- <el-col :span="12">
            <el-form-item label="印章状态" prop="sealState">
              <el-radio-group v-model="state.form.sealState" class="ml-4">
                <el-radio :label="1" size="large">正常</el-radio>
                <el-radio :label="2" size="large">停用</el-radio>
                <el-radio :label="3" size="large">已销毁</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
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
          <!-- <el-input
            v-model="state.form.sealExplain"
            :rows="4"
            type="textarea"
            placeholder="请输入http或https开头的网址链接，如https://www.zhangin.com"
          /> -->
          <JyRichEdit :value="state.form.sealExplain" @updateValue="getMsg" />
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
    <!-- 弹窗提示 -->
    <JyElMessageBox
      v-model="state.JyElMessageBox.show"
      :show="state.JyElMessageBox.show"
      :defaultAttribute="{}"
    >
      <template #header>
        <div class="header-div">
          <img :src="state.JyElMessageBox.header.icon" alt="" />
          <span>{{ state.JyElMessageBox.header.data }}</span>
        </div>
      </template>
      <template #content>
        <div class="content-div">{{ state.JyElMessageBox.content.data }}</div>
      </template>
      <template #footer>
        <el-button
          type="primary"
          @click="submitElMessageBox(state.JyElMessageBox.type)"
        >
          提交
        </el-button>
        <el-button @click="state.JyElMessageBox.show = false">取消</el-button>
      </template>
    </JyElMessageBox>
    <!-- 批量操作弹框提示 -->
    <JyElMessageBox
      v-model="state.showToastDialog.show"
      :show="state.showToastDialog.show"
      :defaultAttribute="{}"
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
            >{{ item.name }}</p
          >
        </el-scrollbar>
      </template>
      <template #footer>
        <el-button
          v-for="item in state.butDatas"
          :key="item.name"
          :type="item.type"
          @click="item.clickName"
          >{{ item.name }}</el-button
        >
      </template>
    </JyElMessageBox>
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
  import JyRichEdit from '@/views/components/modules/JyRichEdit.vue'
  import dayjs from 'dayjs'
  import tableHeader from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/libraryOfSeals.json'
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
    console.log(state.form)
    vFormLibraryRef.value.validate(valid => {
      if (valid) {
        api.add(state.form).then(res => {
          console.log(res)
          ElMessage.success('新增成功印章成功！')
          table.value.reloadData()
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
  const getMsg = val => {
    state.form.sealExplain = val
  }
  // const emit = defineEmits([])
  const state = reactive({
    butDatas: [],
    sealIds: '',
    msg: '',
    tabsShow: [],
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
      // manageUserId: '',
      // manageUserName: '',
      // manageOrganId: '',
      // manageOrganName: '',
      keepUserId: '',
      keepUserName: '',
      keepOrganId: '',
      keepOrganName: '',
      extShow: 1,
      // sealState: 1,
      hardwareVersionId: '',
      firmwareVersionId: '',
      bylawsUrl: '',
      sealExplain: '',
      stampAttachments: ''
    },
    JyElMessageBox: {
      show: false,
      header: {
        data: '',
        icon: '/src/assets/svg/common/warning.svg'
      },
      content: {
        data: ''
      },
      type: '删除'
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
      header: tableHeader,
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
        'current-node-key': 'all'
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
          name: 't-zgj-seal.BatchSetVisibility',
          label: '批量设置可见范围'
        },
        {
          name: 't-zgj-seal.BatchSetAvailable',
          label: '批量设置可用范围'
        },
        {
          name: 't-zgj-seal.BatchDelete',
          label: '批量删除'
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
    console.log(column)
    state.sealIds = column.sealId
    if (cell.name === 't-zgj-Edit') {
      state.title = '修改'
      showLibraryDialog.value = true
      getSealsInfo()
    }
    if (
      cell.name === 't-zgj-seal.SetVisibility' ||
      cell.name === 't-zgj-seal.SetAvailable'
    ) {
      showDepPerDialog.value = true
    }
    if (cell.name === 't-zgj-Delete') {
      state.JyElMessageBox.header.data = '删除'
      state.JyElMessageBox.content.data = '请问确定要删除吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '删除'
    }
    if (cell.name === 't-zgj-seal.deactivated') {
      state.JyElMessageBox.header.data = '停用'
      state.JyElMessageBox.content.data = '请问确定停用该印章吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '停用'
    }
    if (cell.name === '启用') {
      state.JyElMessageBox.header.data = '启用'
      state.JyElMessageBox.content.data = '请问确定启用该印章吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '启用'
    }
    if (cell.name === '销毁') {
      state.JyElMessageBox.header.data = '销毁'
      state.JyElMessageBox.content.data = '请问确定销毁该印章吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '销毁'
    }
  }
  const getSealsInfo = () => {
    api.sealInfo(state.sealIds).then(res => {
      console.log(res)
      state.form = res.data
    })
  }
  const clickBatchButton = (item, datas) => {
    console.log(item)
    state.componentsBatch.selectionData = datas
    const idList = []
    datas.forEach(element => {
      idList.push(element.sealId)
    })
    state.sealIds = idList.join(',')
    if (item.name === 't-zgj-seal.BatchDelete') {
      state.showToastDialog.header.data = '批量删除'
      state.showToastDialog.content.data =
        '已选中以下表单，请问确定要批量删除吗？'
      state.showToastDialog.show = true
      // state.showToastDialog.header.icon = '/src/assets/svg/common/danger.svg'
      state.butDatas = [
        {
          name: '确定',
          type: 'primary',
          clickName: sureBatchDel
        },
        {
          name: '取消',
          type: '',
          clickName: closeBatchTabel
        }
      ]
    }
    if (
      item.name === 't-zgj-seal.BatchSetVisibility' ||
      item.name === 't-zgj-seal.BatchSetAvailable'
    ) {
      showDepPerDialog.value = true
    }
  }
  // 批量删除
  function batchDel() {
    state.showToastDialog.header.data = '批量删除'
    state.showToastDialog.content.data =
      '已选中以下表单，请问确定要批量删除吗？'
    state.showToastDialog.show = true
    // state.showToastDialog.header.icon = '/src/assets/svg/common/danger.svg'
    state.componentsBatch.butDatas = [
      {
        name: '确定',
        type: 'primary',
        clickName: sureBatchDel
      },
      {
        name: '取消',
        type: '',
        clickName: closeBatchTabel
      }
    ]
    console.log('批量删除')
  }
  // 确定批量删除
  const sureBatchDel = () => {
    const list = state.componentsBatch.selectionData
    const idList = []
    const idObj = { formMessageId: '' }
    list.forEach(v => {
      idObj.formMessageId = v.formMessageId
      idList.push(idObj)
    })
    api.relationContractType(idList).then(res => {
      if (res.code === 200) {
        if (res.data.length > 0) {
          state.showToastDialog.header.data = '删除'
          state.showToastDialog.content.data =
            '选中的以下表单已关联了流程，不允许删除'
          state.showToastDialog.show = true
          state.showToastDialog.header.icon =
            '/src/assets/svg/common/danger.svg'
          state.componentsBatch.butDatas = [
            {
              name: '知道了',
              type: 'primary',
              clickName: closeBatchTabel
            }
          ]
        } else {
          api.sealInfoDelete({ ids: state.sealIds }).then(res => {
            console.log(res)
          })
        }
      } else {
        console.log(res)
      }
    })
  }
  // 关闭表单复制弹窗
  function closeBatchTabel() {
    state.showToastDialog.show = false
  }
  // 提交弹窗
  const submitElMessageBox = type => {
    state.JyElMessageBox.show = false
    if (type === '删除') {
      apiOpt(type, api.sealInfoDelete(type, { ids: state.sealId }))
    }
    if (type === '停用') {
      apiOpt(type, api.sealInfoDisable(type, { ids: state.sealId }))
    }
    if (type === '启用') {
      apiOpt(type, api.sealInfoEnable(type, { ids: state.sealId }))
    }
    if (type === '销毁') {
      apiOpt(type, api.sealInfoDestroy(type, { ids: state.sealId }))
    }
  }
  const apiOpt = (typeName, apiName) => {
    apiName.then(res => {
      if (res.code === 200) {
        ElMessage.success(`${typeName}成功！`)
      } else {
        ElMessage.success(`${typeName}失败，请重试`)
      }
    })
  }
  // 获取印章类型
  const typeList = () => {
    typeApis.list({ searchKey: '' }).then(res => {
      state.typeList = res.data
      state.componentsTree.data = [
        {
          sealTypeName: '印章类型',
          sealTypeId: 'all',
          children: res.data
        }
      ]
      // if (res.data && res.data.length) {
      //   // state.componentsTree.defaultAttribute['current-node-key'] =
      //   //   res.data[0].sealTypeId
      //   queryParams.value = {
      //     sealTypeIds: res.data[0].sealTypeId
      //   }
      // }
      table.value.reloadData()
    })
  }

  const chooseOrgan = (type, tabs) => {
    depChoose.value = type
    state.tabsShow = []
    state.searchSelected = []
    if (state.form[type + 'Id'] !== '' && state.form[type + 'Name'] !== '') {
      state.searchSelected.push({
        id: state.form[type + 'Id'],
        name: state.form[type + 'Name'],
        type: tabs[0]
      })
    }
    console.log(tabs)
    state.tabsShow = tabs
    showDepPerDialog.value = true
  }

  const clear = type => {
    state.form[type + 'Id'] = ''
    state.form[type + 'Name'] = ''
  }
  const currentChange = e => {
    console.log(e)
    queryParams.value =
      e.sealTypeId && e.sealTypeId !== 'all'
        ? { sealTypeIds: e.sealTypeId }
        : null
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
  .el-icon {
    color: #aaaaaa;
    margin-right: 5px;
  }
  .btnContainer {
    width: 100%;
    border-bottom: 1px solid var(--el-border-color);
  }
</style>

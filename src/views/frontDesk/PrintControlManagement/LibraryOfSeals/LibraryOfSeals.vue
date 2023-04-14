<!--
* @Descripttion 印章库
* @FileName LibraryOfSeals.vue
* @Author Guanpf
* @LastEditTime 2023-03-29 17:08:12
!-->
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
      statusColoum="sealStateId"
      openValue="0"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
      @clickElement="clickElement"
    >
      <template #title>
        <div class="title">
          <div>{{ $t('t-zgj-F_SEAL_INFO') }}</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="add"
                >+ {{ $t('t-zgj-add') }}</el-button
              >
            </div>
            <div class="title-more-down">
              <el-dropdown popper-class="more-operation-dropdown">
                <el-button>
                  <img
                    class="button-icon"
                    src="@/assets/svg/gengduo-caozuo.svg"
                    alt=""
                    srcset=""
                  />
                  <span>{{ $t('t-zgj-table.more.Operation') }}</span>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="showDeleted">{{
                      $t('t-zgj-F_SEAL_INFO_RECYCLE')
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
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
      <template #custom_sealStateId="scope">
        <div class="flag-cell center">
          <div
            class="diot diot-0"
            v-show="scope.value.sealStateId === '0'"
          ></div>
          <div
            class="diot diot-1"
            v-show="
              scope.value.sealStateId === '1' || scope.value.sealStateId === '2'
            "
          ></div>
          <span v-if="scope.value.sealStateId === '0'">{{
            $t('t-zgj-seal.normal')
          }}</span>
          <span v-else-if="scope.value.sealStateId === '1'">{{
            $t('t-zgj-seal.deactivated')
          }}</span>
          <span v-else-if="scope.value.sealStateId === '2'">{{
            $t('t-zgj-seal.destroyed')
          }}</span>
        </div>
      </template>
      <template #custom_caozuo="scope">
        <div
          class="rankDisplayData"
          :class="{ 'rankDisplayData-add': scope.value.sealStateId === '2' }"
          v-if="state.rankDisplayData && state.rankDisplayData.length > 0"
        >
          <div
            class="rankDisplayData-node"
            v-for="(data, num) in state.rankDisplayData.slice(0, 4)"
            :key="num"
            @click="customClick(num, scope.value, data)"
          >
            <span>
              {{
                data.name === 'status'
                  ? scope.value.sealStateId === '1'
                    ? $t('t-zgj-Enable')
                    : $t('t-zgj-seal.deactivated')
                  : $t(data.name)
              }}
            </span>
          </div>
          <div
            class="rankDisplayData-more"
            v-if="state.rankDisplayData.length > 4"
          >
            <el-dropdown>
              <span class="el-dropdown-link">
                <img
                  class="rankDisplayData-node"
                  :src="
                    scope.value.sealStateId === '2' ? downIconGray : downIcon
                  "
                  alt=""
                />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    :class="{
                      'el-dropdown-item-add': scope.value.sealStateId === '2'
                    }"
                    v-for="(data, num) in state.rankDisplayData.slice(4)"
                    :key="num"
                    @click="customClick(num, scope.value, data)"
                  >
                    {{
                      data.name === 'status'
                        ? scope.value.sealStateId === '1'
                          ? $t('t-zgj-Enable')
                          : $t('t-zgj-seal.deactivated')
                        : $t(data.name)
                    }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
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
      destroy-on-close
      @confirm="submitLibraryForm"
      @close="closeForm"
    >
      <el-form
        :model="state.form"
        :rules="state.rules"
        ref="vFormLibraryRef"
        label-width="100px"
        class="sealForm"
      >
        <el-form-item label="印章全称" prop="sealName">
          <el-input
            v-model="state.form.sealName"
            placeholder="请输入印章全称"
          />
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
              <el-input
                v-model="state.form.sealAlias"
                placeholder="请输入印章简称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属单位" prop="subOrganId">
              <div class="select-box-contBox">
                <el-input
                  class="ap-box-contBox-input width-100"
                  readonly
                  v-model="state.form.subOrganName"
                  placeholder="请选择所属单位"
                  @click="chooseOrgan('subOrgan', ['organ'], false)"
                />
                <el-input
                  class="ap-box-contBox-input width-100"
                  type="hidden"
                  v-model="state.form.subOrganId"
                  placeholder="请选择"
                />
                <div class="ap-box-contBox-icon">
                  <!-- <el-icon
                    v-if="state.form.subOrganName"
                    style="margin-right: 5px"
                    color="#aaaaaa"
                    @click="clear('subOrgan')"
                    ><CircleClose
                  /></el-icon> -->
                  <img
                    @click="chooseOrgan('subOrgan', ['organ'], false)"
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
                  :disabled="state.form.sealId !== ''"
                  class="ap-box-contBox-input width-100"
                  readonly
                  v-model="state.form.keepUserName"
                  placeholder="请选择保管人"
                  @click="chooseOrgan('keepUser', ['user'], false)"
                />
                <el-input
                  class="ap-box-contBox-input width-100"
                  type="hidden"
                  v-model="state.form.keepUserId"
                  placeholder="请选择"
                />
                <div class="ap-box-contBox-icon" v-if="!state.form.sealId">
                  <!-- <el-icon
                    v-if="state.form.keepUserName"
                    @click="clear('keepUser')"
                    ><CircleClose
                  /></el-icon> -->
                  <img
                    @click="chooseOrgan('keepUser', ['user'], false)"
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
              <el-select
                v-model="state.form.keepOrganId"
                placeholder="请选择保管部门"
                style="width: 100%"
                :disabled="
                  state.searchSelectedKeepOrgan.length > 1 ? false : true
                "
              >
                <el-option
                  v-for="item in state.searchSelectedKeepOrgan"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否外显" prop="extShow">
              <el-radio-group v-model="state.form.extShow">
                <el-radio :label="'1'" size="large">是</el-radio>
                <el-radio :label="'2'" size="large">否</el-radio>
              </el-radio-group>
              <span class="waixian">外显是指在其他业务系统上显示的标识</span>
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
      </el-form>
    </JyDialog>
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
      :tabsShow="state.tabsShow"
      :multiple="state.multiple"
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
          <span>{{ $t(state.JyElMessageBox.header.data) }}</span>
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
          {{ $t('t-zgj-operation.submit') }}
        </el-button>
        <el-button @click="state.JyElMessageBox.show = false">{{
          $t('t-zgj-operation.cancel')
        }}</el-button>
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
          <span>{{ $t(state.showToastDialog.header.data) }}</span>
        </div>
      </template>
      <template #content>
        <div class="content-div">{{ state.showToastDialog.content.data }}</div>
        <el-scrollbar class="scrollbar" max-height="200px">
          <p
            v-for="item in state.componentsBatch.selectionData"
            :key="item"
            class="scrollbar-demo-item"
            >{{ item.sealName }}</p
          >
        </el-scrollbar>
      </template>
      <template #footer>
        <el-button
          v-for="item in state.butDatas"
          :key="item.name"
          :type="item.type"
          @click="item.clickName"
          >{{ $t(item.name) }}</el-button
        >
      </template>
    </JyElMessageBox>
    <ChangeKeeper
      :show="showChangeDialog"
      @on-cancel="closeChage"
      @on-confirm="submitChange"
      ref="changeRef"
    >
    </ChangeKeeper>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted, ref } from 'vue'
  import { Paperclip } from '@element-plus/icons-vue'
  import componentsTree from '@/views/components/tree.vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails'
  import JyTable from '@/views/components/JyTable.vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import { ElMessage } from 'element-plus'
  import typeApis from '@/api/frontDesk/sealManage/typeOfSeal'
  import api from '@/api/frontDesk/sealManage/libraryOfSeals'
  import staffApi from '@/api/system/companyManagement/departmentStaff'
  import JyRichEdit from '@/views/components/modules/JyRichEdit.vue'
  import tableHeader from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/libraryOfSeals.json'
  import ChangeKeeper from '@/views/frontDesk/PrintControlManagement/LibraryOfSeals/modules/changeKeeper.vue'
  import { useRouter } from 'vue-router'
  import downIcon from '@/assets/svg/sangedian.svg'
  import downIconGray from '@/assets/svg/sangedian-gray.svg'
  const router = useRouter()
  // 印章库 新增弹框
  const showLibraryDialog = ref(false)
  const showChangeDialog = ref(false)
  const vFormLibraryRef = ref(null)
  const changeRef = ref(null)
  const depChoose = ref(null)
  const table = ref(null)
  const queryParams = ref({})

  // 新增印章
  const add = () => {
    state.title = '新增'
    if (vFormLibraryRef.value) {
      vFormLibraryRef.value.resetFields()
    }
    for (const i in state.form) {
      state.form[i] = ''
    }
    getSealsBizNo()
  }
  const getSealsBizNo = () => {
    api.sealInfoBizNo().then(res => {
      if (res.code === 200) {
        state.form.sealNo = res.data
        showLibraryDialog.value = true
      }
    })
  }
  // 保存新增/修改数据
  const submitLibraryForm = type => {
    console.log(state.form)
    vFormLibraryRef.value.validate(valid => {
      if (valid) {
        if (state.form.sealId) {
          api.edit(state.form).then(res => {
            console.log(res)
            showLibraryDialog.value = false
            table.value.reloadData()
            ElMessage.success('修改印章成功！')
          })
        } else {
          api.add(state.form).then(res => {
            showLibraryDialog.value = false
            table.value.reloadData()

            console.log(res)
            ElMessage.success('新增印章成功！')
          })
        }
      } else {
        // ElMessage.error('校验失败')
      }
    })
  }
  const closeForm = () => {
    state.searchSelected = []
    state.searchSelectedKeepOrgan = []
    state.searchSelectedKeepUser = []
  }
  const getMsg = val => {
    state.form.sealExplain = val
  }
  const state = reactive({
    butDatas: [],
    sealIds: '',
    msg: '',
    tabsShow: [],
    multiple: true,
    searchSelected: [],
    searchSelectedKeepUser: [],
    searchSelectedKeepOrgan: [],
    title: '新增',
    typeList: [],
    form: {
      sealId: '',
      sealNo: '',
      sealName: '',
      sealAlias: '',
      sealTypeId: '',
      subOrganId: '',
      subOrganName: '',
      keepUserId: '',
      keepUserName: '',
      keepOrganId: '',
      extShow: '1',
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
            'disabled-date': time => {
              return time.getTime() > Date.now() // 如果有后面的-8.64e7就是不可以选择今天的
            },
            'default-value': [
              new Date(new Date().setMonth(new Date().getMonth() - 1)),
              new Date()
            ]
          },
          style: {}
        },
        {
          id: 'keepUser',
          requestParams: 'keepUserIds',
          label: '保管人',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'user',
            placeholder: '+保管人',
            multiple: true,
            joinStr: ','
          },
          values: []
        },
        {
          id: 'keepOrgan',
          requestParams: 'keepOrganIds',
          label: '保管部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'organ',
            placeholder: '+保管部门',
            multiple: true,
            joinStr: ','
          },
          values: []
        },
        {
          id: 'sealStatus',
          label: '印章状态',
          type: 'checkButton',
          data: [
            {
              id: '0',
              name: '正常'
            },
            {
              id: '1',
              name: '停用'
            },
            {
              id: '2',
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
          if (column.property === 'sealName' || column.property === 'caozuo') {
            return {
              color: 'var(--jy-info-6)',
              cursor: 'pointer'
            }
          }
        }
      }
    },
    rankDisplayData: [
      {
        name: 't-zgj-Edit',
        label: '修改'
      },
      {
        name: 't-zgj-Delete',
        label: '删除'
      },
      {
        name: 't-zgj-seal.SetVisibility',
        label: '设置可见范围'
      },
      {
        name: 't-zgj-seal.SetAvailable',
        label: '设置可用范围'
      },
      {
        name: 'status',
        label: '停用'
      },
      {
        name: 't-zgj-status.Change',
        label: '变更'
      },
      {
        name: 't-zgj-status.Destroy',
        label: '销毁'
      }
    ],
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
        },
        {
          name: 't-zgj-view.SealUnbind',
          label: '印章解绑'
        }
      ]
    }
  })
  const closeChage = () => {
    showChangeDialog.value = false
  }
  const submitChange = () => {
    showChangeDialog.value = false
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
    console.log(cell)
    state.searchSelected = []
    if (column.sealStateId === '2') {
      return
    }
    state.sealIds = column.sealId
    if (cell.name === 't-zgj-Edit') {
      state.title = 't-zgj-Edit'
      getSealsInfo()
    }
    if (cell.name === 't-zgj-seal.SetVisibility') {
      depChoose.value = 't-zgj-seal.SetVisibility'
      api.sealInfoVisible(column.sealId).then(res => {
        if (res.data.organs?.length > 0) {
          res.data.organs.forEach(item => {
            state.searchSelected.push(item)
          })
        }
        if (res.data.roles?.length > 0) {
          res.data.roles.forEach(item => {
            state.searchSelected.push(item)
          })
        }
        if (res.data.users?.length > 0) {
          res.data.users.forEach(item => {
            state.searchSelected.push(item)
          })
        }
        console.log('state.searchSelected', state.searchSelected)
        showDepPerDialog.value = true
        state.tabsShow = ['organ', 'user', 'role']
      })
    }
    if (cell.name === 't-zgj-seal.SetAvailable') {
      depChoose.value = 't-zgj-seal.SetAvailable'
      api.sealInfoUsable(column.sealId).then(res => {
        if (res.data.organs?.length > 0) {
          res.data.organs.forEach(item => {
            state.searchSelected.push(item)
          })
        }
        if (res.data.roles?.length > 0) {
          res.data.roles.forEach(item => {
            state.searchSelected.push(item)
          })
        }
        if (res.data.users?.length > 0) {
          res.data.users.forEach(item => {
            state.searchSelected.push(item)
          })
        }
        console.log('state.searchSelected', state.searchSelected)
        showDepPerDialog.value = true
        state.tabsShow = ['organ', 'user', 'role']
      })
    }
    if (cell.name === 't-zgj-Delete') {
      state.JyElMessageBox.header.data = 't-zgj-Delete'
      state.JyElMessageBox.content.data = '请问确定要删除吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '删除'
    }
    // if (cell.name === 't-zgj-seal.deactivated') {
    //   state.JyElMessageBox.header.data = '停用'
    //   state.JyElMessageBox.content.data = '请问确定停用该印章吗？'
    //   state.JyElMessageBox.show = true
    //   state.JyElMessageBox.type = '停用'
    // }
    if (cell.name === 'status') {
      if (column.sealStateId === '0') {
        state.JyElMessageBox.header.data = 't-zgj-seal.deactivated'
        state.JyElMessageBox.content.data = '请问确定停用该印章吗？'
        state.JyElMessageBox.show = true
        state.JyElMessageBox.type = '停用'
      } else if (column.sealStateId === '1') {
        state.JyElMessageBox.header.data = 't-zgj-Enable'
        state.JyElMessageBox.content.data = '请问确定启用该印章吗？'
        state.JyElMessageBox.show = true
        state.JyElMessageBox.type = '启用'
      }
    }
    if (cell.name === 't-zgj-status.Destroy') {
      state.JyElMessageBox.header.data = 't-zgj-status.Destroy'
      state.JyElMessageBox.content.data = '请问确定销毁该印章吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '销毁'
    }
    if (cell.name === 't-zgj-status.Change') {
      showChangeDialog.value = true
      changeRef.value.getSealInfo(column.sealId, state.typeList)
    }
  }
  const getSealsInfo = () => {
    state.searchSelectedKeepOrgan = []
    api.sealInfo(state.sealIds).then(res => {
      if (res.code === 200) {
        state.form = res.data
        getStaffDetail(res.data.keepUserId)
        showLibraryDialog.value = true
      }
    })
  }
  const clickElement = (item, index) => {
    console.log(item)
  }
  const clickBatchButton = (item, datas) => {
    console.log(item)
    state.sealIds = ''
    state.componentsBatch.selectionData = datas
    console.log(state.componentsBatch.selectionData)
    const idList = []
    datas.forEach(element => {
      idList.push(element.sealId)
    })
    state.sealIds = idList.join(',')
    if (item.name === 't-zgj-view.SealUnbind') {
      state.showToastDialog.header.data = 't-zgj-view.SealUnbind'
      state.showToastDialog.content.data = '已选中以下印章，请问确定要解绑吗？'
      state.showToastDialog.show = true
      // state.showToastDialog.header.icon = '/src/assets/svg/common/danger.svg'
      state.butDatas = [
        {
          name: 't-zgj-select.confirm',
          type: 'primary',
          clickName: sureBatchUnbind
        },
        {
          name: 't-zgj-operation.cancel',
          type: '',
          clickName: closeBatchTabel
        }
      ]
    }
    if (item.name === 't-zgj-seal.BatchDelete') {
      state.showToastDialog.header.data = 't-zgj-seal.BatchDelete'
      state.showToastDialog.content.data =
        '已选中以下印章，请问确定要批量删除吗？'
      state.showToastDialog.show = true
      // state.showToastDialog.header.icon = '/src/assets/svg/common/danger.svg'
      state.butDatas = [
        {
          name: 't-zgj-select.confirm',
          type: 'primary',
          clickName: sureBatchDel
        },
        {
          name: 't-zgj-operation.cancel',
          type: '',
          clickName: closeBatchTabel
        }
      ]
    }
    if (item.name === 't-zgj-seal.BatchSetVisibility') {
      depChoose.value = 't-zgj-seal.BatchSetVisibility'
      showDepPerDialog.value = true
      state.tabsShow = ['organ', 'user', 'role']
    }
    if (item.name === 't-zgj-seal.BatchSetAvailable') {
      depChoose.value = 't-zgj-seal.BatchSetAvailable'
      showDepPerDialog.value = true
      state.tabsShow = ['organ', 'user', 'role']
    }
  }

  // 确定解绑
  const sureBatchUnbind = () => {
    // api.relationContractType(idList).then(res => {
    //   if (res.code === 200) {
    //     if (res.data.length > 0) {
    //       state.showToastDialog.header.data = '删除'
    //       state.showToastDialog.content.data =
    //         '选中的以下表单已关联了流程，不允许删除'
    //       state.showToastDialog.show = true
    //       state.showToastDialog.header.icon =
    //         '/src/assets/svg/common/danger.svg'
    //       state.componentsBatch.butDatas = [
    //         {
    //           name: '知道了',
    //           type: 'primary',
    //           clickName: closeBatchTabel
    //         }
    //       ]
    //     } else {
    //     }
    //   } else {
    //     console.log(res)
    //   }
    // })
    api.sealInfoUnbind({ ids: state.sealIds }).then(res => {
      state.showToastDialog.show = false
      ElMessage.success('解绑成功！')
      table.value.reloadData()
    })
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
          state.showToastDialog.header.data = 't-zgj-Delete'
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
            ElMessage.success('批量删除成功！')
            table.value.reloadData()
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
    console.log('state.sealIds', state.sealIds)
    state.JyElMessageBox.show = false
    if (type === '删除') {
      apiOpt(type, api.sealInfoDelete({ ids: state.sealIds }))
    }
    if (type === '停用') {
      apiOpt(type, api.sealInfoDisable(state.sealIds))
    }
    if (type === '启用') {
      apiOpt(type, api.sealInfoEnable(state.sealIds))
    }
    if (type === '销毁') {
      apiOpt(type, api.sealInfoDestroy(state.sealIds))
    }
  }
  const apiOpt = (typeName, apiName) => {
    apiName.then(res => {
      if (res.code === 200) {
        ElMessage.success(`${typeName}成功！`)
        table.value.reloadData()
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
          sealTypeId: '',
          children: res.data
        }
      ]
      table.value.reloadData()
    })
  }
  const showDepPerDialog = ref(false)
  const submitSelectDepart = data => {
    if (data) {
      console.log(data)
      if (depChoose.value === 'keepUser' || depChoose.value === 'keepOrgan') {
        state.form[depChoose.value + 'Id'] = data[0].id
        if (depChoose.value === 'keepUser') {
          getStaffDetail(data[0].id)
          state.searchSelectedKeepUser = data
        } else if (depChoose.value === 'keepOrgan') {
          state.searchSelectedKeepOrgan = data
        }
        state.form[depChoose.value + 'Name'] = data[0].name
      } else {
        if (data?.length <= 0) {
          ElMessage.error('至少选择一个！')
          showDepPerDialog.value = true
          return false
        }
        const params = {
          id: '',
          ids: [],
          roleIds: [],
          organs: [],
          userIds: []
        }
        data.forEach(item => {
          if (item.type === 'organ') {
            params.organs.push({
              id: item.id,
              includeChild: item.haveChildren ? '1' : '0'
            })
          } else if (item.type === 'user') {
            params.userIds.push(item.id)
          } else if (item.type === 'role') {
            params.roleIds.push(item.id)
          }
        })
        if (depChoose.value === 't-zgj-seal.SetAvailable') {
          // 设置可用范围
          params.id = state.sealIds
          setSealInfo(api.saveSealInfoUsable(params))
        } else if (depChoose.value === 't-zgj-seal.SetVisibility') {
          // 设置可见范围
          params.id = state.sealIds
          console.log(params.userIds)
          if (params.userIds.length <= 0) {
            ElMessage.error('可见人员至少需要一个！')
            return false
          }
          setSealInfo(api.saveSealInfoVisible(params))
        } else if (depChoose.value === 't-zgj-seal.BatchSetVisibility') {
          // 批量设置可见范围
          params.ids = state.sealIds.split(',')
          setSealInfo(api.batchSaveSealInfoVisible(params))
        } else if (depChoose.value === 't-zgj-seal.BatchSetAvailable') {
          // 批量设置可用范围
          params.ids = state.sealIds.split(',')
          setSealInfo(api.batchSaveSealInfoUsable(params))
        }
      }
    }
  }
  // 设置可见可用范围
  const setSealInfo = api => {
    api.then(res => {
      if (res.code === 200) {
        ElMessage.success('设置成功')
      }
    })
  }
  // 获取员工详情
  const getStaffDetail = id => {
    state.searchSelectedKeepOrgan = []
    staffApi.userGet(id).then(res => {
      if (res.code === 200) {
        state.searchSelectedKeepOrgan.push({
          value: res.data.hostOrganId,
          label: res.data.hostOrganName
        })
        if (res.data.partTimeOrgans && res.data.partTimeOrgans.length > 0) {
          res.data.partTimeOrgans.forEach(item => {
            state.searchSelectedKeepOrgan.push({
              value: item.organId,
              label: item.organName
            })
          })
        }
        state.form.keepOrganId = state.form.keepOrganId
          ? state.form.keepOrganId
          : res.data.hostOrganId
        const map = new Map()
        for (const item of state.searchSelectedKeepOrgan) {
          map.set(item.value, item)
        }
        state.searchSelectedKeepOrgan = [...map.values()]
      }
    })
  }
  const chooseOrgan = (type, tabs, multiple) => {
    state.multiple = multiple
    depChoose.value = type
    state.tabsShow = []
    state.searchSelected = []
    state.searchSelectedKeepUser = []
    if (type === 'keepUser') {
      if (
        state.searchSelectedKeepUser &&
        state.searchSelectedKeepUser.length > 0
      ) {
        state.searchSelected = state.searchSelectedKeepUser
      } else {
        if (
          state.form[type + 'Id'] !== '' &&
          state.form[type + 'Name'] !== ''
        ) {
          state.searchSelectedKeepUser.push({
            id: state.form[type + 'Id'],
            name: state.form[type + 'Name'],
            type: tabs[0]
          })
        }
        state.searchSelected = state.searchSelectedKeepUser
      }
    } else {
      if (state.form[type + 'Id'] !== '' && state.form[type + 'Name'] !== '') {
        state.searchSelected.push({
          id: state.form[type + 'Id'],
          name: state.form[type + 'Name'],
          type: tabs[0]
        })
      }
    }

    console.log(tabs)
    state.tabsShow = tabs
    showDepPerDialog.value = true
  }

  // const clear = type => {
  //   if (type === 'keepUser') {
  //     state.searchSelectedKeepUser = []
  //   }
  //   state.form[type + 'Id'] = ''
  //   state.form[type + 'Name'] = ''
  // }
  const currentChange = e => {
    console.log(e)
    queryParams.value = e.sealTypeId ? { sealTypeIds: e.sealTypeId } : null
    table.value.reloadData()
  }
  const showDeleted = () => {
    router.push({
      name: 'DelLibraryOfSeals'
    })
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
  .rankDisplayData {
    display: flex;
    // justify-content: space-around;
    // text-align: center;
    color: var(--jy-info-6);

    .rankDisplayData-node {
      cursor: pointer;
      margin-right: 0.5rem;
    }

    .rankDisplayData-more {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  :deep {
    .el-dropdown-item-add {
      color: var(--jy-secondary-5) !important;
    }
    .el-dropdown-item-add:hover {
      background: #fff;
    }
  }

  .rankDisplayData-add {
    color: var(--jy-secondary-5);
  }
  .flag-cell {
    display: flex;
    align-items: center;
    .diot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 5px;
    }
    .diot-1 {
      background: rgba($color: #000000, $alpha: 0.45);
    }

    .diot-0 {
      background: rgba($color: green, $alpha: 0.65);
    }
  }

  .center {
    justify-content: center;
  }
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
          img {
            margin-right: 5px;
          }
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
  .sealForm {
    .upload-demo {
      width: 100%;
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
        inset;
      border-radius: var(
        --el-input-border-radius,
        var(--el-border-radius-base)
      );
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
  }
</style>

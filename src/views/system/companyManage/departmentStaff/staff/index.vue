<!--
* @Descripttion 员工管理
* @FileName index.vue
* @Author Guanpf
* @LastEditTime 2023-03-09 10:22:26
!-->
<template>
  <div>
    <JyTable
      url="/user/page"
      ref="table"
      :hasTree="true"
      :needAutoRequest="false"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      tableClick="userName"
      statusColoum="flag"
      openValue="启用"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
      :queryParams="{ organId }"
    >
      <template #title>
        <div class="title">
          <div>{{ $t('t-zgj-F_SYSTEM_PERSON_MANAGE') }}</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="addStaff"
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
                    <el-dropdown-item>{{
                      $t('t-zgj-F_SYSTEM_PERSON_MANAGE_IMPORT')
                    }}</el-dropdown-item>
                    <el-dropdown-item>{{
                      $t('t-zgj-F_SYSTEM_FACEINFO_MANAGE_IMPORT')
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </template>
      <template #tree>
        <div class="components-tree">
          <el-tree
            :data="state.componentsTree.data"
            :props="state.componentsTree.defaultProps"
            v-bind="state.componentsTree.defaultAttribute"
            lazy
            :load="loadFn"
            @current-change="currentChange"
          ></el-tree>
          <!-- @node-contextmenu="nodeContextmenu" -->
        </div>
      </template>
    </JyTable>
    <!-- 新增员工 -->
    <JyDialog
      :show="showStaffDialog"
      :title="$t(state.title)"
      :centerBtn="true"
      :confirmLoading="confirmLoading"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="900"
      destroy-on-close
      :height="600"
      @close="closeStaffFrom"
      @confirm="submitStaffForm"
      class="staff-add"
    >
      <el-form
        :model="state.componentsAddForm.formData"
        :rules="state.componentsAddForm.formRules"
        ref="formStaffRef"
        label-width="100px"
      >
        <el-form-item label="姓名" prop="userName">
          <el-input
            v-model="state.componentsAddForm.formData.userName"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item label="帐号" prop="accountNo">
          <el-input
            v-model="state.componentsAddForm.formData.accountNo"
            placeholder="请输入帐号"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="userTel">
          <el-input
            v-model="state.componentsAddForm.formData.userTel"
            maxlength="11"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="所属部门" prop="hostOrganName">
          <div class="select-box-contBox">
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              v-model="state.componentsAddForm.formData.hostOrganName"
              placeholder="请选择所属部门"
              @click="chooseOrgan('hostOrgan', false)"
            />
            <div class="ap-box-contBox-icon">
              <!-- <el-icon
                style="color: #aaaaaa; margin-right: 5px"
                v-if="state.componentsAddForm.formData.hostOrganName"
                @click="clear('hostOrgan')"
                ><CircleClose
              /></el-icon> -->
              <img
                @click="chooseOrgan('hostOrgan', false)"
                class="ap-box-contBox-icon-img"
                src="@/assets/svg/ketanchude.svg"
                alt=""
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="兼职部门" prop="partTimeOrganIds">
          <div class="ap-box-contBox">
            <el-select
              v-model="state.componentsAddForm.formData.partTimeOrganIds"
              multiple
              placeholder="请选择兼职部门"
              style="width: 100%"
              popper-class="hidePoper"
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="5"
              @click="chooseOrgan('partTimeOrgan', true)"
              @remove-tag="removeDeptTag($event, 'partTimeOrgan')"
            >
              <el-option
                v-for="one in state.tabSelects.partTimeOrgansSelected"
                :key="one.value"
                :label="one.label"
                :value="one.value"
              />
            </el-select>
            <div
              class="ap-box-contBox-icon"
              @click="chooseOrgan('partTimeOrgan', true)"
            >
              <img
                class="ap-box-contBox-icon-img"
                src="@/assets/svg/ketanchude.svg"
                alt=""
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="职位" prop="userTitle">
          <el-input
            v-model="state.componentsAddForm.formData.userTitle"
            placeholder="请输入职位"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="userMail">
          <el-input
            v-model="state.componentsAddForm.formData.userMail"
            placeholder="请输入邮箱"
          />
        </el-form-item>
        <el-form-item label="工号" prop="userNo">
          <el-input
            v-model="state.componentsAddForm.formData.userNo"
            placeholder="请输入工号"
          />
        </el-form-item>
        <el-form-item label="主管" prop="leaderUserName">
          <div class="select-box-contBox">
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              v-model="state.componentsAddForm.formData.leaderUserName"
              placeholder="请选择主管"
              @click="chooseOrgan('leaderUser', false)"
            />
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              type="hidden"
              v-model="state.componentsAddForm.formData.leaderUserId"
              placeholder="请选择"
            />
            <div class="ap-box-contBox-icon">
              <!-- <el-icon
                style="color: #aaaaaa; margin-right: 5px"
                v-if="state.componentsAddForm.formData.leaderUserId"
                @click="clear('leaderUser')"
                ><CircleClose
              /></el-icon> -->
              <img
                @click="chooseOrgan('leaderUser', false)"
                class="ap-box-contBox-icon-img"
                src="@/assets/svg/ketanchude.svg"
                alt=""
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <div class="ap-box-contBox">
            <el-select
              v-model="state.componentsAddForm.formData.roleIds"
              multiple
              placeholder="请选择角色"
              style="width: 100%"
              popper-class="hidePoper"
              @click="chooseOrgan('roles', true)"
              @remove-tag="removeDeptTag($event, 'roles')"
            >
              <el-option
                v-for="one in state.tabSelects.rolesSelected"
                :key="one.value"
                :label="one.label"
                :value="one.value"
              />
            </el-select>
            <div
              class="ap-box-contBox-icon"
              @click="chooseOrgan('roles', true)"
            >
              <img
                class="ap-box-contBox-icon-img"
                src="@/assets/svg/ketanchude.svg"
                alt=""
              />
            </div>
          </div>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="企业微信ID" prop="qweiNo">
              <el-input
                v-model="state.componentsAddForm.formData.qweiNo"
                placeholder="请输入企业微信ID"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="钉钉ID" prop="dingdingNo">
              <el-input
                v-model="state.componentsAddForm.formData.dingdingNo"
                placeholder="请输入钉钉ID"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="人脸照片" prop="userFaceId">
              <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                list-type="picture-card"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-input
                  type="hidden"
                  v-model="state.componentsAddForm.formData.userFaceId"
                />
                <img
                  v-if="state.componentsAddForm.formData.userFaceUrl"
                  :src="state.componentsAddForm.formData.userFaceUrl"
                  class="avatar"
                />
                <svg
                  class="iconpark-icon"
                  v-else
                  style="width: 28px; color: var(--el-text-color-secondary)"
                >
                  <use href="#icon-add"></use>
                </svg>
                <template #tip>
                  <div class="el-upload__tip"
                    >1.支持上传JPG/JPEG/PNG格式的人脸图片，大小不超过5M</div
                  >
                  <div class="el-upload__tip"
                    >2.请尽量保证人脸图形完整清晰，没有遮挡</div
                  >
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="readme">
              <el-input
                type="textarea"
                :rows="7"
                v-model="state.componentsAddForm.formData.readme"
                placehoder="请输入备注"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JyDialog>
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      v-if="showDepPerDialog"
      :show="showDepPerDialog"
      :multiple="state.multiple"
      @update:show="showDepPerDialog = $event"
      :tabsShow="state.tabsShow"
      @update:searchSelected="submitSelectDepart"
      :searchSelected="state.tabSelects.searchSelected"
      :haveIncluded="false"
    >
    </kDepartOrPersonVue>
    <!-- 单据详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>
    <!-- 弹窗提示 -->
    <!-- <JyElMessageBox
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
      </JyElMessageBox> -->
    <!-- 批量操作弹框提示 -->
    <actionMoreDialog
      @update:modelValue="state.showToastDialog.show = false"
      :show="state.showToastDialog.show"
      :selectionData="state.componentsBatch.selectionData"
      :showToastDialogContent="state.showToastDialog"
      label="userName"
      :oneBtn="state.showToastDialog.oneBtn"
      :confirmText="state.showToastDialog.confirmText"
      @cancel="closeMoreDialog"
      @sureAction="submitElMessageBox(state.showToastDialog.type)"
    ></actionMoreDialog>
    <!-- 单个操作 -->
    <actionOneDialog
      v-model="state.JyElMessageBox.show"
      :JyElMessageBox="state.JyElMessageBox"
      :confirmText="state.JyElMessageBox.confirmText"
      :oneBtn="state.JyElMessageBox.oneBtn"
      @update:modelValue="state.JyElMessageBox.show"
      @submitElMessageBox="submitElMessageBox(state.JyElMessageBox.type)"
    ></actionOneDialog>
    <UpdatePassword
      v-model="showPass"
      :show="showPass"
      :title="passTitle"
      :userIds="state.componentsBatch.userIds"
      @on-confirm="confirmPass"
      @on-cancel="closePass"
    >
    </UpdatePassword>
    <UploadFace
      v-model="showUpload"
      :show="showUpload"
      :userId="state.componentsBatch.userIds[0]"
      @on-confirm="confirmUpload"
      @on-cancel="closeUpload"
    >
    </UploadFace>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted, nextTick } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import UpdatePassword from './modules/updatePassword.vue'
  import UploadFace from './modules/uploadFace.vue'
  import { ElMessage } from 'element-plus'
  import tableHeader from '@/views/tableHeaderJson/system/companyManage/departmentStaff/departmentStaff.json'
  import api from '@/api/system/companyManagement/departmentStaff'
  import department from '@/api/system/companyManagement/department'
  import actionMoreDialog from '@/views/components/actionMoreDialog'
  import actionOneDialog from '@/views/components/actionOneDialog'
  import { getItem } from '@/utils/storage'
  // 显示新增员工弹窗
  const showStaffDialog = ref(false)
  // 显示部门弹窗
  const showDepPerDialog = ref(false)
  // 员工表单Ref
  const formStaffRef = ref(null)
  const depChoose = ref(null)
  // 显示修改密码他创
  const showPass = ref(false)
  const passTitle = ref('t-zgj-index.updatePwd')
  // 显示重置人脸弹窗
  const showUpload = ref(false)
  // 侧边栏树选中id
  const organId = ref('-1')
  const table = ref(null)
  const firstNode = ref(null)
  const firstTreeData = ref([])
  const confirmLoading = ref(false)

  const state = reactive({
    showToastDialog: {
      show: false,
      header: {
        data: '',
        icon: '/src/assets/svg/common/warning.svg'
      },
      content: {
        data: ''
      },
      type: '批量删除',
      oneBtn: false,
      confirmText: 't-zgj-know'
    },
    title: 't-zgj-add',
    tabsShow: ['organ'],
    multiple: true,
    tabSelects: {
      // 部门弹窗选中信息
      searchSelected: [],
      // 部门选中信息
      hostOrganSelected: [],
      // 角色选中信息
      rolesSelected: [],
      // 主管选中信息
      leaderUserSelected: [],
      // 兼职部门选中信息
      partTimeOrgansSelected: []
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
      type: '删除',
      oneBtn: false,
      confirmText: '',
      column: {}
    },
    componentsAddForm: {
      formData: {
        userId: '',
        userName: '',
        accountNo: '',
        userTel: '',
        hostOrganId: '',
        hostOrganName: '',
        partTimeOrganIds: [],
        partTimeOrgans: [],
        userTitle: '',
        userMail: '',
        roleIds: [],
        roles: [],
        qweiNo: '',
        dingdingNo: '',
        userNo: '',
        leaderUserId: '',
        leaderUserName: '',
        userFaceId: '',
        readme: ''
      },
      formRules: {
        userName: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'change'
          }
        ],
        accountNo: [
          {
            required: true,
            message: '请输入帐号',
            trigger: 'change'
          }
        ],
        userTel: [
          {
            required: true,
            message: '请输入正确的手机号',
            pattern:
              /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
            trigger: 'change'
          }
        ],
        hostOrganName: [
          {
            required: true,
            message: '请选择所属部门',
            trigger: 'change'
          }
        ],
        roleIds: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }
        ]
      }
    },
    componentsSearchForm: {
      data: [
        {
          id: 'keyWord',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '姓名/账号/职位'
          }
        },
        {
          id: 'flag',
          label: '状态',
          type: 'select',
          inCommonUse: true,
          options: [
            {
              status: '0',
              statusLabel: '停用'
            },
            {
              status: '1',
              statusLabel: '启用'
            }
          ],
          optionLabel: 'statusLabel',
          optionValue: 'status',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          }
        },
        {
          id: 'faceState',
          label: '人脸状态',
          type: 'select',
          inCommonUse: false,
          options: [
            {
              faceState: '0',
              faceStateLabel: '未绑定'
            },
            {
              faceState: '1',
              faceStateLabel: '已绑定'
            }
          ],
          optionLabel: 'faceStateLabel',
          optionValue: 'faceState',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          }
        }
        // {
        //   id: 'organId',
        //   requestParams: 'organId',
        //   label: '所属部门',
        //   type: 'derivable',
        //   inCommonUse: false,
        //   // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        //   defaultAttribute: {
        //     type: 'organ',
        //     placeholder: '请选择',
        //     joinStr: ',',
        //     multiple: false
        //   },
        //   values: []
        // }
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
      header: tableHeader
    },

    componentsTree: {
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': false,
        'expand-on-click-node': false,
        'check-strictly': true,
        'highlight-current': true,
        'node-key': 'organId',
        'current-node-key': '-1',
        accordion: true
      },
      defaultProps: {
        label: 'organName',
        children: 'children',
        isLeaf: 'haveChildren'
      },
      value: ''
    },

    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '员工详情',
          name: 'Staff-Details'
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
          name: 't-zgj-dept.BatchDeactivation'
        },
        {
          name: 't-zgj-dept.BatchEnable'
        },
        {
          name: 't-zgj-seal.BatchDelete'
        },
        {
          name: 't-zgj-findpwd.batchResetPassword'
        }
      ],
      userIds: []
    }
  })
  function loadFn(node, resolve) {
    if (node.level === 0) {
      firstNode.value = node
      department
        .subOrganList(-1)
        .then(res => {
          res.data.forEach(i => (i.haveChildren = !i.haveChildren))
          firstTreeData.value = res.data
          return resolve([
            {
              organName:
                getItem('accountInfo') && getItem('accountInfo').userDepartName,
              organId: '-1',
              haveChildren: false,
              children: []
            }
          ])
        })
        .then(() => {
          nextTick(() => {
            const nodeData = firstNode.value.childNodes[0]
            nodeData.expanded = true
            nodeData.loadData()
          })
        })
    } else if (node.level === 1) {
      return resolve(firstTreeData.value)
    } else {
      department.subOrganList(node.data.organId).then(res => {
        res.data.forEach(i => (i.haveChildren = !i.haveChildren))
        return resolve(res.data)
      })
    }
  }

  // 提交密码
  const confirmPass = data => {
    console.log(data)
    showPass.value = false
  }
  // 关闭密码弹窗
  const closePass = data => {
    showPass.value = false
  }
  // 提交人脸
  const confirmUpload = data => {
    showUpload.value = false
  }
  // 关闭人脸弹窗
  const closeUpload = data => {
    showUpload.value = false
  }

  // 新增员工
  const addStaff = () => {
    state.title = 't-zgj-add'
    showStaffDialog.value = true
    state.tabSelects.partTimeOrgansSelected = []
    state.componentsAddForm.formData.partTimeOrganIds = []
    state.componentsAddForm.formData.partTimeOrgans = []
    state.tabSelects.rolesSelected = []
    state.componentsAddForm.formData.roleIds = []
    state.componentsAddForm.formData.roles = []
    for (const item in state.componentsAddForm.formData) {
      if (!Array.isArray(item)) {
        state.componentsAddForm.formData[item] = ''
      }
    }
    nextTick(() => {
      formStaffRef.value.resetFields()
    })
  }
  // 选择部门弹窗
  const chooseOrgan = (type, multiple) => {
    depChoose.value = type
    state.multiple = multiple
    state.tabsShow = []
    state.tabSelects.searchSelected = []
    if (depChoose.value === 'hostOrgan') {
      state.tabsShow = ['organ']
      state.tabSelects.searchSelected = state.tabSelects.hostOrganSelected
    }
    if (depChoose.value === 'partTimeOrgan') {
      state.tabsShow = ['organ']
      state.tabSelects.searchSelected =
        state.tabSelects.partTimeOrgansSelected.length > 0
          ? state.tabSelects.partTimeOrgansSelected.map(i => {
              return {
                id: i.value,
                name: i.label,
                haveChildren: i.haveChildren,
                type: 'organ'
              }
            })
          : []
    }
    if (depChoose.value === 'roles') {
      // selectRolesRef.value.blur()
      state.tabsShow = ['role']
      state.tabSelects.searchSelected = state.tabSelects.rolesSelected
      state.tabSelects.searchSelected =
        state.tabSelects.rolesSelected.length > 0
          ? state.tabSelects.rolesSelected.map(i => {
              return {
                id: i.value,
                name: i.label,
                type: 'role'
              }
            })
          : []
    }
    if (depChoose.value === 'leaderUser') {
      state.tabsShow = ['user']
      state.tabSelects.searchSelected = state.tabSelects.leaderUserSelected
    }
    showDepPerDialog.value = true
  }
  // 获取部门
  const submitSelectDepart = item => {
    if (depChoose.value === 'hostOrgan') {
      state.tabSelects.hostOrganSelected = item
      state.componentsAddForm.formData.hostOrganName = item[0].name
      state.componentsAddForm.formData.hostOrganId = item[0].id
    }
    if (depChoose.value === 'partTimeOrgan') {
      state.tabSelects.partTimeOrgansSelected = []
      state.componentsAddForm.formData.partTimeOrgans = []
      if (item.length > 0) {
        state.tabSelects.partTimeOrgansSelected = item.map(i => {
          return {
            label: i.name,
            value: i.id,
            type: 'organ',
            haveChildren: i.haveChildren
          }
        })
        state.componentsAddForm.formData.partTimeOrganIds = item.map(i => {
          return i.id
        })
      }
    }
    if (depChoose.value === 'roles') {
      state.tabSelects.rolesSelected = []
      state.componentsAddForm.formData.roles = []
      if (item.length > 0) {
        state.tabSelects.rolesSelected = item.map(i => {
          return {
            label: i.name,
            value: i.id,
            type: 'role'
          }
        })
        state.componentsAddForm.formData.roleIds = item.map(i => {
          return i.id
        })
      }
    }
    if (depChoose.value === 'leaderUser') {
      state.tabSelects.leaderUserSelected = item
      state.componentsAddForm.formData.leaderUserId = item[0].id
      state.componentsAddForm.formData.leaderUserName = item[0].name
    }
    showDepPerDialog.value = false
  }
  // 上传图片
  const handleAvatarSuccess = (res, file) => {
    console.log(res, file)
  }
  // 上传图片前处理
  const beforeAvatarUpload = file => {
    console.log(file)
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isJPG && isLt2M
  }
  // 批量操作
  const clickBatchButton = (item, selection) => {
    const list = (state.componentsBatch.selectionData = selection)
    const nameIdArr = []
    list.forEach(el => {
      nameIdArr.push(el.userId)
    })
    state.componentsBatch.userIds = nameIdArr
    if (item.name === 't-zgj-dept.BatchDeactivation') {
      state.showToastDialog.header.data = 't-zgj-dept.BatchDeactivation'
      state.showToastDialog.content.data =
        '已选中以下用户，请问确定要批量停用吗？'
      state.showToastDialog.show = true
      state.showToastDialog.type = '批量停用'
    }
    if (item.name === 't-zgj-dept.BatchEnable') {
      state.showToastDialog.header.data = 't-zgj-dept.BatchEnable'
      state.showToastDialog.content.data =
        '已选中以下用户，请问确定要批量启用吗？'
      state.showToastDialog.show = true
      state.showToastDialog.type = '批量启用'
    }
    if (item.name === 't-zgj-seal.BatchDelete') {
      state.showToastDialog.header.data = 't-zgj-seal.BatchDelete'
      state.showToastDialog.content.data =
        '已选中以下用户，请问确定要批量删除吗？'
      state.showToastDialog.show = true
      state.showToastDialog.type = '批量删除'
    }
    if (item.name === 't-zgj-findpwd.batchResetPassword') {
      passTitle.value = 't-zgj-findpwd.batchResetPassword'
      showPass.value = true
    }
  }
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    if (column.property === 'userName') {
      api.userGet(row.userId).then(res => {
        if (res.code === 200) {
          const partTimeOrgans = []
          const roles = []
          res.data.partTimeOrgans.forEach(item => {
            partTimeOrgans.push({
              name: item.organName
            })
          })
          res.data.roles.forEach(item => {
            roles.push(item.roleName)
          })
          const baseData = {
            name: res.data.userName ? res.data.userName : '-',
            cellPhone: res.data.userTel ? res.data.userTel : '-',
            account: res.data.accountNo ? res.data.accountNo : '-',
            hostOrganName: res.data.hostOrganName
              ? res.data.hostOrganName
              : '-',
            departmentList: partTimeOrgans || '-',
            role: roles ? roles.join('、') : '-',
            jobTitle: res.data.userTitle ? res.data.userTitle : '-',
            mailbox: res.data.userMail ? res.data.userMail : '-',
            EnterpriseWechatID: res.data.qweiNo ? res.data.qweiNo : '-',
            NailID: res.data.dingdingNo ? res.data.dingdingNo : '-',
            remark: res.data.readme ? res.data.readme : '-',
            FacePicturePath: res.data.userFaceUri ? res.data.userFaceUri : ''
          }
          state.componentsDocumentsDetails.visible.forEach((item, index) => {
            if (item.name === 'Staff-Details') {
              state.componentsDocumentsDetails.visible[index][
                'basicInformation-data'
              ] = baseData
            }
          })
        }
      })

      state.componentsDocumentsDetails.show = true
    }
  }
  const customClick = (row, column, cell, event) => {
    state.JyElMessageBox.oneBtn = false
    state.JyElMessageBox.confirmText = 't-zgj-select.confirm'
    const nameIdArr = []
    nameIdArr.push(column.userId)
    state.componentsBatch.userIds = nameIdArr
    if (cell.name === 't-zgj-Edit') {
      state.title = 't-zgj-Edit'
      state.componentsAddForm.formData.partTimeOrgans = []
      state.componentsAddForm.formData.partTimeOrganIds = []
      state.componentsAddForm.formData.roleIds = []
      state.componentsAddForm.formData.roles = []
      state.tabSelects.rolesSelected = []
      state.tabSelects.partTimeOrgansSelected = []
      api.userGet(column.userId).then(res => {
        state.tabSelects.leaderUserSelected = [
          {
            id: res.data.leaderUserId,
            name: res.data.leaderUserName,
            type: 'user'
          }
        ]
        state.tabSelects.hostOrganSelected = [
          {
            id: res.data.hostOrganId,
            name: res.data.hostOrganName,
            type: 'organ'
          }
        ]
        for (const item in res.data) {
          state.componentsAddForm.formData[item] = res.data[item]
          if (item === 'partTimeOrgans' && res.data[item].length > 0) {
            state.tabSelects.partTimeOrgansSelected = res.data[item].map(i => {
              return {
                value: i.organId,
                label: i.organName,
                haveChildren: i.haveChildren,
                type: 'organ'
              }
            })
            state.tabSelects.partTimeOrgansSelected = arrNodup(
              state.tabSelects.partTimeOrgansSelected
            )
            state.componentsAddForm.formData.partTimeOrganIds = res.data[
              item
            ].map(i => i.organId)
          }
          if (item === 'roles' && res.data[item].length > 0) {
            state.tabSelects.rolesSelected = arrNodup(
              state.tabSelects.rolesSelected
            )
            state.tabSelects.rolesSelected = res.data[item].map(i => {
              return {
                value: i.roleId,
                label: i.roleName,
                type: 'role'
              }
            })
            state.componentsAddForm.formData.roleIds = res.data[item].map(
              i => i.roleId
            )
          }
        }
      })
      showStaffDialog.value = true
    }
    if (cell.name === 'status' && column.flag === '启用') {
      state.JyElMessageBox.header.data = 't-zgj-seal.deactivated'
      state.JyElMessageBox.content.data = '确认要停用该员工吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '停用'
    }
    if (cell.name === 'status' && column.flag === '停用') {
      state.JyElMessageBox.header.data = 't-zgj-Enable'
      state.JyElMessageBox.content.data = '确认要启用该员工吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '启用'
    }
    if (cell.name === 't-zgj-Delete') {
      state.JyElMessageBox.column = column
      state.JyElMessageBox.header.data = 't-zgj-Delete'
      state.JyElMessageBox.content.data = '确认要删除该员工吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '删除'
    }
    if (cell.name === 't-zgj-findpwd.resetPassword') {
      passTitle.value = 't-zgj-findpwd.resetPassword'
      showPass.value = true
    }
    if (cell.name === 't-zgj-F_SEAL_CONSOLE_FACE_SETTING') {
      showUpload.value = true
    }
  }
  const closeMoreDialog = () => {
    state.showToastDialog.show = false
    setTimeout(() => {
      state.showToastDialog.oneBtn = false
      state.showToastDialog.confirmText = 't-zgj-select.confirm'
    }, 1000)
  }
  // 提交弹窗
  const submitElMessageBox = type => {
    console.log(type)
    if (type === '停用') {
      api.userDisable(state.componentsBatch.userIds[0]).then(res => {
        if (res.code === 200) {
          ElMessage.success(`${type}成功！`)
          state.JyElMessageBox.show = false
          table.value.reloadData()
        }
      })
    }
    if (type === '启用') {
      api.userEnable(state.componentsBatch.userIds[0]).then(res => {
        if (res.code === 200) {
          ElMessage.success(`${type}成功！`)
          state.JyElMessageBox.show = false
          table.value.reloadData()
        }
      })
    }
    if (type === '删除') {
      console.log(state.JyElMessageBox.column)
      if (state.JyElMessageBox.column.flag === '启用') {
        state.JyElMessageBox.header.data = 't-zgj-Delete'
        state.JyElMessageBox.content.data = '请停用该员工后再进行删除'
        state.JyElMessageBox.oneBtn = true
        state.JyElMessageBox.type = '提示'
        state.JyElMessageBox.confirmText = 't-zgj-know'
        return false
      }
      api.userDelete(state.componentsBatch.userIds[0]).then(res => {
        if (res.code === 200) {
          ElMessage.success(`${type}成功！`)
          state.JyElMessageBox.show = false
          table.value.reloadData()
        }
      })
    }
    if (type === '批量停用') {
      api.userBatchDisable(state.componentsBatch.userIds).then(res => {
        if (res.code === 200) {
          ElMessage.success(`${type}成功！`)
          state.showToastDialog.show = false
          table.value.reloadData()
        }
      })
    }
    if (type === '批量启用') {
      api.userBatchEnable(state.componentsBatch.userIds).then(res => {
        if (res.code === 200) {
          ElMessage.success(`${type}成功！`)
          state.showToastDialog.show = false
          table.value.reloadData()
        }
      })
    }
    if (type === '批量删除') {
      const enableList = []
      state.componentsBatch.selectionData.forEach(element => {
        if (element.flag === '启用') {
          enableList.push(element)
        }
      })
      if (enableList.length > 0) {
        state.showToastDialog.content.data = '请将以下员工停用后再进行删除'
        state.componentsBatch.selectionData = enableList
        state.showToastDialog.confirmText = 't-zgj-know'
        state.showToastDialog.oneBtn = true
        return false
      }
      api.userBatchDelete(state.componentsBatch.userIds).then(res => {
        if (res.code === 200) {
          ElMessage.success(`${type}成功！`)
          state.showToastDialog.show = false
          table.value.reloadData()
        }
      })
    }
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }

  // 提交新增表单
  const submitStaffForm = data => {
    formStaffRef.value.validate(valid => {
      if (valid) {
        confirmLoading.value = true
        state.componentsAddForm.formData.partTimeOrgans = []
        state.tabSelects.partTimeOrgansSelected = arrNodup(
          state.tabSelects.partTimeOrgansSelected
        )
        state.tabSelects.rolesSelected = arrNodup(
          state.tabSelects.rolesSelected
        )
        state.componentsAddForm.formData.partTimeOrganIds.forEach(el => {
          state.tabSelects.partTimeOrgansSelected.forEach(item => {
            if (el === item.value) {
              state.componentsAddForm.formData.partTimeOrgans.push({
                organId: item.value,
                organName: item.label,
                haveChildren: item.haveChildren
              })
            }
          })
        })
        state.componentsAddForm.formData.roles = []
        state.componentsAddForm.formData.roleIds.forEach(el => {
          state.tabSelects.rolesSelected.forEach(item => {
            if (el === item.value) {
              state.componentsAddForm.formData.roles.push({
                roleId: item.value,
                roleName: item.label
              })
            }
          })
        })
        if (state.componentsAddForm.formData.userId) {
          submitEditStaff(state.componentsAddForm.formData)
        } else {
          submitAddStaff(state.componentsAddForm.formData)
        }
      } else {
        // ElMessage.error('校验失败')
        confirmLoading.value = false
      }
    })
  }
  // 数组去重
  const arrNodup = arr => {
    const map = new Map()
    for (const item of arr) {
      map.set(item.value, item)
    }
    arr = [...map.values()]
    return arr
  }
  const submitAddStaff = data => {
    api
      .userAdd(state.componentsAddForm.formData)
      .then(res => {
        if (res.code === 200) {
          ElMessage.success('新增员工成功！')
          table.value.reloadData()
          formStaffRef.value.resetFields()
          showStaffDialog.value = false
          state.tabSelects = {
            // 部门弹窗选中信息
            searchSelected: [],
            // 部门选中信息
            hostOrganSelected: [],
            // 角色选中信息
            rolesSelected: [],
            // 主管选中信息
            leaderUserSelected: []
          }
        } else {
          confirmLoading.value = false
        }
        confirmLoading.value = false
      })
      .catch(() => {
        confirmLoading.value = false
      })
  }
  const submitEditStaff = data => {
    api.userEdit(data).then(res => {
      if (res.code === 200) {
        ElMessage.success('修改员工成功！')
        formStaffRef.value.resetFields()
        table.value.reloadData()
        showStaffDialog.value = false
        state.tabSelects = {
          // 部门弹窗选中信息
          searchSelected: [],
          // 部门选中信息
          hostOrganSelected: [],
          // 角色选中信息
          rolesSelected: [],
          // 主管选中信息
          leaderUserSelected: [],
          // 兼职部门选中信息
          partTimeOrgansSelected: []
        }
      }
      confirmLoading.value = false
    })
  }
  const closeStaffFrom = () => {
    showStaffDialog.value = false
  }
  // 树形变化
  const currentChange = type => {
    organId.value = type.organId
    table.value.reloadData()
  }
  const removeDeptTag = (val, type) => {
    if (type === 'partTimeOrgan') {
      state.tabSelects.searchSelected =
        state.tabSelects.partTimeOrgansSelected.length > 0
          ? state.tabSelects.partTimeOrgansSelected.map(i => {
              return {
                ...i,
                id: i.value,
                name: i.label,
                type: 'organ'
              }
            })
          : []
      state.tabSelects.partTimeOrgansSelected = clearTagFn(
        state.tabSelects.searchSelected,
        val
      )
    }
    if (type === 'roles') {
      state.tabSelects.searchSelected =
        state.tabSelects.rolesSelected.length > 0
          ? state.tabSelects.rolesSelected.map(i => {
              return {
                ...i,
                id: i.value,
                name: i.label,
                type: 'role'
              }
            })
          : []
      state.tabSelects.rolesSelected = clearTagFn(
        state.tabSelects.searchSelected,
        val
      )
    }
  }

  const clearTagFn = (attr, val) => {
    if (!Array.isArray(attr) || attr.length === 0) return attr
    return attr.filter(item => item.id !== val)
  }
  onMounted(() => {
    table.value.reloadData()
  })
</script>
<style lang="scss">
  .rankDisplayData {
    text-align: center;
  }
  .hidePoper {
    display: none;
  }
  .el-divider {
    margin: 8px 0 16px;
  }
  .hasContent {
    .el-input__wrapper {
      -webkit-text-fill-color: #000;
    }

    .el-input__inner {
      -webkit-text-fill-color: #000;
    }
  }

  .contentBoxes {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .xian {
      color: rgba($color: #000000, $alpha: 0.45);
      font-size: 12px;
    }
  }
  .staff-add {
    .ap-box-contBox {
      width: calc(100%);
      position: relative;
      display: flex;
      align-items: center;

      .el-input__suffix {
        display: none;
      }

      .el-select .el-input.is-disabled .el-input__wrapper {
        cursor: pointer;
      }

      .el-select .el-input.is-disabled .el-input__inner {
        cursor: pointer;
      }

      .el-input.is-disabled .el-input__wrapper {
        background-color: #ffffff;
      }

      .ap-box-contBox-icon {
        position: absolute;
        right: 0.8rem;
        cursor: pointer;
        height: 14px;
        display: flex;
        align-items: center;

        .ap-box-contBox-icon-img {
          height: 100%;
        }
      }

      :deep {
        .el-input__inner {
          padding-right: 1.5rem;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-more {
      display: flex;
      .title-more-down {
        margin-left: 5px;
        img {
          margin-right: 5px;
        }
      }
    }
  }
  .el-dropdown {
    vertical-align: middle;
  }
  .el-upload__tip {
    margin: 0;
  }
  .el-icon {
    // color: #aaaaaa;
    margin-right: 5px;
  }

  .components-tree {
    margin: 0%;
    .custom-tree-node {
      display: flex;
      align-items: center;
      .custom-tree-node-icon {
        margin-right: 0.4rem;
      }
    }
    :deep {
      margin-bottom: 0%;
      .el-tree-node__content {
        @include mixin-height(32);
      }
      .el-tree .el-icon svg {
        //原有的箭头 去掉
        display: none !important;
        height: 0;
        width: 0;
      }
      .el-tree-node__expand-icon {
        //引入的图标（图片）size大小 => 树节点前的预留空间大小
        font-size: 16px;
      }

      //图标是否旋转，如果是箭头类型的，可以设置旋转90度。如果是两张图片，则设为0
      .el-tree .el-tree-node__expand-icon.expanded {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }

      .el-tree .el-tree-node__expand-icon:before {
        // 未展开的节点
        background: url('~@/assets/svg/tree-fangxiang-zuo.svg') no-repeat 0;
        content: '';
        display: block;
        width: 18px;
        height: 18px;
      }

      .el-tree .el-tree-node__expand-icon.expanded:before {
        //展开的节点
        background: url('~@/assets/svg/tree-fangxiang-xia.svg') no-repeat 0 0;
        content: '';
        display: block;
        width: 18px;
        height: 18px;
        margin-top: 4px;
      }

      .el-tree .is-leaf.el-tree-node__expand-icon::before {
        //叶子节点（不显示图标）
        display: block;
        background: none !important;
        content: '';
        width: 18px;
        height: 18px;
      }

      .el-tree-node__expand-icon.is-leaf {
        width: 0px;
      }
    }
    .el-icon {
      color: #aaaaaa;
      margin-right: 5px;
    }
  }
</style>

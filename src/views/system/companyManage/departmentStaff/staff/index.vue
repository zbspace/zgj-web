<!--
* @Descripttion 员工管理
* @FileName index.vue
* @Author Guanpf
* @LastEditTime 2023-03-09 10:22:26
!-->
//
<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,tree,batch">
      <template #title>
        <div class="title">
          <div>员工管理</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="addStaff">+ 新建</el-button>
            </div>
            <!-- <div class="title-more-down">
              <el-dropdown popper-class="more-operation-dropdown">
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
                    <el-dropdown-item>导入员工</el-dropdown-item>
                    <el-dropdown-item>导入人脸</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div> -->
          </div>
        </div>
      </template>

      <template #searchForm>
        <div>
          <componentsSearchForm
            :data="state.componentsSearchForm.data"
            :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style"
            @clickSubmit="clickSubmit"
          >
          </componentsSearchForm>
        </div>
      </template>

      <template #tree>
        <div>
          <componentsTree
            :data="state.componentsTree.data"
            :defaultAttribute="state.componentsTree.defaultAttribute"
          >
          </componentsTree>
        </div>
      </template>

      <template #batch>
        <div class="batch">
          <componentsBatch
            :data="state.componentsBatch.data"
            :defaultAttribute="state.componentsBatch.defaultAttribute"
            @clickBatchButton="clickBatchButton"
            @refreshButton="refreshButton"
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
            :paginationData="state.componentsPagination.data"
            :lading="state.componentsTable.loading"
            isSelection
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
          @size-change="sizeChange"
          @current-change="currentChange"
        >
        </componentsPagination>
      </template>
    </componentsLayout>
    <!-- 新增员工 -->
    <KDialog
      @update:show="showDepPerDialog = $event"
      :show="showStaffDialog"
      title="新增"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="1000"
      :height="600"
      @confirm="submitStaffForm"
      @close="showDepPerDialog = false"
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
        <el-form-item label="帐号" prop="userName">
          <el-input
            v-model="state.componentsAddForm.formData.accountNo"
            placeholder="请输入帐号"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="userTel">
          <el-input
            v-model="state.componentsAddForm.formData.userTel"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="所属部门" prop="hostOrganId">
          <div class="select-box-contBox">
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              v-model="state.componentsAddForm.formData.hostOrgan"
              placeholder="请选择"
            />
            <el-input
              type="hidden"
              v-model="state.componentsAddForm.formData.hostOrganId"
            ></el-input>
            <div class="ap-box-contBox-icon">
              <el-icon
                v-if="state.componentsAddForm.formData.hostOrgan"
                @click="clear('hostOrgan')"
                ><CircleClose
              /></el-icon>
              <img
                @click="chooseOrgan('hostOrgan')"
                class="ap-box-contBox-icon-img"
                src="@/assets/svg/ketanchude.svg"
                alt=""
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="兼职部门" prop="partTimeOrganIds">
          <div class="select-box-contBox">
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              v-model="state.componentsAddForm.formData.partTimeOrgan"
              placeholder="请选择"
            />
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              type="hidden"
              v-model="state.componentsAddForm.formData.partTimeOrganIds"
              placeholder="请选择"
            />
            <div class="ap-box-contBox-icon">
              <el-icon
                v-if="state.componentsAddForm.formData.partTimeOrganIds"
                @click="clear('partTimeOrgan')"
                ><CircleClose
              /></el-icon>
              <img
                @click="chooseOrgan('partTimeOrgan')"
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
        <el-form-item label="主管" prop="directLeaderUserId">
          <div class="select-box-contBox">
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              v-model="state.componentsAddForm.formData.directLeaderUser"
              placeholder="请选择"
            />
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              type="hidden"
              v-model="state.componentsAddForm.formData.directLeaderUserId"
              placeholder="请选择"
            />
            <div class="ap-box-contBox-icon">
              <el-icon
                v-if="state.componentsAddForm.formData.directLeaderUserId"
                @click="clear('directLeaderUser')"
                ><CircleClose
              /></el-icon>
              <img
                @click="chooseOrgan('directLeaderUser')"
                class="ap-box-contBox-icon-img"
                src="@/assets/svg/ketanchude.svg"
                alt=""
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <div class="select-box-contBox">
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              v-model="state.componentsAddForm.formData.roles"
              placeholder="请选择"
            />
            <el-input
              class="ap-box-contBox-input width-100"
              type="hidden"
              v-model="state.componentsAddForm.formData.roleIds"
              placeholder="请选择"
            />
            <div class="ap-box-contBox-icon">
              <el-icon
                v-if="state.componentsAddForm.formData.roleIds"
                @click="clear('roles')"
                ><CircleClose
              /></el-icon>
              <img
                @click="chooseOrgan('roles')"
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
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
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
    </KDialog>
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      :tabsShow="['organ']"
      @update:searchSelected="submitSelectDepart"
      :searchSelected="searchSelected"
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
  import { ref, reactive, onBeforeMount } from 'vue'
  import { CircleClose, Plus } from '@element-plus/icons-vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination.vue'
  import componentsLayout from '@/views/components/Layout.vue'
  import componentsTree from '@/views/components/tree'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import KDialog from '@/views/components/modules/KDialog.vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import UpdatePassword from './modules/updatePassword.vue'
  import UploadFace from './modules/uploadFace.vue'
  import { ElMessage } from 'element-plus'
  import api from '@/api/system/companyManagement/departmentStaff'

  // 显示新增员工弹窗
  const showStaffDialog = ref(false)
  // 显示部门弹窗
  const showDepPerDialog = ref(false)
  // 员工表单Ref
  const formStaffRef = ref(null)
  const depChoose = ref(null)
  // 显示修改密码他创
  const showPass = ref(false)
  const passTitle = ref('修改密码')
  // 显示重置人脸弹窗
  const showUpload = ref(false)
  // 侧边栏树选中id
  const organId = ref(false)
  // 部门弹窗选中信息
  const searchSelected = ref([])
  // 部门选中信息
  const hostOrganSelected = ref([])
  // 兼职部门选中信息
  const partTimehostOrganSelected = ref([])
  // 角色选中信息
  const rolesSelected = ref([])
  // 主管选中信息
  const directLeaderUserSelected = ref([])
  const state = reactive({
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
    componentsAddForm: {
      formData: {
        userName: '',
        accountNo: '',
        userTel: '',
        hostOrganId: '',
        hostOrgan: '',
        partTimeOrganIds: '',
        userTitle: '',
        userMail: '',
        roleIds: '',
        roles: '',
        qweiNo: '',
        dingdingNo: '',
        userNo: '',
        directLeaderUserId: '',
        directLeaderUser: '',
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
            message: '请输入手机号',
            trigger: 'change'
          }
          // { min: 11, type: 'number', message: '手机号必须为11位数字' }
        ],
        hostOrganId: [
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
          id: 'status',
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
          inCommonUse: true,
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
        },
        {
          id: 'organId',
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
          prop: 'userName',
          label: '姓名',
          sortable: true,
          flex: true,
          'min-width': 150
        },
        {
          prop: 'accountNo',
          label: '账号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'hostOrganName',
          label: '所属部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'userTitle',
          label: '职位',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'faceState',
          label: '人脸状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'status',
          label: '状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '1',
          label: '操作',
          fixed: 'right',
          width: 320,
          rankDisplayData: [
            {
              name: '修改'
            },
            {
              name: '停用'
            },
            {
              name: '删除'
            },
            {
              name: '修改密码'
            },
            {
              name: '设置人脸'
            }
          ]
        }
      ],
      data: [
        {
          userId: '1',
          userName: '小红',
          accountNo: '1666',
          hostOrganName: '往往',
          userTitle: '科员',
          faceState: '启用',
          status: '启用'
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
          if (column.property === 'userName') {
            return {
              color: 'var(--jy-info-6)',
              cursor: 'pointer'
            }
          }
        }
      },
      laoding: false
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
          label: '企业名称',
          children: [
            {
              label: '单位名称',
              children: [
                {
                  label: '部门名称'
                },
                {
                  label: '部门名称'
                },
                {
                  label: '部门名称'
                },
                {
                  label: '部门名称'
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
          label: '员工详情',
          name: 'Staff-Details'
        },
        {
          label: '流程记录',
          name: ''
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
          name: '批量停用'
        },
        {
          name: '批量启用'
        },
        {
          name: '批量删除'
        },
        {
          name: '批量重置密码'
        }
      ],
      userIds: []
    }
  })

  // 筛选条件按钮
  const clickSubmit = (item, index) => {
    console.log(item)
    if (item.id === 'reset') {
      state.componentsSearchForm.data.forEach(v => {
        delete v.value
      })
    }
    getFormPage()
  }
  // 获取表格列表
  const getFormPage = () => {
    const searchData = state.componentsSearchForm.data
    const queryParams = {}
    queryParams.organId = organId.value
    searchData.forEach(item => {
      queryParams[item.id] = item.value
    })
    queryParams.pageNo = state.componentsPagination.index || 1
    queryParams.pageSize = state.componentsPagination.pageNumber || 10
    state.componentsTable.loading = true
    api.userPage(queryParams).then(res => {
      console.log(res)
      state.componentsTable.data = res.data.rows
      state.componentsPagination.data.amount = res.data.totalRows
      state.componentsPagination.data.pageNumber = res.data.totalPage
      state.componentsPagination.defaultAttribute.total = res.data.totalRows
      state.componentsTable.loading = false
    })
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
    formStaffRef.value.resetFields()
    showStaffDialog.value = true
  }
  // 清除部门信息
  const clear = type => {
    if (type === 'hostOrgan') {
      hostOrganSelected.value = []
      state.componentsAddForm.fromData.hostOrgan = ''
      state.componentsAddForm.fromData.hostOrganId = ''
    }
    if (depChoose.value === 'partTimeOrgan') {
      partTimehostOrganSelected.value = []
      state.componentsAddForm.formData.partTimeOrganIds = ''
      state.componentsAddForm.formData.partTimeOrgan = ''
    }
    if (depChoose.value === 'roles') {
      rolesSelected.value = []
      state.componentsAddForm.formData.roleIds = ''
      state.componentsAddForm.formData.roles = ''
    }
    if (depChoose.value === 'directLeaderUser') {
      directLeaderUserSelected.value = []
      state.componentsAddForm.formData.directLeaderUserId = ''
      state.componentsAddForm.formData.directLeaderUser = ''
    }
  }
  // 选择部门弹窗
  const chooseOrgan = type => {
    depChoose.value = type
    if (depChoose.value === 'hostOrgan') {
      searchSelected.value = hostOrganSelected.value
    }
    if (depChoose.value === 'partTimeOrgan') {
      searchSelected.value = partTimehostOrganSelected.value
    }
    if (depChoose.value === 'roles') {
      searchSelected.value = rolesSelected.value
    }
    if (depChoose.value === 'directLeaderUser') {
      searchSelected.value = directLeaderUserSelected.value
    }
    showDepPerDialog.value = true
  }

  // 获取部门
  const submitSelectDepart = item => {
    const organIds = []
    const organNames = []
    item.forEach(el => {
      organIds.push(el.id)
      organNames.push(el.name)
    })
    if (depChoose.value === 'hostOrgan') {
      hostOrganSelected.value = item
      state.componentsAddForm.formData.hostOrgan = item[0].name
      state.componentsAddForm.formData.hostOrganId = item[0].id
    }
    if (depChoose.value === 'partTimeOrgan') {
      partTimehostOrganSelected.value = item
      state.componentsAddForm.formData.partTimeOrganIds = organIds
      state.componentsAddForm.formData.partTimeOrgan = organNames.join('、')
    }
    if (depChoose.value === 'roles') {
      rolesSelected.value = item
      state.componentsAddForm.formData.roleIds = organIds
      state.componentsAddForm.formData.roles = organNames.join('、')
    }
    if (depChoose.value === 'directLeaderUser') {
      directLeaderUserSelected.value = item
      state.componentsAddForm.formData.directLeaderUserId = item[0].id
      state.componentsAddForm.formData.directLeaderUser = item[0].name
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
  const clickBatchButton = (item, index) => {
    const list = state.componentsBatch.selectionData
    console.log('list', list)
    console.log(list[0])
    let nameList = ''
    const nameArr = []
    const nameIdArr = []
    list.forEach(el => {
      nameArr.push(`[${el.userName}]`)
      nameIdArr.push(el.userId)
    })
    state.componentsBatch.userIds = nameIdArr
    nameList = nameArr.join('、')
    if (item.name === '批量停用') {
      state.JyElMessageBox.header.data = '批量停用'
      state.JyElMessageBox.content.data = `已选中员工：${nameList}，请问确定要批量停用吗？`
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '批量停用'
    }
    if (item.name === '批量启用') {
      state.JyElMessageBox.header.data = '批量启用'
      state.JyElMessageBox.content.data = `已选中员工：${nameList}，请问确定要批量启用吗？`
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '批量启用'
    }
    if (item.name === '批量删除') {
      state.JyElMessageBox.header.data = '批量删除'
      state.JyElMessageBox.content.data = `已选中员工：${nameList}，请问确定要批量删除吗？`
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '批量删除'
    }
    if (item.name === '批量重置密码') {
      passTitle.value = '批量重置密码'
      showPass.value = true
    }
    if (item.name === '刷新') {
      console.log('刷新')
      getFormPage()
    }
  }
  const refreshButton = (item, index) => {
    console.log(item)
  }
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    if (column.property === 'userName') {
      state.componentsDocumentsDetails.show = true
    }
  }
  const customClick = (row, colum, cell, event) => {
    const nameIdArr = []
    console.log(colum)
    nameIdArr.push(colum.userId)
    state.componentsBatch.userIds = nameIdArr
    if (cell.name === '修改') {
      showStaffDialog.value = true
    }
    if (cell.name === '停用') {
      state.JyElMessageBox.header.data = '停用'
      state.JyElMessageBox.content.data = '确认要停用该员工吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '停用'
    }
    if (cell.name === '启用') {
      state.JyElMessageBox.header.data = '启用'
      state.JyElMessageBox.content.data = '确认要启用该员工吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '启用'
    }
    if (cell.name === '删除') {
      state.JyElMessageBox.header.data = '删除'
      state.JyElMessageBox.content.data = '确认要删除该员工吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '删除'
    }
    if (cell.name === '修改密码') {
      passTitle.value = '重置密码'
      showPass.value = true
    }
    if (cell.name === '设置人脸') {
      showUpload.value = true
    }
  }
  // 提交弹窗
  const submitElMessageBox = type => {
    console.log(state.componentsBatch.userIds)
    const singleData = {
      userId: state.componentsBatch.userIds[0]
    }
    const batchData = {
      userIds: state.componentsBatch.userIds
    }
    if (type === '停用') {
      singleOpt(type, api.userDisable(singleData))
    }
    if (type === '启用') {
      singleOpt(type, api.userEnable(singleData))
    }
    if (type === '删除') {
      singleOpt(type, api.userDelete(singleData))
    }
    if (type === '批量停用') {
      singleOpt(type, api.userBatchDisable(batchData))
    }
    if (type === '批量启用') {
      singleOpt(type, api.userBatchEnable(batchData))
    }
    if (type === '批量删除') {
      singleOpt(type, api.userBatchDelete(batchData))
    }
  }
  // 员工操作
  const singleOpt = (typeName, apiName) => {
    apiName.then(res => {
      if (res.data.code === 200) {
        console.log(typeName)
      }
    })
  }
  // 批量操作
  const batchOpt = (typeName, urlName) => {}
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
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
  // 提交新增表单
  const submitStaffForm = data => {
    console.log(data)
    // if (!data) {
    //   return false
    // }
    console.log(formStaffRef)
    formStaffRef.value.validate(valid => {
      if (valid) {
        console.log(state.componentsAddForm.formData)
        api.formAdd().then(res => {})
      } else {
        ElMessage.error('校验失败')
      }
    })
  }
  const closeStaffFrom = () => {
    showDepPerDialog.value = false
  }
  // 分页页数变化
  const currentChange = data => {
    console.log(data)
    state.componentsPagination.index = data
    getFormPage()
  }
  // 每页请求数量变化
  const sizeChange = data => {
    console.log(data)
    state.componentsPagination.pageNumber = data
    getFormPage()
  }
  const getUserTreeMenu = () => {
    api.userTreeMenu().then(res => {
      console.log(res)
    })
  }
  // 初始化
  onBeforeMount(() => {
    // getFormPage()
    // getUserTreeMenu()
  })
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-more {
      display: flex;
      .title-more-down {
        margin-left: 5px;
      }
    }
  }
  .el-upload__tip {
    margin: 0;
  }
</style>

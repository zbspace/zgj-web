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
        >
        </componentsPagination>
      </template>
    </componentsLayout>
    <!-- 新增员工 -->
    <KDialog
      @update:show="showStaffDialog = $event"
      :show="showStaffDialog"
      title="新增"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="1000"
      :height="600"
      @close="submitStaffForm"
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
              v-model="state.componentsAddForm.formData.hostOrganId"
              placeholder="请选择"
            />
            <div class="ap-box-contBox-icon">
              <el-icon
                v-if="state.componentsAddForm.formData.hostOrganId"
                @click="clear('hostOrganId')"
                ><CircleClose
              /></el-icon>
              <img
                @click="chooseOrgan('hostOrganId')"
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
              v-model="state.componentsAddForm.formData.partTimeOrganIds"
              placeholder="请选择"
            />
            <div class="ap-box-contBox-icon">
              <el-icon
                v-if="state.componentsAddForm.formData.partTimeOrganIds"
                @click="clear('partTimeOrganIds')"
                ><CircleClose
              /></el-icon>
              <img
                @click="chooseOrgan('partTimeOrganIds')"
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
              v-model="state.componentsAddForm.formData.partTimeOrganIds"
              placeholder="请选择"
            />
            <div class="ap-box-contBox-icon">
              <el-icon
                v-if="state.componentsAddForm.formData.partTimeOrganIds"
                @click="clear('partTimeOrganIds')"
                ><CircleClose
              /></el-icon>
              <img
                @click="chooseOrgan('partTimeOrganIds')"
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
              v-model="state.componentsAddForm.formData.directLeaderUserId"
              placeholder="请选择"
            />
            <div class="ap-box-contBox-icon">
              <el-icon
                v-if="state.componentsAddForm.formData.directLeaderUserId"
                @click="clear('directLeaderUserId')"
                ><CircleClose
              /></el-icon>
              <img
                @click="chooseOrgan('directLeaderUserId')"
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
              v-model="state.componentsAddForm.formData.roleIds"
              placeholder="请选择"
            />
            <div class="ap-box-contBox-icon">
              <el-icon
                v-if="state.componentsAddForm.formData.roleIds"
                @click="clear('roleIds')"
                ><CircleClose
              /></el-icon>
              <img
                @click="chooseOrgan('roleIds')"
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
      :title="title"
      @on-confirm="confirmPass"
      @on-cancel="closePass"
    >
    </UpdatePassword>
    <UploadFace
      v-model="showUpload"
      :show="showUpload"
      @on-confirm="confirmUpload"
      @on-cancel="closeUpload"
    >
    </UploadFace>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
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
  import UpdatePassword from './childrenComponents/updatePassword.vue'
  import UploadFace from './childrenComponents/uploadFace.vue'
  import { ElMessage } from 'element-plus'

  const showStaffDialog = ref(false)
  const showDepPerDialog = ref(false)
  const formStaffRef = ref(null)
  const depChoose = ref(null)
  const showPass = ref(false)
  const title = ref('修改密码')
  const showUpload = ref(false)
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
        partTimeOrganIds: '',
        userTitle: '',
        userMail: '',
        roleIds: '',
        qweiNo: '',
        dingdingNo: '',
        userNo: '',
        directLeaderUserId: '',
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
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
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
      ]
    }
  })
  // 提交密码
  const confirmPass = data => {
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
    state.componentsAddForm.formData[type + 'Id'] = ''
    state.componentsAddForm.formData[type + 'Name'] = ''
  }
  // 选择部门弹窗
  const chooseOrgan = type => {
    depChoose.value = type
    showDepPerDialog.value = true
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
    console.log(list[0])
    let nameList = ''
    const nameArr = []
    list.forEach(el => {
      nameArr.push(`[${el.userName}]`)
    })
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
      showPass.value = true
    }
  }
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    if (column.property === 'userName') {
      state.componentsDocumentsDetails.show = true
    }
  }
  const customClick = (row, colum, cell, event) => {
    console.log(colum)
    if (cell.name === '修改') {
      showStaffDialog.value = true
    }
    if (cell.name === '停用') {
      state.JyElMessageBox.header.data = '停用'
      state.JyElMessageBox.content.data = '确认要停用该员工吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '停用'
    }
    if (cell.name === '删除') {
      state.JyElMessageBox.header.data = '删除'
      state.JyElMessageBox.content.data = '确认要删除该员工吗？'
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '删除'
    }
    if (cell.name === '修改密码') {
      showPass.value = true
    }
    if (cell.name === '设置人脸') {
      showUpload.value = true
    }
  }
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
  const submitStaffForm = data => {
    if (!data) {
      return
    }
    formStaffRef.value.validate(valid => {
      if (valid) {
        console.log(state.componentsAddForm.formData)
      } else {
        ElMessage.error('校验失败')
      }
    })
    showStaffDialog.value = false
  }
  const submitElMessageBox = type => {}
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

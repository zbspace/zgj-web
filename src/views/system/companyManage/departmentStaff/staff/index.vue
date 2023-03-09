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
              <el-button type="primary" @click="showStaffDialog = true"
                >+ 新建</el-button
              >
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
      @close="submitStaffForm"
    >
      <el-form
        :model="state.componentsAddForm.formData"
        :rules="state.componentsAddForm.formRules"
        ref="vFormStaffRef"
        label-width="100px"
      >
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="state.componentsAddForm.formData.userName" />
        </el-form-item>
        <el-form-item label="帐号" prop="userName">
          <el-input v-model="state.componentsAddForm.formData.accountNo" />
        </el-form-item>
        <el-form-item label="手机号" prop="userTel">
          <el-input v-model="state.componentsAddForm.formData.userTel" />
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
          <el-input v-model="state.componentsAddForm.formData.userTitle" />
        </el-form-item>
        <el-form-item label="邮箱" prop="userMail">
          <el-input v-model="state.componentsAddForm.formData.userMail" />
        </el-form-item>
        <el-form-item label="工号" prop="userNo">
          <el-input v-model="state.componentsAddForm.formData.userNo" />
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
              <el-input v-model="state.componentsAddForm.formData.qweiNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="钉钉ID" prop="dingdingNo">
              <el-input v-model="state.componentsAddForm.formData.dingdingNo" />
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
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { Paperclip, CircleClose } from '@element-plus/icons-vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination.vue'
  import componentsLayout from '@/views/components/Layout.vue'
  import componentsTree from '@/views/components/tree'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import KDialog from '@/views/components/modules/kdialog.vue'
  import kDepartOrPersonVue from '@/views/components/modules/kDepartOrPerson.vue'

  const showStaffDialog = ref(false)
  const showDepPerDialog = ref(false)
  const vFormStaffRef = ref(null)
  const depChoose = ref(null)
  const state = reactive({
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
            message: '请选择印章类型',
            trigger: 'change'
          },
          { min: 11, type: 'number', message: '手机号必须为11位数字' }
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
          prop: '1',
          label: '姓名',
          sortable: true,
          flex: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '账号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '所属部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '职位',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '人脸状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '操作',
          flex: 'right',
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
          1: '小红',
          2: '1666',
          3: '往往',
          4: '科员',
          5: '启用',
          6: ''
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
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event);
    if (column.property === '1') {
      state.componentsDocumentsDetails.show = true
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
  const submitStaffForm = () => {
    showStaffDialog.value = false
  }
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
</style>

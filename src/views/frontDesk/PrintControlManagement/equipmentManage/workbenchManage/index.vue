<!--
* @Descripttion 工作台管理
* @FileName WorkbenchManagement.vue
* @Author WalterXsk
 * @LastEditTime: 2023-04-19
!-->
<template>
  <div class="PrintControlManagement-WorkbenchManagement">
    <JyTable
      url="/bench/page"
      method="POST"
      ref="table"
      :isSelection="false"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      statusColoum="flag"
      openValue="1"
      tableClick="benchName"
      @cellClick="cellClick"
      @customClick="customClick"
    >
      <template #title>
        <div class="title">
          <div>工作台管理</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="add">
                + {{ $t('t-zgj-add') }}
              </el-button>
            </div>
          </div>
        </div>
      </template>
    </JyTable>
    <!-- 工作台详情 -->
    <!-- <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div> -->
    <Detail
      v-model="state.componentsDocumentsDetails.show"
      :benchId="benchId"
    />

    <!-- 动态表单 -->
    <JyDialog
      @update:show="showFormDialog = $event"
      :show="showFormDialog"
      :confirmLoading="confirmLoading"
      :title="form.benchId ? $t('t-zgj-Edit') : $t('t-zgj-add')"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="880"
      height="calc(100vh - 500px)"
      @confirm="submitForm"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="vFormLibraryRef"
        label-width="120px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="工作台名称" prop="benchName">
              <el-input
                v-model="form.benchName"
                placeholder="请输入"
                maxlength="128"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工作台编码" prop="benchNo">
              <el-input v-model="form.benchNo" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备串号" prop="benchSn">
              <el-input
                v-model="form.benchSn"
                placeholder="请输入"
                maxlength="128"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="保管人" prop="manUserId">
              <div class="contbox">
                <el-select
                  v-model="form.manUserId"
                  ref="selectRef"
                  placeholder="请选择"
                  @click="getDivision"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in userOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
                <div class="box-icon">
                  <img
                    class="box-icon-img"
                    src="@/assets/svg/ketanchude.svg"
                    alt=""
                  />
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保管部门" prop="manOrganId">
              <div class="select-box-contBox">
                <el-select
                  v-model="form.manOrganId"
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in organOptions"
                    :key="item.organId"
                    :label="item.organName"
                    :value="item.organId"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="readme">
              <el-input
                v-model="form.readme"
                type="textarea"
                maxlength="512"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="设备状态" prop="flag">
              <el-radio-group v-model="form.flag">
                <el-radio label="1" size="large">正常</el-radio>
                <el-radio label="0" size="large">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="盖章码盖章" prop="sealCode">
              <template #label>
                <span>盖章码盖章 </span>
                <el-popover
                  placement="top"
                  effect="dark"
                  trigger="hover"
                  content="仅控制工作台未登录情况下的入口显示"
                >
                  <template #reference>
                    <svg
                      class="svg-icon el-tooltip__trigger"
                      aria-hidden="true"
                      data-v-11cc4082=""
                    >
                      <use xlink:href="#icon-el-info" data-v-11cc4082=""></use>
                    </svg>
                  </template>
                </el-popover>
              </template>
              <el-radio-group v-model="form.sealCode">
                <el-radio label="1" size="large">是</el-radio>
                <el-radio label="0" size="large">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="人脸快捷盖章" prop="faceSeal">
              <el-radio-group v-model="form.faceSeal">
                <el-radio label="1" size="large">是</el-radio>
                <el-radio label="0" size="large">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="语音交互" prop="voiceDialogue">
              <el-radio-group v-model="form.voiceDialogue">
                <el-radio label="1" size="large">启用</el-radio>
                <el-radio label="0" size="large">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="红外电子围栏" prop="irFence">
              <el-radio-group v-model="form.irFence">
                <el-radio label="1" size="large">启用</el-radio>
                <el-radio label="0" size="large">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="人脸识别登录" prop="faceLogin">
              <el-radio-group v-model="form.faceLogin">
                <el-radio label="1" size="large">启用</el-radio>
                <el-radio label="0" size="large">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="自动锁屏" prop="autoLock">
              <el-radio-group v-model="form.autoLock">
                <el-radio label="1" size="large">启用</el-radio>
                <el-radio label="0" size="large">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="休眠" prop="dormantOpen">
              <el-radio-group v-model="form.dormantOpen">
                <el-radio label="1" size="large">启用</el-radio>
                <el-radio label="0" size="large">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.dormantOpen === '1'">
            <el-form-item
              prop="dormantValue"
              :rules="{
                required: true,
                message: '请输入静默休眠时间',
                trigger: 'blur'
              }"
            >
              <div style="display: flex; align-items: center">
                <div>静默</div>
                <el-input-number
                  v-model="form.dormantValue"
                  :min="1"
                  :precision="0"
                  style="margin: 0 5px"
                />
                <div>分钟后休眠</div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </JyDialog>
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      v-if="showDepPerDialog"
      :show="showDepPerDialog"
      @update:show="closeShow"
      :searchSelected="searchSelected"
      @update:searchSelected="submit"
      :tabsShow="tabsShow"
      :multiple="false"
    >
    </kDepartOrPersonVue>
    <JyElMessageBox
      :mode="1"
      v-model="state.JyElMessageBox.show"
      :show="state.JyElMessageBox.show"
      :defaultAttribute="{}"
      :showClose="false"
      @confirmClick="confirmOneClick"
    >
      <template #header>
        <div class="header-div">
          <img :src="state.JyElMessageBox.header.icon" alt="" />
          <span>{{ $t(state.JyElMessageBox.header.data) }}</span>
        </div>
      </template>
      <template #content>
        {{ state.JyElMessageBox.content.data }}
      </template>
    </JyElMessageBox>
  </div>
</template>
<script setup>
  import { ref, reactive } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import { ElMessage } from 'element-plus'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import workbenchManagement from '@/api/frontDesk/printControl/workbenchManagement'
  import { generatingNumber } from '@/utils/tools'
  import tableHearder from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/workbenchManagement.json'
  import getDepartByUserApi from '@/api/system/companyManagement/departmentStaff'
  import { getItem } from '@/utils/storage'
  import Detail from './detail'

  const showFormDialog = ref(false)
  const showDepPerDialog = ref(false)
  const vFormLibraryRef = ref(null)
  const table = ref(null)
  const tabsShow = ref(['user'])
  const searchSelected = ref([])
  const currentActionWorkbench = ref(null)
  const confirmLoading = ref(false)
  const benchId = ref(null)

  const form = reactive({
    benchId: '',
    benchNo: '',
    benchSn: '',
    benchName: '',
    manUserId: '',
    manUserName: '',
    manOrganId: '',
    manOrganName: '',
    flag: '1',
    sealCode: '1',
    faceSeal: '1',
    voiceDialogue: '1',
    irFence: '1',
    faceLogin: '1',
    autoLock: '1',
    dormantOpen: '0',
    dormantValue: '',
    readme: ''
  })
  const rules = reactive({
    benchNo: [
      {
        required: true,
        message: '请输入工作台编码',
        trigger: 'change'
      }
    ],
    benchName: [
      {
        required: true,
        message: '请输入工作台名称',
        trigger: 'change'
      }
    ],
    benchSn: [
      {
        required: true,
        message: '请输入设备串号',
        trigger: 'change'
      }
    ],
    manUserId: [
      {
        required: true,
        message: '请选择保管人',
        trigger: 'change'
      }
    ],
    manOrganId: [
      {
        required: true,
        message: '请选择所属部门',
        trigger: 'blur'
      }
    ]
  })
  const state = reactive({
    componentsSearchForm: {
      data: [
        {
          id: 'keyword',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '设备串号/工作台名称/工作台编码'
          }
        },
        {
          id: 'date',
          label: '创建时间',
          type: 'picker',
          requestType: 'array',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
            'value-format': 'YYYY-MM-DD',
            'disabled-date': time => {
              return time.getTime() > Date.now() // 如果没有后面的-8.64e7就是不可以选择今天的
            },
            'default-value': [
              new Date(new Date().setMonth(new Date().getMonth() - 1)),
              new Date()
            ]
          },
          style: {}
        },
        {
          id: 'manUser',
          requestParams: 'manUserId',
          label: '保管人',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+保管人',
            type: 'user',
            multiple: false
          }
        },
        {
          id: 'manOrgan',
          requestParams: 'manOrganId',
          label: '保管部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+保管部门',
            type: 'organ',
            multiple: false
          }
        },
        {
          id: 'flag',
          label: '设备状态',
          type: 'select',
          options: [
            {
              label: '正常',
              value: '1'
            },
            {
              label: '停用',
              value: '0'
            }
          ]
        },
        {
          id: 'my',
          label: '',
          type: 'checkbox',
          checkbox: [
            {
              // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
              defaultAttribute: {
                label: '我保管的工作台'
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
      header: tableHearder
    },
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '工作台详情',
          name: 'Workbench-Details'
        },
        {
          label: '操作记录',
          name: 'operating-record'
        }
      ]
    },
    JyElMessageBox: {
      show: false,
      header: {
        data: '',
        icon: '/src/assets/svg/common/warning.svg'
      },
      content: {
        data: ''
      }
    }
  })

  const userDiaogOpenType = ref('add')

  const organOptions = ref([])

  const userOptions = ref([])

  const add = () => {
    showFormDialog.value = true
    userDiaogOpenType.value = 'add'
    vFormLibraryRef.value && vFormLibraryRef.value.resetFields()
    // 新增默认当前登录人
    const userName =
      getItem('accountInfo') && getItem('accountInfo').userInfo
        ? getItem('accountInfo').userInfo.userName
        : ''
    const userId =
      getItem('accountInfo') && getItem('accountInfo').userInfo
        ? getItem('accountInfo').userInfo.userId
        : ''
    // TODO: 根据登录人 获取 主职部门及兼职部门
    userId && getDepartOptions(userId)

    form.benchId = ''
    form.benchNo = generatingNumber()
    form.manOrganId = form.manOrganId ? form.manOrganId : ''
    form.manUserName = userName
    form.manUserId = userId
    form.dormantOpen = '0'
    if (userDiaogOpenType.value === 'add') {
      searchSelected.value = [
        {
          id: userId,
          name: userName,
          type: 'user'
        }
      ]
      userOptions.value = [
        {
          id: userId,
          name: userName
        }
      ]
    }
  }

  const selectRef = ref(null)
  const getDivision = () => {
    selectRef.value.blur()
    showDepPerDialog.value = true
    tabsShow.value = ['user']
    if (userDiaogOpenType.value !== 'add') {
      // 编辑时回显
      searchSelected.value = [
        {
          id: form.manUserId,
          name: form.manUserName,
          type: 'user'
        }
      ]
    }
  }

  const closeShow = () => {
    showDepPerDialog.value = false
  }

  const submit = value => {
    userOptions.value = value.length ? value : []
    searchSelected.value = value.length
      ? [
          {
            id: value.length ? value[0].id : '',
            name: value.length ? value[0].name : '',
            type: 'user'
          }
        ]
      : []
    form.manUserId = value.length ? value[0].id : ''
    form.manUserName = value.length ? value[0].name : ''
    form.manOrganId = ''
    form.manUserId && getDepartOptions(form.manUserId)
  }

  const submitForm = () => {
    vFormLibraryRef.value.validate(valid => {
      if (valid) {
        confirmLoading.value = true
        if (form.dormantOpen === '0') {
          delete form.dormantValue
        }
        if (form.benchId) {
          workbenchManagement
            .edit(form)
            .then(() => {
              showFormDialog.value = false
              ElMessage.success('编辑成功')
              table.value.reloadData()
            })
            .finally(() => {
              confirmLoading.value = false
            })
        } else {
          console.log(form, '新增的form表单')
          workbenchManagement
            .add(form)
            .then(() => {
              showFormDialog.value = false
              ElMessage.success('新增成功')
              table.value.reloadData()
            })
            .finally(() => {
              confirmLoading.value = false
            })
        }
      }
    })
  }

  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    if (column.property === 'benchName') {
      benchId.value = row.benchId
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭
  // function clickClose() {
  //   state.componentsDocumentsDetails.show = false
  // }

  // 点击表格按钮
  function customClick(row, column, cell, event) {
    if (cell.name === 't-zgj-Edit') {
      showFormDialog.value = true
      form.benchId = column.benchId
      userDiaogOpenType.value = 'edit'
      vFormLibraryRef.value && vFormLibraryRef.value.resetFields()
      workbenchManagement.detail(column.benchId).then(res => {
        const data = res.data
        form.benchId = data.benchId
        form.benchNo = data.benchNo || ''
        form.benchSn = data.benchSn || ''
        form.benchName = data.benchName || ''
        form.manUserId = data.manUserId || ''
        form.manUserName = data.manUserName || ''
        form.manOrganId = data.manOrganId || ''
        form.manOrganName = data.manOrganName || ''
        form.flag = data.flag || '1'
        form.sealCode = data.sealCode || '1'
        form.faceSeal = data.faceSeal || '1'
        form.voiceDialogue = data.voiceDialogue || '1'
        form.irFence = data.irFence || '1'
        form.faceLogin = data.faceLogin || '1'
        form.autoLock = data.autoLock || '1'
        form.dormantOpen = data.dormantOpen || '0'
        form.dormantValue = data.dormantValue || null
        form.readme = data.readme || ''

        userOptions.value = [
          {
            id: data.manUserId,
            name: data.manUserName
          }
        ]
        data.manUserId &&
          getDepartOptions(data.manUserId, true, data.manOrganId)
      })
    }
    if (cell.name === 't-zgj-Delete') {
      currentActionWorkbench.value = column.benchId
      state.JyElMessageBox.header.data = 't-zgj-tips'
      state.JyElMessageBox.content.data = '您确定要删除该记录吗？'
      state.JyElMessageBox.show = true
    }
  }

  const confirmOneClick = () => {
    workbenchManagement
      .delete(currentActionWorkbench.value)
      .then(res => {
        table.value.reloadData()
      })
      .finally(() => {
        state.JyElMessageBox.show = false
      })
  }

  const getDepartOptions = (id, isEdit, organId) => {
    organOptions.value = []
    getDepartByUserApi.organListByUser(id).then(res => {
      if (res.data) {
        organOptions.value = res.data.length ? res.data : []
        if (isEdit) {
          if (organOptions.value.findIndex(i => i.organId === organId) === -1) {
            form.manOrganId = null
          }
          return
        }
        const userDefaultData = res.data.filter(item => item.userDefault)
        form.manOrganId =
          userDefaultData.length !== 0 ? userDefaultData[0].organId : ''
      }
    })
  }
</script>
<style lang="scss" scoped>
  .PrintControlManagement-WorkbenchManagement {
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

    .box-icon {
      position: absolute;
      right: 0.8rem;
      cursor: pointer;
      height: 50%;
      display: flex;
      align-items: center;

      .box-icon-img {
        height: 100%;
      }
    }
  }
</style>

<style lang="scss">
  .contbox {
    width: calc(100%);
    position: relative;
    display: flex;
    align-items: center;
    .el-input__suffix {
      display: none;
    }
  }
</style>

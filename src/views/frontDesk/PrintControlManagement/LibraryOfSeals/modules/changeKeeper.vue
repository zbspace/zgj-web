<!--
* @Descripttion 变更保管人
* @FileName changeKeeper.vue
* @Author Guanpf
* @LastEditTime 2023-04-07 10:50:36
!-->
<template>
  <JyDialog
    @update:show="isVisible = $event"
    :show="isVisible"
    :title="$t('t-zgj-F_SEAL_INFO_CHANGE')"
    :centerBtn="true"
    :confirmText="$t('t-zgj-operation.submit')"
    :concelText="$t('t-zgj-operation.cancel')"
    :width="800"
    :height="400"
    destroy-on-close
    @confirm="submitChangeForm"
    @close="closeForm"
  >
    <el-form
      :model="state.changeForm"
      :rules="state.rules"
      ref="libraryChangeRef"
      label-width="100px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="印章全称">
            <span>{{ state.sealInfo.sealName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="印章类型">
            <span>{{ state.sealInfo.typeName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="印章状态">
            <!-- <span>{{ state.sealInfo.sealStateName }}</span> -->
            <div class="flag-cell center">
              <div
                class="diot diot-0"
                v-show="state.sealInfo.sealStateId === '0'"
              ></div>
              <div
                class="diot diot-1"
                v-show="
                  state.sealInfo.sealStateId === '1' ||
                  state.sealInfo.sealStateId === '2'
                "
              ></div>
              <span v-if="state.sealInfo.sealStateId === '0'">{{
                $t('t-zgj-seal.normal')
              }}</span>
              <span v-else-if="state.sealInfo.sealStateId === '1'">{{
                $t('t-zgj-seal.deactivated')
              }}</span>
              <span v-else-if="state.sealInfo.sealStateId === '2'">{{
                $t('t-zgj-seal.destroyed')
              }}</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="印章编码">
            <span>{{ state.sealInfo.sealNo }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="保管人">
            <span>{{ state.sealInfo.keepUserName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保管部门">
            <span>{{ state.sealInfo.keepOrganName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="sealExplain">
        <span v-html="state.sealInfo.sealExplain"></span>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="新保管人" prop="keepUserId">
            <div class="select-box-contBox">
              <el-input
                class="ap-box-contBox-input width-100"
                v-model="state.changeForm.keepUserName"
                placeholder="请选择新保管人"
                @click="chooseOrgan('keepUser', ['user'], false)"
              />
              <el-input
                class="ap-box-contBox-input width-100"
                type="hidden"
                v-model="state.changeForm.keepUserId"
                placeholder="请选择"
              />
              <div class="ap-box-contBox-icon">
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
          <el-form-item label="新保管部门" prop="keepOrganId">
            <el-select
              v-model="state.changeForm.keepOrganId"
              placeholder="请选择新保管部门"
              style="width: 100%"
              :disabled="
                state.changeSelectedKeepOrgan.length > 1 ? false : true
              "
            >
              <el-option
                v-for="item in state.changeSelectedKeepOrgan"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="变更事由">
        <el-input
          v-model="state.changeForm.reason"
          :rows="3"
          type="textarea"
          placeholder="请输入"
        />
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
    :searchSelected="state.changeSelected"
  >
  </kDepartOrPersonVue>
</template>

<script setup>
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import { reactive, computed, ref } from 'vue'
  import api from '@/api/frontDesk/sealManage/libraryOfSeals'
  import staffApi from '@/api/system/companyManagement/departmentStaff'
  import { ElMessage } from 'element-plus'

  const emit = defineEmits(['update:show', 'on-confirm', 'on-cancel'])
  const depChoose = ref(null)
  const showDepPerDialog = ref(null)
  const libraryChangeRef = ref(null)
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })
  const state = reactive({
    msg: '',
    sealStateId: {
      0: '正常',
      1: '停用',
      2: '销毁'
    },
    tabsShow: [],
    multiple: true,
    changeSelected: [],
    changeSelectedKeepUser: [],
    changeSelectedKeepOrgan: [],
    sealInfo: {
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
      keepOrganName: '',
      extShow: '',
      sealStateId: '',
      bylawsUrl: '',
      sealExplain: '',
      stampAttachments: null
    },
    changeForm: {
      sealId: '',
      keepUserId: '',
      keepUserName: '',
      keepOrganId: '',
      reason: ''
    },
    rules: {
      keepUserId: [
        {
          required: true,
          message: '请选择新保管人',
          trigger: 'change'
        }
      ],
      keepOrganId: [
        {
          required: true,
          message: '请选择新保管部门',
          trigger: 'change'
        }
      ]
    }
  })
  const closeForm = () => {
    emit('on-cancel', false)
  }
  const isVisible = computed({
    get() {
      return props.show
    },
    set(value) {
      emit('update:show', value)
    }
  })
  // 保存新增/修改数据
  const submitChangeForm = type => {
    console.log(state.changeForm)
    libraryChangeRef.value.validate(valid => {
      if (valid) {
        api.sealInfoChange(state.changeForm).then(res => {
          console.log(res)
          isVisible.value = false
          emit('on-confirm', false)
          ElMessage.success('变更成功！')
        })
      } else {
        // ElMessage.error('校验失败')
      }
    })
  }
  const getSealInfo = (sealId, changetypeList) => {
    state.tabsShow = []
    state.changeSelected = []
    state.changeSelectedKeepUser = []
    state.changeSelectedKeepOrgan = []
    state.changeForm = {
      sealId: '',
      keepUserId: '',
      keepUserName: '',
      keepOrganId: '',
      reason: ''
    }
    api.sealInfo(sealId).then(res => {
      if (res.code === 200) {
        console.log(res)
        state.sealInfo = res.data
        state.sealInfo.sealStateName = state.sealStateId[res.data.sealStateId]
        changetypeList.forEach(i => {
          if (i.sealTypeId === res.data.sealTypeId) {
            state.sealInfo.typeName = i.sealTypeName
          }
        })
        state.changeForm.sealId = res.data.sealId
      }
    })
  }
  const chooseOrgan = (type, tabs, multiple) => {
    state.multiple = multiple
    depChoose.value = type
    state.tabsShow = []
    state.changeSelected = []
    state.changeSelectedKeepUser = []
    if (type === 'keepUser') {
      if (
        state.changeSelectedKeepUser &&
        state.changeSelectedKeepUser.length > 0
      ) {
        state.changeSelected = state.changeSelectedKeepUser
      } else {
        if (
          state.changeForm[type + 'Id'] !== '' &&
          state.changeForm[type + 'Name'] !== ''
        ) {
          state.changeSelectedKeepUser.push({
            id: state.changeForm[type + 'Id'],
            name: state.changeForm[type + 'Name'],
            type: tabs[0]
          })
        }
        state.changeSelected = state.changeSelectedKeepUser
      }
    } else {
      if (
        state.changeForm[type + 'Id'] !== '' &&
        state.changeForm[type + 'Name'] !== ''
      ) {
        state.changeSelected.push({
          id: state.changeForm[type + 'Id'],
          name: state.changeForm[type + 'Name'],
          type: tabs[0]
        })
      }
    }

    console.log(tabs)
    state.tabsShow = tabs
    showDepPerDialog.value = true
  }
  const submitSelectDepart = data => {
    if (data) {
      state.changeForm[depChoose.value + 'Id'] = data[0].id
      if (depChoose.value === 'keepUser') {
        getStaffDetail(data[0].id)
        state.changeSelectedKeepUser = data
      } else if (depChoose.value === 'keepOrgan') {
        state.changeSelectedKeepOrgan = data
      }
      state.changeForm[depChoose.value + 'Name'] = data[0].name
    }
  }
  // 获取员工详情
  const getStaffDetail = id => {
    state.changeSelectedKeepOrgan = []
    staffApi.userGet(id).then(res => {
      if (res.code === 200) {
        state.changeSelectedKeepOrgan.push({
          value: res.data.hostOrganId,
          label: res.data.hostOrganName
        })
        if (res.data.partTimeOrgans && res.data.partTimeOrgans.length > 0) {
          res.data.partTimeOrgans.forEach(item => {
            state.changeSelectedKeepOrgan.push({
              value: item.organId,
              label: item.organName
            })
          })
        }
        state.changeForm.keepOrganId = state.changeForm.keepOrganId
          ? state.changeForm.keepOrganId
          : res.data.hostOrganId
        const map = new Map()
        for (const item of state.changeSelectedKeepOrgan) {
          map.set(item.value, item)
        }
        state.changeSelectedKeepOrgan = [...map.values()]
      }
    })
  }
  defineExpose({
    getSealInfo
  })
</script>
<style lang="scss" scoped>
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
</style>

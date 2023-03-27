<!--
* @Descripttion 新增业务规则
* @FileName index.vue
* @Author Guanpf
* @LastEditTime 2023-03-22 11:52:26
!-->
<template>
  <JyDialog
    @update:show="showDealingForm = $event"
    :show="showDealingForm"
    :title="props.title"
    :centerBtn="true"
    :confirmText="$t('t-zgj-operation.submit')"
    :concelText="$t('t-zgj-operation.cancel')"
    :width="900"
    :height="600"
    @close="closeForm"
    @confirm="submitForm"
  >
    <el-form
      :model="state.formData"
      :rules="state.formRules"
      ref="formRef"
      label-width="110px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="业务规则名称" prop="ruleBusinessName">
            <el-input v-model="state.formData.ruleBusinessName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务规则编码" prop="ruleBusinessId">
            <el-input readonly v-model="state.formData.ruleBusinessId" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用印类型" prop="sealUseTypeId">
            <el-select
              style="width: 100%"
              v-model="state.formData.sealUseTypeId"
              filterable
            >
              <el-option label="物理用印" value="1" />
              <el-option label="电子签章" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文件类型" prop="ruleBusinessId">
            <el-select
              style="width: 100%"
              v-model="state.formData.sealUseTypeId"
              filterable
            >
              <el-option label="物理用印" value="1" />
              <el-option label="电子签章" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="智能用印" name="first">
          <el-form-item label="外带用印">
            <el-row :gutter="20">
              <el-col :span="12"
                ><el-form-item label="外带电子围栏" prop="railSwitch">
                  <el-switch
                    v-model="state.formData.railSwitch"
                    inline-prompt
                    active-text="是"
                    inactive-text="否"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="批量用印" prop="batchSwitch">
                  <el-switch
                    v-model="state.formData.batchSwitch"
                    inline-prompt
                    active-text="是"
                    inactive-text="否"
                  /> </el-form-item
              ></el-col>
            </el-row>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item style="font-weight: bold" label="远程监督用印">
                <el-form-item label="远程盖章确认人" prop="remoteUsers">
                  <div class="select-box-contBox">
                    <el-input
                      class="ap-box-contBox-input width-100"
                      readonly
                      v-model="state.formData.remoteUsers"
                      placeholder="请选择"
                    />
                    <el-input
                      class="ap-box-contBox-input width-100"
                      type="hidden"
                      v-model="state.formData.ruleBusinessName"
                      placeholder="请选择"
                    />
                    <div class="ap-box-contBox-icon">
                      <el-icon
                        v-if="state.formData.remoteUsers"
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
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="视频盖章确认人" prop="videoUsers">
                <div class="select-box-contBox">
                  <el-input
                    class="ap-box-contBox-input width-100"
                    readonly
                    v-model="state.formData.videoUsers"
                    placeholder="请选择"
                  />
                  <el-input
                    class="ap-box-contBox-input width-100"
                    type="hidden"
                    v-model="state.formData.videoUsers"
                    placeholder="请选择"
                  />
                  <div class="ap-box-contBox-icon">
                    <el-icon
                      v-if="state.formData.videoUsers"
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
                    (限10人)
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="font-weight: bold" label="防伪打印">
            <el-checkbox
              label="二维码水印"
              v-model="state.formData.qrCodeSwitch"
            />
            <el-checkbox
              label="文字水印"
              v-model="state.formData.wordWaterSwitch"
              name=""
            />
            <el-checkbox
              label="网纹水印"
              v-model="state.formData.gridWaterSwitch"
              name=""
            />
          </el-form-item>
          <div>这里是步骤条</div>
        </el-tab-pane>
        <el-tab-pane label="普通用印" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </el-form>
  </JyDialog>
  <!-- 人员选择  -->
  <kDepartOrPersonVue
    v-if="showDepPerDialog"
    :show="showDepPerDialog"
    @update:show="showDepPerDialog = $event"
    :tabsShow="['organ']"
    @update:searchSelected="submitSelectDepart"
    :searchSelected="state.searchSelected"
  >
  </kDepartOrPersonVue>
</template>

<script setup>
  import { ref, reactive, computed, watch } from 'vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog.vue'
  import { ElMessage } from 'element-plus'
  import { CircleClose } from '@element-plus/icons-vue'
  import api from '@/api/system/companyManagement/companyDealing'
  const formRef = ref(null)
  const showDepPerDialog = ref(false)
  const activeName = ref('first')
  const props = defineProps({
    showAdd: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '新增'
    },
    column: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  const emit = defineEmits(['update:showAdd', 'on-confirm', 'on-cancel'])
  const state = reactive({
    searchSelected: [],
    formData: {
      ruleBusinessId: '',
      ruleBusinessName: '',
      sealUseTypeId: '',
      fileTypeIds: '',
      railSwitch: '',
      batchSwitch: '',
      qrCodeSwitch: '',
      wordWaterSwitch: '',
      gridWaterSwitch: '',
      invisibleWaterMarkSwitch: '',
      frontFaceSwitch: '',
      frontFaceSelectVal: '',
      frontOcrSwitch: '',
      frontQrCodeSwitch: '1',
      runPhotoSwitch: '1',
      runPhotoSelectVal: '1',
      runVideoSwitch: '1',
      runGpsSwitch: '1',
      runDelaySwitch: '1',
      runSensorSwitch: '1',
      runQrCodeSwitch: '1',
      runOneCodeSwitch: '1',
      runMoveSwitch: '1',
      runViolenceMoveSwitch: '1',
      runFaceSwitch: '1',
      runFaceDate: '1',
      runFaceUser: '1',
      runDistanceSwitch: '1',
      runDefinitionSwitch: '1',
      laterAutoSaveSwitch: '1',
      laterQrCodeSwitch: '1',
      archiveSwitch: '1',
      archiveRequiredSwitch: '1',
      archivePageSwitch: '1',
      archiveOcrSwitch: '1',
      remoteUsers: [
        {
          userId: 'u1'
        }
      ],
      videoUsers: [
        {
          userId: 'u1'
        }
      ]
    },
    formRules: {
      relatedCompanyName: [
        {
          required: true,
          message: '请输入企业名称',
          trigger: 'change'
        }
      ],
      organId: [
        {
          required: true,
          message: '请选择所属部门',
          trigger: 'change'
        }
      ],
      contactName: [
        {
          required: true,
          message: '请输入联系人',
          trigger: 'change'
        }
      ],
      contactInformation: [
        {
          required: true,
          message: '请输入联系方式',
          trigger: 'change'
        }
      ]
    }
  })
  watch(
    () => props.column,
    data => {
      if (data) {
        if (props.title === '修改') {
          state.searchSelected = [
            {
              id: data.organId,
              idFullPath: data.organId,
              name: data.organName,
              type: 'organ'
            }
          ]
          for (const i in data) {
            state.formData[i] = data[i]
          }
        } else {
          if (formRef.value) {
            formRef.value.resetFields()
            state.searchSelected = []
            for (const i in state.formData) {
              state.formData[i] = ''
            }
          }
        }
      }
    }
  )
  const showDealingForm = computed({
    get() {
      return props.showAdd
    },
    set(value) {
      emit('update:showAdd', value)
    }
  })
  // 关闭form
  const closeForm = () => {
    emit('on-cancel', false)
  }
  // 提交表单
  const submitForm = () => {
    formRef.value.validate(valid => {
      if (valid) {
        console.log(props.title)
        if (state.formData.relatedCompanyId && props.title === '修改') {
          api.updateRelatedCompany(state.formData).then(res => {
            console.log(res)
            emit('on-confirm', res, '修改')
          })
        } else {
          api.addRelatedCompany(state.formData).then(res => {
            console.log(res)
            emit('on-confirm', res, '新增')
          })
        }
      } else {
        // ElMessage.error('校验失败')
      }
    })
  }
  // 清除部门信息
  const clear = type => {
    state.formData.organName = ''
    state.formData.organId = ''
  }

  // 选择部门弹窗
  const chooseOrgan = item => {
    showDepPerDialog.value = true
  }
  // 获取部门信息
  const submitSelectDepart = data => {
    console.log(data)
    if (data && data.length > 0) {
      state.searchSelected = data
      state.formData.organName = data[0].name
      state.formData.organId = data[0].id
    }
    showDepPerDialog.value = false
  }
</script>
<style lang="scss" scoped></style>

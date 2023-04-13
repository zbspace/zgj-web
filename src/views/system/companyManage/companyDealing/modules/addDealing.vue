<!--
* @Descripttion 新增企业往来
* @FileName addDealing.vue
* @Author Guanpf
* @LastEditTime 2023-03-14 10:00:26
!-->
<template>
  <JyDialog
    @update:show="showDealingForm = $event"
    :show="showDealingForm"
    :title="$t(props.title)"
    :centerBtn="true"
    :confirmText="$t('t-zgj-operation.submit')"
    :concelText="$t('t-zgj-operation.cancel')"
    :width="900"
    :height="400"
    @close="closeForm"
    @confirm="submitForm"
  >
    <el-form
      :model="state.componentsAddForm.formData"
      :rules="state.componentsAddForm.formRules"
      ref="formRef"
      label-width="100px"
    >
      <el-form-item label="企业编码" prop="relatedCompanyNo">
        <el-input
          type="hidden"
          v-model="state.componentsAddForm.formData.relatedCompanyId"
        ></el-input>
        <el-input
          disabled
          v-model="state.componentsAddForm.formData.relatedCompanyNo"
          placeholder="请输入企业编码"
        />
      </el-form-item>
      <el-form-item label="企业名称" prop="relatedCompanyName">
        <el-input
          v-model="state.componentsAddForm.formData.relatedCompanyName"
          placeholder="请输入企业名称"
        />
      </el-form-item>
      <el-form-item label="所属部门" prop="organId">
        <div class="select-box-contBox">
          <el-input
            class="ap-box-contBox-input width-100"
            readonly
            v-model="state.componentsAddForm.formData.organName"
            placeholder="请选择"
            @click="chooseOrgan('organId')"
          />
          <el-input
            type="hidden"
            v-model="state.componentsAddForm.formData.organId"
          ></el-input>
          <div class="ap-box-contBox-icon">
            <!-- <el-icon
              v-if="state.componentsAddForm.formData.organId"
              @click="clear('organId')"
              ><CircleClose
            /></el-icon> -->
            <img
              @click="chooseOrgan('organId')"
              class="ap-box-contBox-icon-img"
              src="@/assets/svg/ketanchude.svg"
              alt=""
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="联系人" prop="contactName">
        <el-input
          v-model="state.componentsAddForm.formData.contactName"
          placeholder="请输入联系人"
        />
      </el-form-item>
      <el-form-item label="联系方式" prop="contactInformation">
        <el-input
          v-model="state.componentsAddForm.formData.contactInformation"
          placeholder="请输入联系方式"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          :rows="4"
          v-model="state.componentsAddForm.formData.remark"
          placehoder="请输入备注"
        />
      </el-form-item>
    </el-form>
  </JyDialog>
  <!-- 人员选择  -->
  <kDepartOrPersonVue
    v-if="showDepPerDialog"
    :show="showDepPerDialog"
    @update:show="showDepPerDialog = $event"
    :tabsShow="['organ']"
    :multiple="false"
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
  const props = defineProps({
    showAdd: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 't-zgj-add'
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
    componentsAddForm: {
      formData: {
        relatedCompanyName: '',
        organId: '',
        organName: '',
        contactName: '',
        contactInformation: '',
        relatedCompanyId: '',
        remark: ''
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
            message: '请输入正确的手机号',
            pattern:
              /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
            trigger: 'change'
          }
        ]
      }
    }
  })
  watch(
    () => props.column,
    data => {
      if (data) {
        if (props.title === 't-zgj-Edit') {
          console.log('data', data)
          state.searchSelected = [
            {
              id: data.organId,
              idFullPathSet: [data.organId],
              name: data.organName,
              type: 'organ'
            }
          ]
          for (const i in data) {
            state.componentsAddForm.formData[i] = data[i]
          }
        } else {
          if (formRef.value) {
            formRef.value.resetFields()
            state.searchSelected = []
            for (const i in state.componentsAddForm.formData) {
              state.componentsAddForm.formData[i] = ''
            }
          }
          detailGetRelatedCompanyNo()
        }
      }
    }
  )
  const detailGetRelatedCompanyNo = () => {
    api.detailGetRelatedCompanyNo().then(res => {
      if (res.code === 200) {
        state.componentsAddForm.formData.relatedCompanyNo = res.data
      }
    })
  }
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
        if (
          state.componentsAddForm.formData.relatedCompanyId &&
          props.title === 't-zgj-Edit'
        ) {
          api
            .updateRelatedCompany(state.componentsAddForm.formData)
            .then(res => {
              console.log(res)
              emit('on-confirm', res, '修改')
            })
        } else {
          api.addRelatedCompany(state.componentsAddForm.formData).then(res => {
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
    state.componentsAddForm.formData.organName = ''
    state.componentsAddForm.formData.organId = ''
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
      state.componentsAddForm.formData.organName = data[0].name
      state.componentsAddForm.formData.organId = data[0].id
    }
    showDepPerDialog.value = false
  }
</script>
<style lang="scss" scoped>
  .el-icon {
    color: #aaaaaa;
    margin-right: 5px;
  }
</style>

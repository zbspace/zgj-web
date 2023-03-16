<template>
  <div class="comp-info-center">
    <div class="left">
      <div class="base">
        <JyLabel
          label="基础信息"
          :btn="editBaseInfo ? '保存' : '修改'"
          :btn1="editBaseInfo ? '取消' : ''"
          @on-click="onClickBaseInfo"
          @on-click-cancel="onClickCancelBaseInfo"
        />
        <el-form
          ref="baseInfoFormRef"
          :model="baseInfoData"
          :rules="baseInfoRules"
          label-width="100px"
          hide-required-asterisk
          class="demo-ruleForm"
        >
          <div>
            <div class="rows">
              <el-form-item label="单位负责人" prop="tenantPm">
                <span class="content" v-if="!editBaseInfo">{{
                  props.tenantBaseInfo.tenantPm
                }}</span>
                <div v-else>
                  <el-input
                    v-model="baseInfoData.tenantPm"
                    style="width: 180px"
                    placeholder="请输入"
                  />
                </div>
              </el-form-item>
            </div>
            <div class="rows">
              <el-form-item label="负责人手机号" prop="tenantPmTel">
                <span class="content" v-if="!editBaseInfo">{{
                  props.tenantBaseInfo.tenantPmTel
                }}</span>
                <div v-else>
                  <el-input
                    v-model="baseInfoData.tenantPmTel"
                    style="width: 180px"
                    placeholder="请输入"
                  />
                </div>
              </el-form-item>
            </div>
            <div class="rows">
              <el-form-item label="服务器域名" prop="domainName">
                <span class="content" v-if="!editBaseInfo">{{
                  props.tenantBaseInfo.domainName
                }}</span>
                <div v-else>
                  <el-input
                    v-model="baseInfoData.domainName"
                    style="width: 180px"
                    placeholder="请输入"
                  />
                </div>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="base">
        <JyLabel
          label="超级管理员"
          btn="变更"
          @on-click="changeSAVisible = true"
        />
        <div class="form-content">
          <div class="rows">
            <span class="label">超级管理员</span>
            <div>
              <span class="content">{{ adminInfo.userName }}</span>
            </div>
          </div>
          <div class="rows">
            <span class="label">超级管理员账号</span>
            <div>
              <span class="content">{{ adminInfo.account }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <JyLabel
        label="密码设置"
        :btn="editPasswordSetting ? '保存' : '修改'"
        :btn1="editPasswordSetting ? '取消' : ''"
        @on-click="onClickPasswordSetting"
        @on-click-cancel="onClickCancelPasswordSetting"
      />
      <el-form
        ref="passwordRuleFormRef"
        :model="passwordData"
        :rules="passwordRules"
        label-width="160px"
        hide-required-asterisk
        class="demo-ruleForm"
      >
        <div>
          <div class="rows">
            <el-form-item label="首次登录必须修改密码" prop="passInitModfiy">
              <span class="content color-3ED096" v-if="!editPasswordSetting">{{
                props.passwordPolicy.passInitModfiy === '1' ? '是' : '否'
              }}</span>
              <el-switch
                v-else
                active-value="1"
                inactive-value="0"
                v-model="passwordData.passInitModfiy"
              />
            </el-form-item>
          </div>
          <div class="rows">
            <el-form-item label="弱密码禁止保存" prop="passLow">
              <span class="content color-3ED096" v-if="!editPasswordSetting">{{
                props.passwordPolicy.passLow === '1' ? '是' : '否'
              }}</span>
              <el-switch
                v-else
                active-value="1"
                inactive-value="0"
                v-model="passwordData.passLow"
              />
            </el-form-item>
          </div>
          <div class="rows">
            <el-form-item label="密码变更提醒" prop="passRemind">
              <div v-if="!editPasswordSetting">
                <span class="content color-3ED096">{{
                  props.passwordPolicy.passRemind === '1' ? '是' : '否'
                }}</span>
                <span
                  class="color-black-045"
                  v-if="props.passwordPolicy.passRemind === '1'"
                  >（提醒周期{{ props.passwordPolicy.passRemindNum }}天）</span
                >
              </div>
              <div style="display: flex; align-items: center" v-else>
                <el-switch
                  active-value="1"
                  inactive-value="0"
                  v-model="passwordData.passRemind"
                />
                <div v-if="passwordData.passRemind === '1'">
                  <span>&ensp;&ensp;提醒周期&ensp;&ensp;</span>
                  <el-input-number
                    v-model="passwordData.passRemindNum"
                    :min="0"
                  />
                  <span>&ensp;&ensp;天</span>
                </div>
              </div>
            </el-form-item>
          </div>
          <div class="rows">
            <el-form-item label="密码至少包含" prop="passwordRules">
              <div
                v-if="
                  !editPasswordSetting &&
                  props.passwordPolicy.passwordRules &&
                  props.passwordPolicy.passwordRules.length
                "
              >
                <template v-for="(item, index) in passwordRuleList">
                  <span
                    class="tab mr10"
                    :key="index"
                    v-if="
                      props.passwordPolicy.passwordRules.includes(item.value)
                    "
                    >{{ item.label }}</span
                  >
                </template>
              </div>
              <div v-if="editPasswordSetting">
                <el-checkbox-group v-model="passwordData.passwordRules">
                  <el-checkbox-button
                    v-for="(item, index) in passwordRuleList"
                    :key="index"
                    :label="item.value"
                  >
                    {{ item.label }}
                  </el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
          </div>
          <div class="rows">
            <el-form-item label="限制密码长度至少为" prop="passLength">
              <span class="content tab" v-if="!editPasswordSetting">{{
                props.passwordPolicy.passLength
              }}</span>
              <el-input-number
                v-else
                v-model="passwordData.passLength"
                :min="1"
                :max="18"
              />
              <span class="color-black-045">&ensp;位</span>
            </el-form-item>
          </div>
          <div class="rows">
            <el-form-item label="初始密码" prop="passInit">
              <span class="content tab" v-if="!editPasswordSetting">{{
                props.passwordPolicy.passInit
              }}</span>
              <div v-else>
                <el-input
                  v-model="passwordData.passInit"
                  type="password"
                  style="width: 126px"
                  placeholder="请输入"
                  show-password
                />
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
  <!-- 变更超级管理员 -->
  <ChangeSuperAdmin
    v-model="changeSAVisible"
    :superAdminInfo="adminInfo"
    @updateSuperAdminInfo="updateSuperAdminInfo"
  />
</template>

<script setup>
  import ChangeSuperAdmin from '../ChangeSuperAdmin'
  import companyInfoApi from '@/api/system/companyManagement/companyInfo'
  import { ElMessage } from 'element-plus'
  import { ref } from 'vue'
  const emit = defineEmits(['reloadData'])
  const props = defineProps({
    tenantBaseInfo: {
      type: Object,
      required: true
    },
    passwordPolicy: {
      type: Object,
      required: true
    }
  })
  const editBaseInfo = ref(false)
  const editPasswordSetting = ref(false)
  const passwordRuleFormRef = ref(null)
  const baseInfoFormRef = ref(null)
  const changeSAVisible = ref(false)

  const baseInfoData = ref(null)
  const validPhone = (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入负责人手机号'))
    } else {
      if (
        !/^((1[3-9][0-9]))\d{8}$|^(5|6|8|9)\d{7}$|^\d{3,4}-\d{7,8}$|^(852)?(2[1-9]|3[145679])\d{6}$/.test(
          value
        )
      ) {
        callback(new Error('负责人手机号格式不正确'))
      } else {
        callback()
      }
    }
  }
  const baseInfoRules = ref({
    tenantPm: [
      {
        required: true,
        message: '请输入单位负责人',
        trigger: 'change'
      }
    ],
    tenantPmTel: [
      {
        required: true,
        validator: validPhone,
        trigger: 'change'
      }
    ]
  })
  const adminInfo = ref({
    userName: '章管家',
    account: 'zgj-001',
    phone: '18888888888',
    email: '18888888888@163.com'
  })
  const passwordRuleList = ref([
    {
      label: '大写字母',
      value: 'passUppercase'
    },
    {
      label: '小写字母',
      value: 'passLowercase'
    },
    {
      label: '数字',
      value: 'passNum'
    },
    {
      label: '特殊字符',
      value: 'passSpecial'
    }
  ])
  const passwordData = ref(null)
  const passwordRules = ref({
    passInitModfiy: [
      {
        required: true,
        message: '请选择',
        trigger: 'change'
      }
    ],
    passLow: [
      {
        required: true,
        message: '请选择',
        trigger: 'change'
      }
    ],
    passRemind: [
      {
        required: true,
        message: '请选择',
        trigger: 'change'
      }
    ],
    passRemindNum: [
      {
        required: true,
        message: '请输入密码变更提醒周期天数',
        trigger: 'change'
      },
      {
        min: 1,
        max: 31,
        message: '提醒周期天数必须在1 ~ 31天之间',
        trigger: 'change'
      }
    ],
    passwordRules: [
      {
        required: true,
        message: '请选择密码至少包含的内容',
        trigger: 'change'
      }
    ],
    passLength: [
      {
        required: true,
        message: '请输入密码最小长度',
        trigger: 'change'
      }
    ],
    passInit: [
      {
        required: true,
        message: '请输入初始密码',
        trigger: 'change'
      }
    ]
  })

  // 基础信息
  const onClickBaseInfo = type => {
    console.log(type)
    if (type === '修改') {
      baseInfoData.value = JSON.parse(JSON.stringify(props.tenantBaseInfo))
      editBaseInfo.value = true
    } else {
      baseInfoFormRef.value.validate(valid => {
        if (valid) {
          console.log(baseInfoData.value)
          companyInfoApi.updateTenantBaseInfo(baseInfoData.value).then(() => {
            emit('reloadData')
            baseInfoFormRef.value.resetFields()
            editBaseInfo.value = false
            ElMessage({
              message: '基础信息变更成功',
              type: 'success'
            })
          })
        }
      })
    }
  }

  const onClickCancelBaseInfo = () => {
    baseInfoFormRef.value.resetFields()
    editBaseInfo.value = false
  }

  // 变更超管
  const updateSuperAdminInfo = () => {
    console.log(111)
    changeSAVisible.value = false
  }

  // 密码设置
  const onClickPasswordSetting = type => {
    console.log(type)
    if (type === '修改') {
      passwordData.value = JSON.parse(JSON.stringify(props.passwordPolicy))
      editPasswordSetting.value = !editPasswordSetting.value
    } else {
      passwordRuleFormRef.value.validate(valid => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(passwordData.value))
          console.log(params)
          const passwordRules = params.passwordRules
          delete params.passwordRules
          const rules = {
            passUppercase: '0',
            passLowercase: '0',
            passNum: '0',
            passSpecial: '0'
          }
          passwordRules.forEach(i => {
            rules[i] = '1'
          })
          companyInfoApi
            .updateTenantPasswordPolicy({
              ...params,
              ...rules
            })
            .then(res => {
              emit('reloadData')
              passwordData.value = null
              passwordRuleFormRef.value.resetFields()
              editPasswordSetting.value = false
              ElMessage({
                message: '密码规则变更成功',
                type: 'success'
              })
            })
        }
      })
    }
  }
  const onClickCancelPasswordSetting = () => {
    passwordRuleFormRef.value.resetFields()
    editPasswordSetting.value = !editPasswordSetting.value
  }
</script>

<style lang="scss" scoped>
  .comp-info-center {
    margin-top: 16px;
    display: flex;
    .left {
      .base {
        width: 436px;
        background-color: #fff;
        padding: 24px 24px 7px 24px;
        margin-bottom: 16px;
        .form-content {
          display: flex;
          flex-direction: column;
        }
      }
    }
    .right {
      margin-left: 16px;
      background-color: #fff;
      flex: 1;
      padding: 24px;
      margin-bottom: 16px;
    }
    .header {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      display: flex;
      align-items: center;
      position: relative;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      padding: 0 0 8px 0;
      margin-bottom: 16px;
      span {
        width: 3px;
        height: 20px;
        background-color: #d0963e;
        display: inline-block;
        margin-right: 7px;
      }
      button {
        position: absolute;
        right: 0;
      }
    }
    .rows {
      display: flex;
      width: 100%;
      margin-bottom: 16px;
      align-items: center;
      .label {
        width: 108px;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        text-align: right;
        color: rgba(0, 0, 0, 0.65);
        margin-right: 24px;
      }
      .content {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
      }
      img {
        margin-left: 14px;
        cursor: pointer;
      }
      .tab {
        display: inline-block;
        padding: 0 14px;
        gap: 10px;
        height: 30px;
        line-height: 30px;
        background: rgba(0, 0, 0, 0.04);
        color: rgba(0, 0, 0, 0.85);
      }

      .mr10 {
        margin-right: 10px;
      }
    }
    .w-140 {
      width: 140px !important;
    }
    .input {
      display: flex;
      align-items: center;
      :deep(.el-input) {
        width: 130px;
      }
      .save {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #3e78d0;
        margin-right: 12px;
        margin-left: 18px;
        cursor: pointer;
        width: 42px;
      }
      .cancel {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.45);
        cursor: pointer;
        width: 42px;
      }
    }
    .color-3ED096 {
      color: #3ed096 !important;
    }
    .color-black-045 {
      color: rgba(0, 0, 0, 0.45) !important;
    }
    :deep(.el-form) {
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__label {
          font-weight: 400;
          font-size: 14px;
          text-align: right;
          color: rgba(0, 0, 0, 0.65);
          margin-right: 0;
          margin-bottom: 0;
        }
        .el-checkbox__label {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0 14px;
          gap: 10px;
          height: 30px;
          background: rgba(0, 0, 0, 0.04);
          color: rgba(0, 0, 0, 0.85);
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          margin-left: 12px;
        }
        .el-checkbox {
          padding: 0;
          margin-right: 24px;
        }
      }
    }
  }
</style>

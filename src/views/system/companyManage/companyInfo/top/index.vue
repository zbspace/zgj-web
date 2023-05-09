<template>
  <div class="comp-info-top">
    <div class="bg">
      <div class="left">
        <img
          src="@/assets/svg/verification/verification-error.svg"
          v-show="!homeLogoUrl.homeUrl"
          style="object-fit: fill; width: 52px; height: 28px"
        />
        <img
          :src="homeLogoUrl.homeUrl"
          v-show="homeLogoUrl.homeUrl"
          style="object-fit: fill; width: 52px; height: 28px"
        />
      </div>
      <div class="right">
        <div class="name"> {{ props.tenant.tenantName }} </div>
        <div class="label" v-if="!edit">
          <span>{{ props.tenant.tenantTitle }}</span>
          <img :src="inputIcon" @click="editTitle" />
        </div>
        <div v-if="edit" class="input">
          <el-input
            v-model="tenantTitle"
            placeholder="请输入新的头部系统显示名称"
            maxlength="256"
          />
          <span class="save" @click="save">保存</span>
          <span class="cancel" @click="cancel">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import inputIcon from '@/assets/svg/system/comp-info/input.svg'
  import companyInfoApi from '@/api/system/companyManagement/companyInfo'
  import { ElMessage } from 'element-plus'
  import { useAccountInfoStore } from '@/store/accountInfo'
  import { useHomeLogoUrl } from '@/store/logo'
  const homeLogoUrl = useHomeLogoUrl()
  const accountInfo = useAccountInfoStore()
  const emit = defineEmits(['reloadData'])

  const props = defineProps({
    tenant: {
      type: Object,
      required: true
    }
  })

  const tenantTitle = ref(null)
  const edit = ref(false)
  const save = () => {
    companyInfoApi
      .editTenantTitle({
        tenantTitle: tenantTitle.value,
        tenantId: localStorage.getItem('tenantId')
      })
      .then(res => {
        ElMessage({
          message: '标题变更成功',
          type: 'success'
        })
        edit.value = !edit.value
        emit('reloadData')
        accountInfo.setOneDeaprtTitle(tenantTitle.value)
      })
  }
  const cancel = () => {
    edit.value = !edit.value
  }
  const editTitle = () => {
    tenantTitle.value = props.tenant.tenantTitle
    edit.value = true
  }
</script>

<style lang="scss" scoped>
  .comp-info-top {
    background-color: #fff;
    height: 188px;
    width: 100%;
    border-radius: 4px;
    padding: 24px 16px;
    .bg {
      background: rgba(105, 70, 70, 0.04);
      border-radius: 4px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 24px;
      .left {
        margin-right: 18px;
        height: 72px;
        width: 72px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
      }
      .right {
        .name {
          font-style: normal;
          font-weight: 400;
          font-size: 22px;
          line-height: 30px;
          margin-bottom: 12px;
          color: #212529;
        }
        .label {
          display: flex;
          span {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: #212529;
          }
          img {
            cursor: pointer;
            margin-left: 14px;
          }
        }
        .input {
          display: flex;
          width: 100%;
          align-items: center;
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
      }
    }
  }
</style>

<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 
 * @LastEditTime: 2023-05-11
!-->
<template>
  <div class="form-detail">
    <JyLabel label="基本信息" />
    <div class="base-info">
      <div>
        <p style="width: 100%">
          <span>表单名称：</span>
          <span>{{ detail.formName || '-' }}</span>
        </p>
        <p>
          <span>表单编码：</span>
          <span>{{ detail.formNo || '-' }}</span>
        </p>
        <p>
          <span>业务类型：</span>
          <span>{{ detail.applyTypeName || '-' }}</span>
        </p>
        <p>
          <span>用印类型：</span>
          <span>{{ detail.sealUseTypeName || '-' }}</span>
        </p>
        <p>
          <span>表单状态：</span>
          <span>{{ detail.flag === '0' ? '停用' : '启用' }}</span>
        </p>
        <p>
          <span>创建时间：</span>
          <span>{{ detail.createDatetimeStr || '-' }}</span>
        </p>
        <p>
          <span>创建人：</span>
          <span>{{ detail.createUserName || '-' }}</span>
        </p>
        <p>
          <span>更新时间：</span>
          <span>{{ detail.modifyDatetimeStr || '-' }}</span>
        </p>
        <p style="width: 100%">
          <span>表单说明：</span>
          <span>{{ detail.readme || '-' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import formManageService from '@/api/system/formManagement'

  const detail = ref({})
  const loading = ref(false)

  const props = defineProps({
    formMessageId: {
      type: String,
      default: ''
    }
  })

  const getFormDetail = async () => {
    loading.value = true
    const res = await formManageService.getFormDetail({
      formMessageId: props.formMessageId
    })
    detail.value = res.data

    loading.value = false
  }

  onMounted(() => {
    getFormDetail()
  })
</script>

<script>
  export default { name: '' }
</script>
<style lang="scss" scoped>
  .form-detail {
    .base-info {
      div {
        display: flex;
        flex-wrap: wrap;
        p {
          width: 50%;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.45);
          margin-bottom: 16px;
          display: flex;
          span:nth-of-type(1) {
            display: inline-block;
            text-align: right;
            width: 130px;
            flex-shrink: 0;
          }
          span:nth-of-type(2) {
            color: rgba(0, 0, 0, 0.85);
            display: inline-block;
            text-align: left;
            word-break: break-all;
            width: 80%;
          }
        }
      }
    }
  }
</style>

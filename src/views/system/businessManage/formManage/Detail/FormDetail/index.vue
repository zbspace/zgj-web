<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 
* @LastEditTime 2023-03-29 16:20:32
!-->
<template>
  <div class="form-detail">
    <JyLabel label="基本信息" />
    <div class="base-info">
      <div>
        <p>
          表单名称：<span>{{ detail.formName || '-' }}</span>
        </p>
        <p>
          业务类型：<span>{{ detail.applyTypeName || '-' }}</span>
        </p>
        <p>
          表单状态：<span>{{ detail.formName || '-' }}</span>
        </p>
        <p>
          创建人：<span>{{ detail.formName || '-' }}</span>
        </p>
        <p>
          更新时间：<span>{{ detail.modifyDatetimeStr || '-' }}</span>
        </p>
        <p>
          表单说明：<span>{{ detail.readme || '-' }}</span>
        </p>
      </div>
      <div>
        <p>
          表单编码：<span>{{ detail.formNo || '-' }}</span>
        </p>
        <p>
          关联文件类型：<span>{{ detail.formName || '-' }}</span>
        </p>
        <p>
          用印类型：<span>{{ detail.sealUseTypeName || '-' }}</span>
        </p>
        <p>
          创建时间：<span>{{ detail.createDatetimeStr || '-' }}</span>
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
      display: flex;
      div {
        width: 100%;
        p {
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.45);
          margin-bottom: 16px;
          text-align: right;
          span {
            color: rgba(0, 0, 0, 0.85);
            display: inline-block;
            width: 63%;
            text-align: left;
          }
        }
      }
    }
  }
</style>

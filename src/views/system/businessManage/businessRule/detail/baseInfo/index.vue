<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 
* @LastEditTime 2023-04-10 10:19:28
!-->
<template>
  <div class="form-detail">
    <JyLabel label="基本信息" />
    <div class="base-info">
      <div>
        <p>
          业务规则名称：<span>{{ detail.ruleBusinessName || '-' }}</span>
        </p>
        <p>
          用印类型：<span>{{ detail.sealUseTypeName || '-' }}</span>
        </p>
        <p>
          业务规则状态：<span>{{ detail.flag === '0' ? '停用' : '启用' }}</span>
        </p>
        <p>
          更新时间：<span>{{ detail.modifyDatetime || '-' }}</span>
        </p>
        <p>
          业务规则说明：<span>{{ detail.remark || '-' }}</span>
        </p>
      </div>
      <div>
        <p>
          业务规则编码：<span>{{ detail.ruleBusinessNo || '-' }}</span>
        </p>
        <p>
          关联文件类型：<span>{{ detail.fileTypeName || '-' }}</span>
        </p>
        <p>
          创建人：<span>{{ detail.createUserName || '-' }}</span>
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
  import ruleApi from '@/api/system/businessManage/businessRule'

  const detail = ref({})
  const loading = ref(false)

  const props = defineProps({
    ruleBusinessId: {
      type: String,
      default: ''
    }
  })

  const getDetail = async () => {
    loading.value = true
    const res = await ruleApi.ruleView(props.ruleBusinessId)
    detail.value = res.data
    loading.value = false
  }

  onMounted(() => {
    getDetail()
  })
</script>

<script>
  export default { name: 'BaseInfo' }
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

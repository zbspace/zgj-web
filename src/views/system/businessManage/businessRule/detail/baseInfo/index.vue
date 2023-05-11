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
        <p style="width: 100%">
          <span>业务规则名称：</span
          ><span>{{ detail.ruleBusinessName || '-' }}</span>
        </p>
        <p>
          <span>业务规则编码：</span
          ><span>{{ detail.ruleBusinessNo || '-' }}</span>
        </p>
        <p>
          <span>用印类型：</span
          ><span>{{ detail.sealUseTypeName || '-' }}</span>
        </p>
        <p>
          <span>关联文件类型：</span><span>{{ fileTypeNames || '-' }}</span>
        </p>
        <p>
          <span>业务规则状态：</span
          ><span>{{ detail.flag === '0' ? '停用' : '启用' }}</span>
        </p>
        <p>
          <span>创建时间：</span><span>{{ detail.createDatetime || '-' }}</span>
        </p>
        <p>
          <span>创建人：</span><span>{{ detail.createUserName || '-' }}</span>
        </p>
        <p>
          <span>更新时间：</span><span>{{ detail.modifyDatetime || '-' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import ruleApi from '@/api/system/businessManage/businessRule'

  const detail = ref({})
  const loading = ref(false)

  const fileTypeNames = computed(v => {
    return (
      (detail.value.fileTypeList &&
        detail.value.fileTypeList.map(v => v.name).join('、')) ||
      '-'
    )
  })

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

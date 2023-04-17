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
          组织名称：<span>{{ detail.organName || '-' }}</span>
        </p>
        <p>
          组织类型：<span>{{ detail.organTypeName || '-' }}</span>
        </p>
        <p>
          组织主管：<span>{{ detail.leaderUserName || '-' }}</span>
        </p>
        <p>
          备注：<span>{{ detail.readme || '-' }}</span>
        </p>
      </div>
      <div>
        <p>
          组织编码：<span>{{ detail.organNo || '-' }}</span>
        </p>
        <p>
          组织人数：<span>{{ detail.sealTypeName || 0 }}</span>
        </p>
        <p>
          上级组织：<span>{{ detail.organPName || '-' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import departmentService from '@/api/system/companyManagement/department'

  const detail = ref({})
  const loading = ref(false)

  const props = defineProps({
    organId: {
      type: String,
      default: ''
    }
  })

  const getDetail = async () => {
    loading.value = true
    const res = await departmentService.detail(props.organId)
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

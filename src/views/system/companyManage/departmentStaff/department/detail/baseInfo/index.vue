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
          <span>组织名称：</span> <span>{{ detail.organName || '-' }}</span>
        </p>
        <p>
          <span>组织类型：</span
          ><span>{{
            detail.organTypeId
              ? detail.organTypeId === 'department'
                ? '部门'
                : '单位'
              : '-'
          }}</span>
        </p>
        <p>
          <span>组织主管：</span
          ><span>{{ detail.organLeaderName || '-' }}</span>
        </p>
      </div>
      <div>
        <p>
          <span>组织编码：</span><span>{{ detail.organNo || '-' }}</span>
        </p>
        <p>
          <span>组织人数：</span><span>{{ detail.sealTypeName || 0 }}</span>
        </p>
        <p>
          <span>上级组织：</span
          ><span>{{
            detail.organPid === '-1'
              ? getItem('accountInfo').userDepartName
              : detail.organPName || '-'
          }}</span>
        </p>
      </div>
      <div style="width: 100%">
        <p>
          <span>备注：</span><span>{{ detail.readme || '-' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import departmentService from '@/api/system/companyManagement/department'
  import { getItem } from '@/utils/storage'

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
      flex-wrap: wrap;
      div {
        width: 50%;
        p {
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

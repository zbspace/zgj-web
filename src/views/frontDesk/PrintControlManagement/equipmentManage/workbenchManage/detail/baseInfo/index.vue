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
          工作台名称：<span>{{ detail.ruleBusinessName || '-' }}</span>
        </p>
        <p>
          设备串号：<span>{{ detail.sealCode || '-' }}</span>
        </p>
        <p>
          保管人：<span>{{ detail.manUserName || '-' }}</span>
        </p>
        <p>
          创建人：<span>{{ detail.createUserName || '-' }}</span>
        </p>
        <p>
          软件版本号：<span>{{ detail.remark || '-' }}</span>
        </p>
        <p>
          固件版本号：<span>{{ detail.remark || '-' }}</span>
        </p>
        <p>
          备注：<span>{{ detail.readme || '-' }}</span>
        </p>
      </div>
      <div>
        <p>
          工作台编码：<span>{{ detail.benchNo || '-' }}</span>
        </p>
        <p>
          设备状态：<span>{{ ['停用', '正常'][detail.flag] || '-' }}</span>
        </p>
        <p>
          保管部门：<span>{{ detail.manOrganName || '-' }}</span>
        </p>
        <p>
          创建时间：<span>{{ detail.createDatetime || '-' }}</span>
        </p>
        <p>
          更新时间：<span>{{ detail.modifyDatetime || '-' }}</span>
        </p>
      </div>
    </div>
    <JyLabel label="配置" />
    <div class="base-info">
      <div>
        <p>
          盖章码盖章：<span>{{ ['否', '是'][detail.sealCode] || '-' }}</span>
        </p>
        <p>
          语音交互：<span>{{ ['否', '是'][detail.voiceDialogue] || '-' }}</span>
        </p>
        <p>
          人脸识别登录：<span>{{ ['否', '是'][detail.faceLogin] || '-' }}</span>
        </p>
        <p>
          休眠：<span>{{ ['否', '是'][detail.dormantOpen] || '-' }}</span>
        </p>
      </div>
      <div>
        <p>
          人脸快捷盖章：<span>{{ ['否', '是'][detail.faceSeal] || '-' }}</span>
        </p>
        <p>
          红外电子围栏：<span>{{ ['否', '是'][detail.irFence] || '-' }}</span>
        </p>
        <p>
          自动锁屏：<span>{{ ['否', '是'][detail.autoLock] || '-' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import workbenchService from '@/api/frontDesk/printControl/workbenchManagement'

  const detail = ref({})
  const loading = ref(false)

  const fileTypeNames = computed(v => {
    return (
      (detail.value.fileTypeList &&
        detail.value.fileTypeList.map(v => v.fileTypeName).join('、')) ||
      '-'
    )
  })

  const props = defineProps({
    benchId: {
      type: String,
      default: ''
    }
  })

  const getDetail = async () => {
    loading.value = true
    const res = await workbenchService.detail(props.benchId)
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

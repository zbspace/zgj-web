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
          印章全称：<span>{{ detail.sealName || '-' }}</span>
        </p>
        <p>
          印章编码：<span>{{ detail.sealNo || '-' }}</span>
        </p>
        <p>
          印章状态：<span>{{
            ['正常', '停用', '已销毁'][detail.sealStateId] || '-'
          }}</span>
        </p>
        <p>
          硬件版本：<span> {{ detail.hardwareVersion || '-' }}</span>
        </p>
        <p>
          保管人：<span>{{ detail.keepUserName || '-' }}</span>
        </p>
        <p>
          创建时间：<span>{{ detail.createDatetime || '-' }}</span>
        </p>
        <p>
          制度链接：<span>{{ detail.bylawsUrl || '-' }}</span>
        </p>
        <p> 备注： <span v-html="detail.sealExplain"></span> </p>
        <p>
          印章维护范围：<span>{{ detail.visible || '-' }}</span>
        </p>
        <p>
          印章使用范围：<span>{{ detail.usable || '-' }}</span>
        </p>
      </div>
      <div>
        <p>
          印章简称：<span>{{ detail.sealAlias || '-' }}</span>
        </p>
        <p>
          印章类型：<span>{{ detail.sealTypeName || '-' }}</span>
        </p>
        <p>
          印模：<span>
            <a
              v-if="detail.shapes && detail.shapes.length"
              @click="onPreview(detail.shapes[0].fileUrl)"
              >查看</a
            >
            <span v-else>-</span>
          </span>
        </p>
        <p>
          固件版本：<span> {{ detail.firmwareVersion || '-' }}</span>
        </p>
        <p>
          保管部门：<span>{{ detail.keepOrganName || '-' }}</span>
        </p>
        <p>
          更新时间：<span>{{ detail.modifyDatetime || '-' }}</span>
        </p>
      </div>
    </div>
    <JyLabel label="附件">
      <template #right> 打包下载 </template>
    </JyLabel>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import sealService from '@/api/frontDesk/sealManage/libraryOfSeals'

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
    sealId: {
      type: String,
      default: ''
    }
  })

  const getDetail = async () => {
    loading.value = true
    const res = await sealService.sealDetailInfo(props.sealId)
    detail.value = res.data
    loading.value = false
  }

  const onPreview = fileUrl => {
    window.open(fileUrl, '_blank')
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

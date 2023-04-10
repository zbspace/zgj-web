<template>
  <div class="comp-info-bottom">
    <JyLabel label="系统页面设置" />
    <div class="switch">
      <span>页面水印</span>
      <el-switch
        v-model="pageWatermark"
        :loading="pageWatermarkLoading"
        size="large"
        active-value="1"
        inactive-value="0"
        :before-change="changeWaterMakeStatus"
      />
    </div>
    <div class="upload">
      <el-upload
        drag
        :action="`/api/tenant/tenantLogo/update/${tenantId}`"
        :headers="headers"
        :show-file-list="false"
        :data="{
          type: 1
        }"
        :before-upload="beforeUpload"
      >
        <div class="uploadTip" v-if="!props.tenantShowInfo.homeLogoPath">
          <div>
            <img class="uploadIcon" :src="shapeIcon" />
            <p>上传首页LOGO</p>
          </div>
        </div>

        <el-image
          class="logoImage"
          :src="props.tenantShowInfo.homeLogoPath"
          fit="scale-down"
          v-else
        ></el-image>
      </el-upload>
    </div>
    <div class="upload">
      <el-upload
        drag
        :action="`/api/tenant/tenantLogo/update/${tenantId}`"
        :headers="headers"
        :data="{
          type: 2
        }"
        :show-file-list="false"
        :before-upload="beforeUpload"
      >
        <div class="uploadTip" v-if="!props.tenantShowInfo.loginLogoPath">
          <img class="uploadIcon" :src="shapeIcon" />
          <p>上传登录页LOGO</p>
        </div>
        <el-image
          class="logoImage"
          :src="props.tenantShowInfo.loginLogoPath"
          fit="scale-down"
          v-else
        ></el-image>
      </el-upload>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useAccountInfoStore } from '@/store/accountInfo'
  import { ElMessage } from 'element-plus'
  import apis from '@/api/system/companyManagement/companyInfo'
  import { setWaterMark, removeWatermark } from '@/utils/water'
  import dayjs from 'dayjs'

  const emit = defineEmits(['reloadData'])
  const props = defineProps({
    tenantShowInfo: {
      type: Object,
      required: true
    }
  })
  const pageWatermark = ref('1')
  const pageWatermarkLoading = ref(false)
  const tenantId = ref(localStorage.getItem('tenantId'))
  const headers = ref({
    'zgj-token': useAccountInfoStore().token
  })

  watch(
    () => props.tenantShowInfo,
    () => {
      pageWatermark.value = props.tenantShowInfo.pageWatermark
    }
  )

  const changeWaterMakeStatus = () => {
    pageWatermarkLoading.value = true
    const formData = new FormData()
    formData.append('type', 3)
    formData.append('pageWatermark', pageWatermark.value === '1' ? '0' : '1')
    return new Promise((resolve, reject) => {
      apis.updatePageSetting(tenantId.value, formData).then(
        () => {
          pageWatermarkLoading.value = false
          pageWatermark.value = pageWatermark.value === '1' ? '0' : '1'
          localStorage.setItem('watermark', pageWatermark.value)
          removeWatermark()
          if (pageWatermark.value === '1') {
            const text =
              JSON.parse(localStorage.getItem('accountInfo')).userInfo
                .userName +
              ' ' +
              dayjs().format('YYYY-MM-DD HH:mm')
            setWaterMark(text)
          }
          emit('reloadData')
          return resolve(true)
        },
        () => {
          pageWatermarkLoading.value = false
          return reject(new Error('Error'))
        }
      )
    })
  }

  const beforeUpload = file => {
    if (!file) return
    const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
    const isLt2M = file.size / 1024 / 1024 < 2
    if (testmsg !== 'png' && testmsg !== 'jpg' && testmsg !== 'jpeg') {
      ElMessage.warning('请上传文件格式为png、jpg、jpeg的图片')
      return false
    }
    if (!isLt2M) {
      ElMessage.warning('上传图片大小不能超过2MB')
      return false
    }
  }
</script>

<style lang="scss" scoped>
  .comp-info-bottom {
    background-color: #fff;
    padding: 24px;
    .switch {
      margin-bottom: 10px;

      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
        margin-right: 14px;
      }
    }
    .upload {
      width: 362px;
      // height: 200px;
      // border: 2px dashed #e9ebec;
      // border-radius: 6px;
      // text-align: center;
      // padding-top: 66px;
      // cursor: pointer;
      display: inline-block;
      margin-right: 14px;

      .uploadTip {
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .uploadIcon {
        width: 60px;
        margin-bottom: 10px;
      }
      p {
        font-weight: 400;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
    }

    .logoImage {
      width: 100%;
      height: 200px;
    }
  }
</style>
<style lang="scss">
  .upload {
    .el-upload-dragger {
      padding: 10px;
    }
  }
</style>

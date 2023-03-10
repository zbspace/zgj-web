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
        inactive-value="2"
        @change="changeWaterMakeStatus"
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
        :on-progress="homeLogoProgress"
        :before-upload="beforeUpload"
      >
        <div class="uploadTip">
          <div v-if="!homeLogoPercentage">
            <img class="uploadIcon" :src="shapeIcon" />
            <p>上传首页LOGO</p>
          </div>
          <el-progress
            type="circle"
            :percentage="homeLogoPercentage"
            v-if="homeLogoPercentage"
          />
        </div>

        <!-- <el-image class="logoImage" :src="shapeIcon" fit="contain"></el-image> -->
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
      >
        <div class="uploadTip">
          <img class="uploadIcon" :src="shapeIcon" />
          <p>上传登录页LOGO</p>
        </div>
        <!-- <el-image class="logoImage" :src="shapeIcon" fit="contain"></el-image> -->
      </el-upload>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import shapeIcon from '@/assets/svg/system/comp-info/shape.svg'
  import { useAccountInfoStore } from '@/store/accountInfo'
  import { ElMessage } from 'element-plus'
  import apis from '@/api/system/companyManagement/companyInfo'
  const pageWatermark = ref('1')
  const pageWatermarkLoading = ref(false)
  const homeLogoPercentage = ref(0)
  const tenantId = ref(localStorage.getItem('tenantId'))
  const headers = ref({
    'zgj-token': useAccountInfoStore().token
  })

  const homeLogoProgress = (event, file, fileLists) => {
    homeLogoPercentage.value = event.percent
  }

  const changeWaterMakeStatus = e => {
    pageWatermarkLoading.value = true
    const formData = new FormData()
    formData.append('type', 3)
    formData.append('pageWatermark', e)
    apis.updatePageSetting(tenantId.value, formData).then(
      res => {
        pageWatermarkLoading.value = false
      },
      () => {
        pageWatermark.value = e === '1' ? '2' : '1'
        pageWatermarkLoading.value = false
      }
    )
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

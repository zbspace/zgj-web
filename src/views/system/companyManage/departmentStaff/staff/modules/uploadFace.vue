<!--
* @Descripttion 员工上传人脸照片
* @FileName updatePassword.vue
* @Author Guanpf
* @LastEditTime 2023-03-09 15:32:49
!-->
<template>
  <div class="jy-message-box">
    <el-dialog
      title="设置人脸"
      v-model="isVisible"
      :before-close="handleClose"
      :show-close="false"
      destroy-on-close
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="40%"
      align-center
      draggable
    >
      <template #header>
        <!-- mode1 -->
        <div>
          <slot name="header">
            <div class="header-div">
              <span>设置人脸</span>
            </div>
          </slot>
        </div>
        <div class="dialog-header-remove" @click="cancel">
          <svg class="iconpark-icon"><use href="#Vector"></use></svg>
        </div>
      </template>
      <el-form
        :model="state.formData"
        :rules="state.formRules"
        ref="uploadForm"
      >
        <el-form-item label="人脸照片" prop="userFaceId">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-input
              type="hidden"
              v-model="state.formData.userFaceId"
            ></el-input>
            <img
              v-if="state.formData.userFaceUrl"
              :src="state.formData.userFaceUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            <template #tip>
              <div class="el-upload__tip"
                >1.支持上传JPG/JPEG/PNG格式的人脸图片，大小不超过5M</div
              >
              <div class="el-upload__tip"
                >2.请尽量保证人脸图形完整清晰，没有遮挡</div
              >
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="comifrm">提 交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { ref, reactive, computed } from 'vue'
  import { ElMessage } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  const uploadForm = ref(null)
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Array,
      default: () => {
        return []
      }
    }
  })
  const emit = defineEmits(['update:show', 'on-confirm', 'on-cancel'])
  const isVisible = computed({
    get() {
      return props.show
    },
    set(value) {
      emit('update:show', value)
    }
  })
  const state = reactive({
    formData: {
      userFaceId: ''
    },
    formRules: {
      userFaceId: [
        {
          required: true,
          message: '',
          trigger: 'change'
        }
      ]
    }
  })
  const handleClose = () => {
    console.log('handleClose')
    state.props.show = false
  }
  const comifrm = value => {
    console.log(uploadForm)
    uploadForm.value.validate(valid => {
      if (valid) {
        console.log('修改成功')
        emit('on-confirm', value)
      } else {
        ElMessage.error('请上传人脸照片')
      }
    })
    isVisible.value = false
  }
  const cancel = value => {
    emit('on-cancel', value)
    isVisible.value = false
  } // 上传图片
  const handleAvatarSuccess = (res, file) => {
    console.log(res, file)
  }
  // 上传图片前处理
  const beforeAvatarUpload = file => {
    console.log(file)
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isJPG && isLt2M
  }
</script>
<style lang="scss" scoped>
  .jy-message-box {
    :deep(.el-dialog) {
      min-height: auto;
      padding: 0;
      height: 400px;
      .el-dialog__header {
        padding: 0;
        display: flex;
        align-items: center;
        margin-right: 0;
        height: 55px;
        padding: 0 12px 0 24px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        .dialog-header-remove {
          position: absolute;
          right: 1rem;
          cursor: pointer;
          height: 1.5rem;
          display: flex;
          align-items: center;
          .iconpark-icon {
            width: 1rem;
            height: 1rem;
          }
        }
        .header-div {
          display: flex;
          align-items: center;
        }
        img {
          width: 21px;
          margin-right: 18px;
        }
        span {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: rgba(0, 0, 0, 0.85);
        }
      }
      .el-dialog__body {
        height: auto;
        min-height: auto;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.65);
      }
      .el-dialog__footer {
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        right: 0;
        height: 55px;
        line-height: 55px;
        padding: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.06);
      }
      .el-form-item__content {
        display: block;
      }
      .tips {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
    .refresh-icon {
      cursor: pointer;
      font-size: 24px;
      display: inline-block;
      position: relative;
      top: 5px;
    }
  }
</style>

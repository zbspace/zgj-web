<!--
* @Descripttion index.vue
* @fileOriginName index.vue
* @Author zb
* @module 用印文件
* @LastEditTime 2023-03-29 10:08:47
!-->
<template>
  <JyDialog
    v-model="isVisible"
    title="用印文件"
    centerBtn
    @opened="onOpened"
    @close="close"
    @confirm="confirm"
    :destroyOnClose="true"
    :width="900"
  >
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="文件名称" prop="fileOriginName">
        <el-input
          v-model="formData.fileOriginName"
          placeholder="自动生成文件名称、用随机数字替代"
          style="width: 420px"
        />
      </el-form-item>
      <div class="file-list">
        <el-upload
          :file-list="tempFileList"
          ref="addPng"
          multiple
          :show-file-list="false"
          :http-request="
            options => {
              handleRequest(options, 1)
            }
          "
        >
          <div class="add-file">
            <svg class="iconpark-icon"><use href="#icon-add"></use></svg>
          </div>
        </el-upload>
        <Draggable
          v-model="fileList"
          class="file-list"
          item-key="id"
          handle=".file"
          group="notFix"
          animation="300"
        >
          <template #item="{ element: item, index }">
            <div class="file">
              <img :src="item.fileUrl" alt="" />
              <p>
                <svg class="iconpark-icon" @click="showPreview(index)">
                  <use href="#eye-8o856i26"></use>
                </svg>
                <svg class="iconpark-icon" @click="remove(index)">
                  <use href="#remove"></use>
                </svg>
              </p>
              <div class="hover-div"> </div>
            </div>
          </template>
        </Draggable>

        <el-image
          src="https://static.runoob.com/images/demo/demo3.jpg"
          style="width: 0; height: 0"
          :zoom-rate="1.2"
          :preview-src-list="urls"
          :hide-on-click-modal="true"
          :initial-index="initialIndex"
        />
      </div>
    </el-form>
    <p class="uploaded-files">已上传: {{ fileList.length }} 张</p>

    <JyMessageBox
      v-model="tipVisible"
      :mode="1"
      @on-confirm="confirmTip"
      title="点击确定会删除该文件！"
    >
      文件内没有图片，点击确定的话会删除该文件，请问确定要继续吗？
    </JyMessageBox>
  </JyDialog>
</template>

<script setup>
  import { messageError, messageWarning } from '@/hooks/useMessage'
  import { ref, nextTick, computed } from 'vue'
  import SealApplyService from '@/api/frontDesk/printControl/sealApply'

  const formData = ref({ fileOriginName: '' })
  const fileList = ref([])
  const tempFileList = ref([])
  const initialIndex = ref(0)
  const ruleFormRef = ref(null)
  const tipVisible = ref(false)

  const urls = computed(() => {
    return fileList.value.map(v => v.fileUrl)
  })

  const props = defineProps({
    imgFiles: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    },
    fileOriginName: {
      type: String,
      default: ''
    },
    // 自定义id用于编辑
    curIndex: {
      type: Number,
      default: null
    }
  })

  const emit = defineEmits(['confirm', 'update:modelValue'])

  const rules = {
    fileOriginName: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur'
      }
    ]
  }

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const handleRequest = async (options, type) => {
    const str = options.file.name.split('.').pop()
    if (!['png', 'jpg', 'jpeg'].includes(str)) {
      messageError('请上传图片文件')
      return false
    } else if (options.file.size / 1024 / 1024 > 199) {
      messageError('单个文件大小不能超过199M!')
      return false
    }
    const formData = new FormData()
    formData.append('uploadFile', options.file)
    try {
      const res = await SealApplyService.uploadFile(formData)
      fileList.value.push(res.data)
      options.onSuccess()
    } catch (error) {
      //
    }
  }

  const remove = index => {
    fileList.value.splice(index, 1)
  }

  const showPreview = index => {
    initialIndex.value = index
    nextTick(() => {
      document.getElementsByClassName('el-image__preview')[0].click()
    })
  }

  const confirm = async () => {
    if (props.curIndex === null && !fileList.value.length) {
      messageWarning('请选择需要上传的文件')
      return false
    }
    if (props.curIndex !== null && !fileList.value.length) {
      tipVisible.value = true
      return
    }
    try {
      await ruleFormRef.value.validate()
      emit('confirm', {
        fileOriginName: formData.value.fileOriginName,
        fileSubImages: fileList.value.map(v => {
          return {
            fileId: v.fileId,
            fileUrl: v.fileUrl,
            fileOriginName: v.fileOriginName
          }
        })
        // customId: props.curIndex || new Date().getTime() + ''
      })
      isVisible.value = false
    } catch (error) {}
  }

  const onOpened = () => {
    if (props.curIndex !== null) {
      formData.value.fileOriginName = props.fileOriginName
    } else {
      formData.value.fileOriginName = new Date().getTime() + ''
    }
    fileList.value = props.imgFiles
  }

  const confirmTip = () => {
    emit('confirm', {})
    isVisible.value = false
  }

  const close = () => {
    isVisible.value = false
    fileList.value = []
    emit('confirm')
  }
</script>

<script>
  export default { name: 'JyUseSealFiles' }
</script>

<style lang="scss">
  .file-list {
    min-height: 400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-content: flex-start;
    .add-file {
      width: 96px;
      height: 96px;
      background: #ffffff;
      border: 1px dashed rgba(0, 0, 0, 0.15);
      border-radius: 2px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 8px 5px;
      cursor: pointer;
      .iconpark-icon {
        color: rgba(0, 0, 0, 0.25);
        width: 18px;
        height: 18px;
      }
    }
    .file {
      border-radius: 1.92px;
      width: 96px;
      height: 96px;
      margin: 8px 5px;
      display: flex;
      align-items: center;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      p {
        position: absolute;
        left: 0;
        align-items: center;
        justify-content: space-between;
        width: 50px;
        left: 50%;
        transform: translateX(-50%);
        display: none;
        .iconpark-icon {
          width: 20px;
          height: 20px;
          color: #fff;
          cursor: pointer;
        }
      }
      &:hover {
        p {
          display: flex;
          z-index: 1;
        }
        .hover-div {
          position: absolute;
          width: 96px;
          height: 96px;
          background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.4)
          );
          border-radius: 1.92px;
          cursor: move;
        }
      }
    }
  }
  .uploaded-files {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
  }
</style>

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
        <div class="add-file">
          <svg class="iconpark-icon"><use href="#icon-add"></use></svg>
        </div>
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
                  <use href="#eye"></use>
                </svg>
                <svg class="iconpark-icon" @click="remove(index)">
                  <use href="#icon"></use>
                </svg>
              </p>
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
    <p class="uploaded-files">已上传: {{ fileUrls.length }} 张</p>
  </JyDialog>
</template>

<script setup>
  import { ref, nextTick, computed } from 'vue'
  const formData = ref({ fileOriginName: '' })
  const fileList = ref([])
  const initialIndex = ref(0)
  const ruleFormRef = ref(null)

  const urls = computed(() => {
    return fileList.value.map(v => v.fileUrl)
  })

  const props = defineProps({
    fileUrls: {
      type: Array,
      default: () => [
        { fileUrl: 'https://static.runoob.com/images/demo/demo1.jpg', id: 1 }
      ]
    },
    visible: {
      type: Boolean,
      default: false
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
    try {
      await ruleFormRef.value.validate()
      emit('confirm', fileList.value)
      isVisible.value = false
    } catch (error) {}
  }

  const onOpened = () => {
    fileList.value = props.fileUrls
  }

  const close = () => {
    isVisible.value = false
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

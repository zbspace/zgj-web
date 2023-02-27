<template>
  <div class="file-check-upload">
    <div class="apply-name">{{ props.data.name }}</div>
    <div class="files-base">
      <div class="files-radio files-wrap">
        <div class="files-title">
          <div class="files-title-l"
            >原始文件<span>勾选需要比对的文件（仅可选择一个文件）</span></div
          >
        </div>
        <div class="files-content">
          <el-radio-group v-model="state.filesRadio">
            <div
              class="files-item"
              v-for="(item, index) in props.data.files"
              :key="index"
            >
              <el-radio :label="item.label"
                ><img :src="requireImg(item.fileName)" />{{
                  item.fileName
                }}</el-radio
              >
            </div>
          </el-radio-group>
        </div>
      </div>
      <div class="upload-file files-wrap">
        <div class="files-title">
          <div class="files-title-l"
            >目标文件<span>上传需要比对的文件（仅可选择一个文件）</span></div
          >
          <div class="files-title-r">
            <el-upload
              class="upload-ele-btn"
              drag
              multiple
              action=""
              :http-request="handleUpload"
              :on-change="fileUpload"
              :show-file-list="false"
              v-show="state.fileUploadList.length > 0"
            >
              <!-- :before-upload="fileUpload" -->
              <img src="../../../assets/svg/upload/add-icon.svg" />
              继续添加
            </el-upload>
          </div>
        </div>
        <div
          class="files-content upload-exra"
          :class="{ 'upload-exra-file': state.fileUploadList.length > 0 }"
        >
          <el-upload
            class="upload-ele"
            drag
            multiple
            action=""
            :http-request="handleUpload"
            :on-change="fileUpload"
            :show-file-list="false"
            v-show="state.fileUploadList.length <= 0"
          >
            <!-- :before-upload="fileUpload" -->
            <img
              src="../../../assets/svg/upload/add-file.svg"
              style="margin-bottom: 20px"
            />
          </el-upload>
          <div class="upload-list" v-if="state.fileUploadList.length > 0">
            <el-radio-group v-model="state.filesRadioSelect">
              <div
                class="files-item"
                v-for="(item, index) in state.fileUploadList"
                :key="index"
              >
                <el-radio :label="item.uid"
                  ><img :src="requireImg(item.name)" />{{ item.name }}</el-radio
                >
                <svg class="iconpark-icon">
                  <use href="#icon" @click="deleteFile(index)"></use>
                </svg>
              </div>
            </el-radio-group>
          </div>
          <div class="el-upload-tip">
            <div class="row row-1" v-show="state.fileUploadList.length <= 0"
              >点击上传，或将文件拖拽到此处</div
            >
            <div class="row row-2"
              >（只支持docx、doc、pdf、xls、xlsx类型文件）</div
            >
            <div class="row row-3">（单个文件大小不能超过199M）</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted } from 'vue'
  const props = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  const emit = defineEmits(['tab-change', 'getActiveName'])
  const state = reactive({
    filesRadio: 1,
    fileIconImg: {
      doc: 'icon-doc.svg',
      docx: 'icon-doc.svg',
      pdf: 'icon-pdf.svg',
      xls: 'icon-xls.svg',
      xlsx: 'icon-xls.svg'
    },
    filesRadioSelect: 1,
    fileUploadList: []
  })
  // console.log(props.data);
  function tabChange(pane, ev) {
    // console.log(pane, ev);
    emit('tab-change', state.activeName)
  }
  function getActiveName() {
    emit('getActiveName', state.activeName)
  }
  // 初始化数据
  function initData() {
    state.activeName = props.activeName
    state.data = props.data
    state.cancelBottomLine = props.cancelBottomLine
  }
  function fileUpload(file) {
    console.log(file.name)
    const fileFormats = ['doc', 'docx', 'xls', 'xlsx', 'pdf']
    const lastIndex = file.name.lastIndexOf('.') + 1
    const fileFormat = file.name.substr(lastIndex)
    if (fileFormats.indexOf(fileFormat) == -1) {
      this.$message({
        message: '请上传正确文件格式的文件！',
        type: 'warning'
      })
    } else {
      state.fileUploadList.push(file)
    }
  }
  function handleUpload(params) {
    console.log(params)
  }
  // 处理图片展示路径
  function handelImg(name) {
    for (const key in state.fileIconImg) {
      if (name === key) {
        return state.fileIconImg[key]
      }
    }
  }
  function requireImg(fileName) {
    const lastIndex = fileName.lastIndexOf('.') + 1
    const item = fileName.substr(lastIndex)
    return new URL(
      `../../../assets/svg/upload/${handelImg(item)}`,
      import.meta.url
    ).href
  }
  function deleteFile(index) {
    state.fileUploadList.splice(index, 1)
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .apply-name {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    text-align: center;
    margin-bottom: 16px;
  }

  .files-base {
    display: flex;
    justify-content: center;

    .files-wrap {
      width: calc(50% - 8px);

      .files-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 9px;
        height: 28px;

        .files-title-l {
          font-weight: 400;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;

          > span {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.45);
            margin-left: 12px;
          }
        }

        .files-title-r {
          .upload-ele-btn {
            width: 104px;
            height: 28px;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 2px;
            background: #ffffff;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;

            :deep(.el-upload-dragger) {
              padding: 0;
              border: none;
              color: rgba(0, 0, 0, 0.65);
            }
          }
        }
      }

      .files-content {
        height: 180px;
        background: rgba(0, 0, 0, 0.02);
        /* 描边/虚线 */

        border: 1px dashed rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        padding: 16px;
        overflow: auto;

        .el-radio-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          .files-item {
            width: 100%;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .el-radio {
              display: flex;
              align-items: center;

              :deep(.el-radio__inner) {
                width: 16px;
                height: 16px;
              }

              :deep(.el-radio__label) {
                display: flex;
                align-items: center;
                padding-left: 12px;

                > img {
                  margin-right: 9px;
                }
              }
            }

            .iconpark-icon {
              width: 16px;
              height: 16px;
              cursor: pointer;
            }
          }
        }
      }

      .upload-exra {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .upload-ele {
          border: none;
          background: none;

          :deep(.el-upload-dragger) {
            border: none;
            padding: 0;
          }
        }

        .upload-list {
          height: 100px;
          padding-bottom: 9px;
          margin-bottom: 10px;
          overflow: auto;
          width: 100%;
        }

        .el-upload-tip {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .row {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.45);
          }

          .row-1 {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.85);
          }
        }
      }

      .upload-exra-file {
        align-items: flex-start;
        justify-content: flex-start;

        .el-upload-tip {
          align-items: flex-start;
        }
      }
    }

    .files-radio {
      margin-right: 16px;
    }
  }
</style>

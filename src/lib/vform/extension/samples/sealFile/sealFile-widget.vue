<template>
  <static-content-wrapper
    :designer="designer"
    :field="field"
    :design-state="designState"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :sub-form-row-index="subFormRowIndex"
    :sub-form-col-index="subFormColIndex"
    :sub-form-row-id="subFormRowId"
  >
    <el-form-item
      label="用印文件"
      :label-width="field.options.labelWidth"
      :size="field.options.size"
      :class="[labelAlign, field.options.required ? 'required' : '']"
    >
      <div class="upload-file">
        <el-upload
          :file-list="tempFileList"
          ref="upload"
          class="upload-demo"
          multiple
          :disabled="field.options.disabled"
          :http-request="
            options => {
              handleRequest(options, 1)
            }
          "
        >
          <el-button type="primary" :disabled="field.options.disabled">
            <el-icon color="#fff"> <ArrowDown /> </el-icon> 本机上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip">
              可上传图片以及doc、docx、pdf、xls、xlsx类型文件、单个文件大小不能超过199M
            </div>
          </template>
        </el-upload>
        <div
          class="cur-upload-list"
          v-for="(item, index) in fieldModel.fileIds"
          :key="item.fileId"
        >
          <div @click="edit(item, index, 1)" v-if="item.fileSubImages">{{
            item.fileOriginName || '-'
          }}</div>
          <div @click="onPreview(item)" v-else>{{
            item.fileOriginName || '-'
          }}</div>
          <svg
            class="iconpark-icon"
            @click="fieldModel.fileIds.splice(index, 1)"
          >
            <use href="#remove"></use>
          </svg>
        </div>
      </div>
      <div
        class="el-form-item__error"
        v-if="field.options.requiredTextShow && field.options.required"
      >
        请上传
      </div>
    </el-form-item>

    <el-form-item
      label="补充附件"
      :label-width="field.options.labelWidth"
      :class="[labelAlign]"
      :size="field.options.size"
    >
      <div class="upload-file">
        <el-upload
          :file-list="fileList2"
          ref="upload"
          class="upload-demo"
          multiple
          :disabled="field.options.disabled"
          :http-request="
            options => {
              handleRequest(options, 2)
            }
          "
        >
          <div>
            <el-button type="primary" :disabled="field.options.disabled">
              <el-icon color="#fff"> <ArrowDown /> </el-icon> 本机上传
            </el-button>
            <span class="button-tip"
              >补充附件仅作为参考，不参与用印前后的文件核验</span
            >
          </div>
          <template #tip>
            <div class="el-upload__tip">
              可上传图片以及doc、docx、pdf、xls、xlsx类型文件、单个文件大小不能超过199M
            </div>
          </template>
        </el-upload>
        <div
          class="cur-upload-list"
          v-for="(item, index) in fieldModel.fileAddIds"
          :key="item.fileId"
        >
          <div @click="edit(item, index, 2)" v-if="item.fileSubImages">{{
            item.fileOriginName || '-'
          }}</div>
          <div @click="onPreview(item)" v-else>{{
            item.fileOriginName || '-'
          }}</div>
          <svg
            class="iconpark-icon"
            @click="fieldModel.fileAddIds.splice(index, 1)"
          >
            <use href="#remove"></use>
          </svg>
        </div>
      </div>
    </el-form-item>
    <!-- 用印文件 -->
    <JyUseSealFiles
      v-model="visible"
      :imgFiles="imgFiles"
      :curIndex="curIndex"
      :fileOriginName="fileOriginName"
      @confirm="confirm"
    />
  </static-content-wrapper>
</template>
<script>
  import StaticContentWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/static-content-wrapper'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n from '@/lib/vform/utils/i18n'
  import fieldMixin from '@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin'
  import { ArrowDown } from '@element-plus/icons-vue'
  import SealApplyService from '@/api/frontDesk/printControl/sealApply'
  import { messageError, messageSuccess } from '@/hooks/useMessage'
  import JyUseSealFiles from '@/components/business/JyUseSealFiles'
  import { API_BASE_PREFIX } from '@/utils/constants.js'

  export default {
    name: 'SealFileWidget',
    componentName: 'FieldWidget', // 必须固定为FieldWidget，用于接收父级组件的broadcast事件
    mixins: [emitter, fieldMixin, i18n],
    props: {
      field: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,

      designState: {
        type: Boolean,
        default: false
      },

      subFormRowIndex: {
        /* 子表单组件行索引，从0开始计数 */ type: Number,
        default: -1
      },
      subFormColIndex: {
        /* 子表单组件列索引，从0开始计数 */ type: Number,
        default: -1
      },
      subFormRowId: {
        /* 子表单组件行Id，唯一id且不可变 */ type: String,
        default: ''
      }
    },
    components: {
      StaticContentWrapper,
      ArrowDown,
      JyUseSealFiles
    },
    data() {
      return {
        visible: false,
        tempFileList: [],
        fileList2: [],
        curFileList1: [],
        curFileList2: [],
        fileOriginName: '',
        curIndex: null,
        curType: 1,
        fieldModel: {
          fileIds: [],
          fileAddIds: []
        },
        imgFiles: [],
        rules: [],
        curImgIndex: 0
      }
    },
    computed: {
      labelAlign() {
        if (this.field.options.labelAlign) {
          return this.field.options.labelAlign
        }

        if (this.designer) {
          return this.designer.formConfig.labelAlign || 'label-left-align'
        } else {
          return this.formConfig.labelAlign || 'label-left-align'
        }
      }
    },
    created() {
      this.registerToRefList()
      this.initEventHandler()
      this.initOptionItems()
      this.initFieldModel()
      this.buildFieldRules()
      this.handleOnCreated()
    },
    beforeUnmount() {
      this.unregisterFromRefList()
    },
    mounted() {
      this.handleOnMounted()
    },
    methods: {
      setRequiredTextShow(v) {
        // eslint-disable-next-line vue/no-mutating-props
        this.field.options.requiredTextShow = v
      },
      getValue() {
        return this.fieldModel
      },
      setValue(value) {
        this.fieldModel = value
      },
      edit(row, index, type) {
        this.visible = true
        this.fileOriginName = row.fileOriginName
        this.imgFiles = row.fileSubImages
        this.curIndex = index
        this.curType = type
      },
      getSelectedLabel() {
        return this.$refs.fieldEditor.selectedLabel
      },
      confirm(file) {
        if (file) {
          if (this.curIndex !== null) {
            if (file.fileSubImages && file.fileSubImages.length) {
              if (this.curType === 1) {
                this.fieldModel.fileIds.splice(this.curIndex, 1, file)
              } else {
                this.fieldModel.fileAddIds.splice(this.curIndex, 1, file)
              }
            } else {
              if (this.curType === 1) {
                this.fieldModel.fileIds.splice(this.curIndex, 1)
              } else {
                this.fieldModel.fileAddIds.splice(this.curIndex, 1)
              }
            }
            messageSuccess('编辑成功')
          }
          if (this.curIndex === null) {
            if (this.curType === 1) {
              this.fieldModel.fileIds.push(file)
              this.setRequiredTextShow(false)
            } else {
              this.fieldModel.fileAddIds.push(file)
            }
          }
        }
        this.curIndex = null
        this.curType = 1
        this.imgFiles = []
      },

      onPreview(response) {
        window.open(response.fileUrl, '_blank')
      },
      async handleRequest(options, type) {
        this.curType = type
        const str = options.file.name.split('.').pop()
        if (
          ![
            'doc',
            'docx',
            'pdf',
            'xls',
            'xlsx',
            'application/pdf',
            'png',
            'jpg',
            'jpeg'
          ].includes(str)
        ) {
          messageError('请上传指定格式文件')
          return false
        } else if (options.file.size / 1024 / 1024 > 199) {
          messageError('单个文件大小不能超过199M!')
          return false
        }
        const formData = new FormData()
        formData.append('uploadFile', options.file)
        try {
          const res = await SealApplyService.uploadFile(formData)
          if (['png', 'jpg', 'jpeg'].includes(str) && this.curType === 1) {
            // res.data.fileUrl = res.data.fileUrl
            this.imgFiles.push({
              ...res.data
            })
            this.visible = true
            return false
          } else {
            if (this.curType === 1) {
              this.fieldModel.fileIds.push({
                fileId: res.data.fileId,
                fileSizeByte: res.data.fileSizeByte,
                fileSuffix: res.data.fileSuffix,
                fileOriginName: res.data.fileOriginName,
                fileUrl: res.data.fileUrl
              })
              this.setRequiredTextShow(false)
            } else {
              this.fieldModel.fileAddIds.push({
                fileId: res.data.fileId,
                fileSizeByte: res.data.fileSizeByte,
                fileSuffix: res.data.fileSuffix,
                fileOriginName: res.data.fileOriginName,
                fileUrl: res.data.fileUrl
              })
            }
          }
        } catch (error) {
          //
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .upload-file {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 16px;
    width: 100%;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    transition: all 0.5s;
    min-height: 135px;
    text-align: left;
  }

  :deep(.upload-demo) {
    width: 100%;
    button {
      gap: 8px;
      width: 112px;
      border-radius: 2px;
    }
    .button-tip {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
      margin-left: 32px;
    }
    .el-upload-list__item-info {
      width: 360px;
      height: 46px;
      background-color: rgba(0, 0, 0, 0.04);
      padding-left: 12px;
    }

    .el-upload-list__item {
      width: 360px;
      &:hover {
        background-color: transparent;
      }
    }
    .el-upload-list {
      display: none;
    }
    .el-upload__tip {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      padding-bottom: 16px;
    }
  }

  .cur-upload-list {
    display: flex;
    align-items: center;
    // width: 360px;
    // height: 46px;
    // justify-content: space-between;
    div {
      background: rgba(0, 0, 0, 0.04);
      // width: 96%;
      padding: 10px 15px;
      // height: 46px;
      // line-height: 46px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #3e78d0;
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
    .iconpark-icon {
      width: 20px;
      height: 20px;
      color: rgba(0, 0, 0, 0.65);
      cursor: pointer;
      flex-shrink: 0;
    }
  }

  :deep(.static-content-item) {
    .el-form-item.left {
      .el-form-item__label {
        justify-content: flex-start;
      }
    }

    .el-form-item.right {
      .el-form-item__label {
        justify-content: flex-end;
      }
    }

    .el-form-item.center {
      .el-form-item__label {
        justify-content: center;
      }
    }
  }
  .required :deep(.el-form-item__label)::before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
  :deep(.label-left-align) .el-form-item__label {
    text-align: left;
    justify-content: flex-start !important;
  }

  :deep(.label-center-align) .el-form-item__label {
    text-align: center;
    justify-content: center !important;
  }

  :deep(.label-right-align) .el-form-item__label {
    text-align: right;
    justify-content: flex-end !important;
  }
</style>

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
      :class="[
        labelAlign,
        customClass,
        field.options.required ? 'required' : ''
      ]"
    >
      <div
        class="upload-file"
        :class="[fieldModel.fileList.length && 'upload-file-big']"
      >
        <el-upload
          ref="upload"
          class="upload-demo"
          list-type="text"
          v-model:file-list="fieldModel.fileList"
          :before-upload="
            async file => {
              await uploadFile(file, 1)
              return false
            }
          "
        >
          <el-button type="primary">
            <el-icon color="#fff"> <ArrowDown /> </el-icon> 本机上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip">
              可上传图片以及doc、docx、pdf、xls、xlsx类型文件、单个文件大小不能超过199M
            </div>
          </template>
        </el-upload>
      </div>
      <div class="el-form-item__error" v-if="field.options.requiredHint">{{
        field.options.requiredHint
      }}</div>
    </el-form-item>

    <el-form-item
      label="补充附件"
      :label-width="field.options.labelWidth"
      :class="[labelAlign, customClass]"
      :size="field.options.size"
    >
      <div
        class="upload-file"
        :class="[fieldModel.fileList.length && 'upload-file-big']"
      >
        <el-upload
          ref="upload"
          class="upload-demo"
          list-type="text"
          v-model:file-list="fieldModel.fileList1"
          :before-upload="
            async file => {
              await uploadFile(file, 2)
              return false
            }
          "
        >
          <div>
            <el-button type="primary">
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
      </div>
    </el-form-item>
  </static-content-wrapper>
</template>
<script>
  import StaticContentWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/static-content-wrapper'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n from '@/lib/vform/utils/i18n'
  import fieldMixin from '@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin'
  import { genFileId } from 'element-plus'
  import { ArrowDown } from '@element-plus/icons-vue'
  import SealApplyService from '@/api/frontDesk/printControl/sealApply'
  import { messageError } from '@/hooks/useMessage'

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
      ArrowDown
    },
    data() {
      return {
        fieldModel: {
          fileList: [],
          fileList1: []
        },
        rules: []
      }
    },
    computed: {
      customClass() {
        return this.field.options.customClass
      },
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
      getValue() {
        return this.fieldModel
      },
      setValue(value) {
        this.fieldModel = value
      },
      handleCloseCustomEvent() {
        if (this.field.options.onClose) {
          const changeFn = new Function(this.field.options.onClose)
          changeFn.call(this)
        }
      },
      getSelectedLabel() {
        return this.$refs.fieldEditor.selectedLabel
      },

      handleExceed(files) {
        this.$refs.upload.clearFiles()
        const file = files[0]
        file.uid = genFileId()
        this.$refs.upload.handleStart(file)
      },
      onSuccess() {},
      onError() {},
      onProgress() {},
      async uploadFile(rawFile, type) {
        const str = rawFile.name.split('.').pop()
        if (
          !['doc', 'docx', 'pdf', 'xls', 'xlsx', 'application/pdf'].includes(
            str
          )
        ) {
          messageError('请上传指定格式文件')
        } else if (rawFile.size / 1024 / 1024 > 199) {
          messageError('Avatar picture size can not exceed MB!')
        } else {
          const formData = new FormData()
          formData.append('file', rawFile)
          try {
            const res = await SealApplyService.uploadFile(formData)
            if (type === 1) {
              this.fieldModel.fileList.push({
                name: rawFile.name,
                url: res.data.filePath
              })
            } else {
              this.fieldModel.fileList1.push({
                name: rawFile.name,
                url: res.data.filePath
              })
            }
          } catch (error) {
            messageError(error)
          }
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
  .upload-file-big {
    min-height: 197px;
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
    .el-upload__tip {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      padding-bottom: 16px;
      margin-top: 16px;
    }
    .el-upload-list__item {
      width: 360px;
      &:hover {
        background-color: transparent;
      }
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

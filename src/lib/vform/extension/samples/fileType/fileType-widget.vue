<template>
  <form-item-wrapper
    :designer="designer"
    :field="field"
    :design-state="designState"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :sub-form-row-index="subFormRowIndex"
    :sub-form-col-index="subFormColIndex"
    :sub-form-row-id="subFormRowId"
    :class="[labelAlign, customClass, field.options.required ? 'required' : '']"
  >
    <el-select
      ref="fieldEditor"
      v-model="fieldModel"
      v-show="!isReadMode"
      class="full-width-input select-prefix"
      :disabled="field.options.disabled"
      :clearable="field.options.clearable"
      :filterable="field.options.filterable"
      :allow-create="field.options.allowCreate"
      :automatic-dropdown="field.options.automaticDropdown"
      :multiple="field.options.multiple"
      :multiple-limit="field.options.multipleLimit"
      :placeholder="
        field.options.placeholder || i18nt('render.hint.selectPlaceholder')
      "
      :remote="field.options.remote"
      :remote-method="remoteQuery"
      @blur="handleBlurCustomEvent"
      @click.stop="onClick"
      popper-class="select-hidden"
    >
      <template #prefix>
        <svg class="iconpark-icon">
          <use href="#selecticon"></use>
        </svg>
      </template>
      <el-option
        v-for="item in fileTypeOptions"
        :key="item.fileTypeId"
        :label="item.fileTypeName"
        :value="item.fileTypeId"
      >
      </el-option>
    </el-select>
    <template v-if="isReadMode">
      <span class="readonly-mode-field">{{ contentForReadMode }}</span>
    </template>

    <div
      class="el-form-item__error"
      v-if="field.options.requiredTextShow && field.options.required"
    >
      {{ field.options.requiredHint || '请选择' }}
    </div>
    <div class="el-form-item__error" v-if="field.options.requiredHint">{{
      field.options.requiredHint
    }}</div>

    <!-- 选择文件类型 -->
    <KDocumentTypeDialog
      v-model:show="showDocumentTypeDialog"
      @update:searchSelected="documentTypeSubmit"
      :multiple="false"
      :queryParams="{ bindBizRule: true }"
    ></KDocumentTypeDialog>
  </form-item-wrapper>
</template>

<script>
  import FormItemWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/form-item-wrapper'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n from '@/lib/vform/utils/i18n'
  import fieldMixin from '@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin'
  import KDocumentTypeDialog from '@/views/components/modules/KDocumentTypeDialog'

  export default {
    name: 'FileTypeIdWidget',
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
      FormItemWrapper,
      KDocumentTypeDialog
    },
    data() {
      return {
        fieldModel: null,
        fileTypeName: '',
        fileTypeId: '',
        fileTypeOptions: [],
        showDocumentTypeDialog: false,
        rules: [
          {
            required: true,
            message: '请选择文件类型',
            trigger: 'change'
          }
        ]
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
      this.initFieldModel()
    },
    beforeUnmount() {
      this.unregisterFromRefList()
    },
    methods: {
      setRequiredTextShow(v) {
        this.field.options.requiredTextShow = v
      },
      documentTypeSubmit(list) {
        if (list.length) {
          this.fieldModel = list[0].fileTypeId
          this.fileTypeName = list[0].fileTypeName
          this.fileTypeOptions.splice(0, 1, {
            fileTypeName: this.fileTypeName,
            fileTypeId: this.fieldModel
          })
          this.setRequiredTextShow(false)
        } else {
          this.fieldModel = ''
          this.fileTypeName = ''
        }
      },
      onClick() {
        this.showDocumentTypeDialog = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .full-width-input {
    width: 100% !important;
  }
  // select 自定义右侧icon
  :deep(.select-prefix) {
    .el-input__suffix {
      display: none;
    }
    .el-input__prefix {
      position: absolute;
      right: 16px;
      width: 12px;
      height: 16px;
      .el-input__prefix-inner {
        .iconpark-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          color: #000;
        }
      }
    }
  }
</style>
<style>
  .select-hidden {
    display: none;
  }
</style>

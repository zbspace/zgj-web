<template>
  <form-item-wrapper
    :designer="designer"
    :field="field"
    :rules="rules"
    :design-state="designState"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :sub-form-row-index="subFormRowIndex"
    :sub-form-col-index="subFormColIndex"
    :sub-form-row-id="subFormRowId"
  >
    <el-select
      ref="fieldEditor"
      v-model="fieldModel"
      v-show="!isReadMode"
      class="full-width-input"
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
      @focus="getFileTypeList"
      @blur="handleBlurCustomEvent"
      @change="handleChangeEvent"
    >
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
  </form-item-wrapper>
</template>

<script>
  import FormItemWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/form-item-wrapper'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n from '@/lib/vform/utils/i18n'
  import fieldMixin from '@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin'
  import { fileManageService } from '@/api/frontDesk/fileManage'
  import { messageError } from '@/hooks/useMessage'
  import { GetFileTypeList } from '@/utils/domain/fileManage'

  export default {
    name: 'FileTypeWidget',
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
      FormItemWrapper
    },
    data() {
      return {
        fieldModel: null,
        fileTypeOptions: [],
        rules: [
          {
            required: true,
            message: '请选择文件类型',
            trigger: 'change'
          }
        ]
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
      handleCloseCustomEvent() {
        if (this.field.options.onClose) {
          const changeFn = new Function(this.field.options.onClose)
          changeFn.call(this)
        }
      },
      async getFileTypeList() {
        try {
          const res = await fileManageService.getFileTypeListPage(
            new GetFileTypeList()
          )
          this.fileTypeOptions = res.data.records || []
        } catch (error) {
          messageError(error)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .full-width-input {
    width: 100% !important;
  }
</style>

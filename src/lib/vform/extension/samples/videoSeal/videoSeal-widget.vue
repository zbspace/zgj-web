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
  >
    <el-switch
      ref="fieldEditor"
      v-model="fieldModel"
      :class="[isReadMode ? 'readonly-mode-switch' : '']"
      :disabled="field.options.disabled"
      :width="field.options.switchWidth"
      @change="onHandleChangeEvent($event)"
    >
    </el-switch>
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
  import { messageWarning } from '@/hooks/useMessage'

  export default {
    name: 'VideoSealWidget',
    componentName: 'FieldWidget', // 必须固定为FieldWidget，用于接收父级组件的broadcast事件
    mixins: [emitter, fieldMixin, i18n],
    inject: ['globalModel'],
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
        fieldModel: null
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
      onHandleChangeEvent(e) {
        if (this.globalModel.formModel.remoteSeal) {
          messageWarning('远程盖章模式下暂不支持此功能')
          return (this.fieldModel = false)
        }
        this.handleChangeEvent(e)
      }
    }
  }
</script>

<style lang="scss" scoped></style>

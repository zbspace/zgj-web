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
    <el-row :gutter="12">
      <el-col :span="12">
        <el-form-item
          label="限时用印"
          :label-width="field.options.labelWidth"
          :size="field.options.size"
          :class="[labelAlign]"
        >
          <el-radio-group
            v-model="fieldModel.timeLimit"
            @change="handleChangeEvent($event, 'timeLimit')"
            :disabled="field.options.disabled"
          >
            <el-radio
              v-for="(item, index) in optionItems"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
              :border="field.options.border"
              :style="{ display: field.options.displayStyle }"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="盖章时间"
          multiple
          :label-width="field.options.labelWidth"
          :class="[labelAlign, 'required']"
          :size="field.options.size"
          v-if="fieldModel.timeLimit === 1"
        >
          <el-date-picker
            ref="fieldEditor"
            type="datetimerange"
            v-model="fieldModel.sealTime"
            :disabled="field.options.disabled"
            :readonly="field.options.readonly"
            :clearable="field.options.clearable"
            :editable="field.options.editable"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            :start-placeholder="
              field.options.startPlaceholder ||
              i18nt('render.hint.startDatePlaceholder')
            "
            :end-placeholder="
              field.options.endPlaceholder ||
              i18nt('render.hint.endDatePlaceholder')
            "
            @change="onChange"
            :disabled-date="
              time => {
                return time.getTime() <= Date.now() - 8.64e7
              }
            "
          >
          </el-date-picker>
          <template v-if="isReadMode">
            <span class="readonly-mode-field">{{ contentForReadMode }}</span>
          </template>
          <div class="el-form-item__error" v-if="field.options.requiredTextShow"
            >请选择</div
          >
        </el-form-item>
      </el-col>
    </el-row>
  </static-content-wrapper>
</template>

<script>
  import StaticContentWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/static-content-wrapper'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n from '@/lib/vform/utils/i18n'
  import fieldMixin from '@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin'

  export default {
    name: 'LimitTimeSealWidget',
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
      StaticContentWrapper
    },
    data() {
      return {
        rules: [],
        fieldModel: {
          timeLimit: 2,
          sealTime: []
        },
        optionItems: [
          { label: '是', value: 1 },
          { label: '否', value: 2 }
        ]
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
      this.initFieldModel()
      this.initEventHandler()
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
      getSelectedLabel() {
        return this.$refs.fieldEditor.selectedLabel
      },
      onChange(value) {
        if (value) {
          this.validate()
        }
      },
      validate() {
        if (
          this.fieldModel.timeLimit === 1 &&
          (this.fieldModel.sealTime === null || !this.fieldModel.sealTime[0])
        ) {
          this.setRequiredTextShow(true)
        } else {
          this.setRequiredTextShow(false)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .full-width-input {
    width: 100% !important;
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
  .required :deep(.el-form-item__label)::before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
</style>

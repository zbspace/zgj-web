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
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-form-item
          label="往来单位"
          :rules="rules"
          :label-width="field.options.labelWidth + 'px'"
          :class="[
            labelAlign,
            customClass,
            field.options.required ? 'required' : ''
          ]"
        >
          <el-select
            v-model="fieldModels"
            :size="field.options.size"
            :disabled="field.options.disabled"
            :readonly="field.options.readonly"
            :clearable="field.options.clearable"
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="5"
            placeholder="请选择"
            style="width: 100%"
            @focus="openSelectWin"
            @remove-tag="removeTag"
            popper-class="select-hidden"
            ref="contactUnitRef"
            class="select-prefix"
          >
            <template #prefix>
              <svg class="iconpark-icon">
                <use href="#selecticon"></use>
              </svg>
            </template>
            <el-option
              v-for="item in fieldModel"
              :key="item.relatedCompanyId"
              :label="item.relatedCompanyName"
              :value="item.relatedCompanyId"
            />
          </el-select>
          <div
            class="el-form-item__error"
            v-if="field.options.requiredTextShow && field.options.required"
            >{{ field.options.requiredHint || '字段值不可为空' }}</div
          >
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 往来单位 -->
    <template>
      <JyRelatedCompany
        v-model="xzyzDialogVisible"
        @on-submit="submit"
        :haveSelectList="fieldModel"
      />
    </template>
  </static-content-wrapper>
</template>

<script>
  import StaticContentWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/static-content-wrapper'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n from '@/lib/vform/utils/i18n'
  import fieldMixin from '@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin'
  import { nextTick } from 'vue'

  export default {
    name: 'ContactUnitWidget',
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
        // fieldModel: {
        //   unitIds: '',
        //   unitNames: ''
        // },
        fieldModel: [],
        fieldModels: null,
        rules: [],
        thisIndex: null,
        xzyzDialogVisible: false
      }
    },
    computed: {
      customClass() {
        return this.field.options.customClass
          ? this.field.options.customClass.join(' ')
          : ''
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
      },
      inputType() {
        if (this.field.options.type === 'number') {
          return 'text' // 当input的type设置为number时，如果输入非数字字符，则v-model拿到的值为空字符串，无法实现输入校验！故屏蔽之！！
        }
        return this.field.options.type
      }
    },

    created() {
      /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
      this.registerToRefList()
      // this.initFieldModel()
      this.initEventHandler()
      this.buildFieldRules()

      this.handleOnCreated()
    },

    mounted() {
      this.handleOnMounted()
    },

    beforeUnmount() {
      this.unregisterFromRefList()
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
      valueChange(v) {
        if (!v) {
          this.fieldModel.unitIds = null
          this.fieldModel.name = null
        }
        this.validate()
      },
      onClear() {
        this.fieldModel.unitIds = null
        this.fieldModel.name = null
        this.validate()
      },
      validate() {
        if (!this.fieldModel.unitIds) {
          this.setRequiredTextShow(true)
        } else {
          this.setRequiredTextShow(false)
        }
      },
      // 打开弹窗选择数据
      openSelectWin() {
        nextTick(() => {
          this.$refs.contactUnitRef.blur()
        })
        this.xzyzDialogVisible = true
      },
      selectData(row, column, event) {
        this.xzyzDialogVisible = false
      },

      submit(list) {
        this.xzyzDialogVisible = false
        this.fieldModel = list
        this.fieldModels = list.map(i => i.relatedCompanyId)
      },
      removeTag(val) {
        const index = this.fieldModel.findIndex(i => i.relatedCompanyId === val)
        if (index > -1) {
          this.fieldModel.splice(index, 1)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .required :deep(.el-form-item__label)::before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
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
        background: rgb(255, 255, 255);
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

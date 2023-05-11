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
      label="合同金额"
      :label-width="field.options.labelWidth + 'px'"
      :class="[labelAlign, field.options.required ? 'required' : '']"
      :size="field.options.size"
    >
      <el-input
        @input="onInput"
        v-model="fieldModel.amount"
        :clearable="field.options.clearable"
        placeholder="请输入"
        maxLength="13"
        :disabled="field.options.disabled"
        @blur="validate"
      >
        <template #append>
          <el-select
            v-model="fieldModel.unit"
            placeholder="请选择"
            style="width: 100px"
            :disabled="field.options.disabled"
          >
            <el-option
              :label="item.moneyTypeName"
              :value="item.moneyTypeId"
              v-for="item in this.moneyType"
              :key="item.moneyTypeId"
            />
          </el-select>
        </template>
      </el-input>
      <div class="el-form-item__error" v-if="field.options.requiredTextShow"
        >请选择</div
      >
    </el-form-item>
  </static-content-wrapper>
</template>

<script>
  import StaticContentWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/static-content-wrapper'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n from '@/lib/vform/utils/i18n'
  import fieldMixin from '@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin'
  import { mapState, mapActions } from 'pinia'
  import { useVformInfoStore } from '@/store/vform'

  export default {
    name: 'ContractAmountWidget',
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
        fieldModel: {
          amount: '',
          unit: ''
        },
        rules: []
      }
    },
    computed: {
      ...mapState(useVformInfoStore, ['moneyType']),
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
      this.initFieldModel()
      this.initEventHandler()
      this.buildFieldRules()

      this.handleOnCreated()
    },

    mounted() {
      this.handleOnMounted()
      this.getMoneyType()
      this.fieldModel.unit =
        (this.moneyType.length && this.moneyType[0].moneyTypeId) || ''
    },

    beforeUnmount() {
      this.unregisterFromRefList()
    },

    methods: {
      setRequiredTextShow(v) {
        // eslint-disable-next-line vue/no-mutating-props
        this.field.options.requiredTextShow = v
      },
      ...mapActions(useVformInfoStore, ['getMoneyType']),
      getValue() {
        return this.fieldModel
      },
      setValue(value) {
        this.fieldModel = value
      },
      validate() {
        if (this.field.options.required && !this.fieldModel.amount) {
          this.setRequiredTextShow(true)
        } else {
          this.setRequiredTextShow(false)
        }
      },
      onInput(e) {
        let val = this.fieldModel.amount.toString()
        val = val.replace(/[^\d.]/g, '')
        val = val.replace(/\.{2,}/g, '.')
        val = val.replace(/^0+\./g, '0.')
        val = val.match(/^0+[1-9]+/) ? (val = val.replace(/^0+/g, '')) : val
        val = val.match(/^\d*(\.?\d{0,13})/g)[0] || ''

        if (val.includes('.')) {
          const numDian = val.toString().split('.')[1].length
          if (numDian === 2) {
            this.moneyMaxLeng = val.length
          }
        } else {
          this.moneyMaxLeng = 8
        }
        this.fieldModel.amount = val
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
</style>
<style>
  .select-hidden {
    display: none;
  }
</style>

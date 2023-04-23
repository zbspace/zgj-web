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
          label="申请人"
          :label-width="field.options.labelWidth"
          :class="[labelAlign]"
          :size="field.options.size"
        >
          <el-input v-model="fieldModel.applyUserName" disabled></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item
          label="申请部门"
          :label-width="field.options.labelWidth + 'px'"
          :class="[labelAlign, 'required']"
          :size="field.options.size"
        >
          <el-select
            placeholder="请选择"
            style="width: 100%"
            v-model="fieldModel.applyOrganId"
            v-show="!field.options.hidden"
            :disabled="field.options.disabled"
            :readonly="field.options.readonly"
            :clearable="field.options.clearable"
            @change="onChange"
            @clear="onClear"
          >
            <el-option
              v-for="item in organOptions"
              :key="item.organId"
              :label="item.organName"
              :value="item.organId"
            />
          </el-select>
          <div
            class="el-form-item__error"
            v-if="field.options.requiredTextShow"
          >
            {{ '请选择' }}
          </div>
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
  import { getItem } from '@/utils/storage'
  import getDepartByUserApi from '@/api/system/companyManagement/departmentStaff'
  import { messageError } from '@/hooks/useMessage'

  export default {
    name: 'ApplicantInfoWidget',
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
          applyUserId: getItem('accountInfo')
            ? getItem('accountInfo').userInfo.userId
            : '',
          applyUserName: getItem('accountInfo')
            ? getItem('accountInfo').userInfo.userName
            : '',
          applyOrganId: '',
          applyOrganName: ''
        },
        organOptions: []
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
      this.initFieldModel()
      this.handleOnCreated()
    },
    beforeUnmount() {
      this.unregisterFromRefList()
    },
    mounted() {
      this.handleOnMounted()
      this.getDepartOptions()
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

      onChange(value) {
        if (value) {
          const cur = this.organOptions.find(v => value === v.organId)
          this.fieldModel.applyOrganName = (cur && cur.organName) || ''
          this.validate()
        }
      },

      onClear() {
        this.fieldModel.applyOrganId = ''
        this.fieldModel.applyOrganName = ''
      },

      validate() {
        if (!this.fieldModel.applyOrganId) {
          this.setRequiredTextShow(true)
        } else {
          this.setRequiredTextShow(false)
        }
      },

      async getDepartOptions() {
        try {
          const res = await getDepartByUserApi.organListByUser(
            this.fieldModel.applyUserId || ''
          )
          this.organOptions = res.data.length ? res.data : []
          const cur = this.organOptions.find(v => {
            return v.userDefault === '1'
          })
          this.fieldModel.applyOrganId = (cur && cur.organId) || ''
          this.fieldModel.applyOrganName = (cur && cur.organName) || ''
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

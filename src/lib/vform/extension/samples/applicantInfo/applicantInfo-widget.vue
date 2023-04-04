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
    <el-row :gutter="12" :class="customClass">
      <el-col :span="12">
        <el-form-item
          label="申请人"
          :label-width="field.options.labelWidth"
          :class="[labelAlign, customClass]"
          :size="field.options.size"
        >
          <el-input v-model="fieldModel.applyUserName" disabled></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item
          label="申请部门"
          :rules="rules"
          :label-width="field.options.labelWidth + 'px'"
          :class="[
            labelAlign,
            customClass,
            field.options.required ? 'required' : ''
          ]"
        >
          <el-input
            v-model="fieldModel.applyOrganName"
            v-show="!field.options.hidden"
            :size="field.options.size"
            :disabled="field.options.disabled"
            :readonly="field.options.readonly"
            :clearable="field.options.clearable"
            @blur="validate"
            @click="openSelectUser"
            @clear="onClear"
            @change="onChange"
          >
            <template #append>
              <el-button
                icon="el-icon-search"
                :size="field.options.size"
                :readonly="field.options.readonly"
                :disabled="field.options.disabled"
                @click="openSelectUser(index)"
              ></el-button>
            </template>
          </el-input>
          <div
            class="el-form-item__error"
            v-if="field.options.requiredTextShow && field.options.required"
          >
            {{ field.options.requiredHint || '请选择' }}
          </div>
          <div class="el-form-item__error" v-if="field.options.requiredHint">{{
            field.options.requiredHint
          }}</div>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 申请部门 -->
    <kDepartOrPersonVue
      :multiple="false"
      :show="xzyzDialogVisible"
      @update:show="xzyzDialogVisible = $event"
      :searchSelected="[]"
      @update:searchSelected="submit"
      :tabsShow="tabsShow"
      :queryParams="queryParams"
      v-if="xzyzDialogVisible"
    />
  </static-content-wrapper>
</template>

<script>
  import StaticContentWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/static-content-wrapper'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n from '@/lib/vform/utils/i18n'
  import fieldMixin from '@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import { getItem } from '@/utils/storage'

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
      StaticContentWrapper,
      kDepartOrPersonVue
    },
    data() {
      return {
        xzyzDialogVisible: false,
        queryParams: { roleId: 'r1' },
        tabsShow: ['organ'],
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
      setRequiredTextShow(v) {
        this.field.options.requiredTextShow = v
      },
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
      onChange(value) {},
      // 打开弹窗选择数据
      openSelectUser() {
        this.xzyzDialogVisible = true
      },

      submit(list) {
        const selectRecords = list
        this.xzyzDialogVisible = false
        if (selectRecords.length === 0) {
          return
        }
        let applyOrganName = ''
        let applyOrganId = ''
        for (let i = 0; i < selectRecords.length; i++) {
          if (i === 0) {
            applyOrganId = selectRecords[i].id
            applyOrganName = selectRecords[i].name
          } else {
            applyOrganId = applyOrganId + ',' + selectRecords[i].id
            applyOrganName = applyOrganName + ',' + selectRecords[i].name
          }
        }
        this.fieldModel.applyOrganId = applyOrganId
        this.fieldModel.applyOrganName = applyOrganName

        if (!this.fieldModel.applyOrganId) {
          this.field.options.requiredHint = '请选择部门'
          this.fieldModel.applyOrganName = ''
        } else {
          this.field.options.requiredHint = ''
        }
        this.validate()
      },

      onClear() {
        this.fieldModel.applyOrganId = ''
        this.fieldModel.applyOrganName = ''
        this.validate()
      },

      validate() {
        if (!this.fieldModel.applyOrganName) {
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

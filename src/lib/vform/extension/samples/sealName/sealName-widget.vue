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
    <template v-for="(obj, index) in filedList" :key="index">
      <el-row :gutter="12">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item
            :label="'印章名称' + (index + 1)"
            :label-width="field.options.labelWidth"
            :class="[
              labelAlign,
              customClass,
              field.options.required ? 'required' : ''
            ]"
            :rules="{
              required: true,
              message: '请选择印章',
              trigger: 'change'
            }"
          >
            <div style="width: 100%; display: flex; height: 32px">
              <el-input v-model="obj.sealId" v-if="false"></el-input>
              <el-input
                v-model="obj.seal"
                :size="field.options.size"
                :disabled="field.options.disabled"
                :readonly="field.options.readonly"
                @blur="onBlur($event, index)"
                @click="openSelectWin(index)"
                @clear="onClear($event, index)"
                :clearable="field.options.clearable"
              >
                <template #append>
                  <el-button
                    icon="el-icon-search"
                    :size="field.options.size"
                    :disabled="field.options.disabled"
                    @click="openSelectWin(index)"
                  >
                  </el-button>
                </template>
              </el-input>
              &emsp;&emsp;
              <template v-if="index == 0">
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  :size="field.options.size"
                  :disabled="field.options.disabled"
                  @click="addItem"
                ></el-button>
              </template>
              <template v-else>
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  :size="field.options.size"
                  :disabled="field.options.disabled"
                  @click="deleteItem(index)"
                ></el-button>
              </template>
            </div>
            <div class="el-form-item__error" v-if="obj.sealRequiredTextShow">{{
              '字段值不可为空'
            }}</div>
          </el-form-item>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item
            label="印章次数"
            :label-width="field.options.labelWidth"
            :class="[
              labelAlign,
              customClass,
              field.options.required ? 'required' : ''
            ]"
          >
            <el-input-number
              v-model="obj.applySealNum"
              :precision="0"
              :disabled="field.options.disabled"
              :step="1"
              :min="1"
              :max="9999"
              style="width: 100%"
              @change="onChanged1($event, index)"
            />
            <div
              class="el-form-item__error"
              v-if="obj.routineSealRequiredTextShow"
              >{{ '字段值不可为空' }}</div
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item
            label="骑缝盖章"
            :label-width="field.options.labelWidth"
            :class="[labelAlign, customClass]"
          >
            <el-switch
              v-model="obj.markSeal"
              :disabled="field.options.disabled"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </template>

    <!-- 选择印章 弹窗 -->
    <JySelectSeal
      v-model="xzyzDialogVisible"
      :haveSelectList="selectedData"
      @on-submit="getSelection"
    />
  </static-content-wrapper>
</template>

<script>
  import StaticContentWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/static-content-wrapper'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n from '@/lib/vform/utils/i18n'
  import fieldMixin from '@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin'
  import JySelectSeal from '@/components/business/JySelectSeal'
  import typeOfSealService from '@/api/frontDesk/sealManage/typeOfSeal'

  export default {
    name: 'SealNameWidget',
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
      JySelectSeal
    },
    data() {
      return {
        selectedData: null,
        searchPara: '',
        searchKey: '', // 外传参数印章类型ID
        filedList: [],
        oldFieldValue: null, // field组件change之前的值
        fieldModel: null,
        rules: [],
        sealTypes: [],
        thisIndex: null,
        xzyzDialogVisible: false,
        loadingFlag: false,
        sealTypeTreeData: [],
        defaultProps: {
          children: 'children',
          label: 'sealTypeName'
        },
        total: 0,
        currentPage: 1,
        pageSizes: null,
        pageSize: null
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
      },
      applyTypeId() {
        return this.field.options.applyTypeId
      }
    },
    beforeCreate() {
      /* 这里不能访问方法和属性！！ */
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
      const newRecord = {
        seal: '',
        sealId: '',
        applySealNum: 1,
        markSeal: false,
        sealRequiredTextShow: false,
        routineSealRequiredTextShow: false
      }
      this.filedList.push(newRecord)
    },

    beforeUnmount() {
      this.unregisterFromRefList()
    },

    methods: {
      setRequiredTextShow(fieldName, index, flag) {
        this.filedList[index][fieldName] = flag
      },
      getValue() {
        return this.filedList
      },
      setValue(value) {
        this.filedList = value
      },

      // 打开弹窗选择数据
      openSelectWin(index) {
        this.thisIndex = index
        this.xzyzDialogVisible = true
        this.selectedData = this.filedList[index].sealId
      },

      getSelection(row) {
        if (row.length && row[0].sealTypeId) {
          return (this.sealTypes = row)
        }
        this.filedList.splice(this.thisIndex, 1, {
          ...this.filedList[this.thisIndex],
          ...{ seal: row.sealName, sealId: row.sealId }
        })
        this.xzyzDialogVisible = false
        if (this.filedList[this.thisIndex].sealId) {
          this.setRequiredTextShow(
            'sealRequiredTextShow',
            this.thisIndex,
            false
          )
        } else {
          this.setRequiredTextShow('sealRequiredTextShow', this.thisIndex, true)
        }
      },

      addItem() {
        this.filedList.push({ seal: '', sealId: '', applySealNum: 1 })
      },
      deleteItem(idx) {
        this.filedList.splice(idx, 1)
      },

      onBlur(e, index) {
        // if (this.filedList[index].sealId) {
        //   this.setRequiredTextShow('sealRequiredTextShow', index, false)
        // } else {
        //   this.setRequiredTextShow('sealRequiredTextShow', index, true)
        // }
      },
      onChanged1(e, index) {
        if (e) {
          this.setRequiredTextShow('routineSealRequiredTextShow', index, false)
        } else {
          this.setRequiredTextShow('routineSealRequiredTextShow', index, true)
        }
      },

      // 获取印章类型
      async selectSealTypes(index) {
        this.thisIndex = index
        try {
          const res = await typeOfSealService.list({ searchKey: '' })
          this.sealTypes = res.data
        } catch (error) {}
      },

      onClear(e, index) {
        this.filedList.splice(index, 1, {
          ...this.filedList[index],
          ...{ seal: '', sealId: '' }
        })
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

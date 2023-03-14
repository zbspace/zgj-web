<template>
	<static-content-wrapper :designer="designer" :field="field" :design-state="designState"
	                        :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
	                        :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
		<el-input v-model="organId" v-if="false"></el-input>
		<el-input v-model="fieldModel.unitIds" v-if="false"></el-input>
    <el-form-item label="代办人" 
      :rules="rules"
      :label-width="field.options.labelWidth + 'px'"
      :class="[labelAlign, customClass, field.options.required ? 'required' : '']">
      <el-input v-model="fieldModel.unitNames" 
        v-show="!field.options.hidden"
        :size="field.options.size"
        :disabled="field.options.disabled"
        :readonly="field.options.readonly"
        :clearable="field.options.clearable"
        @blur="validate"
        @click="openSelectWin"
        @clear="onClear"
        @change="valueChange">
        <template #append>
          <el-button slot="append" 
            icon="el-icon-search" 
            :size="field.options.size"
            :readonly="field.options.readonly"
            :disabled="field.options.disabled"
            @click="openSelectWin(index)"></el-button>
        </template>
      </el-input>
      <div class="el-form-item__error" v-if="field.options.requiredTextShow && field.options.required">{{field.options.requiredHint||'字段值不可为空'}}</div>
    </el-form-item>

	</static-content-wrapper>
</template>

<script>
	import StaticContentWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/static-content-wrapper'
  import FormItemWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/form-item-wrapper'
  import SvgIcon from '@/lib/vform/components/svg-icon'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n from "@/lib/vform/utils/i18n";
  import fieldMixin from "@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin";
	
  export default {
    name: "agentMan-widget",
    componentName: 'FieldWidget',  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
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

      subFormRowIndex: { /* 子表单组件行索引，从0开始计数 */
        type: Number,
        default: -1
      },
      subFormColIndex: { /* 子表单组件列索引，从0开始计数 */
        type: Number,
        default: -1
      },
      subFormRowId: { /* 子表单组件行Id，唯一id且不可变 */
        type: String,
        default: ''
      },

    },
    components: {
      FormItemWrapper,
			StaticContentWrapper,
      SvgIcon,
    },
    data() {
      return {
				organId:"123456789",
				editFlag:"add",
				fieldModel: {
					unitIds:"",
					unitNames:""
				},
        oldFieldValue: null, //field组件change之前的值
        rules: [],
				thisIndex:null,
				xzyzDialogVisible:false,
				xzyzEditDialogVisible:false,
				xzyzEditDialogTitle:"",
				contactUnitTableData:[],
			
				defaultProps: {
					children: 'children',
					label: 'label'
				}
      }
    },
    computed: {
			customClass() {
			  return !!this.field.options.customClass ? this.field.options.customClass.join(' ') : ''
			},
			labelAlign() {
			  if (!!this.field.options.labelAlign) {
			    return this.field.options.labelAlign
			  }
			
			  if (!!this.designer) {
			    return this.designer.formConfig.labelAlign || 'label-left-align'
			  } else {
			    return this.formConfig.labelAlign || 'label-left-align'
			  }
			},
      inputType() {
        if (this.field.options.type === 'number') {
          return 'text'  //当input的type设置为number时，如果输入非数字字符，则v-model拿到的值为空字符串，无法实现输入校验！故屏蔽之！！
        }

        return this.field.options.type
      },
    },
    beforeCreate() {
      /* 这里不能访问方法和属性！！ */
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
			// 供外部使用,设置组件的organId
			setOrganId(organId){
				this.organId = organId
			},
			setRequiredTextShow(v) {
				this.field.options.requiredTextShow = v
			},
			getValue(){
				return this.fieldModel
			},
			setValue(value){
				this.fieldModel = value
			},
			valueChange(v){
				if(!v){
					this.fieldModel.unitIds = null
					this.fieldModel.name = null
				}
				this.validate()
			},
			onClear(){
				this.fieldModel.unitIds = null
				this.fieldModel.name = null
				this.validate()
			},
			validate(){
				if(!this.fieldModel.unitIds){
					this.setRequiredTextShow(true)
				}else{
					this.setRequiredTextShow(false)
				}
			},
			// 打开弹窗选择数据
			openSelectWin(){
				if(this.$jyVform){
					this.$jyVform.showAgentMan(this,'user')
				}else{
					this.$message.warning('无法获取jyVform')
				}
			},

			callBackFn(list){
				let selectRecords = list
				this.xzyzDialogVisible = false;
				if(selectRecords.length==0){
					return
				}
				let tenantIds ="",relatedCompanyNames=""
				for(let i=0;i<selectRecords.length;i++){
					if(i==0){
						tenantIds = selectRecords[i].id
						relatedCompanyNames = selectRecords[i].name
					} else {
						tenantIds = tenantIds + ","+selectRecords[i].id
						relatedCompanyNames = relatedCompanyNames + ","+selectRecords[i].name
					}
				}
				this.fieldModel.unitIds= tenantIds
				this.fieldModel.unitNames = relatedCompanyNames
			},
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/lib/vform/styles/global.scss"; /* form-item-wrapper已引入，还需要重复引入吗？ */
	.required :deep(.el-form-item__label)::before {
	  content: '*';
	  color: #F56C6C;
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

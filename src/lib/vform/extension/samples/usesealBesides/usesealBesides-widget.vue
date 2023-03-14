<template>
	<static-content-wrapper :designer="designer" :field="field" :design-state="designState"
			:parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
			:sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
			<el-row :gutter="12">
				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="印章外带" :label-width="field.options.labelWidth" :class="[labelAlign, customClass]">
						<el-checkbox v-model="fieldModel.isTrue"
							:size="field.options.size"
							@change="onChange"
							:disabled="field.options.disabled"/>
						<el-divider direction="vertical" v-show="fieldModel.isTrue"/>
						<el-button type="primary" link v-show="fieldModel.isTrue" @click="wdqkDialogOpen">查看印章外带情况</el-button>
					</el-form-item>
				</el-col>
				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item label="外带时间" 
						:label-width="field.options.labelWidth"
						class="limit-item"
						:class="[labelAlign, customClass, field.options.required ? 'required' : '']"
						v-show="fieldModel.isTrue">
						<el-date-picker v-model="fieldModel.besidesTime" 
							:size="field.options.size"
							:disabled="field.options.disabled"
								type="daterange" 
								range-separator="-" 
								format="YYYY-MM-DD"
								@change="onTimeChange"
								value-format="YYYY-MM-DD"
								start-placeholder="开始时间"
								end-placeholder="结束时间" />
							<div class="el-form-item__error" v-if="field.options.besidesTimeRequiredShow">{{'字段值不可为空'}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="12">
				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item 
					:label-width="field.options.labelWidth"	
					label="外带地点" 
					class="limit-item" 
					v-show="fieldModel.isTrue" :class="[labelAlign, customClass, field.options.required ? 'required' : '']">
						<el-cascader 
							placeholder="请选择地区" 
							style="width:800px"
							:size="field.options.size"
							:disabled="field.options.disabled"
							:options="addressData" 
							v-model="fieldModel.Add"
							clearable
							@change="handleChange">
						</el-cascader>
						<div class="el-form-item__error" v-if="field.options.addRequiredShow">{{'字段值不可为空'}}</div>
					</el-form-item>
				</el-col>
				<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
					<el-form-item :label="addTitle" :label-width="field.options.labelWidth" class="limit-item" v-show="fieldModel.isTrue" :class="[labelAlign, customClass, field.options.required ? 'required' : '']">
						<el-input v-model="fieldModel.detailAdd"
							:size="field.options.size"
							@change="onAddChange"
							:disabled="field.options.disabled"></el-input>
							<div class="el-form-item__error" v-if="field.options.detailAddRequiredShow">{{'字段值不可为空'}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<!-- 印章外借信息 弹窗 -->
			<el-dialog
				append-to-body
				v-model="wdqkDialogVisible"
				:visible.sync="wdqkDialogVisible"
				width="800px"
				title="印章外借信息">
				<el-table
					:data="wdqkTableData"
					style="width: 100%"
					class="panes-setting"
					:cell-style="{ padding: '1px 0' }"
					default-expand-all
					:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
					height="400"
					border
					row-key="queryField"
					ref="wdqkTable"
					stripe>
					<el-table-column type="index" label="序号" width="60" fixed="left">
					</el-table-column>
					<el-table-column label="sealId" width="100" prop="sealId" align="center" v-if="false">
					</el-table-column>
					<el-table-column label="印章名称" width="100" prop="sealName" align="center">
					</el-table-column>
					<el-table-column label="印章类型" width="100" prop="sealTypeName" align="center">
					</el-table-column>
					<el-table-column label="保管部门" width="100" prop="custodianDeptName" align="center">
					</el-table-column>
					<el-table-column label="保管人" width="100" prop="custodianName" align="center">
					</el-table-column>
					<el-table-column label="外借人" width="100" prop="outUserName" align="center">
					</el-table-column>
					<el-table-column label="外带时间" width="100" prop="outDatetime" align="center">
					</el-table-column>
					<el-table-column label="外带地址" width="100" prop="outLocation" align="center">
					</el-table-column>
				</el-table>
			</el-dialog>
	</static-content-wrapper>
</template>

<script>
import StaticContentWrapper from "@/lib/vform/components/form-designer/form-widget/field-widget/static-content-wrapper";
import emitter from "@/lib/vform/utils/emitter";
import i18n from "@/lib/vform/utils/i18n";
import fieldMixin from "@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin";
import { regionData } from 'element-china-area-data'
import axios from 'axios'
import { TEST_API_URL,OUT_PAGE } from "@/lib/vform/utils/config";

export default {
	name: "usesealBesides-widget",
	componentName: "FieldWidget", //必须固定为FieldWidget，用于接收父级组件的broadcast事件
	mixins: [emitter, fieldMixin, i18n],
	props: {
			field: Object,
			parentWidget: Object,
			parentList: Array,
			indexOfParentList: Number,
			designer: Object,

			designState: {
					type: Boolean,
					default: false,
			},

			subFormRowIndex: {
		/* 子表单组件行索引，从0开始计数 */ type: Number,
					default: -1,
			},
			subFormColIndex: {
		/* 子表单组件列索引，从0开始计数 */ type: Number,
					default: -1,
			},
			subFormRowId: {
		/* 子表单组件行Id，唯一id且不可变 */ type: String,
					default: "",
			},
	},
	components: {
			StaticContentWrapper,
	},
	data() {
			return {
					besidesTimeRequiredShow:false,
					addRequiredShow:false,
					detailAddRequiredShow:false,
					radio: 6,
					fieldModel: {
						isTrue:false,
						besidesTime:[],
						Add:[],
						detailAdd:"",
					},
					wdqkDialogVisible:false,
					wdqkTableData:[],
					rules: [],
					fileList: [],
					addressData:regionData
			};
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
		addTitle(){
			return this.field.options.addTitle+'地址'
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
	},
	beforeUnmount() {
		this.unregisterFromRefList()
	},
	methods: {
		onTimeChange(value){
			if(!value || !this.fieldModel.besidesTime[0]){
				this.setBesidesTimeRequiredShow(true)
			}else{
				this.setBesidesTimeRequiredShow(false)
			}
		},
		setBesidesTimeRequiredShow(v) {
			this.field.options.besidesTimeRequiredShow = v
		},
		setAddRequiredShow(v) {
			this.field.options.addRequiredShow = v
		},
		setDetailAddRequiredShow(v) {
			this.field.options.detailAddRequiredShow = v
		},
		getValue(){
			return this.fieldModel
		},
		setValue(value){
			this.fieldModel = value
		},
		httpRequest(requestURL, requestType, params) {
			if (requestType == "post") {
				return axios.post(TEST_API_URL + requestURL, params);
			} else {
				return axios.get(TEST_API_URL + requestURL, { params });
			}
		},
		handleChange(value){
			if(!value){
				this.setAddRequiredShow(true)
			}else{
				this.setAddRequiredShow(false)
			}
		},

		onChange(value){
			if(!value){
				this.fieldModel.besidesTime = []
				this.fieldModel.Add = []
				this.fieldModel.detailAdd = ''
			}
		},

		onAddChange(value){
			if(!value){
				this.setDetailAddRequiredShow(true)
			}else{
				this.setDetailAddRequiredShow(false)
			}
		},
		wdqkDialogOpen(){
			this.wdqkDialogVisible=true
			if(OUT_PAGE.code == "200"){
				this.wdqkTableData = OUT_PAGE.data.records
			}
			// axios.get(TEST_API_URL+"/out/page").then(res => {
				
			// 	alert()
			// }).catch(error => {
				
			// })
		},
		// test(){
		// 	this.axios.get("/syj/vformPage/queryById?id="+item.referInfo.fromQuerySource.value).then(res=>{
		// 	  if(res.code == "200" || res.success == true){
		// 			console.log("===========请求参照页面JSON成功",res)
		// 			let json = JSON.parse(res.result.pageCode);
		// 			this.formJsonFill = json
		// 			this.$refs.preForm.setFormJson(this.formJsonFill);
		// 		} else {
		// 			console.log("===========请求参照页面JSON失败",res)
		// 		}
		// 	})
			
		// 	this.axios.post('/syj/fileReceive/uploadfile',
		// 	  formData,
		// 	  { "Content-Type": "multipart/form-data" }
		// 	).then(res => {
		// 	  console.log(res)
		// 		row[columnName]=res.message;
		// 	}).catch(err => {
						
		// 	})
		// }
	},
};
</script>

<style lang="scss" scoped>
.limit-item {
		display: flex;
}

.date-seal {
		display: flex;
		align-items: center;
		margin-left: 5%;
}
.map {
	width: 100%;
	height: 300px;
}
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

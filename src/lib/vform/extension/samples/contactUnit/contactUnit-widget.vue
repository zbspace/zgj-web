<template>
	<static-content-wrapper :designer="designer" :field="field" :design-state="designState"
	                        :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
	                        :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
		<el-input v-model="organId" v-if="false"></el-input>
		<el-input v-model="fieldModel.unitIds" v-if="false"></el-input>
		<el-row :gutter="12">
			<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
				<el-form-item label="往来单位" 
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
			</el-col>
		</el-row>

		<!-- 往来单位 弹窗 -->
		<!-- <el-dialog
		  append-to-body
			v-model="xzyzDialogVisible"
		  :visible.sync="xzyzDialogVisible"
		  width="800px"
		  title="往来单位">
			<el-row :gutter="20">
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					<el-row :gutter="20">
						<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
							<el-input v-model="searchPara" 
								prefix-icon="el-icon-search" 
								:size="field.options.size" 
								placeholder="单位编码/单位名称/联系人" 
								clearable>
								<template #append>
									<el-button slot="append" :size="field.options.size"  @click="searchList">查询</el-button>
								</template>	
							</el-input>
						</el-col>
						<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
							<div style="text-align: right;">
								<el-button type="primary" :size="field.options.size" @click="submmitRecord">提交</el-button>
								<el-button type="primary" :size="field.options.size" @click="addRecord">新增</el-button>
							</div>
						</el-col>
					</el-row>

						<el-table
							:data="contactUnitTableData"
							style="width: 100%;padding-top:5px"
							class="panes-setting"
							:cell-style="{ padding: '1px 0' }"
							default-expand-all
							height="400"
							border
							row-key="queryField"
							ref="contactUnitTable"
							stripe>
							<el-table-column type="selection" width="55" />
							<el-table-column type="index" label="序号" width="60" fixed="center">
							</el-table-column>
							<el-table-column label="tenantId" prop="tenantId" v-if="false">
							</el-table-column>
							<el-table-column label="单位编码" width="200" prop="relatedCompanyNo" align="left">
							</el-table-column>
							<el-table-column label="单位名称" width="200" prop="relatedCompanyName" align="left">
							</el-table-column>
							<el-table-column label="所属部门ID" prop="organId" v-if="false">
							</el-table-column>
							<el-table-column label="所属部门" width="200" prop="relatedCompanyName" align="left">
							</el-table-column>
							<el-table-column label="操作" fixed="right" width="120" align="center">
								<template #default="scope">
									<el-button link type="primary" :size="field.options.size" @click="updateRecord(scope)">修改</el-button>
									<el-button link type="primary" :size="field.options.size" @click="delRecord(scope)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-pagination
													 :current-page="currentPage"
													 :page-sizes="pageSizes"
													 :page-size="pageSize"
													 :total="total"
													 @size-change="handlePageSizeChange"
													 @current-change="handleCurrentPageChange">
						</el-pagination>
					
				</el-col>
			</el-row>
		  
		</el-dialog> -->

		<!-- <el-dialog
		  append-to-body
			v-model="xzyzEditDialogVisible"
		  :visible.sync="xzyzEditDialogVisible"
		  width="800px"
		  :title="xzyzEditDialogTitle">
			<el-form-item label="组织机构ID" v-if="false">
				<el-input v-model="tmpObject.organId"></el-input>
			</el-form-item>
			<el-form-item label="单位编码">
				<el-input v-model="tmpObject.tenantId" :readonly="true"></el-input>
			</el-form-item>
			<el-form-item label="单位名称">
				<el-input v-model="tmpObject.relatedCompanyName"></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model="tmpObject.contactName"></el-input>
			</el-form-item>
			<el-form-item label="联系方式">
				<el-input v-model="tmpObject.contactInformation"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="tmpObject.remark"
					type="textarea"
				  :rows="2">
				</el-input>
			</el-form-item>
			<template #footer>
			  <div>
					<el-button type="primary" @click="handleOkClick">确定</el-button>
			    <el-button @click="handleCancelClick">取消</el-button>
			  </div>
			</template>
		</el-dialog> -->
		<!-- <RelatedCompany v-model="xzyzDialogVisible" @on-submit="getSelection"/> -->
	</static-content-wrapper>
	<!-- </form-item-wrapper> -->
</template>

<script>
	import StaticContentWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/static-content-wrapper'
  import FormItemWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/form-item-wrapper'
  import SvgIcon from '@/lib/vform/components/svg-icon'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n, {translate} from "@/lib/vform/utils/i18n";
  import fieldMixin from "@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin";
	
	import { Search } from '@element-plus/icons-vue'
	import { TEST_API_URL,RELATED_COMPANY_LIST } from "@/lib/vform/utils/config";
	import {generateId} from "@/lib/vform/utils/util"
	import { ElMessage,ElMessageBox } from 'element-plus'
	
  export default {
    name: "contactUnit-widget",
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
				searchPara:'',
				total:0,
				currentPage:1,
				pageSizes:[10, 20, 30, 40, 50, 100],
				pageSize:null,
				organId:"123456789",
				editFlag:"add",
				fieldModel: {
					unitIds:"",
					unitNames:""
				},
        oldFieldValue: null, //field组件change之前的值
    //     fieldModel: null,
				// fieldModelId: null,
        rules: [],
				thisIndex:null,
				xzyzDialogVisible:false,
				xzyzEditDialogVisible:false,
				tmpObject:{
					tenantId: "",
					relatedCompanyName: "",
					organId: "",
					contactName: "",
					contactInformation: "",
					remark: ""
				},
				xzyzEditDialogTitle:"",
				contactUnitTableData:[],
				sealTypeTreeData: [
					{
						id: 1,
						label: '公章',
						children: []
					}, {
						id: 2,
						label: '合同章',
						children: []
					}, {
						id: 3,
						label: '财务章',
						children: []
					},{
						id: 4,
						label: '法人章',
						children: []
					},{
						id: 5,
						label: '其他章',
						children: []
					},
				],
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
					this.$jyVform.showRelatedCompany(this)
				}else{
					this.$message.warning('无法获取jyVform')
				}
			},
			selectData(row, column, event){
				this.field.options.filedList[this.thisIndex].seal=row.f1
				this.xzyzDialogVisible = false;
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
						tenantIds = selectRecords[i].tenantId
						relatedCompanyNames = selectRecords[i].relatedCompanyName
					} else {
						tenantIds = tenantIds + ","+selectRecords[i].tenantId
						relatedCompanyNames = relatedCompanyNames + ","+selectRecords[i].relatedCompanyName
					}
				}
				this.fieldModel.unitIds= tenantIds
				this.fieldModel.unitNames = relatedCompanyNames
			},
			
			searchList(){
				let para = {params:{
					"tenantId":123456789,
					"relatedCompanyName": this.searchPara,
					"organId":this.organId,
					"current": 1,
					"size": 10
				}}
				axios.get("/api/tenant/relatedCompany/query/list",para).then(res => {
					this.xzyzDialogVisible = true;
					if(res.data.code == "200" || !!res.data.success){
						this.contactUnitTableData = res.data.data.records
						this.loadingFlag = false
						this.total = res.data.data.total
						this.currentPage = 1
						// this.pageSize = res.data.data.size
					}
				})
				.catch(error => {
					console.log('searcherror', error);
				});
			},
			addRecord(){
				debugger
				this.xzyzEditDialogVisible = true
				this.xzyzEditDialogTitle = "单位新增"
				this.tmpObject.tenantId = generateId()
				this.tmpObject.organId = this.organId
				this.editFlag = "add"
			},
			handleOkClick(){
				if(this.editFlag == "add"){
					axios.post("/api/tenant/relatedCompany/add",this.tmpObject).then(res => {
						if(res.data.code == "200" || !!res.data.success){
							ElMessage({message: '新增成功',type: 'success',})
							this.xzyzEditDialogVisible = false
							this.searchList()
						} else {
							ElMessage({message: '新增失败',type: 'success',})
							console.log("新增失败",res)
						}
					})
				}
				if(this.editFlag == "edit"){
					axios.post("/api/tenant/relatedCompany/update",this.tmpObject).then(res => {
						if(res.data.code == "200" || !!res.data.success){
							ElMessage({message: '修改成功',type: 'success',})
							this.xzyzEditDialogVisible = false
							this.searchList()
						} else {
							ElMessage({message: '修改失败',type: 'success',})
							console.log("修改失败",res)
						}
					})
				}
			},
			handleCancelClick(){
				this.tmpObject = {
					tenantId: "",
					relatedCompanyName: "",
					organId: "",
					contactName: "",
					contactInformation: "",
					remark: ""
				}
				this.xzyzEditDialogVisible = false
			},
			updateRecord(scope){
				this.xzyzEditDialogVisible = true
				this.xzyzEditDialogTitle = "单位修改"
				this.tmpObject = scope.row
				// this.tmpObject.tenantId = generateId()
				// 原数据缺失tenantId  企业ID！！
				this.tmpObject.organId = this.organId
				this.editFlag = "edit"
			},
			delRecord(scope){
				ElMessageBox.confirm('是否确定删除?').then(() => {
					// 原数据缺失tenantId  企业ID！！
					let para = {params:{
							"tenantId": scope.row.tenantId,
							"relatedCompanyIds": [
									scope.row.relatedCompanyIds
							]
					}}
					axios.get("/api/tenant/relatedCompany/delete",para).then(res => {
						if(res.data.code == "200" || !!res.data.success){
							ElMessage({message: '删除成功',type: 'success',})
							this.searchList()
						} else {
							ElMessage({message: '删除失败',type: 'success',})
							console.log("删除失败",res)
						}
					})
				})
				.catch(() => {
					// catch error
				})
			},

			handlePageSizeChange(pageSize) {
				this.pageSize = pageSize
				if (!!this.widget.options.dsEnabled && !!this.widget.options.dsName) {
					this.loadDataFromDS()
				}
			
				if (!!this.widget.options.onPageSizeChange) {
					let customFn = new Function('pageSize', 'currentPage', this.widget.options.onPageSizeChange)
					customFn.call(this, pageSize, this.currentPage)
				} else {
					this.dispatch('VFormRender', 'dataTablePageSizeChange', [this, pageSize, this.currentPage])
				}
			},

			handleCurrentPageChange(currentPage) {
				this.currentPage = currentPage
				if (!!this.widget.options.dsEnabled && !!this.widget.options.dsName) {
					this.loadDataFromDS()
				}
			
				if (!!this.widget.options.onCurrentPageChange) {
					let customFn = new Function('pageSize', 'currentPage', this.widget.options.onCurrentPageChange)
					customFn.call(this, this.pageSize, currentPage)
				} else {
					this.dispatch('VFormRender', 'dataTablePageChange', [this, this.pageSize, currentPage])
				}
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

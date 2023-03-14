<!-- 字段联动 -->
<template>
  <el-form-item label="字段联动配置">
		<el-button type="info" icon="el-icon-edit" plain round @click="openDialog">点击设置</el-button>
  </el-form-item>
	<div v-if="dialogVisible" v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']">
		<el-dialog title="字段联动设置" v-model="dialogVisible"
							 :show-close="true" class="drag-dialog small-padding-dialog" append-to-body
							 :close-on-click-modal="false" :close-on-press-escape="false"
							 :destroy-on-close="true" width="50%">
			<!-- <code-editor :mode="'json'" :readonly="false" v-model="tableDataOptions"></code-editor> -->
			<el-collapse v-model="activeName" accordion>
				<el-collapse-item v-for="(fl, fIdx) in optionModel.fieldLinkage" :name="fIdx">
					<template #title>
						{{'当字段值为'}}
						<el-row :gutter="0">
							<el-col :span="24">
								<el-input v-model="fl.value" size="small"></el-input>
							</el-col>
						</el-row>
						{{'时'}}
						<el-button link type="primary" icon="el-icon-minus" @click="deleteItemGroup(fIdx)">
						  移除组件值条件
						</el-button>
					</template>
					<el-row v-for="(rh, hIdx) in fl.linkages" class="rh-row" :gutter="8">
					  <el-col :span="10">
					    <el-form-item :prop="'headers.' + hIdx + '.type'" :label-width="0" label="字段组件">
					      <el-select v-model="rh.fieldName" placeholder="请选择" filterable @change="fieldSelect(fl.linkages,hIdx,rh.fieldName)">
									<el-option
									      v-for="item in fieldWidgetList"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value"
									    />
					      </el-select>
					    </el-form-item>
					  </el-col>
					  <el-col :span="12">
					    <el-form-item :prop="'headers.' + hIdx + '.value'" :rules="valueRules" :label-width="0" label="是否显示">
					      <!-- <el-input v-model="rh.value" :placeholder="i18nt('designer.setting.dsRequestValueInputPlaceholder')"></el-input> -->
								<el-radio-group v-model="rh.show">
									<el-radio :label="false" size="small" border>显示</el-radio>
									<el-radio :label="true" size="small" border>隐藏</el-radio>
								</el-radio-group>
					    </el-form-item>
					  </el-col>
					  <el-col :span="2">
					    <el-button icon="el-icon-delete" plain circle @click="deleteItem(fl.linkages,hIdx)"></el-button>
					  </el-col>
					</el-row>
					<el-row>
					  <el-col :span="6">
					    <el-button link type="primary" icon="el-icon-plus" @click="addItem(fl.linkages)">
					      新增联动
							</el-button>
					  </el-col>
					</el-row>
				</el-collapse-item>
			</el-collapse>
			<el-row :gutter="8">
				<el-col :span="12">
					<el-input
						v-model="addValue"
						placeholder="当组件值匹配时触发组内联动">
						<template #append>
							<el-button link type="primary" icon="el-icon-plus" @click="addItemGroup()">
							  新增组件值条件
							</el-button>
						</template>
					</el-input>
				</el-col>
			</el-row>
			
			<!-- <el-button link type="primary" icon="el-icon-plus" @click="addItemGroup(fl.linkages)">
				新增组件值
			</el-button> -->
			<template #footer>
				<div class="dialog-footer">
					<el-button size="default" type="primary" @click="saveFieldLinkage">{{i18nt('designer.hint.confirm')}}</el-button>
					<el-button size="default" @click="dialogVisible = false">{{i18nt('designer.hint.cancel')}}</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script>
	import { ElMessage } from 'element-plus'
  import i18n from "@/lib/vform/utils/i18n"
	import {
	  traverseFieldWidgetsOfContainer,
		traverseWidgetsOfContainer,
		traverseFieldWidgets
	} from "@/lib/vform/utils/util"
  export default {
    name: "fieldLinkage-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
		data(){
			return {
				addValue:"",
				dialogVisible:false,
				activeName:"1",
				fieldWidgetList:[], 
				errorFlag:false,
			}
		},
		created() {
			this.getFieldWidgetList()
		},
    methods: {
			openDialog(){
				this.dialogVisible = true
			},
			addItemGroup() {
			  this.optionModel.fieldLinkage.push({value:this.addValue,linkages:[]})
			},
			deleteItemGroup(idx) {
			  this.optionModel.fieldLinkage.splice(idx, 1)
			},
			addItem(list) {
			  list.push({
			    fieldName: '',
			    show: false
			  })
			},
			deleteItem(list,idx) {
			  list.splice(idx, 1)
			},
			getFieldWidgetList(){
				let self = this
				let widgetList = this.designer.widgetList
				traverseFieldWidgets(widgetList, (widget) => {
					let item = {
						label: widget.options.label, 
						value: widget.id,
					}
					// 加载除自己外表单内所有字段组件作为下拉选项
					if(widget.id !=self.optionModel.name){
						self.fieldWidgetList.push(item)
					}
				})
			},
			saveFieldLinkage(){
				this.dialogVisible = false
			},
			fieldSelect(arr,index,value){
				for(let i=0;i<arr.length;i++){
					if(arr[index].fieldName == arr[i].fieldName && index != i){
						arr[index].fieldName = ""
						ElMessage({message: '字段组件组内重复,请重新选择',type: 'warning',})
					} 
				}
				
			}
		}
  }
</script>

<style scoped>

</style>

<template>
  <form-item-wrapper :designer="designer" :field="field" :rules="rules" :design-state="designState"
                     :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
                     :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
			<el-input v-model="fieldModelKey" v-if="false"></el-input>
			<el-input ref="fieldEditor" v-model="fieldModel"
								:disabled="field.options.disabled" :readonly="true"
								:size="field.options.size" class="hide-spin-button"
								:type="inputType" 
								:show-password="field.options.showPassword"
								:placeholder="field.options.placeholder"
								:clearable="field.options.clearable"
								:minlength="field.options.minLength" :maxlength="field.options.maxLength"
								:show-word-limit="field.options.showWordLimit"
								:prefix-icon="field.options.prefixIcon" :suffix-icon="field.options.suffixIcon"
								@focus="handleFocusCustomEvent" @blur="handleBlurCustomEvent" @input="handleInputCustomEvent"
								@change="handleChangeEvent">
				<el-button slot="append" 
				:disabled="field.options.disabled || field.options.readonly" 
				:class="field.options.buttonIcon" 
				@click.native="openDynamicDialog"></el-button>
			</el-input>
  </form-item-wrapper>
</template>

<script>
	import Vue from 'vue'
  import FormItemWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/form-item-wrapper'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n, {translate} from "@/lib/vform/utils/i18n";
  import fieldMixin from "@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin";
	import VFormRender from '@/lib/vform/components/form-render'
	import {traverseFieldWidgets,traverseContainWidgets} from "@/lib/vform/utils/util";
	import {SYS_REQUEST_URL} from "@/lib/vform/utils/config";
	import {VFORM_PAGE_QUERY_BY_ID,
					SYS_DATAMATCH_SET_CONTROL_GET_DATA,
					SYS_DATAMATCH_SET_CONTROL_GET_DATA_FROM_REF} from "@/lib/vform/utils/api"
					
	import DynamicDialog from '@/components/form-render/dynamic-dialog'
	// import {getAction} from "../../src/api/manage";
	// import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/manage'
	// import { queryVformById } from '@/api/api'
	
	// import global from "../../api/global.js";
  export default {
    name: "reference-widget",
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
			VFormRender,
    },
    inject: ['refList', 'formConfig', 'globalOptionData', 'globalModel'],
    data() {
      return {
				// headers: {},
				// token:{},
				requestParaArr:[],// 参照传递请求参数列表
				selections:[],
				formData: {},
				optionData: {},
				multipleSelection:[],
				refDialogVisible:false,
				refDialogVisible2:false,
        oldFieldValue: null, //field组件change之前的值
        fieldModel: null,//参照选择值-明文
				fieldModelKey: null,//参照选择值-KEY值
        rules: [],
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
				},
				name1:'',
				select1:'',
				name2:'',
				select2:'',
				fromQuerySourcePageID:null,// 当前参照请求的页面ID
				formJsonFill:{},
				referPageData:{
					"widgetList": [],
					"formConfig": {
						"modelName": "formData",
						"refName": "vForm",
						"rulesName": "rules",
						"labelWidth": 80,
						"labelPosition": "left",
						"size": "mini",
						"labelAlign": "label-right-align",
						"cssCode": "",
						"customClass": "",
						"functions": "",
						"layoutType": "PC",
						"tableBorder": true,
						"onFormCreated": "",
						"onFormMounted": "",
						"onFormDataChange": ""
					}
				},
				localResult:{
						"id": "1527209238055665665",
						"createBy": "admin",
						"createTime": "2022-05-19 16:47:11",
						"updateBy": "admin",
						"updateTime": "2022-07-13 10:53:16",
						"sysOrgCode": "A01",
						"pageNo": "pl_corporation_refer",
						"pageName": "公司目录参照",
						"pageLabel": "公司目录选择",
						"pageCode": "{\"widgetList\":[{\"type\":\"searchContainer\",\"category\":\"container\",\"icon\":\"card\",\"formItemFlag\":false,\"widgetList\":[{\"type\":\"table\",\"category\":\"container\",\"icon\":\"table\",\"rows\":[{\"cols\":[{\"type\":\"table-cell\",\"category\":\"container\",\"icon\":\"table-cell\",\"internal\":true,\"widgetList\":[{\"type\":\"input\",\"icon\":\"text-field\",\"formItemFlag\":true,\"options\":{\"id\":\"input83578\",\"tableName\":\"v_pl_corporation\",\"name\":\"v_pl_corporation-ccorp_code\",\"label\":\"公司代码\",\"defaultLabel\":\"公司代码\",\"labelAlign\":\"\",\"type\":\"text\",\"defaultValue\":\"\",\"placeholder\":\"\",\"columnWidth\":\"200px\",\"size\":\"mini\",\"labelWidth\":null,\"labelHidden\":false,\"readonly\":false,\"disabled\":false,\"hidden\":false,\"clearable\":true,\"showPassword\":false,\"required\":false,\"requiredHint\":\"\",\"validation\":\"\",\"validationHint\":\"\",\"customClass\":\"\",\"labelIconClass\":null,\"labelIconPosition\":\"rear\",\"labelTooltip\":null,\"minLength\":null,\"maxLength\":null,\"showWordLimit\":false,\"prefixIcon\":\"\",\"suffixIcon\":\"\",\"appendButton\":false,\"appendButtonDisabled\":false,\"buttonIcon\":\"el-icon-search\",\"operator\":\"like\",\"onCreated\":\"\",\"onMounted\":\"\",\"onInput\":\"\",\"onChange\":\"\",\"onFocus\":\"\",\"onBlur\":\"\",\"onValidate\":\"\"},\"id\":\"input83578\"}],\"merged\":false,\"options\":{\"name\":\"table-cell-31756\",\"cellWidth\":\"\",\"cellHeight\":\"\",\"colspan\":1,\"rowspan\":1,\"customClass\":[]},\"id\":\"table-cell-31756\"},{\"type\":\"table-cell\",\"category\":\"container\",\"icon\":\"table-cell\",\"internal\":true,\"widgetList\":[{\"type\":\"input\",\"icon\":\"text-field\",\"formItemFlag\":true,\"options\":{\"id\":\"input41377\",\"tableName\":\"v_pl_corporation\",\"name\":\"v_pl_corporation-ccorp_cnname\",\"label\":\"公司中文名称\",\"defaultLabel\":\"公司中文名称\",\"labelAlign\":\"\",\"type\":\"text\",\"defaultValue\":\"\",\"placeholder\":\"\",\"columnWidth\":\"200px\",\"size\":\"mini\",\"labelWidth\":null,\"labelHidden\":false,\"readonly\":false,\"disabled\":false,\"hidden\":false,\"clearable\":true,\"showPassword\":false,\"required\":false,\"requiredHint\":\"\",\"validation\":\"\",\"validationHint\":\"\",\"customClass\":\"\",\"labelIconClass\":null,\"labelIconPosition\":\"rear\",\"labelTooltip\":null,\"minLength\":null,\"maxLength\":null,\"showWordLimit\":false,\"prefixIcon\":\"\",\"suffixIcon\":\"\",\"appendButton\":false,\"appendButtonDisabled\":false,\"buttonIcon\":\"el-icon-search\",\"operator\":\"like\",\"onCreated\":\"\",\"onMounted\":\"\",\"onInput\":\"\",\"onChange\":\"\",\"onFocus\":\"\",\"onBlur\":\"\",\"onValidate\":\"\"},\"id\":\"input41377\"}],\"merged\":false,\"options\":{\"name\":\"table-cell-92613\",\"cellWidth\":\"\",\"cellHeight\":\"\",\"colspan\":1,\"rowspan\":1,\"customClass\":[]},\"id\":\"table-cell-92613\"},{\"type\":\"table-cell\",\"category\":\"container\",\"icon\":\"table-cell\",\"internal\":true,\"widgetList\":[{\"type\":\"input\",\"icon\":\"text-field\",\"formItemFlag\":true,\"options\":{\"id\":\"input96736\",\"tableName\":\"v_pl_corporation\",\"name\":\"v_pl_corporation-ccorp_enname\",\"label\":\"公司英文名称\",\"defaultLabel\":\"公司英文名称\",\"labelAlign\":\"\",\"type\":\"text\",\"defaultValue\":\"\",\"placeholder\":\"\",\"columnWidth\":\"200px\",\"size\":\"mini\",\"labelWidth\":null,\"labelHidden\":false,\"readonly\":false,\"disabled\":false,\"hidden\":false,\"clearable\":true,\"showPassword\":false,\"required\":false,\"requiredHint\":\"\",\"validation\":\"\",\"validationHint\":\"\",\"customClass\":\"\",\"labelIconClass\":null,\"labelIconPosition\":\"rear\",\"labelTooltip\":null,\"minLength\":null,\"maxLength\":null,\"showWordLimit\":false,\"prefixIcon\":\"\",\"suffixIcon\":\"\",\"appendButton\":false,\"appendButtonDisabled\":false,\"buttonIcon\":\"el-icon-search\",\"operator\":\"like\",\"onCreated\":\"\",\"onMounted\":\"\",\"onInput\":\"\",\"onChange\":\"\",\"onFocus\":\"\",\"onBlur\":\"\",\"onValidate\":\"\"},\"id\":\"input96736\"}],\"merged\":false,\"options\":{\"name\":\"table-cell-45367\",\"cellWidth\":\"\",\"cellHeight\":\"\",\"colspan\":1,\"rowspan\":1,\"customClass\":\"\"},\"id\":\"table-cell-45367\"},{\"type\":\"table-cell\",\"category\":\"container\",\"icon\":\"table-cell\",\"internal\":true,\"widgetList\":[{\"type\":\"input\",\"icon\":\"text-field\",\"formItemFlag\":true,\"options\":{\"id\":\"input111297\",\"tableName\":\"v_pl_corporation\",\"name\":\"v_pl_corporation-ccorp_cnadrr\",\"label\":\"公司中文地址\",\"defaultLabel\":\"公司中文地址\",\"labelAlign\":\"\",\"type\":\"text\",\"defaultValue\":\"\",\"placeholder\":\"\",\"columnWidth\":\"200px\",\"size\":\"mini\",\"labelWidth\":null,\"labelHidden\":false,\"readonly\":false,\"disabled\":false,\"hidden\":false,\"clearable\":true,\"showPassword\":false,\"required\":false,\"requiredHint\":\"\",\"validation\":\"\",\"validationHint\":\"\",\"customClass\":\"\",\"labelIconClass\":null,\"labelIconPosition\":\"rear\",\"labelTooltip\":null,\"minLength\":null,\"maxLength\":null,\"showWordLimit\":false,\"prefixIcon\":\"\",\"suffixIcon\":\"\",\"appendButton\":false,\"appendButtonDisabled\":false,\"buttonIcon\":\"el-icon-search\",\"operator\":\"like\",\"onCreated\":\"\",\"onMounted\":\"\",\"onInput\":\"\",\"onChange\":\"\",\"onFocus\":\"\",\"onBlur\":\"\",\"onValidate\":\"\"},\"id\":\"input111297\"}],\"merged\":false,\"options\":{\"name\":\"table-cell-94477\",\"cellWidth\":\"\",\"cellHeight\":\"\",\"colspan\":1,\"rowspan\":1,\"customClass\":[]},\"id\":\"table-cell-94477\"}],\"id\":\"table-row-105970\",\"merged\":false}],\"options\":{\"name\":\"table7626\",\"hidden\":false,\"cellBorder\":true,\"customClass\":[]},\"id\":\"table7626\"}],\"options\":{\"name\":\"searchContainer83915\",\"label\":\"查询条件\",\"hidden\":false,\"folded\":false,\"showFold\":true,\"cardWidth\":\"100%\",\"shadow\":\"never\",\"customClass\":[],\"searchTableName\":\"baseVxeTable56917\"},\"id\":\"searchContainer83915\"},{\"type\":\"baseVxeTable\",\"category\":\"container\",\"icon\":\"baseTable\",\"widgetList\":[],\"options\":{\"name\":\"baseVxeTable56917\",\"label\":\"baseVxeTable\",\"hidden\":false,\"rowHeight\":4,\"autoSearch\":true,\"tableHeight\":\"300px\",\"tableWidth\":\"100%\",\"customClass\":[],\"stripe\":true,\"showIndex\":true,\"showPagination\":true,\"showSummary\":false,\"toolbarShow\":true,\"border\":true,\"tableSize\":\"mini\",\"moreTitle\":[],\"onRowClick\":\"\",\"onRowDblclick\":\"\",\"onRowSelect\":\"\",\"columnHide\":true,\"columnWidth\":180,\"location\":\"left\",\"moreBtns\":[{\"label\":\"new btn\",\"onClick\":\"//row,index为系统变量，表示当前行信息和索引\"}],\"checkedCustomer\":true,\"extendBtns\":[{\"checked\":true,\"label\":\"详情\",\"onClick\":\"//注意：此处row,index为系统变量，表示当前行信息和索引\"},{\"checked\":true,\"label\":\"编辑\",\"onClick\":\"//注意：此处row,index为系统变量，表示当前行信息和索引\"},{\"checked\":true,\"label\":\"删除\",\"onClick\":\"//注意：此处row,index为系统变量，表示当前行信息和索引\"}],\"tableSource\":{\"key\":\"46\",\"title\":null,\"cnTitle\":\"常规\",\"enTitle\":\"v_pl_corporation\",\"cdataSource\":null,\"dataSourceType\":\"view\",\"cDisplayFormat\":null,\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":null,\"type\":null,\"parentId\":\"6\",\"label\":\"常规[v_pl_corporation]\",\"value\":\"46\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":[{\"key\":\"2818\",\"title\":null,\"cnTitle\":\"主键\",\"enTitle\":\"id\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":true,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"主键[id]\",\"value\":\"2818\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2819\",\"title\":null,\"cnTitle\":\"删除标识\",\"enTitle\":\"iis_del\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":true,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"删除标识[iis_del]\",\"value\":\"2819\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2820\",\"title\":null,\"cnTitle\":\"公司代码\",\"enTitle\":\"ccorp_code\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"公司代码[ccorp_code]\",\"value\":\"2820\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2821\",\"title\":null,\"cnTitle\":\"公司中文名称\",\"enTitle\":\"ccorp_cnname\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"公司中文名称[ccorp_cnname]\",\"value\":\"2821\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2822\",\"title\":null,\"cnTitle\":\"公司英文名称\",\"enTitle\":\"ccorp_enname\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"公司英文名称[ccorp_enname]\",\"value\":\"2822\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2823\",\"title\":null,\"cnTitle\":\"公司中文地址\",\"enTitle\":\"ccorp_cnadrr\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"公司中文地址[ccorp_cnadrr]\",\"value\":\"2823\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2824\",\"title\":null,\"cnTitle\":\"公司英文地址\",\"enTitle\":\"ccorp_enadrr\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"公司英文地址[ccorp_enadrr]\",\"value\":\"2824\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2825\",\"title\":null,\"cnTitle\":\"公司邮编\",\"enTitle\":\"ccorp_postcode\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"公司邮编[ccorp_postcode]\",\"value\":\"2825\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2826\",\"title\":null,\"cnTitle\":\"统一社会信用代码\",\"enTitle\":\"ccorp_scc\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"统一社会信用代码[ccorp_scc]\",\"value\":\"2826\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2827\",\"title\":null,\"cnTitle\":\"海关十位代码\",\"enTitle\":\"ccorp_customs_code\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"海关十位代码[ccorp_customs_code]\",\"value\":\"2827\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2828\",\"title\":null,\"cnTitle\":\"检验检疫编码\",\"enTitle\":\"ccorp_ciq_code\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"检验检疫编码[ccorp_ciq_code]\",\"value\":\"2828\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2829\",\"title\":null,\"cnTitle\":\"公司法人\",\"enTitle\":\"ccorp_lperson\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"公司法人[ccorp_lperson]\",\"value\":\"2829\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2830\",\"title\":null,\"cnTitle\":\"公司电话\",\"enTitle\":\"ccorp_tel\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"公司电话[ccorp_tel]\",\"value\":\"2830\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2831\",\"title\":null,\"cnTitle\":\"公司传真\",\"enTitle\":\"ccorp_fax\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"公司传真[ccorp_fax]\",\"value\":\"2831\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2832\",\"title\":null,\"cnTitle\":\"公司网址\",\"enTitle\":\"ccorp_web\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"公司网址[ccorp_web]\",\"value\":\"2832\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2833\",\"title\":null,\"cnTitle\":\"公司邮箱\",\"enTitle\":\"ccorp_mail\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"公司邮箱[ccorp_mail]\",\"value\":\"2833\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2834\",\"title\":null,\"cnTitle\":\"起运港代码\",\"enTitle\":\"cdepart_port_code\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"refer\",\"parentId\":\"46\",\"label\":\"起运港代码[cdepart_port_code]\",\"value\":\"2834\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2835\",\"title\":null,\"cnTitle\":\"起运港\",\"enTitle\":\"cdepart_port\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"refer\",\"parentId\":\"46\",\"label\":\"起运港[cdepart_port]\",\"value\":\"2835\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2836\",\"title\":null,\"cnTitle\":\"起运国代码\",\"enTitle\":\"cdepart_country_code\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"refer\",\"parentId\":\"46\",\"label\":\"起运国代码[cdepart_country_code]\",\"value\":\"2836\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2837\",\"title\":null,\"cnTitle\":\"起运国\",\"enTitle\":\"cdepart_country\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"refer\",\"parentId\":\"46\",\"label\":\"起运国[cdepart_country]\",\"value\":\"2837\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2838\",\"title\":null,\"cnTitle\":\"主管海关代码\",\"enTitle\":\"ccustom_master_code\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"refer\",\"parentId\":\"46\",\"label\":\"主管海关代码[ccustom_master_code]\",\"value\":\"2838\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2839\",\"title\":null,\"cnTitle\":\"主管海关（申报地海关）\",\"enTitle\":\"ccustom_master\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"refer\",\"parentId\":\"46\",\"label\":\"主管海关（申报地海关）[ccustom_master]\",\"value\":\"2839\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2840\",\"title\":null,\"cnTitle\":\"进出口岸代码\",\"enTitle\":\"cie_port_code\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"refer\",\"parentId\":\"46\",\"label\":\"进出口岸代码[cie_port_code]\",\"value\":\"2840\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2841\",\"title\":null,\"cnTitle\":\"进出口岸\",\"enTitle\":\"cie_port\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"refer\",\"parentId\":\"46\",\"label\":\"进出口岸[cie_port]\",\"value\":\"2841\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2842\",\"title\":null,\"cnTitle\":\"公司LOGO\",\"enTitle\":\"ccorp_logo_link\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"picture\",\"parentId\":\"46\",\"label\":\"公司LOGO[ccorp_logo_link]\",\"value\":\"2842\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2843\",\"title\":null,\"cnTitle\":\"公司签字章\",\"enTitle\":\"ccorp_signature_link\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"picture\",\"parentId\":\"46\",\"label\":\"公司签字章[ccorp_signature_link]\",\"value\":\"2843\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2844\",\"title\":null,\"cnTitle\":\"公司公章\",\"enTitle\":\"ccorp_seal_link\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"picture\",\"parentId\":\"46\",\"label\":\"公司公章[ccorp_seal_link]\",\"value\":\"2844\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2845\",\"title\":null,\"cnTitle\":\"备注\",\"enTitle\":\"cremark\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":false,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"备注[cremark]\",\"value\":\"2845\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2846\",\"title\":null,\"cnTitle\":\"创建时间\",\"enTitle\":\"dmake_time\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":true,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputDateTime\",\"parentId\":\"46\",\"label\":\"创建时间[dmake_time]\",\"value\":\"2846\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2847\",\"title\":null,\"cnTitle\":\"创建人编码\",\"enTitle\":\"cuser_code\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":true,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"创建人编码[cuser_code]\",\"value\":\"2847\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2848\",\"title\":null,\"cnTitle\":\"创建人姓名\",\"enTitle\":\"cuser_name\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":true,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"创建人姓名[cuser_name]\",\"value\":\"2848\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null},{\"key\":\"2849\",\"title\":null,\"cnTitle\":\"时间戳\",\"enTitle\":\"savenum\",\"cdataSource\":\"\",\"dataSourceType\":null,\"cDisplayFormat\":\"\",\"isDisabled\":true,\"isCheck\":false,\"iNumPos\":0,\"type\":\"inputText\",\"parentId\":\"46\",\"label\":\"时间戳[savenum]\",\"value\":\"2849\",\"slotTitle\":null,\"isLeaf\":false,\"icon\":null,\"ruleFlag\":null,\"scopedSlots\":null,\"children\":null}]},\"searchFormID\":\"\",\"custom\":true,\"print\":true,\"export\":true,\"refresh\":true,\"baseTableItems\":[{\"fieldID\":52649,\"fieldName\":\"id\",\"defaultLabel\":\"主键\",\"label\":\"主键\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":98461,\"fieldName\":\"iis_del\",\"defaultLabel\":\"删除标识\",\"label\":\"删除标识\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":88543,\"fieldName\":\"ccorp_code\",\"defaultLabel\":\"公司代码\",\"label\":\"公司代码\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":99838,\"fieldName\":\"ccorp_cnname\",\"defaultLabel\":\"公司中文名称\",\"label\":\"公司中文名称\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":62962,\"fieldName\":\"ccorp_enname\",\"defaultLabel\":\"公司英文名称\",\"label\":\"公司英文名称\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":59513,\"fieldName\":\"ccorp_cnadrr\",\"defaultLabel\":\"公司中文地址\",\"label\":\"公司中文地址\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":96026,\"fieldName\":\"ccorp_enadrr\",\"defaultLabel\":\"公司英文地址\",\"label\":\"公司英文地址\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":95223,\"fieldName\":\"ccorp_postcode\",\"defaultLabel\":\"公司邮编\",\"label\":\"公司邮编\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":36766,\"fieldName\":\"ccorp_scc\",\"defaultLabel\":\"统一社会信用代码\",\"label\":\"统一社会信用代码\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":75205,\"fieldName\":\"ccorp_customs_code\",\"defaultLabel\":\"海关十位代码\",\"label\":\"海关十位代码\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":41179,\"fieldName\":\"ccorp_ciq_code\",\"defaultLabel\":\"检验检疫编码\",\"label\":\"检验检疫编码\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":59951,\"fieldName\":\"ccorp_lperson\",\"defaultLabel\":\"公司法人\",\"label\":\"公司法人\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":92453,\"fieldName\":\"ccorp_tel\",\"defaultLabel\":\"公司电话\",\"label\":\"公司电话\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":77762,\"fieldName\":\"ccorp_fax\",\"defaultLabel\":\"公司传真\",\"label\":\"公司传真\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":41090,\"fieldName\":\"ccorp_web\",\"defaultLabel\":\"公司网址\",\"label\":\"公司网址\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":113158,\"fieldName\":\"ccorp_mail\",\"defaultLabel\":\"公司邮箱\",\"label\":\"公司邮箱\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":107439,\"fieldName\":\"cdepart_port_code\",\"defaultLabel\":\"起运港代码\",\"label\":\"起运港代码\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"refer\",\"groupName\":\"\"},{\"fieldID\":82416,\"fieldName\":\"cdepart_port\",\"defaultLabel\":\"起运港\",\"label\":\"起运港\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"refer\",\"groupName\":\"\"},{\"fieldID\":107050,\"fieldName\":\"cdepart_country_code\",\"defaultLabel\":\"起运国代码\",\"label\":\"起运国代码\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"refer\",\"groupName\":\"\"},{\"fieldID\":71012,\"fieldName\":\"cdepart_country\",\"defaultLabel\":\"起运国\",\"label\":\"起运国\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"refer\",\"groupName\":\"\"},{\"fieldID\":23223,\"fieldName\":\"ccustom_master_code\",\"defaultLabel\":\"主管海关代码\",\"label\":\"主管海关代码\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"refer\",\"groupName\":\"\"},{\"fieldID\":38857,\"fieldName\":\"ccustom_master\",\"defaultLabel\":\"主管海关（申报地海关）\",\"label\":\"主管海关（申报地海关）\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"refer\",\"groupName\":\"\"},{\"fieldID\":98451,\"fieldName\":\"cie_port_code\",\"defaultLabel\":\"进出口岸代码\",\"label\":\"进出口岸代码\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"refer\",\"groupName\":\"\"},{\"fieldID\":106530,\"fieldName\":\"cie_port\",\"defaultLabel\":\"进出口岸\",\"label\":\"进出口岸\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"refer\",\"groupName\":\"\"},{\"fieldID\":65421,\"fieldName\":\"ccorp_logo_link\",\"defaultLabel\":\"公司LOGO\",\"label\":\"公司LOGO\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"picture\",\"groupName\":\"\"},{\"fieldID\":47870,\"fieldName\":\"ccorp_signature_link\",\"defaultLabel\":\"公司签字章\",\"label\":\"公司签字章\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"picture\",\"groupName\":\"\"},{\"fieldID\":24320,\"fieldName\":\"ccorp_seal_link\",\"defaultLabel\":\"公司公章\",\"label\":\"公司公章\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"picture\",\"groupName\":\"\"},{\"fieldID\":81290,\"fieldName\":\"cremark\",\"defaultLabel\":\"备注\",\"label\":\"备注\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":67808,\"fieldName\":\"dmake_time\",\"defaultLabel\":\"创建时间\",\"label\":\"创建时间\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputDateTime\",\"groupName\":\"\"},{\"fieldID\":45611,\"fieldName\":\"cuser_code\",\"defaultLabel\":\"创建人编码\",\"label\":\"创建人编码\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":49914,\"fieldName\":\"cuser_name\",\"defaultLabel\":\"创建人姓名\",\"label\":\"创建人姓名\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"},{\"fieldID\":74845,\"fieldName\":\"savenum\",\"defaultLabel\":\"时间戳\",\"label\":\"时间戳\",\"width\":\"150\",\"sortable\":false,\"show\":true,\"align\":\"left\",\"fixed\":false,\"formatS\":\"\",\"inputType\":\"inputText\",\"groupName\":\"\"}],\"pagination\":{\"currentPage\":1,\"pageSizes\":[10,20,30,50,80,100,200,500],\"pageSize\":10,\"totalResult\":0},\"tableData\":[],\"tableData2\":[{\"id\":1,\"name\":\"Test1\",\"nickname\":\"T1\",\"sex\":\"1\",\"age\":29,\"address\":\"Shenzhen\"},{\"id\":2,\"name\":\"Test2\",\"nickname\":\"T2\",\"sex\":\"1\",\"age\":30,\"address\":\"Shenzhen\"},{\"id\":3,\"name\":\"Test3\",\"nickname\":\"T3\",\"sex\":\"1\",\"age\":31,\"address\":\"Shenzhen\"},{\"id\":4,\"name\":\"Test4\",\"nickname\":\"T4\",\"sex\":\"1\",\"age\":32,\"address\":\"Shenzhen\"},{\"id\":5,\"name\":\"Test5\",\"nickname\":\"T5\",\"sex\":\"1\",\"age\":33,\"address\":\"Shenzhen\"},{\"id\":6,\"name\":\"Test6\",\"nickname\":\"T6\",\"sex\":\"1\",\"age\":34,\"address\":\"Shenzhen\"},{\"id\":7,\"name\":\"Test7\",\"nickname\":\"T7\",\"sex\":\"1\",\"age\":35,\"address\":\"Shenzhen\"},{\"id\":8,\"name\":\"Test8\",\"nickname\":\"T8\",\"sex\":\"1\",\"age\":36,\"address\":\"Shenzhen\"},{\"id\":9,\"name\":\"Test9\",\"nickname\":\"T9\",\"sex\":\"1\",\"age\":37,\"address\":\"Shenzhen\"},{\"id\":10,\"name\":\"Test10\",\"nickname\":\"T10\",\"sex\":\"1\",\"age\":38,\"address\":\"Shenzhen\"},{\"id\":11,\"name\":\"Test11\",\"nickname\":\"T11\",\"sex\":\"1\",\"age\":39,\"address\":\"Shenzhen\"},{\"id\":12,\"name\":\"Test12\",\"nickname\":\"T12\",\"sex\":\"1\",\"age\":40,\"address\":\"Shenzhen\"},{\"id\":13,\"name\":\"Test13\",\"nickname\":\"T13\",\"sex\":\"1\",\"age\":41,\"address\":\"Shenzhen\"},{\"id\":14,\"name\":\"Test14\",\"nickname\":\"T14\",\"sex\":\"1\",\"age\":42,\"address\":\"Shenzhen\"},{\"id\":15,\"name\":\"Test15\",\"nickname\":\"T15\",\"sex\":\"1\",\"age\":43,\"address\":\"Shenzhen\"},{\"id\":16,\"name\":\"Test16\",\"nickname\":\"T16\",\"sex\":\"1\",\"age\":44,\"address\":\"Shenzhen\"},{\"id\":17,\"name\":\"Test17\",\"nickname\":\"T17\",\"sex\":\"1\",\"age\":45,\"address\":\"Shenzhen\"},{\"id\":18,\"name\":\"Test18\",\"nickname\":\"T18\",\"sex\":\"1\",\"age\":46,\"address\":\"Shenzhen\"},{\"id\":19,\"name\":\"Test19\",\"nickname\":\"T19\",\"sex\":\"1\",\"age\":47,\"address\":\"Shenzhen\"},{\"id\":20,\"name\":\"Test20\",\"nickname\":\"T20\",\"sex\":\"1\",\"age\":48,\"address\":\"Shenzhen\"},{\"id\":21,\"name\":\"Test21\",\"nickname\":\"T21\",\"sex\":\"1\",\"age\":49,\"address\":\"Shenzhen\"},{\"id\":22,\"name\":\"Test22\",\"nickname\":\"T22\",\"sex\":\"1\",\"age\":50,\"address\":\"Shenzhen\"},{\"id\":23,\"name\":\"Test23\",\"nickname\":\"T23\",\"sex\":\"1\",\"age\":51,\"address\":\"Shenzhen\"},{\"id\":24,\"name\":\"Test24\",\"nickname\":\"T24\",\"sex\":\"1\",\"age\":52,\"address\":\"Shenzhen\"},{\"id\":25,\"name\":\"Test25\",\"nickname\":\"T25\",\"sex\":\"1\",\"age\":53,\"address\":\"Shenzhen\"},{\"id\":26,\"name\":\"Test26\",\"nickname\":\"T26\",\"sex\":\"1\",\"age\":54,\"address\":\"Shenzhen\"},{\"id\":27,\"name\":\"Test27\",\"nickname\":\"T27\",\"sex\":\"1\",\"age\":55,\"address\":\"Shenzhen\"},{\"id\":28,\"name\":\"Test28\",\"nickname\":\"T28\",\"sex\":\"1\",\"age\":56,\"address\":\"Shenzhen\"},{\"id\":29,\"name\":\"Test29\",\"nickname\":\"T29\",\"sex\":\"1\",\"age\":57,\"address\":\"Shenzhen\"},{\"id\":30,\"name\":\"Test30\",\"nickname\":\"T30\",\"sex\":\"1\",\"age\":58,\"address\":\"Shenzhen\"},{\"id\":31,\"name\":\"Test31\",\"nickname\":\"T31\",\"sex\":\"1\",\"age\":59,\"address\":\"Shenzhen\"},{\"id\":32,\"name\":\"Test32\",\"nickname\":\"T32\",\"sex\":\"1\",\"age\":60,\"address\":\"Shenzhen\"},{\"id\":33,\"name\":\"Test33\",\"nickname\":\"T33\",\"sex\":\"1\",\"age\":61,\"address\":\"Shenzhen\"},{\"id\":34,\"name\":\"Test34\",\"nickname\":\"T34\",\"sex\":\"1\",\"age\":62,\"address\":\"Shenzhen\"},{\"id\":35,\"name\":\"Test35\",\"nickname\":\"T35\",\"sex\":\"1\",\"age\":63,\"address\":\"Shenzhen\"},{\"id\":36,\"name\":\"Test36\",\"nickname\":\"T36\",\"sex\":\"1\",\"age\":64,\"address\":\"Shenzhen\"},{\"id\":37,\"name\":\"Test37\",\"nickname\":\"T37\",\"sex\":\"1\",\"age\":65,\"address\":\"Shenzhen\"},{\"id\":38,\"name\":\"Test38\",\"nickname\":\"T38\",\"sex\":\"1\",\"age\":66,\"address\":\"Shenzhen\"},{\"id\":39,\"name\":\"Test39\",\"nickname\":\"T39\",\"sex\":\"1\",\"age\":67,\"address\":\"Shenzhen\"},{\"id\":40,\"name\":\"Test40\",\"nickname\":\"T40\",\"sex\":\"1\",\"age\":68,\"address\":\"Shenzhen\"},{\"id\":41,\"name\":\"Test41\",\"nickname\":\"T41\",\"sex\":\"1\",\"age\":69,\"address\":\"Shenzhen\"},{\"id\":42,\"name\":\"Test42\",\"nickname\":\"T42\",\"sex\":\"1\",\"age\":70,\"address\":\"Shenzhen\"},{\"id\":43,\"name\":\"Test43\",\"nickname\":\"T43\",\"sex\":\"1\",\"age\":71,\"address\":\"Shenzhen\"},{\"id\":44,\"name\":\"Test44\",\"nickname\":\"T44\",\"sex\":\"1\",\"age\":72,\"address\":\"Shenzhen\"},{\"id\":45,\"name\":\"Test45\",\"nickname\":\"T45\",\"sex\":\"1\",\"age\":73,\"address\":\"Shenzhen\"},{\"id\":46,\"name\":\"Test46\",\"nickname\":\"T46\",\"sex\":\"1\",\"age\":74,\"address\":\"Shenzhen\"},{\"id\":47,\"name\":\"Test47\",\"nickname\":\"T47\",\"sex\":\"1\",\"age\":75,\"address\":\"Shenzhen\"},{\"id\":48,\"name\":\"Test48\",\"nickname\":\"T48\",\"sex\":\"1\",\"age\":76,\"address\":\"Shenzhen\"},{\"id\":49,\"name\":\"Test49\",\"nickname\":\"T49\",\"sex\":\"1\",\"age\":77,\"address\":\"Shenzhen\"},{\"id\":50,\"name\":\"Test50\",\"nickname\":\"T50\",\"sex\":\"1\",\"age\":78,\"address\":\"Shenzhen\"},{\"id\":51,\"name\":\"Test51\",\"nickname\":\"T51\",\"sex\":\"1\",\"age\":79,\"address\":\"Shenzhen\"},{\"id\":52,\"name\":\"Test52\",\"nickname\":\"T52\",\"sex\":\"1\",\"age\":80,\"address\":\"Shenzhen\"},{\"id\":53,\"name\":\"Test53\",\"nickname\":\"T53\",\"sex\":\"1\",\"age\":81,\"address\":\"Shenzhen\"},{\"id\":54,\"name\":\"Test54\",\"nickname\":\"T54\",\"sex\":\"1\",\"age\":82,\"address\":\"Shenzhen\"},{\"id\":55,\"name\":\"Test55\",\"nickname\":\"T55\",\"sex\":\"1\",\"age\":83,\"address\":\"Shenzhen\"},{\"id\":56,\"name\":\"Test56\",\"nickname\":\"T56\",\"sex\":\"1\",\"age\":84,\"address\":\"Shenzhen\"},{\"id\":57,\"name\":\"Test57\",\"nickname\":\"T57\",\"sex\":\"1\",\"age\":85,\"address\":\"Shenzhen\"},{\"id\":58,\"name\":\"Test58\",\"nickname\":\"T58\",\"sex\":\"1\",\"age\":86,\"address\":\"Shenzhen\"},{\"id\":59,\"name\":\"Test59\",\"nickname\":\"T59\",\"sex\":\"1\",\"age\":87,\"address\":\"Shenzhen\"},{\"id\":60,\"name\":\"Test60\",\"nickname\":\"T60\",\"sex\":\"1\",\"age\":88,\"address\":\"Shenzhen\"},{\"id\":61,\"name\":\"Test61\",\"nickname\":\"T61\",\"sex\":\"1\",\"age\":89,\"address\":\"Shenzhen\"},{\"id\":62,\"name\":\"Test62\",\"nickname\":\"T62\",\"sex\":\"1\",\"age\":90,\"address\":\"Shenzhen\"},{\"id\":63,\"name\":\"Test63\",\"nickname\":\"T63\",\"sex\":\"1\",\"age\":91,\"address\":\"Shenzhen\"},{\"id\":64,\"name\":\"Test64\",\"nickname\":\"T64\",\"sex\":\"1\",\"age\":92,\"address\":\"Shenzhen\"},{\"id\":65,\"name\":\"Test65\",\"nickname\":\"T65\",\"sex\":\"1\",\"age\":93,\"address\":\"Shenzhen\"},{\"id\":66,\"name\":\"Test66\",\"nickname\":\"T66\",\"sex\":\"1\",\"age\":94,\"address\":\"Shenzhen\"},{\"id\":67,\"name\":\"Test67\",\"nickname\":\"T67\",\"sex\":\"1\",\"age\":95,\"address\":\"Shenzhen\"},{\"id\":68,\"name\":\"Test68\",\"nickname\":\"T68\",\"sex\":\"1\",\"age\":96,\"address\":\"Shenzhen\"},{\"id\":69,\"name\":\"Test69\",\"nickname\":\"T69\",\"sex\":\"1\",\"age\":97,\"address\":\"Shenzhen\"},{\"id\":70,\"name\":\"Test70\",\"nickname\":\"T70\",\"sex\":\"1\",\"age\":98,\"address\":\"Shenzhen\"},{\"id\":71,\"name\":\"Test71\",\"nickname\":\"T71\",\"sex\":\"1\",\"age\":99,\"address\":\"Shenzhen\"},{\"id\":72,\"name\":\"Test72\",\"nickname\":\"T72\",\"sex\":\"1\",\"age\":100,\"address\":\"Shenzhen\"},{\"id\":73,\"name\":\"Test73\",\"nickname\":\"T73\",\"sex\":\"1\",\"age\":101,\"address\":\"Shenzhen\"},{\"id\":74,\"name\":\"Test74\",\"nickname\":\"T74\",\"sex\":\"1\",\"age\":102,\"address\":\"Shenzhen\"},{\"id\":75,\"name\":\"Test75\",\"nickname\":\"T75\",\"sex\":\"1\",\"age\":103,\"address\":\"Shenzhen\"},{\"id\":76,\"name\":\"Test76\",\"nickname\":\"T76\",\"sex\":\"1\",\"age\":104,\"address\":\"Shenzhen\"},{\"id\":77,\"name\":\"Test77\",\"nickname\":\"T77\",\"sex\":\"1\",\"age\":105,\"address\":\"Shenzhen\"},{\"id\":78,\"name\":\"Test78\",\"nickname\":\"T78\",\"sex\":\"1\",\"age\":106,\"address\":\"Shenzhen\"},{\"id\":79,\"name\":\"Test79\",\"nickname\":\"T79\",\"sex\":\"1\",\"age\":107,\"address\":\"Shenzhen\"},{\"id\":80,\"name\":\"Test80\",\"nickname\":\"T80\",\"sex\":\"1\",\"age\":108,\"address\":\"Shenzhen\"},{\"id\":81,\"name\":\"Test81\",\"nickname\":\"T81\",\"sex\":\"1\",\"age\":109,\"address\":\"Shenzhen\"},{\"id\":82,\"name\":\"Test82\",\"nickname\":\"T82\",\"sex\":\"1\",\"age\":110,\"address\":\"Shenzhen\"},{\"id\":83,\"name\":\"Test83\",\"nickname\":\"T83\",\"sex\":\"1\",\"age\":111,\"address\":\"Shenzhen\"},{\"id\":84,\"name\":\"Test84\",\"nickname\":\"T84\",\"sex\":\"1\",\"age\":112,\"address\":\"Shenzhen\"},{\"id\":85,\"name\":\"Test85\",\"nickname\":\"T85\",\"sex\":\"1\",\"age\":113,\"address\":\"Shenzhen\"},{\"id\":86,\"name\":\"Test86\",\"nickname\":\"T86\",\"sex\":\"1\",\"age\":114,\"address\":\"Shenzhen\"},{\"id\":87,\"name\":\"Test87\",\"nickname\":\"T87\",\"sex\":\"1\",\"age\":115,\"address\":\"Shenzhen\"},{\"id\":88,\"name\":\"Test88\",\"nickname\":\"T88\",\"sex\":\"1\",\"age\":116,\"address\":\"Shenzhen\"},{\"id\":89,\"name\":\"Test89\",\"nickname\":\"T89\",\"sex\":\"1\",\"age\":117,\"address\":\"Shenzhen\"},{\"id\":90,\"name\":\"Test90\",\"nickname\":\"T90\",\"sex\":\"1\",\"age\":118,\"address\":\"Shenzhen\"},{\"id\":91,\"name\":\"Test91\",\"nickname\":\"T91\",\"sex\":\"1\",\"age\":119,\"address\":\"Shenzhen\"},{\"id\":92,\"name\":\"Test92\",\"nickname\":\"T92\",\"sex\":\"1\",\"age\":120,\"address\":\"Shenzhen\"},{\"id\":93,\"name\":\"Test93\",\"nickname\":\"T93\",\"sex\":\"1\",\"age\":121,\"address\":\"Shenzhen\"},{\"id\":94,\"name\":\"Test94\",\"nickname\":\"T94\",\"sex\":\"1\",\"age\":122,\"address\":\"Shenzhen\"},{\"id\":95,\"name\":\"Test95\",\"nickname\":\"T95\",\"sex\":\"1\",\"age\":123,\"address\":\"Shenzhen\"},{\"id\":96,\"name\":\"Test96\",\"nickname\":\"T96\",\"sex\":\"1\",\"age\":124,\"address\":\"Shenzhen\"},{\"id\":97,\"name\":\"Test97\",\"nickname\":\"T97\",\"sex\":\"1\",\"age\":125,\"address\":\"Shenzhen\"},{\"id\":98,\"name\":\"Test98\",\"nickname\":\"T98\",\"sex\":\"1\",\"age\":126,\"address\":\"Shenzhen\"},{\"id\":99,\"name\":\"Test99\",\"nickname\":\"T99\",\"sex\":\"1\",\"age\":127,\"address\":\"Shenzhen\"},{\"id\":100,\"name\":\"Test100\",\"nickname\":\"T100\",\"sex\":\"1\",\"age\":128,\"address\":\"Shenzhen\"},{\"id\":101,\"name\":\"Test101\",\"nickname\":\"T101\",\"sex\":\"1\",\"age\":129,\"address\":\"Shenzhen\"},{\"id\":102,\"name\":\"Test102\",\"nickname\":\"T102\",\"sex\":\"1\",\"age\":130,\"address\":\"Shenzhen\"},{\"id\":103,\"name\":\"Test103\",\"nickname\":\"T103\",\"sex\":\"1\",\"age\":131,\"address\":\"Shenzhen\"},{\"id\":104,\"name\":\"Test104\",\"nickname\":\"T104\",\"sex\":\"1\",\"age\":132,\"address\":\"Shenzhen\"},{\"id\":105,\"name\":\"Test105\",\"nickname\":\"T105\",\"sex\":\"1\",\"age\":133,\"address\":\"Shenzhen\"},{\"id\":106,\"name\":\"Test106\",\"nickname\":\"T106\",\"sex\":\"1\",\"age\":134,\"address\":\"Shenzhen\"},{\"id\":107,\"name\":\"Test107\",\"nickname\":\"T107\",\"sex\":\"1\",\"age\":135,\"address\":\"Shenzhen\"},{\"id\":108,\"name\":\"Test108\",\"nickname\":\"T108\",\"sex\":\"1\",\"age\":136,\"address\":\"Shenzhen\"},{\"id\":109,\"name\":\"Test109\",\"nickname\":\"T109\",\"sex\":\"1\",\"age\":137,\"address\":\"Shenzhen\"},{\"id\":110,\"name\":\"Test110\",\"nickname\":\"T110\",\"sex\":\"1\",\"age\":138,\"address\":\"Shenzhen\"},{\"id\":111,\"name\":\"Test111\",\"nickname\":\"T111\",\"sex\":\"1\",\"age\":139,\"address\":\"Shenzhen\"},{\"id\":112,\"name\":\"Test112\",\"nickname\":\"T112\",\"sex\":\"1\",\"age\":140,\"address\":\"Shenzhen\"},{\"id\":113,\"name\":\"Test113\",\"nickname\":\"T113\",\"sex\":\"1\",\"age\":141,\"address\":\"Shenzhen\"},{\"id\":114,\"name\":\"Test114\",\"nickname\":\"T114\",\"sex\":\"1\",\"age\":142,\"address\":\"Shenzhen\"},{\"id\":115,\"name\":\"Test115\",\"nickname\":\"T115\",\"sex\":\"1\",\"age\":143,\"address\":\"Shenzhen\"},{\"id\":116,\"name\":\"Test116\",\"nickname\":\"T116\",\"sex\":\"1\",\"age\":144,\"address\":\"Shenzhen\"},{\"id\":117,\"name\":\"Test117\",\"nickname\":\"T117\",\"sex\":\"1\",\"age\":145,\"address\":\"Shenzhen\"},{\"id\":118,\"name\":\"Test118\",\"nickname\":\"T118\",\"sex\":\"1\",\"age\":146,\"address\":\"Shenzhen\"},{\"id\":119,\"name\":\"Test119\",\"nickname\":\"T119\",\"sex\":\"1\",\"age\":147,\"address\":\"Shenzhen\"},{\"id\":120,\"name\":\"Test120\",\"nickname\":\"T120\",\"sex\":\"1\",\"age\":148,\"address\":\"Shenzhen\"},{\"id\":121,\"name\":\"Test121\",\"nickname\":\"T121\",\"sex\":\"1\",\"age\":149,\"address\":\"Shenzhen\"},{\"id\":122,\"name\":\"Test122\",\"nickname\":\"T122\",\"sex\":\"1\",\"age\":150,\"address\":\"Shenzhen\"},{\"id\":123,\"name\":\"Test123\",\"nickname\":\"T123\",\"sex\":\"1\",\"age\":151,\"address\":\"Shenzhen\"},{\"id\":124,\"name\":\"Test124\",\"nickname\":\"T124\",\"sex\":\"1\",\"age\":152,\"address\":\"Shenzhen\"},{\"id\":125,\"name\":\"Test125\",\"nickname\":\"T125\",\"sex\":\"1\",\"age\":153,\"address\":\"Shenzhen\"},{\"id\":126,\"name\":\"Test126\",\"nickname\":\"T126\",\"sex\":\"1\",\"age\":154,\"address\":\"Shenzhen\"},{\"id\":127,\"name\":\"Test127\",\"nickname\":\"T127\",\"sex\":\"1\",\"age\":155,\"address\":\"Shenzhen\"},{\"id\":128,\"name\":\"Test128\",\"nickname\":\"T128\",\"sex\":\"1\",\"age\":156,\"address\":\"Shenzhen\"},{\"id\":129,\"name\":\"Test129\",\"nickname\":\"T129\",\"sex\":\"1\",\"age\":157,\"address\":\"Shenzhen\"},{\"id\":130,\"name\":\"Test130\",\"nickname\":\"T130\",\"sex\":\"1\",\"age\":158,\"address\":\"Shenzhen\"},{\"id\":131,\"name\":\"Test131\",\"nickname\":\"T131\",\"sex\":\"1\",\"age\":159,\"address\":\"Shenzhen\"},{\"id\":132,\"name\":\"Test132\",\"nickname\":\"T132\",\"sex\":\"1\",\"age\":160,\"address\":\"Shenzhen\"},{\"id\":133,\"name\":\"Test133\",\"nickname\":\"T133\",\"sex\":\"1\",\"age\":161,\"address\":\"Shenzhen\"},{\"id\":134,\"name\":\"Test134\",\"nickname\":\"T134\",\"sex\":\"1\",\"age\":162,\"address\":\"Shenzhen\"},{\"id\":135,\"name\":\"Test135\",\"nickname\":\"T135\",\"sex\":\"1\",\"age\":163,\"address\":\"Shenzhen\"},{\"id\":136,\"name\":\"Test136\",\"nickname\":\"T136\",\"sex\":\"1\",\"age\":164,\"address\":\"Shenzhen\"},{\"id\":137,\"name\":\"Test137\",\"nickname\":\"T137\",\"sex\":\"1\",\"age\":165,\"address\":\"Shenzhen\"},{\"id\":138,\"name\":\"Test138\",\"nickname\":\"T138\",\"sex\":\"1\",\"age\":166,\"address\":\"Shenzhen\"},{\"id\":139,\"name\":\"Test139\",\"nickname\":\"T139\",\"sex\":\"1\",\"age\":167,\"address\":\"Shenzhen\"},{\"id\":140,\"name\":\"Test140\",\"nickname\":\"T140\",\"sex\":\"1\",\"age\":168,\"address\":\"Shenzhen\"},{\"id\":141,\"name\":\"Test141\",\"nickname\":\"T141\",\"sex\":\"1\",\"age\":169,\"address\":\"Shenzhen\"},{\"id\":142,\"name\":\"Test142\",\"nickname\":\"T142\",\"sex\":\"1\",\"age\":170,\"address\":\"Shenzhen\"},{\"id\":143,\"name\":\"Test143\",\"nickname\":\"T143\",\"sex\":\"1\",\"age\":171,\"address\":\"Shenzhen\"},{\"id\":144,\"name\":\"Test144\",\"nickname\":\"T144\",\"sex\":\"1\",\"age\":172,\"address\":\"Shenzhen\"},{\"id\":145,\"name\":\"Test145\",\"nickname\":\"T145\",\"sex\":\"1\",\"age\":173,\"address\":\"Shenzhen\"},{\"id\":146,\"name\":\"Test146\",\"nickname\":\"T146\",\"sex\":\"1\",\"age\":174,\"address\":\"Shenzhen\"},{\"id\":147,\"name\":\"Test147\",\"nickname\":\"T147\",\"sex\":\"1\",\"age\":175,\"address\":\"Shenzhen\"},{\"id\":148,\"name\":\"Test148\",\"nickname\":\"T148\",\"sex\":\"1\",\"age\":176,\"address\":\"Shenzhen\"},{\"id\":149,\"name\":\"Test149\",\"nickname\":\"T149\",\"sex\":\"1\",\"age\":177,\"address\":\"Shenzhen\"},{\"id\":150,\"name\":\"Test150\",\"nickname\":\"T150\",\"sex\":\"1\",\"age\":178,\"address\":\"Shenzhen\"},{\"id\":151,\"name\":\"Test151\",\"nickname\":\"T151\",\"sex\":\"1\",\"age\":179,\"address\":\"Shenzhen\"},{\"id\":152,\"name\":\"Test152\",\"nickname\":\"T152\",\"sex\":\"1\",\"age\":180,\"address\":\"Shenzhen\"},{\"id\":153,\"name\":\"Test153\",\"nickname\":\"T153\",\"sex\":\"1\",\"age\":181,\"address\":\"Shenzhen\"},{\"id\":154,\"name\":\"Test154\",\"nickname\":\"T154\",\"sex\":\"1\",\"age\":182,\"address\":\"Shenzhen\"},{\"id\":155,\"name\":\"Test155\",\"nickname\":\"T155\",\"sex\":\"1\",\"age\":183,\"address\":\"Shenzhen\"},{\"id\":156,\"name\":\"Test156\",\"nickname\":\"T156\",\"sex\":\"1\",\"age\":184,\"address\":\"Shenzhen\"},{\"id\":157,\"name\":\"Test157\",\"nickname\":\"T157\",\"sex\":\"1\",\"age\":185,\"address\":\"Shenzhen\"},{\"id\":158,\"name\":\"Test158\",\"nickname\":\"T158\",\"sex\":\"1\",\"age\":186,\"address\":\"Shenzhen\"},{\"id\":159,\"name\":\"Test159\",\"nickname\":\"T159\",\"sex\":\"1\",\"age\":187,\"address\":\"Shenzhen\"},{\"id\":160,\"name\":\"Test160\",\"nickname\":\"T160\",\"sex\":\"1\",\"age\":188,\"address\":\"Shenzhen\"},{\"id\":161,\"name\":\"Test161\",\"nickname\":\"T161\",\"sex\":\"1\",\"age\":189,\"address\":\"Shenzhen\"},{\"id\":162,\"name\":\"Test162\",\"nickname\":\"T162\",\"sex\":\"1\",\"age\":190,\"address\":\"Shenzhen\"},{\"id\":163,\"name\":\"Test163\",\"nickname\":\"T163\",\"sex\":\"1\",\"age\":191,\"address\":\"Shenzhen\"},{\"id\":164,\"name\":\"Test164\",\"nickname\":\"T164\",\"sex\":\"1\",\"age\":192,\"address\":\"Shenzhen\"},{\"id\":165,\"name\":\"Test165\",\"nickname\":\"T165\",\"sex\":\"1\",\"age\":193,\"address\":\"Shenzhen\"},{\"id\":166,\"name\":\"Test166\",\"nickname\":\"T166\",\"sex\":\"1\",\"age\":194,\"address\":\"Shenzhen\"},{\"id\":167,\"name\":\"Test167\",\"nickname\":\"T167\",\"sex\":\"1\",\"age\":195,\"address\":\"Shenzhen\"},{\"id\":168,\"name\":\"Test168\",\"nickname\":\"T168\",\"sex\":\"1\",\"age\":196,\"address\":\"Shenzhen\"},{\"id\":169,\"name\":\"Test169\",\"nickname\":\"T169\",\"sex\":\"1\",\"age\":197,\"address\":\"Shenzhen\"},{\"id\":170,\"name\":\"Test170\",\"nickname\":\"T170\",\"sex\":\"1\",\"age\":198,\"address\":\"Shenzhen\"},{\"id\":171,\"name\":\"Test171\",\"nickname\":\"T171\",\"sex\":\"1\",\"age\":199,\"address\":\"Shenzhen\"},{\"id\":172,\"name\":\"Test172\",\"nickname\":\"T172\",\"sex\":\"1\",\"age\":200,\"address\":\"Shenzhen\"},{\"id\":173,\"name\":\"Test173\",\"nickname\":\"T173\",\"sex\":\"1\",\"age\":201,\"address\":\"Shenzhen\"},{\"id\":174,\"name\":\"Test174\",\"nickname\":\"T174\",\"sex\":\"1\",\"age\":202,\"address\":\"Shenzhen\"},{\"id\":175,\"name\":\"Test175\",\"nickname\":\"T175\",\"sex\":\"1\",\"age\":203,\"address\":\"Shenzhen\"},{\"id\":176,\"name\":\"Test176\",\"nickname\":\"T176\",\"sex\":\"1\",\"age\":204,\"address\":\"Shenzhen\"},{\"id\":177,\"name\":\"Test177\",\"nickname\":\"T177\",\"sex\":\"1\",\"age\":205,\"address\":\"Shenzhen\"},{\"id\":178,\"name\":\"Test178\",\"nickname\":\"T178\",\"sex\":\"1\",\"age\":206,\"address\":\"Shenzhen\"},{\"id\":179,\"name\":\"Test179\",\"nickname\":\"T179\",\"sex\":\"1\",\"age\":207,\"address\":\"Shenzhen\"},{\"id\":180,\"name\":\"Test180\",\"nickname\":\"T180\",\"sex\":\"1\",\"age\":208,\"address\":\"Shenzhen\"},{\"id\":181,\"name\":\"Test181\",\"nickname\":\"T181\",\"sex\":\"1\",\"age\":209,\"address\":\"Shenzhen\"},{\"id\":182,\"name\":\"Test182\",\"nickname\":\"T182\",\"sex\":\"1\",\"age\":210,\"address\":\"Shenzhen\"},{\"id\":183,\"name\":\"Test183\",\"nickname\":\"T183\",\"sex\":\"1\",\"age\":211,\"address\":\"Shenzhen\"},{\"id\":184,\"name\":\"Test184\",\"nickname\":\"T184\",\"sex\":\"1\",\"age\":212,\"address\":\"Shenzhen\"},{\"id\":185,\"name\":\"Test185\",\"nickname\":\"T185\",\"sex\":\"1\",\"age\":213,\"address\":\"Shenzhen\"},{\"id\":186,\"name\":\"Test186\",\"nickname\":\"T186\",\"sex\":\"1\",\"age\":214,\"address\":\"Shenzhen\"},{\"id\":187,\"name\":\"Test187\",\"nickname\":\"T187\",\"sex\":\"1\",\"age\":215,\"address\":\"Shenzhen\"},{\"id\":188,\"name\":\"Test188\",\"nickname\":\"T188\",\"sex\":\"1\",\"age\":216,\"address\":\"Shenzhen\"},{\"id\":189,\"name\":\"Test189\",\"nickname\":\"T189\",\"sex\":\"1\",\"age\":217,\"address\":\"Shenzhen\"},{\"id\":190,\"name\":\"Test190\",\"nickname\":\"T190\",\"sex\":\"1\",\"age\":218,\"address\":\"Shenzhen\"},{\"id\":191,\"name\":\"Test191\",\"nickname\":\"T191\",\"sex\":\"1\",\"age\":219,\"address\":\"Shenzhen\"},{\"id\":192,\"name\":\"Test192\",\"nickname\":\"T192\",\"sex\":\"1\",\"age\":220,\"address\":\"Shenzhen\"},{\"id\":193,\"name\":\"Test193\",\"nickname\":\"T193\",\"sex\":\"1\",\"age\":221,\"address\":\"Shenzhen\"},{\"id\":194,\"name\":\"Test194\",\"nickname\":\"T194\",\"sex\":\"1\",\"age\":222,\"address\":\"Shenzhen\"},{\"id\":195,\"name\":\"Test195\",\"nickname\":\"T195\",\"sex\":\"1\",\"age\":223,\"address\":\"Shenzhen\"},{\"id\":196,\"name\":\"Test196\",\"nickname\":\"T196\",\"sex\":\"1\",\"age\":224,\"address\":\"Shenzhen\"},{\"id\":197,\"name\":\"Test197\",\"nickname\":\"T197\",\"sex\":\"1\",\"age\":225,\"address\":\"Shenzhen\"},{\"id\":198,\"name\":\"Test198\",\"nickname\":\"T198\",\"sex\":\"1\",\"age\":226,\"address\":\"Shenzhen\"},{\"id\":199,\"name\":\"Test199\",\"nickname\":\"T199\",\"sex\":\"1\",\"age\":227,\"address\":\"Shenzhen\"},{\"id\":200,\"name\":\"Test200\",\"nickname\":\"T200\",\"sex\":\"1\",\"age\":228,\"address\":\"Shenzhen\"},{\"id\":201,\"name\":\"Test201\",\"nickname\":\"T201\",\"sex\":\"1\",\"age\":229,\"address\":\"Shenzhen\"},{\"id\":202,\"name\":\"Test202\",\"nickname\":\"T202\",\"sex\":\"1\",\"age\":230,\"address\":\"Shenzhen\"},{\"id\":203,\"name\":\"Test203\",\"nickname\":\"T203\",\"sex\":\"1\",\"age\":231,\"address\":\"Shenzhen\"},{\"id\":204,\"name\":\"Test204\",\"nickname\":\"T204\",\"sex\":\"1\",\"age\":232,\"address\":\"Shenzhen\"},{\"id\":205,\"name\":\"Test205\",\"nickname\":\"T205\",\"sex\":\"1\",\"age\":233,\"address\":\"Shenzhen\"},{\"id\":206,\"name\":\"Test206\",\"nickname\":\"T206\",\"sex\":\"1\",\"age\":234,\"address\":\"Shenzhen\"},{\"id\":207,\"name\":\"Test207\",\"nickname\":\"T207\",\"sex\":\"1\",\"age\":235,\"address\":\"Shenzhen\"},{\"id\":208,\"name\":\"Test208\",\"nickname\":\"T208\",\"sex\":\"1\",\"age\":236,\"address\":\"Shenzhen\"},{\"id\":209,\"name\":\"Test209\",\"nickname\":\"T209\",\"sex\":\"1\",\"age\":237,\"address\":\"Shenzhen\"},{\"id\":210,\"name\":\"Test210\",\"nickname\":\"T210\",\"sex\":\"1\",\"age\":238,\"address\":\"Shenzhen\"},{\"id\":211,\"name\":\"Test211\",\"nickname\":\"T211\",\"sex\":\"1\",\"age\":239,\"address\":\"Shenzhen\"},{\"id\":212,\"name\":\"Test212\",\"nickname\":\"T212\",\"sex\":\"1\",\"age\":240,\"address\":\"Shenzhen\"},{\"id\":213,\"name\":\"Test213\",\"nickname\":\"T213\",\"sex\":\"1\",\"age\":241,\"address\":\"Shenzhen\"},{\"id\":214,\"name\":\"Test214\",\"nickname\":\"T214\",\"sex\":\"1\",\"age\":242,\"address\":\"Shenzhen\"},{\"id\":215,\"name\":\"Test215\",\"nickname\":\"T215\",\"sex\":\"1\",\"age\":243,\"address\":\"Shenzhen\"},{\"id\":216,\"name\":\"Test216\",\"nickname\":\"T216\",\"sex\":\"1\",\"age\":244,\"address\":\"Shenzhen\"},{\"id\":217,\"name\":\"Test217\",\"nickname\":\"T217\",\"sex\":\"1\",\"age\":245,\"address\":\"Shenzhen\"},{\"id\":218,\"name\":\"Test218\",\"nickname\":\"T218\",\"sex\":\"1\",\"age\":246,\"address\":\"Shenzhen\"},{\"id\":219,\"name\":\"Test219\",\"nickname\":\"T219\",\"sex\":\"1\",\"age\":247,\"address\":\"Shenzhen\"},{\"id\":220,\"name\":\"Test220\",\"nickname\":\"T220\",\"sex\":\"1\",\"age\":248,\"address\":\"Shenzhen\"},{\"id\":221,\"name\":\"Test221\",\"nickname\":\"T221\",\"sex\":\"1\",\"age\":249,\"address\":\"Shenzhen\"},{\"id\":222,\"name\":\"Test222\",\"nickname\":\"T222\",\"sex\":\"1\",\"age\":250,\"address\":\"Shenzhen\"},{\"id\":223,\"name\":\"Test223\",\"nickname\":\"T223\",\"sex\":\"1\",\"age\":251,\"address\":\"Shenzhen\"},{\"id\":224,\"name\":\"Test224\",\"nickname\":\"T224\",\"sex\":\"1\",\"age\":252,\"address\":\"Shenzhen\"},{\"id\":225,\"name\":\"Test225\",\"nickname\":\"T225\",\"sex\":\"1\",\"age\":253,\"address\":\"Shenzhen\"},{\"id\":226,\"name\":\"Test226\",\"nickname\":\"T226\",\"sex\":\"1\",\"age\":254,\"address\":\"Shenzhen\"},{\"id\":227,\"name\":\"Test227\",\"nickname\":\"T227\",\"sex\":\"1\",\"age\":255,\"address\":\"Shenzhen\"},{\"id\":228,\"name\":\"Test228\",\"nickname\":\"T228\",\"sex\":\"1\",\"age\":256,\"address\":\"Shenzhen\"},{\"id\":229,\"name\":\"Test229\",\"nickname\":\"T229\",\"sex\":\"1\",\"age\":257,\"address\":\"Shenzhen\"},{\"id\":230,\"name\":\"Test230\",\"nickname\":\"T230\",\"sex\":\"1\",\"age\":258,\"address\":\"Shenzhen\"},{\"id\":231,\"name\":\"Test231\",\"nickname\":\"T231\",\"sex\":\"1\",\"age\":259,\"address\":\"Shenzhen\"},{\"id\":232,\"name\":\"Test232\",\"nickname\":\"T232\",\"sex\":\"1\",\"age\":260,\"address\":\"Shenzhen\"},{\"id\":233,\"name\":\"Test233\",\"nickname\":\"T233\",\"sex\":\"1\",\"age\":261,\"address\":\"Shenzhen\"},{\"id\":234,\"name\":\"Test234\",\"nickname\":\"T234\",\"sex\":\"1\",\"age\":262,\"address\":\"Shenzhen\"},{\"id\":235,\"name\":\"Test235\",\"nickname\":\"T235\",\"sex\":\"1\",\"age\":263,\"address\":\"Shenzhen\"},{\"id\":236,\"name\":\"Test236\",\"nickname\":\"T236\",\"sex\":\"1\",\"age\":264,\"address\":\"Shenzhen\"},{\"id\":237,\"name\":\"Test237\",\"nickname\":\"T237\",\"sex\":\"1\",\"age\":265,\"address\":\"Shenzhen\"},{\"id\":238,\"name\":\"Test238\",\"nickname\":\"T238\",\"sex\":\"1\",\"age\":266,\"address\":\"Shenzhen\"},{\"id\":239,\"name\":\"Test239\",\"nickname\":\"T239\",\"sex\":\"1\",\"age\":267,\"address\":\"Shenzhen\"},{\"id\":240,\"name\":\"Test240\",\"nickname\":\"T240\",\"sex\":\"1\",\"age\":268,\"address\":\"Shenzhen\"},{\"id\":241,\"name\":\"Test241\",\"nickname\":\"T241\",\"sex\":\"1\",\"age\":269,\"address\":\"Shenzhen\"},{\"id\":242,\"name\":\"Test242\",\"nickname\":\"T242\",\"sex\":\"1\",\"age\":270,\"address\":\"Shenzhen\"},{\"id\":243,\"name\":\"Test243\",\"nickname\":\"T243\",\"sex\":\"1\",\"age\":271,\"address\":\"Shenzhen\"},{\"id\":244,\"name\":\"Test244\",\"nickname\":\"T244\",\"sex\":\"1\",\"age\":272,\"address\":\"Shenzhen\"},{\"id\":245,\"name\":\"Test245\",\"nickname\":\"T245\",\"sex\":\"1\",\"age\":273,\"address\":\"Shenzhen\"},{\"id\":246,\"name\":\"Test246\",\"nickname\":\"T246\",\"sex\":\"1\",\"age\":274,\"address\":\"Shenzhen\"},{\"id\":247,\"name\":\"Test247\",\"nickname\":\"T247\",\"sex\":\"1\",\"age\":275,\"address\":\"Shenzhen\"},{\"id\":248,\"name\":\"Test248\",\"nickname\":\"T248\",\"sex\":\"1\",\"age\":276,\"address\":\"Shenzhen\"},{\"id\":249,\"name\":\"Test249\",\"nickname\":\"T249\",\"sex\":\"1\",\"age\":277,\"address\":\"Shenzhen\"},{\"id\":250,\"name\":\"Test250\",\"nickname\":\"T250\",\"sex\":\"1\",\"age\":278,\"address\":\"Shenzhen\"},{\"id\":251,\"name\":\"Test251\",\"nickname\":\"T251\",\"sex\":\"1\",\"age\":279,\"address\":\"Shenzhen\"},{\"id\":252,\"name\":\"Test252\",\"nickname\":\"T252\",\"sex\":\"1\",\"age\":280,\"address\":\"Shenzhen\"},{\"id\":253,\"name\":\"Test253\",\"nickname\":\"T253\",\"sex\":\"1\",\"age\":281,\"address\":\"Shenzhen\"},{\"id\":254,\"name\":\"Test254\",\"nickname\":\"T254\",\"sex\":\"1\",\"age\":282,\"address\":\"Shenzhen\"},{\"id\":255,\"name\":\"Test255\",\"nickname\":\"T255\",\"sex\":\"1\",\"age\":283,\"address\":\"Shenzhen\"},{\"id\":256,\"name\":\"Test256\",\"nickname\":\"T256\",\"sex\":\"1\",\"age\":284,\"address\":\"Shenzhen\"},{\"id\":257,\"name\":\"Test257\",\"nickname\":\"T257\",\"sex\":\"1\",\"age\":285,\"address\":\"Shenzhen\"},{\"id\":258,\"name\":\"Test258\",\"nickname\":\"T258\",\"sex\":\"1\",\"age\":286,\"address\":\"Shenzhen\"},{\"id\":259,\"name\":\"Test259\",\"nickname\":\"T259\",\"sex\":\"1\",\"age\":287,\"address\":\"Shenzhen\"},{\"id\":260,\"name\":\"Test260\",\"nickname\":\"T260\",\"sex\":\"1\",\"age\":288,\"address\":\"Shenzhen\"},{\"id\":261,\"name\":\"Test261\",\"nickname\":\"T261\",\"sex\":\"1\",\"age\":289,\"address\":\"Shenzhen\"},{\"id\":262,\"name\":\"Test262\",\"nickname\":\"T262\",\"sex\":\"1\",\"age\":290,\"address\":\"Shenzhen\"},{\"id\":263,\"name\":\"Test263\",\"nickname\":\"T263\",\"sex\":\"1\",\"age\":291,\"address\":\"Shenzhen\"},{\"id\":264,\"name\":\"Test264\",\"nickname\":\"T264\",\"sex\":\"1\",\"age\":292,\"address\":\"Shenzhen\"},{\"id\":265,\"name\":\"Test265\",\"nickname\":\"T265\",\"sex\":\"1\",\"age\":293,\"address\":\"Shenzhen\"},{\"id\":266,\"name\":\"Test266\",\"nickname\":\"T266\",\"sex\":\"1\",\"age\":294,\"address\":\"Shenzhen\"},{\"id\":267,\"name\":\"Test267\",\"nickname\":\"T267\",\"sex\":\"1\",\"age\":295,\"address\":\"Shenzhen\"},{\"id\":268,\"name\":\"Test268\",\"nickname\":\"T268\",\"sex\":\"1\",\"age\":296,\"address\":\"Shenzhen\"},{\"id\":269,\"name\":\"Test269\",\"nickname\":\"T269\",\"sex\":\"1\",\"age\":297,\"address\":\"Shenzhen\"},{\"id\":270,\"name\":\"Test270\",\"nickname\":\"T270\",\"sex\":\"1\",\"age\":298,\"address\":\"Shenzhen\"},{\"id\":271,\"name\":\"Test271\",\"nickname\":\"T271\",\"sex\":\"1\",\"age\":299,\"address\":\"Shenzhen\"},{\"id\":272,\"name\":\"Test272\",\"nickname\":\"T272\",\"sex\":\"1\",\"age\":300,\"address\":\"Shenzhen\"},{\"id\":273,\"name\":\"Test273\",\"nickname\":\"T273\",\"sex\":\"1\",\"age\":301,\"address\":\"Shenzhen\"},{\"id\":274,\"name\":\"Test274\",\"nickname\":\"T274\",\"sex\":\"1\",\"age\":302,\"address\":\"Shenzhen\"},{\"id\":275,\"name\":\"Test275\",\"nickname\":\"T275\",\"sex\":\"1\",\"age\":303,\"address\":\"Shenzhen\"},{\"id\":276,\"name\":\"Test276\",\"nickname\":\"T276\",\"sex\":\"1\",\"age\":304,\"address\":\"Shenzhen\"},{\"id\":277,\"name\":\"Test277\",\"nickname\":\"T277\",\"sex\":\"1\",\"age\":305,\"address\":\"Shenzhen\"},{\"id\":278,\"name\":\"Test278\",\"nickname\":\"T278\",\"sex\":\"1\",\"age\":306,\"address\":\"Shenzhen\"},{\"id\":279,\"name\":\"Test279\",\"nickname\":\"T279\",\"sex\":\"1\",\"age\":307,\"address\":\"Shenzhen\"},{\"id\":280,\"name\":\"Test280\",\"nickname\":\"T280\",\"sex\":\"1\",\"age\":308,\"address\":\"Shenzhen\"},{\"id\":281,\"name\":\"Test281\",\"nickname\":\"T281\",\"sex\":\"1\",\"age\":309,\"address\":\"Shenzhen\"},{\"id\":282,\"name\":\"Test282\",\"nickname\":\"T282\",\"sex\":\"1\",\"age\":310,\"address\":\"Shenzhen\"},{\"id\":283,\"name\":\"Test283\",\"nickname\":\"T283\",\"sex\":\"1\",\"age\":311,\"address\":\"Shenzhen\"},{\"id\":284,\"name\":\"Test284\",\"nickname\":\"T284\",\"sex\":\"1\",\"age\":312,\"address\":\"Shenzhen\"},{\"id\":285,\"name\":\"Test285\",\"nickname\":\"T285\",\"sex\":\"1\",\"age\":313,\"address\":\"Shenzhen\"},{\"id\":286,\"name\":\"Test286\",\"nickname\":\"T286\",\"sex\":\"1\",\"age\":314,\"address\":\"Shenzhen\"},{\"id\":287,\"name\":\"Test287\",\"nickname\":\"T287\",\"sex\":\"1\",\"age\":315,\"address\":\"Shenzhen\"},{\"id\":288,\"name\":\"Test288\",\"nickname\":\"T288\",\"sex\":\"1\",\"age\":316,\"address\":\"Shenzhen\"},{\"id\":289,\"name\":\"Test289\",\"nickname\":\"T289\",\"sex\":\"1\",\"age\":317,\"address\":\"Shenzhen\"},{\"id\":290,\"name\":\"Test290\",\"nickname\":\"T290\",\"sex\":\"1\",\"age\":318,\"address\":\"Shenzhen\"},{\"id\":291,\"name\":\"Test291\",\"nickname\":\"T291\",\"sex\":\"1\",\"age\":319,\"address\":\"Shenzhen\"},{\"id\":292,\"name\":\"Test292\",\"nickname\":\"T292\",\"sex\":\"1\",\"age\":320,\"address\":\"Shenzhen\"},{\"id\":293,\"name\":\"Test293\",\"nickname\":\"T293\",\"sex\":\"1\",\"age\":321,\"address\":\"Shenzhen\"},{\"id\":294,\"name\":\"Test294\",\"nickname\":\"T294\",\"sex\":\"1\",\"age\":322,\"address\":\"Shenzhen\"},{\"id\":295,\"name\":\"Test295\",\"nickname\":\"T295\",\"sex\":\"1\",\"age\":323,\"address\":\"Shenzhen\"},{\"id\":296,\"name\":\"Test296\",\"nickname\":\"T296\",\"sex\":\"1\",\"age\":324,\"address\":\"Shenzhen\"},{\"id\":297,\"name\":\"Test297\",\"nickname\":\"T297\",\"sex\":\"1\",\"age\":325,\"address\":\"Shenzhen\"},{\"id\":298,\"name\":\"Test298\",\"nickname\":\"T298\",\"sex\":\"1\",\"age\":326,\"address\":\"Shenzhen\"},{\"id\":299,\"name\":\"Test299\",\"nickname\":\"T299\",\"sex\":\"1\",\"age\":327,\"address\":\"Shenzhen\"},{\"id\":300,\"name\":\"Test300\",\"nickname\":\"T300\",\"sex\":\"1\",\"age\":328,\"address\":\"Shenzhen\"},{\"id\":301,\"name\":\"Test301\",\"nickname\":\"T301\",\"sex\":\"1\",\"age\":329,\"address\":\"Shenzhen\"},{\"id\":302,\"name\":\"Test302\",\"nickname\":\"T302\",\"sex\":\"1\",\"age\":330,\"address\":\"Shenzhen\"},{\"id\":303,\"name\":\"Test303\",\"nickname\":\"T303\",\"sex\":\"1\",\"age\":331,\"address\":\"Shenzhen\"},{\"id\":304,\"name\":\"Test304\",\"nickname\":\"T304\",\"sex\":\"1\",\"age\":332,\"address\":\"Shenzhen\"},{\"id\":305,\"name\":\"Test305\",\"nickname\":\"T305\",\"sex\":\"1\",\"age\":333,\"address\":\"Shenzhen\"},{\"id\":306,\"name\":\"Test306\",\"nickname\":\"T306\",\"sex\":\"1\",\"age\":334,\"address\":\"Shenzhen\"},{\"id\":307,\"name\":\"Test307\",\"nickname\":\"T307\",\"sex\":\"1\",\"age\":335,\"address\":\"Shenzhen\"},{\"id\":308,\"name\":\"Test308\",\"nickname\":\"T308\",\"sex\":\"1\",\"age\":336,\"address\":\"Shenzhen\"},{\"id\":309,\"name\":\"Test309\",\"nickname\":\"T309\",\"sex\":\"1\",\"age\":337,\"address\":\"Shenzhen\"},{\"id\":310,\"name\":\"Test310\",\"nickname\":\"T310\",\"sex\":\"1\",\"age\":338,\"address\":\"Shenzhen\"},{\"id\":311,\"name\":\"Test311\",\"nickname\":\"T311\",\"sex\":\"1\",\"age\":339,\"address\":\"Shenzhen\"},{\"id\":312,\"name\":\"Test312\",\"nickname\":\"T312\",\"sex\":\"1\",\"age\":340,\"address\":\"Shenzhen\"},{\"id\":313,\"name\":\"Test313\",\"nickname\":\"T313\",\"sex\":\"1\",\"age\":341,\"address\":\"Shenzhen\"},{\"id\":314,\"name\":\"Test314\",\"nickname\":\"T314\",\"sex\":\"1\",\"age\":342,\"address\":\"Shenzhen\"},{\"id\":315,\"name\":\"Test315\",\"nickname\":\"T315\",\"sex\":\"1\",\"age\":343,\"address\":\"Shenzhen\"},{\"id\":316,\"name\":\"Test316\",\"nickname\":\"T316\",\"sex\":\"1\",\"age\":344,\"address\":\"Shenzhen\"},{\"id\":317,\"name\":\"Test317\",\"nickname\":\"T317\",\"sex\":\"1\",\"age\":345,\"address\":\"Shenzhen\"},{\"id\":318,\"name\":\"Test318\",\"nickname\":\"T318\",\"sex\":\"1\",\"age\":346,\"address\":\"Shenzhen\"},{\"id\":319,\"name\":\"Test319\",\"nickname\":\"T319\",\"sex\":\"1\",\"age\":347,\"address\":\"Shenzhen\"},{\"id\":320,\"name\":\"Test320\",\"nickname\":\"T320\",\"sex\":\"1\",\"age\":348,\"address\":\"Shenzhen\"},{\"id\":321,\"name\":\"Test321\",\"nickname\":\"T321\",\"sex\":\"1\",\"age\":349,\"address\":\"Shenzhen\"},{\"id\":322,\"name\":\"Test322\",\"nickname\":\"T322\",\"sex\":\"1\",\"age\":350,\"address\":\"Shenzhen\"},{\"id\":323,\"name\":\"Test323\",\"nickname\":\"T323\",\"sex\":\"1\",\"age\":351,\"address\":\"Shenzhen\"},{\"id\":324,\"name\":\"Test324\",\"nickname\":\"T324\",\"sex\":\"1\",\"age\":352,\"address\":\"Shenzhen\"},{\"id\":325,\"name\":\"Test325\",\"nickname\":\"T325\",\"sex\":\"1\",\"age\":353,\"address\":\"Shenzhen\"},{\"id\":326,\"name\":\"Test326\",\"nickname\":\"T326\",\"sex\":\"1\",\"age\":354,\"address\":\"Shenzhen\"},{\"id\":327,\"name\":\"Test327\",\"nickname\":\"T327\",\"sex\":\"1\",\"age\":355,\"address\":\"Shenzhen\"},{\"id\":328,\"name\":\"Test328\",\"nickname\":\"T328\",\"sex\":\"1\",\"age\":356,\"address\":\"Shenzhen\"},{\"id\":329,\"name\":\"Test329\",\"nickname\":\"T329\",\"sex\":\"1\",\"age\":357,\"address\":\"Shenzhen\"},{\"id\":330,\"name\":\"Test330\",\"nickname\":\"T330\",\"sex\":\"1\",\"age\":358,\"address\":\"Shenzhen\"},{\"id\":331,\"name\":\"Test331\",\"nickname\":\"T331\",\"sex\":\"1\",\"age\":359,\"address\":\"Shenzhen\"},{\"id\":332,\"name\":\"Test332\",\"nickname\":\"T332\",\"sex\":\"1\",\"age\":360,\"address\":\"Shenzhen\"},{\"id\":333,\"name\":\"Test333\",\"nickname\":\"T333\",\"sex\":\"1\",\"age\":361,\"address\":\"Shenzhen\"},{\"id\":334,\"name\":\"Test334\",\"nickname\":\"T334\",\"sex\":\"1\",\"age\":362,\"address\":\"Shenzhen\"},{\"id\":335,\"name\":\"Test335\",\"nickname\":\"T335\",\"sex\":\"1\",\"age\":363,\"address\":\"Shenzhen\"},{\"id\":336,\"name\":\"Test336\",\"nickname\":\"T336\",\"sex\":\"1\",\"age\":364,\"address\":\"Shenzhen\"},{\"id\":337,\"name\":\"Test337\",\"nickname\":\"T337\",\"sex\":\"1\",\"age\":365,\"address\":\"Shenzhen\"},{\"id\":338,\"name\":\"Test338\",\"nickname\":\"T338\",\"sex\":\"1\",\"age\":366,\"address\":\"Shenzhen\"},{\"id\":339,\"name\":\"Test339\",\"nickname\":\"T339\",\"sex\":\"1\",\"age\":367,\"address\":\"Shenzhen\"},{\"id\":340,\"name\":\"Test340\",\"nickname\":\"T340\",\"sex\":\"1\",\"age\":368,\"address\":\"Shenzhen\"},{\"id\":341,\"name\":\"Test341\",\"nickname\":\"T341\",\"sex\":\"1\",\"age\":369,\"address\":\"Shenzhen\"},{\"id\":342,\"name\":\"Test342\",\"nickname\":\"T342\",\"sex\":\"1\",\"age\":370,\"address\":\"Shenzhen\"},{\"id\":343,\"name\":\"Test343\",\"nickname\":\"T343\",\"sex\":\"1\",\"age\":371,\"address\":\"Shenzhen\"},{\"id\":344,\"name\":\"Test344\",\"nickname\":\"T344\",\"sex\":\"1\",\"age\":372,\"address\":\"Shenzhen\"},{\"id\":345,\"name\":\"Test345\",\"nickname\":\"T345\",\"sex\":\"1\",\"age\":373,\"address\":\"Shenzhen\"},{\"id\":346,\"name\":\"Test346\",\"nickname\":\"T346\",\"sex\":\"1\",\"age\":374,\"address\":\"Shenzhen\"},{\"id\":347,\"name\":\"Test347\",\"nickname\":\"T347\",\"sex\":\"1\",\"age\":375,\"address\":\"Shenzhen\"},{\"id\":348,\"name\":\"Test348\",\"nickname\":\"T348\",\"sex\":\"1\",\"age\":376,\"address\":\"Shenzhen\"},{\"id\":349,\"name\":\"Test349\",\"nickname\":\"T349\",\"sex\":\"1\",\"age\":377,\"address\":\"Shenzhen\"},{\"id\":350,\"name\":\"Test350\",\"nickname\":\"T350\",\"sex\":\"1\",\"age\":378,\"address\":\"Shenzhen\"},{\"id\":351,\"name\":\"Test351\",\"nickname\":\"T351\",\"sex\":\"1\",\"age\":379,\"address\":\"Shenzhen\"},{\"id\":352,\"name\":\"Test352\",\"nickname\":\"T352\",\"sex\":\"1\",\"age\":380,\"address\":\"Shenzhen\"},{\"id\":353,\"name\":\"Test353\",\"nickname\":\"T353\",\"sex\":\"1\",\"age\":381,\"address\":\"Shenzhen\"},{\"id\":354,\"name\":\"Test354\",\"nickname\":\"T354\",\"sex\":\"1\",\"age\":382,\"address\":\"Shenzhen\"},{\"id\":355,\"name\":\"Test355\",\"nickname\":\"T355\",\"sex\":\"1\",\"age\":383,\"address\":\"Shenzhen\"},{\"id\":356,\"name\":\"Test356\",\"nickname\":\"T356\",\"sex\":\"1\",\"age\":384,\"address\":\"Shenzhen\"},{\"id\":357,\"name\":\"Test357\",\"nickname\":\"T357\",\"sex\":\"1\",\"age\":385,\"address\":\"Shenzhen\"},{\"id\":358,\"name\":\"Test358\",\"nickname\":\"T358\",\"sex\":\"1\",\"age\":386,\"address\":\"Shenzhen\"},{\"id\":359,\"name\":\"Test359\",\"nickname\":\"T359\",\"sex\":\"1\",\"age\":387,\"address\":\"Shenzhen\"},{\"id\":360,\"name\":\"Test360\",\"nickname\":\"T360\",\"sex\":\"1\",\"age\":388,\"address\":\"Shenzhen\"},{\"id\":361,\"name\":\"Test361\",\"nickname\":\"T361\",\"sex\":\"1\",\"age\":389,\"address\":\"Shenzhen\"},{\"id\":362,\"name\":\"Test362\",\"nickname\":\"T362\",\"sex\":\"1\",\"age\":390,\"address\":\"Shenzhen\"},{\"id\":363,\"name\":\"Test363\",\"nickname\":\"T363\",\"sex\":\"1\",\"age\":391,\"address\":\"Shenzhen\"},{\"id\":364,\"name\":\"Test364\",\"nickname\":\"T364\",\"sex\":\"1\",\"age\":392,\"address\":\"Shenzhen\"},{\"id\":365,\"name\":\"Test365\",\"nickname\":\"T365\",\"sex\":\"1\",\"age\":393,\"address\":\"Shenzhen\"},{\"id\":366,\"name\":\"Test366\",\"nickname\":\"T366\",\"sex\":\"1\",\"age\":394,\"address\":\"Shenzhen\"},{\"id\":367,\"name\":\"Test367\",\"nickname\":\"T367\",\"sex\":\"1\",\"age\":395,\"address\":\"Shenzhen\"},{\"id\":368,\"name\":\"Test368\",\"nickname\":\"T368\",\"sex\":\"1\",\"age\":396,\"address\":\"Shenzhen\"},{\"id\":369,\"name\":\"Test369\",\"nickname\":\"T369\",\"sex\":\"1\",\"age\":397,\"address\":\"Shenzhen\"},{\"id\":370,\"name\":\"Test370\",\"nickname\":\"T370\",\"sex\":\"1\",\"age\":398,\"address\":\"Shenzhen\"},{\"id\":371,\"name\":\"Test371\",\"nickname\":\"T371\",\"sex\":\"1\",\"age\":399,\"address\":\"Shenzhen\"},{\"id\":372,\"name\":\"Test372\",\"nickname\":\"T372\",\"sex\":\"1\",\"age\":400,\"address\":\"Shenzhen\"},{\"id\":373,\"name\":\"Test373\",\"nickname\":\"T373\",\"sex\":\"1\",\"age\":401,\"address\":\"Shenzhen\"},{\"id\":374,\"name\":\"Test374\",\"nickname\":\"T374\",\"sex\":\"1\",\"age\":402,\"address\":\"Shenzhen\"},{\"id\":375,\"name\":\"Test375\",\"nickname\":\"T375\",\"sex\":\"1\",\"age\":403,\"address\":\"Shenzhen\"},{\"id\":376,\"name\":\"Test376\",\"nickname\":\"T376\",\"sex\":\"1\",\"age\":404,\"address\":\"Shenzhen\"},{\"id\":377,\"name\":\"Test377\",\"nickname\":\"T377\",\"sex\":\"1\",\"age\":405,\"address\":\"Shenzhen\"},{\"id\":378,\"name\":\"Test378\",\"nickname\":\"T378\",\"sex\":\"1\",\"age\":406,\"address\":\"Shenzhen\"},{\"id\":379,\"name\":\"Test379\",\"nickname\":\"T379\",\"sex\":\"1\",\"age\":407,\"address\":\"Shenzhen\"},{\"id\":380,\"name\":\"Test380\",\"nickname\":\"T380\",\"sex\":\"1\",\"age\":408,\"address\":\"Shenzhen\"},{\"id\":381,\"name\":\"Test381\",\"nickname\":\"T381\",\"sex\":\"1\",\"age\":409,\"address\":\"Shenzhen\"},{\"id\":382,\"name\":\"Test382\",\"nickname\":\"T382\",\"sex\":\"1\",\"age\":410,\"address\":\"Shenzhen\"},{\"id\":383,\"name\":\"Test383\",\"nickname\":\"T383\",\"sex\":\"1\",\"age\":411,\"address\":\"Shenzhen\"},{\"id\":384,\"name\":\"Test384\",\"nickname\":\"T384\",\"sex\":\"1\",\"age\":412,\"address\":\"Shenzhen\"},{\"id\":385,\"name\":\"Test385\",\"nickname\":\"T385\",\"sex\":\"1\",\"age\":413,\"address\":\"Shenzhen\"},{\"id\":386,\"name\":\"Test386\",\"nickname\":\"T386\",\"sex\":\"1\",\"age\":414,\"address\":\"Shenzhen\"},{\"id\":387,\"name\":\"Test387\",\"nickname\":\"T387\",\"sex\":\"1\",\"age\":415,\"address\":\"Shenzhen\"},{\"id\":388,\"name\":\"Test388\",\"nickname\":\"T388\",\"sex\":\"1\",\"age\":416,\"address\":\"Shenzhen\"},{\"id\":389,\"name\":\"Test389\",\"nickname\":\"T389\",\"sex\":\"1\",\"age\":417,\"address\":\"Shenzhen\"},{\"id\":390,\"name\":\"Test390\",\"nickname\":\"T390\",\"sex\":\"1\",\"age\":418,\"address\":\"Shenzhen\"},{\"id\":391,\"name\":\"Test391\",\"nickname\":\"T391\",\"sex\":\"1\",\"age\":419,\"address\":\"Shenzhen\"},{\"id\":392,\"name\":\"Test392\",\"nickname\":\"T392\",\"sex\":\"1\",\"age\":420,\"address\":\"Shenzhen\"},{\"id\":393,\"name\":\"Test393\",\"nickname\":\"T393\",\"sex\":\"1\",\"age\":421,\"address\":\"Shenzhen\"},{\"id\":394,\"name\":\"Test394\",\"nickname\":\"T394\",\"sex\":\"1\",\"age\":422,\"address\":\"Shenzhen\"},{\"id\":395,\"name\":\"Test395\",\"nickname\":\"T395\",\"sex\":\"1\",\"age\":423,\"address\":\"Shenzhen\"},{\"id\":396,\"name\":\"Test396\",\"nickname\":\"T396\",\"sex\":\"1\",\"age\":424,\"address\":\"Shenzhen\"},{\"id\":397,\"name\":\"Test397\",\"nickname\":\"T397\",\"sex\":\"1\",\"age\":425,\"address\":\"Shenzhen\"},{\"id\":398,\"name\":\"Test398\",\"nickname\":\"T398\",\"sex\":\"1\",\"age\":426,\"address\":\"Shenzhen\"},{\"id\":399,\"name\":\"Test399\",\"nickname\":\"T399\",\"sex\":\"1\",\"age\":427,\"address\":\"Shenzhen\"},{\"id\":400,\"name\":\"Test400\",\"nickname\":\"T400\",\"sex\":\"1\",\"age\":428,\"address\":\"Shenzhen\"},{\"id\":401,\"name\":\"Test401\",\"nickname\":\"T401\",\"sex\":\"1\",\"age\":429,\"address\":\"Shenzhen\"},{\"id\":402,\"name\":\"Test402\",\"nickname\":\"T402\",\"sex\":\"1\",\"age\":430,\"address\":\"Shenzhen\"},{\"id\":403,\"name\":\"Test403\",\"nickname\":\"T403\",\"sex\":\"1\",\"age\":431,\"address\":\"Shenzhen\"},{\"id\":404,\"name\":\"Test404\",\"nickname\":\"T404\",\"sex\":\"1\",\"age\":432,\"address\":\"Shenzhen\"},{\"id\":405,\"name\":\"Test405\",\"nickname\":\"T405\",\"sex\":\"1\",\"age\":433,\"address\":\"Shenzhen\"},{\"id\":406,\"name\":\"Test406\",\"nickname\":\"T406\",\"sex\":\"1\",\"age\":434,\"address\":\"Shenzhen\"},{\"id\":407,\"name\":\"Test407\",\"nickname\":\"T407\",\"sex\":\"1\",\"age\":435,\"address\":\"Shenzhen\"},{\"id\":408,\"name\":\"Test408\",\"nickname\":\"T408\",\"sex\":\"1\",\"age\":436,\"address\":\"Shenzhen\"},{\"id\":409,\"name\":\"Test409\",\"nickname\":\"T409\",\"sex\":\"1\",\"age\":437,\"address\":\"Shenzhen\"},{\"id\":410,\"name\":\"Test410\",\"nickname\":\"T410\",\"sex\":\"1\",\"age\":438,\"address\":\"Shenzhen\"},{\"id\":411,\"name\":\"Test411\",\"nickname\":\"T411\",\"sex\":\"1\",\"age\":439,\"address\":\"Shenzhen\"},{\"id\":412,\"name\":\"Test412\",\"nickname\":\"T412\",\"sex\":\"1\",\"age\":440,\"address\":\"Shenzhen\"},{\"id\":413,\"name\":\"Test413\",\"nickname\":\"T413\",\"sex\":\"1\",\"age\":441,\"address\":\"Shenzhen\"},{\"id\":414,\"name\":\"Test414\",\"nickname\":\"T414\",\"sex\":\"1\",\"age\":442,\"address\":\"Shenzhen\"},{\"id\":415,\"name\":\"Test415\",\"nickname\":\"T415\",\"sex\":\"1\",\"age\":443,\"address\":\"Shenzhen\"},{\"id\":416,\"name\":\"Test416\",\"nickname\":\"T416\",\"sex\":\"1\",\"age\":444,\"address\":\"Shenzhen\"},{\"id\":417,\"name\":\"Test417\",\"nickname\":\"T417\",\"sex\":\"1\",\"age\":445,\"address\":\"Shenzhen\"},{\"id\":418,\"name\":\"Test418\",\"nickname\":\"T418\",\"sex\":\"1\",\"age\":446,\"address\":\"Shenzhen\"},{\"id\":419,\"name\":\"Test419\",\"nickname\":\"T419\",\"sex\":\"1\",\"age\":447,\"address\":\"Shenzhen\"},{\"id\":420,\"name\":\"Test420\",\"nickname\":\"T420\",\"sex\":\"1\",\"age\":448,\"address\":\"Shenzhen\"},{\"id\":421,\"name\":\"Test421\",\"nickname\":\"T421\",\"sex\":\"1\",\"age\":449,\"address\":\"Shenzhen\"},{\"id\":422,\"name\":\"Test422\",\"nickname\":\"T422\",\"sex\":\"1\",\"age\":450,\"address\":\"Shenzhen\"},{\"id\":423,\"name\":\"Test423\",\"nickname\":\"T423\",\"sex\":\"1\",\"age\":451,\"address\":\"Shenzhen\"},{\"id\":424,\"name\":\"Test424\",\"nickname\":\"T424\",\"sex\":\"1\",\"age\":452,\"address\":\"Shenzhen\"},{\"id\":425,\"name\":\"Test425\",\"nickname\":\"T425\",\"sex\":\"1\",\"age\":453,\"address\":\"Shenzhen\"},{\"id\":426,\"name\":\"Test426\",\"nickname\":\"T426\",\"sex\":\"1\",\"age\":454,\"address\":\"Shenzhen\"},{\"id\":427,\"name\":\"Test427\",\"nickname\":\"T427\",\"sex\":\"1\",\"age\":455,\"address\":\"Shenzhen\"},{\"id\":428,\"name\":\"Test428\",\"nickname\":\"T428\",\"sex\":\"1\",\"age\":456,\"address\":\"Shenzhen\"},{\"id\":429,\"name\":\"Test429\",\"nickname\":\"T429\",\"sex\":\"1\",\"age\":457,\"address\":\"Shenzhen\"},{\"id\":430,\"name\":\"Test430\",\"nickname\":\"T430\",\"sex\":\"1\",\"age\":458,\"address\":\"Shenzhen\"},{\"id\":431,\"name\":\"Test431\",\"nickname\":\"T431\",\"sex\":\"1\",\"age\":459,\"address\":\"Shenzhen\"},{\"id\":432,\"name\":\"Test432\",\"nickname\":\"T432\",\"sex\":\"1\",\"age\":460,\"address\":\"Shenzhen\"},{\"id\":433,\"name\":\"Test433\",\"nickname\":\"T433\",\"sex\":\"1\",\"age\":461,\"address\":\"Shenzhen\"},{\"id\":434,\"name\":\"Test434\",\"nickname\":\"T434\",\"sex\":\"1\",\"age\":462,\"address\":\"Shenzhen\"},{\"id\":435,\"name\":\"Test435\",\"nickname\":\"T435\",\"sex\":\"1\",\"age\":463,\"address\":\"Shenzhen\"},{\"id\":436,\"name\":\"Test436\",\"nickname\":\"T436\",\"sex\":\"1\",\"age\":464,\"address\":\"Shenzhen\"},{\"id\":437,\"name\":\"Test437\",\"nickname\":\"T437\",\"sex\":\"1\",\"age\":465,\"address\":\"Shenzhen\"},{\"id\":438,\"name\":\"Test438\",\"nickname\":\"T438\",\"sex\":\"1\",\"age\":466,\"address\":\"Shenzhen\"},{\"id\":439,\"name\":\"Test439\",\"nickname\":\"T439\",\"sex\":\"1\",\"age\":467,\"address\":\"Shenzhen\"},{\"id\":440,\"name\":\"Test440\",\"nickname\":\"T440\",\"sex\":\"1\",\"age\":468,\"address\":\"Shenzhen\"},{\"id\":441,\"name\":\"Test441\",\"nickname\":\"T441\",\"sex\":\"1\",\"age\":469,\"address\":\"Shenzhen\"},{\"id\":442,\"name\":\"Test442\",\"nickname\":\"T442\",\"sex\":\"1\",\"age\":470,\"address\":\"Shenzhen\"},{\"id\":443,\"name\":\"Test443\",\"nickname\":\"T443\",\"sex\":\"1\",\"age\":471,\"address\":\"Shenzhen\"},{\"id\":444,\"name\":\"Test444\",\"nickname\":\"T444\",\"sex\":\"1\",\"age\":472,\"address\":\"Shenzhen\"},{\"id\":445,\"name\":\"Test445\",\"nickname\":\"T445\",\"sex\":\"1\",\"age\":473,\"address\":\"Shenzhen\"},{\"id\":446,\"name\":\"Test446\",\"nickname\":\"T446\",\"sex\":\"1\",\"age\":474,\"address\":\"Shenzhen\"},{\"id\":447,\"name\":\"Test447\",\"nickname\":\"T447\",\"sex\":\"1\",\"age\":475,\"address\":\"Shenzhen\"},{\"id\":448,\"name\":\"Test448\",\"nickname\":\"T448\",\"sex\":\"1\",\"age\":476,\"address\":\"Shenzhen\"},{\"id\":449,\"name\":\"Test449\",\"nickname\":\"T449\",\"sex\":\"1\",\"age\":477,\"address\":\"Shenzhen\"},{\"id\":450,\"name\":\"Test450\",\"nickname\":\"T450\",\"sex\":\"1\",\"age\":478,\"address\":\"Shenzhen\"},{\"id\":451,\"name\":\"Test451\",\"nickname\":\"T451\",\"sex\":\"1\",\"age\":479,\"address\":\"Shenzhen\"},{\"id\":452,\"name\":\"Test452\",\"nickname\":\"T452\",\"sex\":\"1\",\"age\":480,\"address\":\"Shenzhen\"},{\"id\":453,\"name\":\"Test453\",\"nickname\":\"T453\",\"sex\":\"1\",\"age\":481,\"address\":\"Shenzhen\"},{\"id\":454,\"name\":\"Test454\",\"nickname\":\"T454\",\"sex\":\"1\",\"age\":482,\"address\":\"Shenzhen\"},{\"id\":455,\"name\":\"Test455\",\"nickname\":\"T455\",\"sex\":\"1\",\"age\":483,\"address\":\"Shenzhen\"},{\"id\":456,\"name\":\"Test456\",\"nickname\":\"T456\",\"sex\":\"1\",\"age\":484,\"address\":\"Shenzhen\"},{\"id\":457,\"name\":\"Test457\",\"nickname\":\"T457\",\"sex\":\"1\",\"age\":485,\"address\":\"Shenzhen\"},{\"id\":458,\"name\":\"Test458\",\"nickname\":\"T458\",\"sex\":\"1\",\"age\":486,\"address\":\"Shenzhen\"},{\"id\":459,\"name\":\"Test459\",\"nickname\":\"T459\",\"sex\":\"1\",\"age\":487,\"address\":\"Shenzhen\"},{\"id\":460,\"name\":\"Test460\",\"nickname\":\"T460\",\"sex\":\"1\",\"age\":488,\"address\":\"Shenzhen\"},{\"id\":461,\"name\":\"Test461\",\"nickname\":\"T461\",\"sex\":\"1\",\"age\":489,\"address\":\"Shenzhen\"},{\"id\":462,\"name\":\"Test462\",\"nickname\":\"T462\",\"sex\":\"1\",\"age\":490,\"address\":\"Shenzhen\"},{\"id\":463,\"name\":\"Test463\",\"nickname\":\"T463\",\"sex\":\"1\",\"age\":491,\"address\":\"Shenzhen\"},{\"id\":464,\"name\":\"Test464\",\"nickname\":\"T464\",\"sex\":\"1\",\"age\":492,\"address\":\"Shenzhen\"},{\"id\":465,\"name\":\"Test465\",\"nickname\":\"T465\",\"sex\":\"1\",\"age\":493,\"address\":\"Shenzhen\"},{\"id\":466,\"name\":\"Test466\",\"nickname\":\"T466\",\"sex\":\"1\",\"age\":494,\"address\":\"Shenzhen\"},{\"id\":467,\"name\":\"Test467\",\"nickname\":\"T467\",\"sex\":\"1\",\"age\":495,\"address\":\"Shenzhen\"},{\"id\":468,\"name\":\"Test468\",\"nickname\":\"T468\",\"sex\":\"1\",\"age\":496,\"address\":\"Shenzhen\"},{\"id\":469,\"name\":\"Test469\",\"nickname\":\"T469\",\"sex\":\"1\",\"age\":497,\"address\":\"Shenzhen\"},{\"id\":470,\"name\":\"Test470\",\"nickname\":\"T470\",\"sex\":\"1\",\"age\":498,\"address\":\"Shenzhen\"},{\"id\":471,\"name\":\"Test471\",\"nickname\":\"T471\",\"sex\":\"1\",\"age\":499,\"address\":\"Shenzhen\"},{\"id\":472,\"name\":\"Test472\",\"nickname\":\"T472\",\"sex\":\"1\",\"age\":500,\"address\":\"Shenzhen\"},{\"id\":473,\"name\":\"Test473\",\"nickname\":\"T473\",\"sex\":\"1\",\"age\":501,\"address\":\"Shenzhen\"},{\"id\":474,\"name\":\"Test474\",\"nickname\":\"T474\",\"sex\":\"1\",\"age\":502,\"address\":\"Shenzhen\"},{\"id\":475,\"name\":\"Test475\",\"nickname\":\"T475\",\"sex\":\"1\",\"age\":503,\"address\":\"Shenzhen\"},{\"id\":476,\"name\":\"Test476\",\"nickname\":\"T476\",\"sex\":\"1\",\"age\":504,\"address\":\"Shenzhen\"},{\"id\":477,\"name\":\"Test477\",\"nickname\":\"T477\",\"sex\":\"1\",\"age\":505,\"address\":\"Shenzhen\"},{\"id\":478,\"name\":\"Test478\",\"nickname\":\"T478\",\"sex\":\"1\",\"age\":506,\"address\":\"Shenzhen\"},{\"id\":479,\"name\":\"Test479\",\"nickname\":\"T479\",\"sex\":\"1\",\"age\":507,\"address\":\"Shenzhen\"},{\"id\":480,\"name\":\"Test480\",\"nickname\":\"T480\",\"sex\":\"1\",\"age\":508,\"address\":\"Shenzhen\"},{\"id\":481,\"name\":\"Test481\",\"nickname\":\"T481\",\"sex\":\"1\",\"age\":509,\"address\":\"Shenzhen\"},{\"id\":482,\"name\":\"Test482\",\"nickname\":\"T482\",\"sex\":\"1\",\"age\":510,\"address\":\"Shenzhen\"},{\"id\":483,\"name\":\"Test483\",\"nickname\":\"T483\",\"sex\":\"1\",\"age\":511,\"address\":\"Shenzhen\"},{\"id\":484,\"name\":\"Test484\",\"nickname\":\"T484\",\"sex\":\"1\",\"age\":512,\"address\":\"Shenzhen\"},{\"id\":485,\"name\":\"Test485\",\"nickname\":\"T485\",\"sex\":\"1\",\"age\":513,\"address\":\"Shenzhen\"},{\"id\":486,\"name\":\"Test486\",\"nickname\":\"T486\",\"sex\":\"1\",\"age\":514,\"address\":\"Shenzhen\"},{\"id\":487,\"name\":\"Test487\",\"nickname\":\"T487\",\"sex\":\"1\",\"age\":515,\"address\":\"Shenzhen\"},{\"id\":488,\"name\":\"Test488\",\"nickname\":\"T488\",\"sex\":\"1\",\"age\":516,\"address\":\"Shenzhen\"},{\"id\":489,\"name\":\"Test489\",\"nickname\":\"T489\",\"sex\":\"1\",\"age\":517,\"address\":\"Shenzhen\"},{\"id\":490,\"name\":\"Test490\",\"nickname\":\"T490\",\"sex\":\"1\",\"age\":518,\"address\":\"Shenzhen\"},{\"id\":491,\"name\":\"Test491\",\"nickname\":\"T491\",\"sex\":\"1\",\"age\":519,\"address\":\"Shenzhen\"},{\"id\":492,\"name\":\"Test492\",\"nickname\":\"T492\",\"sex\":\"1\",\"age\":520,\"address\":\"Shenzhen\"},{\"id\":493,\"name\":\"Test493\",\"nickname\":\"T493\",\"sex\":\"1\",\"age\":521,\"address\":\"Shenzhen\"},{\"id\":494,\"name\":\"Test494\",\"nickname\":\"T494\",\"sex\":\"1\",\"age\":522,\"address\":\"Shenzhen\"},{\"id\":495,\"name\":\"Test495\",\"nickname\":\"T495\",\"sex\":\"1\",\"age\":523,\"address\":\"Shenzhen\"},{\"id\":496,\"name\":\"Test496\",\"nickname\":\"T496\",\"sex\":\"1\",\"age\":524,\"address\":\"Shenzhen\"},{\"id\":497,\"name\":\"Test497\",\"nickname\":\"T497\",\"sex\":\"1\",\"age\":525,\"address\":\"Shenzhen\"},{\"id\":498,\"name\":\"Test498\",\"nickname\":\"T498\",\"sex\":\"1\",\"age\":526,\"address\":\"Shenzhen\"},{\"id\":499,\"name\":\"Test499\",\"nickname\":\"T499\",\"sex\":\"1\",\"age\":527,\"address\":\"Shenzhen\"},{\"id\":500,\"name\":\"Test500\",\"nickname\":\"T500\",\"sex\":\"1\",\"age\":528,\"address\":\"Shenzhen\"}]},\"id\":\"baseVxeTable56917\"}],\"formConfig\":{\"modelName\":\"formData\",\"refName\":\"vForm\",\"rulesName\":\"rules\",\"labelWidth\":90,\"labelPosition\":\"left\",\"size\":\"mini\",\"labelAlign\":\"label-right-align\",\"cssCode\":\"\",\"customClass\":\"\",\"functions\":\"\",\"layoutType\":\"PC\",\"tableBorder\":true,\"onFormCreated\":\"\",\"onFormMounted\":\"// let baseTable = this.getWidgetRef(\\\"baseVxeTable98641\\\")\\n// let tableHeight = document.body.clientHeight-340\\n// baseTable.widget.options.tableHeight = tableHeight\\n\",\"onFormDataChange\":\"\",\"bgImageName\":\"\",\"bgImageWidth\":\"100px\",\"bgImageHeight\":\"100px\",\"jsonVersion\":3,\"onFormValidate\":\"\"}}",
						"moduleId": "6",
						"pageType": "3",
						"checkedNode": "2823,2820,2821,2822"
				}
      }
    },
    computed: {
			vxeModalId() {
			  return this.field.options.name +'vxeModalId'
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
      this.initFieldModel()
      this.registerToRefList()
      this.initEventHandler()
      this.buildFieldRules()
      this.handleOnCreated()
    },
    mounted() {
      this.handleOnMounted()
			//this.$refs.VFormRender.setFormJson(this.referPageData);
    },
    beforeDestroy() {
      this.unregisterFromRefList()
    },
    methods: {
			showModalDialog({type, $event}){
				console.log("showModalDialog：============================》",type, $event);
			},
			hideModalDialog({type, $event}){
				console.log("hideModalDialog：============================》",type, $event);
			},
			closeModalDialog({type, $event}){
				console.log("closeModalDialog：============================》",type, $event);
			},
			// 打开动态弹窗
			openDynamicDialog(){
				let self = this;
				let optionData = {}
				let refTableName = this.field.options.name.split("-")[0]// 编辑表格数据源的表名
				let refColumnName = this.field.options.name.split("-")[1];// 编辑表格参照的列名
				let {isTrue,requestParaArr} = this.handleReferenceDialogInit(refTableName,refColumnName,this.requestParaArr);
				this.requestParaArr = requestParaArr
				// 触发参照弹窗初始化事件
				if(!isTrue){
					return false
				}
				this.fromQuerySourcePageID = this.field.options.fromQuerySource //记录打开参照的页面ID
				// 通过页面ID获取参照页JSON
				console.log("===========开始请求参照页面JSON,页面ID="+this.fromQuerySourcePageID)
				this.axios.get(VFORM_PAGE_QUERY_BY_ID+"?id="+this.fromQuerySourcePageID).then(res=>{
					if(res.code == "200" || res.success == true){
						console.log("===========请求参照页面JSON成功",res)
						//加上打开关闭标记，防止参照窗口重复挂载渲染
						// Vue.ls.set(res.result.pageNo,"open");
						let refJson = JSON.parse(res.result.pageCode);
						optionData.pageID = res.result.id;
						optionData.moduleID = res.result.moduleId;
						console.log("==========请求参照获得的JSON对象=================",refJson)
						this.$nextTick(()=>{
							// this.applyOptionsForDialog(this.requestParaArr);
							//应用参照针对弹窗页面的设置
							traverseContainWidgets(refJson.widgetList, (widget,_this=this) => {
								// 遍历容器控件中的基础表格
								if(widget.type === "baseVxeTable"){
									widget.options.showCheckBox = this.field.options.showCheckBox
									this.$refs.dFormRef.getWidgetRef(widget.options.name).getData(this.requestParaArr)
								}
							})
						})
						let options = {
							title : (this.field.options.fromQuerySourceName||this.field.options.label)+"-参照",
							width : "1200px",
							formWidget : self,
							openReferID : this.field.id,// 当前表单参照ID
							dataModel : {
								refColumnName : refColumnName,// 表单参照的列名
								moduleId : this.getFormRef().moduleID,// 当前页面模块
								pageId : res.result.id, // 参照页面ID
								refTableName : refTableName,// 编辑表格数据源的表名
								refRowList : null,
							}
						}
						let DialogCreator = Vue.extend(DynamicDialog)
						let dialogInstance = new DialogCreator({
							propsData: {
								options: options,
								formJson: refJson,
								// formJson: dFormJson,
								// formData: formData || {},
								optionData: optionData,
								// globalDsv: this.globalDsv,
								parentFormRef: this,
								// extraData: extraData,
							}
						})
						document.body.appendChild(dialogInstance.$mount().$el )
						dialogInstance.show()
					} else {
						this.$refs.VFormRender.setFormJson(this.referPageData);
						console.log("===========请求参照页面JSON失败",res)
					}
				})
			},
			
			//打开参照弹窗
			openDialog(){//debugger;
				let refTableName = this.field.options.name.split("-")[0]// 编辑表格数据源的表名
				let refColumnName = this.field.options.name.split("-")[1];// 编辑表格参照的列名
				let {isTrue,requestParaArr} = this.handleReferenceDialogInit(refTableName,refColumnName,this.requestParaArr);
				this.requestParaArr = requestParaArr
				// 触发参照弹窗初始化事件
				if(!isTrue){
					return false
				}
				
				this.fromQuerySourcePageID = this.field.options.fromQuerySource //记录打开参照的页面ID
				this.refDialogVisible = true;
				// this.referDialogTitle = item.label+"参照";
				this.$nextTick(()=>{
					// 通过页面ID获取参照页JSON
					console.log("===========开始请求参照页面JSON,页面ID="+this.fromQuerySourcePageID)
					this.axios.get(VFORM_PAGE_QUERY_BY_ID+"?id="+this.fromQuerySourcePageID).then(res=>{
					  if(res.code == "200" || res.success == true){
							console.log("===========请求参照页面JSON成功",res)
							//加上打开关闭标记，防止参照窗口重复挂载渲染
							Vue.ls.set(res.result.pageNo,"open");
							let json = JSON.parse(res.result.pageCode);
							this.formJsonFill = json
							// this.$refs.VFormRender.setPageID(res.result.id)
							this.$refs.VFormRender.optionData.pageID=res.result.id;
							this.$refs.VFormRender.optionData.moduleID=res.result.moduleId;
							// this.$refs.VFormRender.setPageID(res.result.id)
							this.$refs.VFormRender.setFormJson(this.formJsonFill);
							this.$refs.VFormRender.setModuleID(res.result.moduleId);
							console.log("==========请求参照获得的JSON对象=================",this.$refs.VFormRender)
							this.$nextTick(()=>{
								this.applyOptionsForDialog(this.requestParaArr);
							})
						} else {
							this.$refs.VFormRender.setFormJson(this.referPageData);
							console.log("===========请求参照页面JSON失败",res)
						}
					})
					
					// this.formJsonFill = JSON.parse(this.localResult.pageCode);
					// this.$refs.VFormRender.setPageID(this.localResult.id)
					// this.$refs.VFormRender.setModuleID(this.localResult.moduleId)
					// this.$refs.VFormRender.setFormJson(this.formJsonFill);
					})				
				
				
				
			 // this.optionData.pageID=this.field.options.fromQuerySource
				// this.refDialogVisible = true;
				// this.$nextTick(()=>{
				// 	this.$refs.VFormRender.setFormJson(this.field.options.formJson);
				// }) 
				// this.$nextTick(()=>{
				// 	this.applyOptionsForDialog(this.$refs.VFormRender.formJson);
				// })
			},
			// 将表单或编辑表格中参照的配置应用到参照弹窗
			applyOptionsForDialog(requestParaArr){
				// 参照查询默认值集合
				// this.field.options.queryConditionTableData
				let widgetList = this.formJsonFill.widgetList;// 参照弹窗控件集合
				// let widgetList = formJson.widgetList;// 参照弹窗控件集合
				// let queryConList = this.field.options.queryConditionTableData;// 参照弹窗默认值集合
				//应用参照针对弹窗页面的设置
				traverseContainWidgets(widgetList, (widget,_this=this) => {
					// 遍历容器控件中的基础表格
					if(widget.type === "baseVxeTable"){
						widget.options.showCheckBox = this.field.options.showCheckBox
						this.$refs.VFormRender.getWidgetRef(widget.options.name).getData(requestParaArr)
					}
				})
				// 应用参照针对弹窗页面的设置				
				// for(var i = 0;i<widgetList.length;i++){
				// 	if(widgetList[i].type == "baseVxeTable"){
				// 		widgetList[i].options.showCheckBox = this.field.options.showCheckBox
				// 		this.$refs.VFormRender.getWidgetRef(widgetList[i].options.name).getData(requestParaArr)
				// 	}
				// }
				// // 应用查询默认值设置
				// traverseFieldWidgets(widgetList, (widget,_this=this) => {
				// 	for(var i = 0;i<queryConList.length;i++){
				// 		if(queryConList[i].default !==null && queryConList[i].default !==undefined)
				// 		{
				// 			if(widget.id === queryConList[i].prop){
				// 				// _this.getWidgetRef(widget.id).setValue(queryConList[i].default)
				// 				_this.$refs.VFormRender.getWidgetRef(widget.id).setValue(queryConList[i].default)
				// 			}
				// 		}
				// 	}
				// })
				
				// this.$refs.VFormRender.setFormData(this.formJson);z
			},
			// //点击复选框触发，复选框样式的改变
			// handleSelectionChange(val) {
			// 	this.multipleSelection = val;
			// },
			// //点击行触发，选中或不选中复选框
			// refTableRowClick(row, column, event){
			// 	this.$refs.dataTable.toggleRowSelection(row);
			// },
			// 参照选择返回
			confirmOption(){
				// TODO: 需要增加一个选择前的回调事件，可以进行逻辑判断，中止选择、请求API、返回数据等操作
				//选择前的回调事件参数有【选择的记录集合、表名、列名】
				
				// 当前渲染器装载组件集合
				let widgetRefList = this.$refs.VFormRender.widgetRefList;
				// 参照中的查询列表对象
				let baseVxeTable = null;
				for(var temO in widgetRefList)
				{
					if(temO.indexOf("baseVxeTable")!= -1){
						baseVxeTable = widgetRefList[temO];
					}
				}
				// 获取参照中查询表格选择的记录
				this.selections = baseVxeTable.getTableSelection();
				console.log("本次选中数据：",this.selections)
				
				// 通过接口请求，将选中的记录套用SQL扩展
				let dataModel = {}
				dataModel.refColumnName = this.field.options.name.split("-")[1];// 参照的列名
				dataModel.moduleId = this.getFormRef().moduleID;// 当前模块ID
				dataModel.pageId = this.fromQuerySourcePageID;// 当前参照的页面ID
				dataModel.refTableName = this.field.options.name.split("-")[0]// 数据源的表名
				// 如果选中记录为单行则添加到数组中传递给API接口
				if(!Array.isArray(this.selections)){
					let arr = new Array()
					arr.push(this.selections)
					dataModel.refRowList = arr
				} else {
					dataModel.refRowList = this.selections
				}
				
				/**
				 * 触发表单参照选择前事件
				 * 事件参数：事件方法体、选择的记录集合、表名、字段
				 */
				let {isTrue} = this.handleReferenceCheckBefore(dataModel.refRowList,dataModel.refTableName,dataModel.refColumnName);
				if(!isTrue){
					return false;
				}
				
				console.log("SYS_DATAMATCH_SET_CONTROL_GET_DATA_FROM_REF==========请求参数dataModel",dataModel)
				// 通过接口请求，将选中的记录套用SQL扩展
				this.axios.post(SYS_DATAMATCH_SET_CONTROL_GET_DATA_FROM_REF,dataModel).then(res=>{
					if(res.code == "200" || res.success == true){
						console.log("本次选中数据[SQL扩展后]：",res.result)

						let masterData = res.result.masterData// 填充主表单数据
						let detailData = res.result.detailData// 填充明细表格数据
						console.log("masterData",masterData)
						console.log("detailData",detailData)

						// 遍历主表数据填充对应字段控件
						console.log("=====编辑表格参照开始赋值主表")
						let objForm=this.getFormRef();
						let pageStatusInfo=objForm.getPageStatusInfo();
						try{
								//加上标记，否则setFormDataPro会触发dataChange事件
								pageStatusInfo.allowDataChange=0;
								Object.keys(masterData).forEach(propName => {
									console.log("字段名",propName)
									console.log("字段值",masterData[propName])
									this.getFormRef().setFieldValue(propName,masterData[propName])
								});
						}
						catch(err) {
						  objForm.$message({message: '出错:'+err,type: 'warning'});
						}
						finally {
						  pageStatusInfo.allowDataChange=1;//防止没有复位，非常重要
						}
						// this.handleReferenceAfterCheck(this.selections)// 触发参照选择完毕事件
						this.handleReferenceAfterCheck(masterData,dataModel.refTableName,dataModel.refColumnName)// 触发参照选择完毕事件
					} else {
						console.log("请求SQL扩展返回状态码：",res.code)
						console.log("请求SQL扩展异常信息：",res.message)
					}
				})
				//加上打开关闭标记，防止参照窗口重复挂载渲染
				let pageStatusInfo=this.$refs.VFormRender.getPageStatusInfo();
				if(!!pageStatusInfo.refPageCode){
					Vue.ls.set(pageStatusInfo.refPageCode,"close");
				}
				this.refDialogVisible = false
			},
			closeReferDialog(){
				//加上打开关闭标记，防止参照窗口重复挂载渲染
				let pageStatusInfo=this.$refs.VFormRender.getPageStatusInfo();
				if(!!pageStatusInfo.refPageCode){
					Vue.ls.set(pageStatusInfo.refPageCode,"close");
				}
				// 关闭参照弹窗
				this.refDialogVisible=false;
			},
			// 返回数据
			confirmOption2(){
				// let bt = this.$refs.VFormRender.getWidgetRef("baseTable60501");
				let widgetRefList = this.$refs.VFormRender.widgetRefList;
				let baseTable = null;
				let returnKey = "",returnValue=""
				for(var temO in widgetRefList)
				{
					if(temO.indexOf("baseTable")!= -1){
						baseTable = widgetRefList[temO];
					}
				}
				this.selections = baseTable.getTableSelection();
				// debugger;
				// 参照返回映射关系集合
				// this.field.options.dataMateTableData
				let dataMate = this.field.options.dataMateTableData;
				
				if(Array.isArray(this.selections)){
					for(var record in this.selections)
					{
						if(returnKey!==""){
							returnKey = returnKey+","+this.selections[record].id;
							returnValue = returnValue+","+this.selections[record].name;
						} else{
							returnKey += this.selections[record].id;
							returnValue += this.selections[record].name;
						}
					}
					// debugger;
					// 根据数据匹配设置赋值表单
					for(var i=0;i<dataMate.length;i++){
						let widget = this.getWidgetRef(dataMate[i].fillField)
						if(!!widget){
							widget.setValue(this.selections[0][dataMate[i].refField])
							// this.getWidgetRef(dataMate[i].fillField).setValue(this.selections[0][dataMate[i].refField])
						}
					}
				} else {
					returnKey = this.selections.id
					returnValue = this.selections.name
					// 根据数据匹配设置赋值表单
					for(var i=0;i<dataMate.length;i++){
						let widget = this.getWidgetRef(dataMate[i].fillField)
						if(!!widget){
							widget.setValue(this.selections[dataMate[i].refField])
							// this.getWidgetRef(dataMate[i].fillField).setValue(this.selections[dataMate[i].refField])
						}
					}
				}
				
				this.fieldModel = returnValue;
				this.fieldModelKey = returnKey;
				// this.$message(JSON.stringify(this.selections));
				
				this.handleReferenceAfterCheck(this.selections)// 触发参照选择完毕事件
				this.refDialogVisible = false
			},
			getReallyValue(){
				return this.fieldModelKey;
			},
			getValue(){
				return this.fieldModel;
			},
			handleFormChange(fieldName, newValue, oldValue, formModel) {//debugger;
			  console.log('---formChange start---')
			  console.log('fieldName', fieldName)
			  console.log('newValue', newValue)
			  console.log('oldValue', oldValue)
			  console.log('formModel', formModel)
			  console.log('---formChange end---')
			},
			// 外部调用方法
			setFormJson(json){
				this.formJson = json
			},
			setFormData(data){
				this.formData = data
			},
			setOptionData(optionData){
				this.optionData = optionData
			},
			getRef(){
				return this.$refs['fieldEditor']
			}
    }
  }
</script>

<style lang="scss" scoped>
  // @import "@/lib/vform/styles/global.scss"; //* form-item-wrapper已引入，还需要重复引入吗？ *//
	.panes-setting {
	  ul {
	    padding-inline-start: 0;
	    padding-left: 0; /* 重置IE11默认样式 */
	    margin: 0;
	  }
	
	  .drag-option {
	    cursor: move;
	  }
	
	  .ghost {
	    background: #fff;
	    border: 2px dotted var(--jy-primary-6);
	  }
	}
	.el-select .el-input {
		width: 230px;
	}
	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}
	.small-padding-dialog {
	  :deep(.el-dialog__body) {
	    padding: 6px 15px 12px 15px !important;
	  }
	
		:deep(.ace-container) {
			border: 1px solid #DCDFE6;
		}
	
		.dialog-btn-footer {
			text-align: center;
		}
	}
</style>

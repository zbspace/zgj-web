<template>
    <!-- <static-content-wrapper :designer="designer" :field="field" :design-state="designState"
        :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
        :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
        
    </static-content-wrapper> -->
    <form-item-wrapper :designer="designer" :field="field" :rules="rules" :design-state="designState"
        :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
        :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
        <div class="limit-address">
            <div class="radio-box">
                <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                </el-radio-group>
            </div>

            <div class="date-seal" v-show="radio === 3">
                <div class="out-time">
                    <div class="label-custom">外带时间：</div>
                    <el-date-picker v-model="value" type="daterange" range-separator="To" start-placeholder="Start date"
                        end-placeholder="End date" />
                </div>
                <div class="out-address">
                    <div class="address-form">
                        <div class="label-custom">外带地点：</div>
                        <el-cascader placeholder="请选择地区" size="default" :options="addressData" v-model="selectedOptions"
                            @change="handleChange">
                        </el-cascader>
                        <el-autocomplete v-model="inputAddress" :fetch-suggestions="querySearch"
                            class="inline-input w-50 input-record" placeholder="请输入" @select="handleSelect"/>
                            <!-- @focus="mhs_Bmap_searchcomplete" -->
                    </div>
                    <baidu-map class="map ap-cont-BMap-cont" id="BMapadvancedMapQueryContainer"
                        :center="{ lng: 118.454, lat: 32.955 }" :zoom="5" v-show="false">
                        <bm-local-search :keyword="selectedAddress+inputAddress" :auto-viewport="true" :panel="false"
                            @searchcomplete="mhs_Bmap_searchcomplete"></bm-local-search>
                    </baidu-map>
                </div>
            </div>
        </div>

    </form-item-wrapper>
</template>

<script>
// import StaticContentWrapper from "@/lib/vform/components/form-designer/form-widget/field-widget/static-content-wrapper";
import FormItemWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/form-item-wrapper'
import emitter from "@/lib/vform/utils/emitter";
import i18n from "@/lib/vform/utils/i18n";
import fieldMixin from "@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin";
import { regionData } from 'element-china-area-data'
import { h } from 'vue';
export default {
    name: "limitAddressSeal-widget",
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
        // StaticContentWrapper,
        FormItemWrapper,
    },
    data() {
        return {
            radio: 6,
            fieldModel: null,
            rules: [],
            fileList: [],
            addressData: regionData,
            selectedOptions: '',
            selectedAddress:'',
            value: '',
            inputAddress: '',
            searchList: [],
            restaurants: [],
            state1: '000',
        };
    },
    created() {
        this.registerToRefList();
        this.initEventHandler();
        console.log(this.addressData);
    },
    beforeUnmount() {
        this.unregisterFromRefList();
    },
    methods: {
        // 检索完成后的回调函数
        mhs_Bmap_searchcomplete(e) {
            if (e) {
                let rList = [];
                if (e.Kr && e.Kr.length > 0) {
                    rList = e.Kr;
                } else if (e.Xr && e.Xr.length > 0) {
                    rList = e.Xr;
                } else if (e.Yr && e.Yr.length > 0) {
                    rList = e.Yr;
                } else if (e.KQ && e.KQ.length > 0) {
                    rList = e.KQ;
                } else if (e.Ir && e.Ir.length > 0) {
                    rList = e.Ir;
                }
                this.searchList = rList;
                this.loadAll();
            }
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                if(restaurant.value){
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
                }
                
            };
        },
        loadAll() {
            this.searchList.map((item,index) => {
                item.value = item.title
            })
            this.restaurants = this.searchList;
            console.log(this.restaurants);
            return this.restaurants;
            return [
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
                { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
                { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
                { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
                { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
                { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
                { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
                { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
                { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
                { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
                { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
                { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
                { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
                { "value": "枪会山", "address": "上海市普陀区棕榈路" },
                { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
                { "value": "钱记", "address": "上海市长宁区天山西路" },
                { "value": "壹杯加", "address": "上海市长宁区通协路" },
                { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
                { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
                { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
                { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
                { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
                { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
                { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
                { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
                { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
                { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
                { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
                { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
                { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
                { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
                { "value": "浏阳蒸菜", "address": "天山西路430号" },
                { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
                { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
                { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
                { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
                { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
                { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
                { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
                { "value": "阳阳麻辣烫", "address": "天山西路389号" },
                { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
            ];
        },
        handleChange(row,index) {
            this.handleAddress(row,index);
        },
        handleAddress(row,index){
            let searchIndex = index?index:0;
            let data = this.findNode(this.addressData,(node) => {
                return node.value === row[searchIndex]
            })
            // this.inputAddress += data.label;
            this.selectedAddress += data.label;
            if(row.length > (searchIndex+1)){
                this.handleAddress(row,searchIndex+1)
            }
        },  
        findNode(tree, func) {
            for (const node of tree) {
                if (func(node)) return node
                if (node.children) {
                    const res = this.findNode(node.children, func)
                    if (res) return res
                }
            }
            return null
        },
        handleSelect(item) {
            console.log(item)
        }
    }
};
</script>

<style lang="scss" scoped>
.limit-address{
    min-width: 500px;
}
.limit-item {
    display: flex;
}

.date-seal {

    >div {
        display: flex;
        align-items: center;
        margin-top: 12px;
    }

    .out-address {
        align-items: flex-start;
        flex-direction: column;

        .address-form {
            display: flex;
            align-items: center;
            // width: 600px;
            .address-input {
                // width: 600px;
            }
            .input-record{
                
            }
        }
        
    }
}
:global(.input-record){
    margin-left:23px;
}
.map {
    width: 400px;
    height: 300px;
    margin-top: 12px;
    margin-left: 16%;
}
</style>

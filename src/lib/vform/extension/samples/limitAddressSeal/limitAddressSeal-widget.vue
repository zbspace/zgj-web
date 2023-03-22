<template>
  <!-- <static-content-wrapper :designer="designer" :field="field" :design-state="designState"
        :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
        :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
        
    </static-content-wrapper> -->
  <form-item-wrapper
    :designer="designer"
    :field="field"
    :rules="rules"
    :design-state="designState"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :sub-form-row-index="subFormRowIndex"
    :sub-form-col-index="subFormColIndex"
    :sub-form-row-id="subFormRowId"
  >
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
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="To"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            start-placeholder="Start date"
            end-placeholder="End date"
          />
        </div>
        <div class="out-address">
          <div class="address-form">
            <div class="label-custom">外带地点：</div>
            <el-cascader
              placeholder="请选择地区"
              size="default"
              :options="addressData"
              v-model="selectedOptions"
              @change="handleChange"
            >
            </el-cascader>
            <el-autocomplete
              v-model="inputAddress"
              :fetch-suggestions="querySearch"
              class="inline-input w-50 input-record"
              placeholder="请输入"
              @select="handleSelect"
            />
            <!-- @focus="mhs_Bmap_searchcomplete" -->
          </div>
          <baidu-map
            class="map ap-cont-BMap-cont"
            id="BMapadvancedMapQueryContainer"
            :center="{ lng: 118.454, lat: 32.955 }"
            :zoom="5"
            v-show="false"
          >
            <bm-local-search
              :keyword="selectedAddress + inputAddress"
              :auto-viewport="true"
              :panel="false"
              @searchcomplete="mhs_Bmap_searchcomplete"
            ></bm-local-search>
          </baidu-map>
        </div>
      </div>
    </div>
  </form-item-wrapper>
</template>

<script>
  // import StaticContentWrapper from "@/lib/vform/components/form-designer/form-widget/field-widget/static-content-wrapper";
  import FormItemWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/form-item-wrapper'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n from '@/lib/vform/utils/i18n'
  import fieldMixin from '@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin'
  import { regionData } from 'element-china-area-data'
  import { h } from 'vue'
  export default {
    name: 'LimitAddressSealWidget',
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
      // StaticContentWrapper,
      FormItemWrapper
    },
    data() {
      return {
        radio: 6,
        fieldModel: null,
        rules: [],
        fileList: [],
        addressData: regionData,
        selectedOptions: '',
        selectedAddress: '',
        value: '',
        inputAddress: '',
        searchList: [],
        restaurants: [],
        state1: '000'
      }
    },
    created() {
      this.registerToRefList()
      this.initEventHandler()
      console.log(this.addressData)
    },
    beforeUnmount() {
      this.unregisterFromRefList()
    },
    methods: {
      // 检索完成后的回调函数
      mhs_Bmap_searchcomplete(e) {
        if (e) {
          let rList = []
          if (e.Kr && e.Kr.length > 0) {
            rList = e.Kr
          } else if (e.Xr && e.Xr.length > 0) {
            rList = e.Xr
          } else if (e.Yr && e.Yr.length > 0) {
            rList = e.Yr
          } else if (e.KQ && e.KQ.length > 0) {
            rList = e.KQ
          } else if (e.Ir && e.Ir.length > 0) {
            rList = e.Ir
          }
          this.searchList = rList
          this.loadAll()
        }
      },
      querySearch(queryString, cb) {
        const restaurants = this.restaurants
        const results = queryString
          ? restaurants.filter(this.createFilter(queryString))
          : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter(queryString) {
        return restaurant => {
          if (restaurant.value) {
            return (
              restaurant.value
                .toLowerCase()
                .indexOf(queryString.toLowerCase()) !== -1
            )
          }
        }
      },
      loadAll() {
        this.searchList.map((item, index) => {
          item.value = item.title
        })
        this.restaurants = this.searchList
        console.log(this.restaurants)
        return this.restaurants
      },
      handleChange(row, index) {
        this.handleAddress(row, index)
      },
      handleAddress(row, index) {
        const searchIndex = index || 0
        const data = this.findNode(this.addressData, node => {
          return node.value === row[searchIndex]
        })
        // this.inputAddress += data.label;
        this.selectedAddress += data.label
        if (row.length > searchIndex + 1) {
          this.handleAddress(row, searchIndex + 1)
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
  }
</script>

<style lang="scss" scoped>
  .limit-address {
    min-width: 500px;
  }
  .limit-item {
    display: flex;
  }

  .date-seal {
    > div {
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
        .input-record {
        }
      }
    }
  }
  :global(.input-record) {
    margin-left: 23px;
  }
  .map {
    width: 400px;
    height: 300px;
    margin-top: 12px;
    margin-left: 16%;
  }
</style>

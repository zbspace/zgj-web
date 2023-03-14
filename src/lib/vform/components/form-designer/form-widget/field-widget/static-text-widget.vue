<template>
  <static-content-wrapper :designer="designer" :field="field" :design-state="designState"
                          :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
                          :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
    <div ref="fieldEditor" >
      <pre>{{field.options.textContent}}</pre>
    </div>
    <div class="static-text"></div>
  </static-content-wrapper>
</template>

<script>
  import StaticContentWrapper from './static-content-wrapper'
  import emitter from '@/lib/vform/utils/emitter'
  import i18n, {translate} from "@/lib/vform/utils/i18n";
  import fieldMixin from "@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin";

  export default {
    name: "static-text-widget",
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
      StaticContentWrapper,
    },
    computed: {

    },
    beforeCreate() {
      /* 这里不能访问方法和属性！！ */
    },

    created() {
      /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
      this.registerToRefList()
      this.initEventHandler()

      this.handleOnCreated()
    },

    mounted() {
      this.handleOnMounted()
    },

    beforeUnmount() {
      this.unregisterFromRefList()
    },

    methods: {

    }

  }
</script>

<style lang="scss" scoped>
  @import "@/lib/vform/styles/global.scss"; //* static-content-wrapper已引入，还需要重复引入吗？ *//
  :deep(.static-content-item) {
    margin-bottom: 24px;
    div:nth-child(1) {
      border-left: 3px solid #D0963E;
      line-height: 20px;
      padding-left: 8px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 8px;
      pre {
        line-height: 20px;
        margin: 0;
        text-align: left;
      }
    }
    .static-text {
      margin-left: 8px;
      border-bottom: 1px solid  rgba(0, 0, 0, 0.06);
    }
  }
</style>

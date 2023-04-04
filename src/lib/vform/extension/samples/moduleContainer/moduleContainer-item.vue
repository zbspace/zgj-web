<template>
  <container-item-wrapper :widget="widget">
    <div
      :key="widget.id"
      class="card-container"
      :shadow="widget.options.shadow"
      :style="{ width: widget.options.cardWidth + '!important' || '' }"
      :class="[!!widget.options.folded ? 'folded' : '', customClass]"
      style="width: 100%"
    >
      <div class="model-static-label">
        <div ref="fieldEditor">
          <pre>{{ widget.options.label }}</pre>
        </div>
        <div class="static-text"></div>
      </div>
      <template v-if="!!widget.widgetList && widget.widgetList.length > 0">
        <template v-for="(subWidget, swIdx) in widget.widgetList" :key="swIdx">
          <template v-if="'container' === subWidget.category">
            <component
              :is="getComponentByContainer(subWidget)"
              :widget="subWidget"
              :key="swIdx"
              :parent-list="widget.widgetList"
              :index-of-parent-list="swIdx"
              :parent-widget="widget"
              :sub-form-row-id="subFormRowId"
              :sub-form-row-index="subFormRowIndex"
              :sub-form-col-index="subFormColIndex"
            >
              <!-- 递归传递插槽！！！ -->
              <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                <slot :name="slot" v-bind="scope" />
              </template>
            </component>
          </template>
          <template v-else>
            <component
              :is="subWidget.type + '-widget'"
              :field="subWidget"
              :designer="null"
              :key="swIdx"
              :parent-list="widget.widgetList"
              :index-of-parent-list="swIdx"
              :parent-widget="widget"
            >
              <!-- 递归传递插槽！！！ -->
              <template v-for="slot in Object.keys($slots)" #[slot]="scope">
                <slot :name="slot" v-bind="scope" />
              </template>
            </component>
          </template>
        </template>
      </template>
    </div>
  </container-item-wrapper>
</template>

<script>
  import emitter from '@/lib/vform/utils/emitter'
  import i18n from '@/lib/vform/utils/i18n'
  import refMixin from '@/lib/vform/components/form-render/refMixin'
  import ContainerItemWrapper from '@/lib/vform/components/form-render/container-item/container-item-wrapper'
  import containerItemMixin from '@/lib/vform/components/form-render/container-item/containerItemMixin'
  import FieldComponents from '@/lib/vform/components/form-designer/form-widget/field-widget/index'
  import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'

  export default {
    name: 'ModuleContainerItem',
    componentName: 'ContainerItem',
    mixins: [emitter, i18n, refMixin, containerItemMixin],
    components: {
      ContainerItemWrapper,
      ...FieldComponents,
      ArrowDown,
      ArrowUp
    },
    props: {
      widget: Object,

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
    inject: ['refList', 'sfRefList', 'globalModel'],
    computed: {
      customClass() {
        return this.widget.options.customClass || ''
      }
    },
    created() {
      this.initRefList()
    },
    beforeUnmount() {
      this.unregisterFromRefList()
    },
    methods: {
      toggleCard() {
        this.widget.options.folded = !this.widget.options.folded
      }
    }
  }
</script>

<style lang="scss" scoped>
  :deep(.el-card__header) {
    padding: 10px 12px;
  }

  .folded :deep(.el-card__body) {
    display: none;
  }

  .clear-fix:before,
  .clear-fix:after {
    display: table;
    content: '';
  }

  .clear-fix:after {
    clear: both;
  }

  .float-right {
    float: right;
  }

  .model-static-label {
    margin-bottom: 20px;
    div:nth-child(1) {
      border-left: 3px solid var(--jy-primary-6);
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
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }
  }
</style>

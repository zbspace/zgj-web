<template>
  <container-wrapper
    :designer="designer"
    :widget="widget"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
  >
    <div
      :key="widget.id"
      class="card-container"
      @click.stop="selectWidget(widget)"
      :shadow="widget.options.shadow"
      :style="{ width: widget.options.cardWidth + '!important' || '' }"
      :class="[
        selected ? 'selected' : '',
        !!widget.options.folded ? 'folded' : '',
        customClass
      ]"
      style="
        padding: 20px 0;
        width: 100%;
        border: 2px dashed var(--jy-primary-6) !important;
      "
    >
      <div class="model-static-label">
        <div ref="fieldEditor">
          <pre>{{ widget.options.label }}</pre>
        </div>
        <div class="static-text"></div>
      </div>
      <draggable
        :list="widget.widgetList"
        item-key="id"
        v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 200 }"
        handle=".drag-handler"
        tag="transition-group"
        :component-data="{ name: 'fade' }"
        @add="evt => widgetAdd(evt, widget.widgetList)"
        @update="onContainerDragUpdate"
        :move="checkContainerMove"
      >
        <template #item="{ element: subWidget, index: swIdx }">
          <div class="form-widget-list">
            <template v-if="'container' === subWidget.category">
              <component
                :is="subWidget.type + '-widget'"
                :widget="subWidget"
                :designer="designer"
                :key="subWidget.id"
                :parent-list="widget.widgetList"
                :index-of-parent-list="swIdx"
                :parent-widget="widget"
              ></component>
            </template>
            <template v-else>
              <component
                :is="subWidget.type + '-widget'"
                :field="subWidget"
                :designer="designer"
                :key="subWidget.id"
                :parent-list="widget.widgetList"
                :index-of-parent-list="swIdx"
                :parent-widget="widget"
                :design-state="true"
              ></component>
            </template>
          </div>
        </template>
      </draggable>
    </div>
  </container-wrapper>
</template>

<script>
  import i18n from '@/lib/vform/utils/i18n'
  import containerMixin from '@/lib/vform/components/form-designer/form-widget/container-widget/containerMixin'
  import ContainerWrapper from '@/lib/vform/components/form-designer/form-widget/container-widget/container-wrapper'
  import FieldComponents from '@/lib/vform/components/form-designer/form-widget/field-widget/index'
  import refMixinDesign from '@/lib/vform/components/form-designer/refMixinDesign'
  import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'

  export default {
    name: 'ModuleContainerWidget',
    componentName: 'ContainerWidget',
    mixins: [i18n, containerMixin, refMixinDesign],
    inject: ['refList'],
    components: {
      ContainerWrapper,
      ...FieldComponents,
      ArrowDown,
      ArrowUp
    },
    props: {
      widget: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object
    },
    watch: {
      'widget.options.label'(val) {
        this.widget.widgetList.forEach(v => {
          v.options.model = this.widget.options.label
        })
      }
    },
    computed: {
      selected() {
        return this.widget.id === this.designer.selectedId
      },

      customClass() {
        return this.widget.options.customClass || ''
      }
    },
    created() {
      this.initRefList()
    },
    methods: {
      /**
       * 检查接收哪些组件拖放，如不接受某些组件拖放，则根据组件类型判断后返回false
       * @param evt
       * @returns {boolean}
       */
      checkContainerMove(evt) {
        return true
      },

      toggleCard() {
        this.widget.options.folded = !this.widget.options.folded
      },

      /**
       * 设置折叠/打开状态
       * @param folded
       */
      setFolded(folded) {
        this.widget.options.folded = !!folded
      },

      widgetAdd(evt) {
        this.widget.widgetList.forEach(v => {
          v.options.model = this.widget.options.label
        })
        this.onContainerDragAdd(evt, this.widget.widgetList)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card-container.selected {
    outline: 2px solid var(--jy-primary-6) !important;
  }

  .card-container {
    margin: 3px;

    .form-widget-list {
      min-height: 28px;
    }

    .model-static-label {
      margin-bottom: 20px;
      div:nth-child(1) {
        border-left: 3px solid #d0963e;
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
  }

  :deep(.el-card__header) {
    padding: 10px 12px;
  }

  :deep(.el-card__body) {
    display: none;
    padding: 20px 0;
  }

  .folded :deep(.el-card__body) {
    // display: none;
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
</style>

<template>
  <div class="flow-helper" id="flow-helper">
    <div id="flow-helper-setting" class="flow-helper-setting" @click="flowConfigDrawer.show()">
      <setting-two-tone />
      <span class="flow-helper-title">流程配置</span>
      <right-outlined class="flow-helper-right-icon" />
    </div>
    <div id="flow-helper-adjuvant" class="flow-helper-adjuvant" @click="flowAdjuvantDrawer.show()">
      <tool-two-tone />
      <span class="flow-helper-title">流程助手</span>
      <right-outlined class="flow-helper-right-icon" />
    </div>
    <a-popover placement="right" v-model="visible">
      <template #content>
        <a-menu mode="vertical" class="flow-ant-menu-vertical">
          <a-menu-item key="1">
            <a-upload :showUploadList="false" name="file" accept=".flow" :multiple="false" :action="null" :transform-file="imports">
              <up-square-two-tone />
              <span>导入</span>
            </a-upload>
          </a-menu-item>
          <a-menu-item key="4" @click="exports(4)">
            <down-square-two-tone />
            <span>导出</span>
          </a-menu-item>
          <a-menu-item key="2" @click="addType(2)">
            <save-two-tone />
            <span>保存为模版</span>
          </a-menu-item>
        </a-menu>
      </template>
      <div id="flow-helper-template" class="flow-helper-template">
        <save-two-tone />
        <span class="flow-helper-title">流程模板</span>
        <right-outlined class="flow-helper-right-icon" />
      </div>
    </a-popover>
    <div id="flow-helper-strengthen" class="flow-helper-strengthen" @click="flowStrengthenDrawer.show()">
      <appstore-two-tone />
      <span class="flow-helper-title">流程增强</span>
      <right-outlined class="flow-helper-right-icon" />
    </div>

    <div id="flow-helper-guide" class="flow-helper-guide" @click="flowGuideDrawer.show()">
      <bulb-two-tone />
      <span class="flow-helper-title">设计指南</span>
      <right-outlined class="flow-helper-right-icon" />
    </div>

    <FlowConfigDrawer ref="flowConfigDrawer" />

    <FlowAdjuvantDrawer ref="flowAdjuvantDrawer" />

    <FlowStrengthenDrawer ref="flowStrengthenDrawer" />

    <FlowGuideDrawer ref="flowGuideDrawer" />
  </div>
</template>
<script setup name="FlowHelper">
import { ref } from 'vue';
import FlowConfigDrawer from './config/FlowConfigDrawer.vue';
import FlowAdjuvantDrawer from './adjuvant/FlowAdjuvantDrawer.vue';
import FlowStrengthenDrawer from './strengthen/FlowStrengthenDrawer.vue';
import FlowGuideDrawer from './guide/FlowGuideDrawer.vue';

const flowConfigDrawer = ref();
const flowAdjuvantDrawer = ref();
const flowStrengthenDrawer = ref();
const flowGuideDrawer = ref();

const onChange = e => {
  placement.value = e.target.value;
};

const emit = defineEmits(['export', 'import']);

const exports = () => {
  emit('export');
};
const imports = file => {
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    if (reader.result) {
      let res = reader.result;
      emit('import', res);
    }
  };
};
</script>

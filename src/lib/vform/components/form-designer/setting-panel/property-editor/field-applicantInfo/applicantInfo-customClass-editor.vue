<template>
 
  <!-- <el-form-item label="申请部门必填">
    <el-switch
      v-model="optionModel.required"
    ></el-switch>
  </el-form-item>
  <el-form-item label="申请部门校验提示">
    <el-input
      v-model="optionModel.requiredHint"
      class="hide-spin-button"
    ></el-input>
  </el-form-item> -->
</template>

<script>
import i18n from "@/lib/vform/utils/i18n";
import propertyMixin from "@/lib/vform/components/form-designer/setting-panel/property-editor/propertyMixin";
import OptionItemsSetting from "@/lib/vform/components/form-designer/setting-panel/option-items-setting"

export default {
  name: "applicantInfo-defaultValue-editor",
  mixins: [i18n, propertyMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
  components: {
    OptionItemsSetting,
  },
  methods: {
    emitDisabled1Change() {
    },
    emitDisabled2Change() {
    },
  },
};
</script>

<style scoped></style>

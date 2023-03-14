<template>
  <el-form-item label="印章类型">
    <el-switch
      v-model="optionModel.showSealType"
    ></el-switch>
  </el-form-item>
</template>

<script>
import i18n from "@/lib/vform/utils/i18n";
import propertyMixin from "@/lib/vform/components/form-designer/setting-panel/property-editor/propertyMixin";
import OptionItemsSetting from "@/lib/vform/components/form-designer/setting-panel/option-items-setting"

export default {
  name: "sealName-customClass-editor",
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

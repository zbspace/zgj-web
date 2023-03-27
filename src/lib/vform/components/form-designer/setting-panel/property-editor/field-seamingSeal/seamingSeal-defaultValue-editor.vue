<template>
  <el-form-item :label="i18nt('designer.setting.defaultValue')">
    <el-switch v-model="optionModel.defaultValue" @change="emitDefaultValueChange"
               active-text="true" inactive-text="false"></el-switch>
  </el-form-item>
</template>

<script>
  import i18n from "@/lib/vform/utils/i18n"
  import propertyMixin from "@/lib/vform/components/form-designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "seamingSeal-defaultValue-editor",
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>

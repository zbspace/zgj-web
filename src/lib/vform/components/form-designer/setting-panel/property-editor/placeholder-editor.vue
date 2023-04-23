<template>
  <el-form-item :label="i18nt('designer.setting.placeholder')">
    <el-input
      type="text"
      v-model="optionModel.placeholder"
      :disabled="!!optionModel.nameDisabled"
    ></el-input>
  </el-form-item>
</template>

<script>
  import i18n from '@/lib/vform/utils/i18n'
  import propertyMixin from '@/lib/vform/components/form-designer/setting-panel/property-editor/propertyMixin'

  export default {
    name: 'PlaceholderEditor',
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  }
</script>

<style scoped></style>

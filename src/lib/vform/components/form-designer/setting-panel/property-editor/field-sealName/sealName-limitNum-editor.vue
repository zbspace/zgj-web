<template>
  <el-form-item label="限制印章次数">
    <el-switch
      v-model="optionModel.limitNum"
      :active-value="1"
      :inactive-value="0"
    ></el-switch>
  </el-form-item>
</template>

<script>
  import i18n from '@/lib/vform/utils/i18n'
  import propertyMixin from '@/lib/vform/components/form-designer/setting-panel/property-editor/propertyMixin'

  export default {
    name: 'SealNameLimitNumEditor',
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    methods: {
      emitDisabled1Change() {},
      emitDisabled2Change() {}
    }
  }
</script>

<style scoped></style>

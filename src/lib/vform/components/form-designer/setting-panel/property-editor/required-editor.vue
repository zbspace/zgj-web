<template>
  <el-form-item :label="i18nt('designer.setting.required')">
    <el-switch v-model="optionModel.required" :disabled="disabled"></el-switch>
  </el-form-item>
</template>

<script>
  import i18n from '@/lib/vform/utils/i18n'

  export default {
    name: 'RequiredEditor',
    mixins: [i18n],
    inject: ['getPrefabricationFieldList'],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        list: []
      }
    },
    computed: {
      disabled() {
        return this.list.includes(this.optionModel.name)
      }
    },
    methods: {
      init() {
        this.list = this.getPrefabricationFieldList() || []
      }
    },
    created() {
      this.init()
    }
  }
</script>

<style scoped></style>

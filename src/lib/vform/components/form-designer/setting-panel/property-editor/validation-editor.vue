<template>
  <el-form-item>
    <template #label>
      <span
        >{{ i18nt('designer.setting.validation') }}
        <el-tooltip
          effect="light"
          :content="i18nt('designer.setting.validationHelp')"
        >
          <svg-icon icon-class="el-info"
        /></el-tooltip>
      </span>
    </template>
    <el-select
      v-model="optionModel.validation"
      filterable
      clearable
      allow-create
      default-first-option
      :disabled="disabled"
    >
      <el-option
        v-for="(fv, fvIdx) in fieldValidators"
        :key="fvIdx"
        :label="fv.label"
        :value="fv.value"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  import SvgIcon from '@/lib/vform/components/svg-icon'
  import i18n from '@/lib/vform/utils/i18n'

  export default {
    name: 'ValidationEditor',
    mixins: [i18n],
    inject: ['getPrefabricationFieldList'],
    components: {
      SvgIcon
    },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        fieldValidators: [
          {
            value: 'number',
            label: this.i18nt('designer.hint.numberValidator')
          },
          {
            value: 'letter',
            label: this.i18nt('designer.hint.letterValidator')
          },
          {
            value: 'letterAndNumber',
            label: this.i18nt('designer.hint.letterAndNumberValidator')
          },
          {
            value: 'mobilePhone',
            label: this.i18nt('designer.hint.mobilePhoneValidator')
          },
          { value: 'email', label: this.i18nt('designer.hint.emailValidator') },
          { value: 'url', label: this.i18nt('designer.hint.urlValidator') },
          {
            value: 'noChinese',
            label: this.i18nt('designer.hint.noChineseValidator')
          },
          {
            value: 'chinese',
            label: this.i18nt('designer.hint.chineseValidator')
          }
        ],
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

<template>
  <span>
    <span>
      <!-- <el-select
        ref="userselect"
        :model="props.mode"
        :size="size"
        placeholder="请选择"
        :open="false"
        :style="{ width: props.showButton ? '85%' : '100%' }"
        v-model:value="currentValue"
        @click="showOrgPlusModal"
      >
        <el-option
          v-for="item in selectedList"
          :label="item.name"
          :value="item.id"
          :key="item.id"
        ></el-option>
      </el-select> -->
      <a-select
        ref="userselect"
        :mode="props.mode"
        :size="size"
        :open="false"
        :style="{ width: props.showButton ? '85%' : '100%' }"
        v-model:value="currentValue"
        @click="showOrgPlusModal"
      >
        <a-select-option
          v-for="item in selectedList"
          :value="item.orgId"
          :key="item.orgId"
          >{{ item.orgName }}</a-select-option
        >
      </a-select>
      <a-button
        v-if="props.showButton"
        @click="showOrgPlusModal"
        :size="size"
        :style="{ width: props.showButton ? '15%' : '0%' }"
      >
        <template #icon>
          <select-outlined />
        </template>
        <span>选择</span>
      </a-button>
    </span>
    <!-- <org-selector-plus
      ref="orgselectorPlus"
      :max="max"
      :min="min"
      :radioModel="radioModel"
      @onBack="callBack"
    /> -->
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
      :tabsShow="tabsShow"
      @update:searchSelected="callBack"
      :searchSelected="searchSelected"
    >
    </kDepartOrPersonVue>
  </span>
</template>
<script setup name="GDept">
  import { ref, watch, toRaw, onMounted } from 'vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  // import { OrganizationApi } from '@/api/system/organization/OrganizationApi'
  // 接收属性
  const showDepPerDialog = ref(false)
  const tabsShow = ref(['organ', 'user'])
  const searchSelected = ref([])
  const props = defineProps({
    mode: { type: String, default: 'combobox' },
    showButton: { type: Boolean, default: false },
    radioModel: { type: Boolean, default: false },
    modelValue: { type: Array, default: () => [] },
    callBackType: { type: String, default: 'array' },
    min: { type: Number, default: 1 },
    max: { type: Number, default: 100000 },
    size: { type: String, default: 'small' }
  })

  const currentValue = ref([])

  const selectedList = ref([])

  watch(
    () => props.modelValue,
    newValue => {
      if (selectedList.value.length === 0) {
        // 获取机构信息
        if (newValue && newValue.length > 0) {
          reload(newValue)
        }
      }
    }
  )

  onMounted(() => {
    if (selectedList.value.length === 0) {
      // 获取机构信息
      if (props.modelValue && props.modelValue.length > 0) {
        reload(props.modelValue)
      }
    }
  })

  const reload = async orgIds => {
    if (!Array.isArray(orgIds)) {
      orgIds = [orgIds]
    }
    // const res = await OrganizationApi.getOrgInfoListByIds({ orgIdList: orgIds })
    // if (res.data) {
    //   res.data.forEach(item => {
    //     currentValue.value.push(item.orgId)
    //     selectedList.value.push(item)
    //   })
    // }
  }

  const showOrgPlusModal = () => {
    showDepPerDialog.value = true
    // orgselectorPlus.value.showOrgPlusModal(selectedList.value.map(a => a.orgId))
  }
  /* const removeSelectedItem = record => {
  remove(selectedList.value, item => item.orgId === record.orgId);
  remove(currentValue.value, item => item === record.orgId);
  // 只有ID
  orgselectorPlus.value.delRecord(record);
  emit('update:modelValue', currentValue.value);
  emit(
    'update:label',
    selectedList.value.map(a => a.orgName)
  );
  emit('update:data', selectedList);
}; */

  const emit = defineEmits([
    'update:modelValue',
    'update:data',
    'update:label',
    'change'
  ])

  /**
   * 确定
   * @param {*} record
   */
  const callBack = records => {
    searchSelected.value = records
    selectedList.value = []
    currentValue.value = []
    for (let index = 0; index < records.length; index++) {
      const element = {
        orgId: records[index].id,
        orgName: records[index].name
      }
      selectedList.value.push(element)
      // 只有ID
      currentValue.value.push(records[index].id)
    }
    if (props.callBackType === 'array') {
      emit('update:modelValue', toRaw(currentValue.value))
      const label = selectedList.value.map(a => a.orgName)
      emit('update:label', label)
      emit('change', toRaw(currentValue.value))
    } else {
      emit('update:modelValue', toRaw(currentValue.value[0]))
      const label = selectedList.value.map(a => a.orgName)
      emit('update:label', label[0])
      emit('change', toRaw(currentValue.value[0]))
    }
    emit('update:data', selectedList)
  }

  defineExpose({})
</script>
<style lang="less" scoped>
  .add-user-wrapper {
    display: flex;
    flex-wrap: wrap;
    min-height: 40px;
    padding-left: 5px;
    .add-user-icon {
      display: flex;
      align-items: center;
      width: 40px;
      height: 32px;
      border-radius: 100px;
      border: 1px solid #3370ff;
      justify-content: center;
      margin-right: 8px;
      margin-top: 8px;
      cursor: pointer;
    }
    .add-user-item {
      display: flex;
      align-items: center;
      min-width: 70px;
      max-width: 50%;
      height: 32px;
      background: #eff0f1;
      border-radius: 16px;
      padding: 0 4px;
      margin-right: 8px;
      margin-top: 8px;

      img {
        width: 24px;
        height: 24px;
        border-radius: 12px;
      }
      div {
        padding: 0;
        margin: 0 4px;
        min-width: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      i {
        margin-right: 10px;
        color: #646a73;
        cursor: pointer;
      }
    }
  }
  .selected-items {
    overflow-y: auto;
    margin: 0 10px 0;
    border: 1px dashed #ccc;
    padding: 4px 4px 0;
    min-height: 34px;
    max-height: 60px;
    .ant-tag {
      margin-bottom: 4px;
    }
  }
  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: #d0963e !important;
  }
</style>

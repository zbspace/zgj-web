<template>
  <span>
    <span v-if="props.type == 'select'">
      <a-select
        ref="userselect"
        :mode="props.mode"
        allowClear
        size="default"
        :open="false"
        style="width: 90%"
        v-model:value="currentValue"
        @click="addApprover"
      >
        <a-select-option
          v-for="item in selectedList"
          :value="item.userId"
          :key="item.userId"
          >{{ item.nickName }}</a-select-option
        >
      </a-select>
      <a-button
        v-if="props.showButton"
        @click="showUserPlusModal"
        style="width: 10%"
      >
        <template #icon>
          <select-outlined />
        </template>
        <span>选择</span>
      </a-button>
    </span>
    <div v-else class="add-user-wrapper">
      <div class="add-user-icon">
        <a-button shape="round" @click="showUserPlusModal">
          <template #icon>
            <plus-outlined />
          </template>
        </a-button>
      </div>
      <div
        class="add-user-item"
        v-for="item in selectedList"
        :key="item.userId"
      >
        <a-avatar size="small">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <div>{{ item.nickName }}</div>
        <close-outlined @click="removeSelectedItem(item)" />
      </div>
    </div>
    <!-- <user-selector-plus
      ref="userselectorPlus"
      :max="max"
      :min="min"
      @onBack="callBack"
    /> -->
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      ref="userselectorPlus"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
      :tabsShow="tabsShow"
      @update:searchSelected="callBack"
      :searchSelected="searchSelected"
    >
    </kDepartOrPersonVue>
  </span>
</template>
<script setup name="GUser">
  import { ref, watch, onMounted } from 'vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import { remove } from 'lodash-es'
  // import { UserApi } from '@/api/system/user/UserApi'
  const showDepPerDialog = ref(false)
  const tabsShow = ref(['user'])
  const searchSelected = ref([])
  // 接收属性
  const props = defineProps({
    mode: { type: String, default: 'default' },
    type: { type: String, default: 'select' },
    showButton: { type: Boolean, default: false },
    modelValue: { type: Array, default: () => [] },
    min: { type: Number, default: 1 },
    max: { type: Number, default: 100000 }
  })

  const currentValue = ref([])

  const selectedList = ref([])

  const userselectorPlus = ref()

  watch(
    () => props.modelValue,
    newValue => {
      if (selectedList.value.length == 0) {
        // 获取用户信息
        if (newValue && newValue.length > 0) {
          reload(newValue)
        }
      }
    }
  )

  onMounted(() => {
    if (selectedList.value.length == 0) {
      // 获取机构信息
      if (props.modelValue && props.modelValue.length > 0) {
        reload(props.modelValue)
      }
    }
  })

  const reload = async userIds => {
    // const res = await UserApi.getUsersByUserIds({ userIds })
    // if (res.data) {
    //   res.data.forEach(item => {
    //     currentValue.value.push(item.userId)
    //     selectedList.value.push(item)
    //     emit(
    //       'update:label',
    //       selectedList.value.map(a => a.nickName)
    //     )
    //   })
    // }
  }

  const showUserPlusModal = () => {
    // userselectorPlus.value.showUserPlusModal(
    //   selectedList.value.map(a => a.userId)
    // )
    showDepPerDialog.value = true
  }

  const removeSelectedItem = record => {
    remove(selectedList.value, item => item.userId === record.userId)
    remove(currentValue.value, item => item === record.userId)
    remove(searchSelected.value, item => item.id === record.userId)
    // 只有ID
    // userselectorPlus.value.delRecord(record)
    emit('update:modelValue', currentValue.value)
    emit(
      'update:label',
      selectedList.value.map(a => a.nickName)
    )
    emit('update:data', selectedList)
  }

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
    console.log(records)
    searchSelected.value = records
    selectedList.value = []
    currentValue.value = []
    for (let index = 0; index < records.length; index++) {
      const element = {
        userId: records[index].id,
        nickName: records[index].name
      }
      selectedList.value.push(element)
      // 只有ID
      currentValue.value.push(records[index].id)
    }
    emit('update:modelValue', currentValue.value)
    emit(
      'update:label',
      selectedList.value.map(a => a.nickName)
    )
    emit('update:data', selectedList)
    emit('change', selectedList.value)
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
  .ant-btn:hover,
  .ant-btn:focus {
    color: #d0963e;
    border-color: #d0963e;
  }
</style>

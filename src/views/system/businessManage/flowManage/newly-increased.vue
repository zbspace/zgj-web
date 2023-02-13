<template>
  <div class="flowManage-newly-increased">
    <layout
      @clickCutTabs="clickCutTabs"
      :tabsData="state.processTabs.data"
      @close="clickClose"
    >
      <template #backTitle>
        <span class="process-back-text">新增</span>
      </template>
      <template #subTitle>
        <div class="process-save">
          <div class="process-save-down">
            <el-popover placement="bottom" :width="400" trigger="click">
              <template #reference>
                <div class="process-save-down-text"> 5项不完善 </div>
              </template>
              <div class="popover-cont">
                <div class="popover-cont-title">内容不完善，当前无法发布</div>
                <div class="popover-cont-subTitle">
                  以下内容不完善，请修改后发布
                </div>
                <div class="popover-cont-list">
                  <div class="popover-cont-list-li" v-for="n in 6" :key="n">
                    <div class="popover-cont-list-li-name">基础信息</div>
                    <div class="popover-cont-list-li-desc">
                      流程名称不能为空
                    </div>
                    <div class="popover-cont-list-li-but">去修改 </div>
                  </div>
                </div>
              </div>
            </el-popover>
          </div>
          <el-button class="process-save-but" type="primary"> 保存 </el-button>
        </div>
      </template>
      <template #content>
        <basicsInfo
          v-if="state.processTabs.checkedNode.index == '1'"
        ></basicsInfo>
        <AssociationForm
          v-if="state.processTabs.checkedNode.index == '2'"
        ></AssociationForm>
        <advancedSetup
          v-if="state.processTabs.checkedNode.index == '4'"
        ></advancedSetup>
      </template>
    </layout>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted } from 'vue'
  import layout from './layout.vue'
  import basicsInfo from './basics-info.vue'
  import AssociationForm from './Association-form.vue'
  import advancedSetup from './advanced-setup.vue'
  const emit = defineEmits(['close', 'update:modelValue', 'clickCutTabs'])
  const state = reactive({
    processTabs: {
      checkedNode: {},
      data: [
        {
          index: '1',
          label: '基础信息'
        },
        {
          index: '2',
          label: '关联表单',
          checked: true
        },
        {
          index: '3',
          label: '流程设计'
        },
        {
          index: '4',
          label: '高级设置'
        }
      ]
    }
  })
  // 点击切换选项
  function clickCutTabs(data, item) {
    data.forEach(element => {
      element.checked = false
    })
    item.checked = true
    // 处理选项
    disCutTabs()
  }
  // 处理选项
  function disCutTabs() {
    state.processTabs.data.forEach(item => {
      if (item.checked) {
        state.processTabs.checkedNode = item
      }
    })
  }
  // 点击关闭弹框
  function clickClose() {
    emit('close')
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 处理选项
    disCutTabs()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .flowManage-newly-increased {
    margin: 0%;
    width: 100%;
    height: 100%;
    .process-save {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .process-save-down {
        margin-right: 0.5rem;
        .process-save-down-text {
          color: var(--danger-6);
          cursor: pointer;
        }
      }
    }
  }
  .popover-cont {
    padding: 0.5rem;
    color: var(--color-text-1);
    .popover-cont-title {
      font-size: var(--font-size-title-1);
    }
    .popover-cont-subTitle {
      color: var(--color-text-3);
      margin-top: 0.8rem;
    }
    .popover-cont-list {
      margin-top: 0.2rem;
      .popover-cont-list-li {
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.04);
        justify-content: space-between;
        padding: 0.8rem 1rem;
        margin: 0rem 0rem 0.5rem 0rem;
        .popover-cont-list-li-name {
          width: 4rem;
        }
        .popover-cont-list-li-desc {
          color: var(--color-text-3);
          width: calc(100% - 7rem);
          padding: 0% 0.5rem;
        }
        .popover-cont-list-li-but {
          color: var(--Info-6);
          width: 3rem;
          cursor: pointer;
        }
      }
    }
  }
</style>

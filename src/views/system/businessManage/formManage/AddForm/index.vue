<template>
  <div>
    <el-dialog
      v-model="isVisible"
      title="add form"
      fullscreen
      class="add-form-dialog"
    >
      <layout
        @clickCutTabs="clickCutTabs"
        :tabsData="state.processTabs.data"
        @close="clickClose"
      >
        <template #backTitle>
          <span class="process-back-text">{{ props.addTitle }}</span>
        </template>
        <template #subTitle>
          <div class="process-save">
            <el-button
              class="process-save-but"
              type="primary"
              @click="clickSave"
            >
              保存
            </el-button>
          </div>
        </template>
        <template #content>
          <div
            class="formBase"
            v-show="state.processTabs.checkedNode.index == 1"
          >
            <div class="formBase-bg">
              <div class="form-title">请填写如下基础信息</div>
              <el-form
                ref="formRef"
                :model="formData"
                label-width="120px"
                :rules="rules"
              >
                <el-form-item prop="formName" label="表单名称">
                  <el-input v-model="formData.formName" />
                </el-form-item>

                <el-form-item label="业务类型" prop="applyTypeId">
                  <el-select
                    v-model="formData.applyTypeId"
                    placeholder="请选择"
                    @change="onChange"
                    style="width: 430px"
                  >
                    <el-option
                      :label="item.applyTypeName"
                      :value="item.applyTypeId"
                      v-for="item in optionData"
                      :key="item.applyTypeId"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item
                  label="用印类型"
                  v-if="formData.applyTypeId === '2'"
                >
                  <el-radio-group v-model="formData.sealUseTypeId">
                    <el-radio label="1">物理用印</el-radio>
                    <el-radio label="2">电子签章</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="表单说明">
                  <el-input
                    v-model="formData.readme"
                    type="textarea"
                    maxlength="100"
                    show-word-limit
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>

          <!-- 表单设计 -->
          <JyVform
            ref="vformRef"
            v-if="state.processTabs.checkedNode.index === '2'"
            style="margin-top: 0; width: 100%"
            :businessType="formData.applyTypeId"
            :templateList="templateList"
            :prefabricationFieldList="prefabricationFieldList"
            @on-loaded="onLoaded"
          />
        </template>
      </layout>
    </el-dialog>
  </div>
</template>

<script setup>
  import { ref, reactive, computed, onMounted, nextTick } from 'vue'
  import { ElMessage } from 'element-plus'
  import layout from '@/views/system/businessManage/flowManage/layout'
  // import template1 from './templates/template1'
  // import template2 from './templates/template2'
  // import template3 from './templates/template3'
  // import template4 from './templates/template4'
  // import template5 from './templates/template5'
  // import template6 from './templates/template6'
  // import template7 from './templates/template7'
  // import template8 from './templates/template8'
  // import template9 from './templates/template9'
  import formManageService from '@/api/system/formManagement'

  const vformRef = ref(null)
  const formData = ref({
    formName: '',
    applyTypeId: '2',
    sealUseTypeId: '1',
    readme: '',
    formInfo: ''
  })

  const formRef = ref(null)
  const props = defineProps({
    addTitle: {
      type: String,
      default: ''
    },

    columnData: {
      type: Object,
      default: () => {}
    },

    formId: {
      type: String,
      default: ''
    },

    modelValue: {
      type: Boolean,
      default: false
    },

    optionData: {
      type: Array,
      default: () => []
    }
  })
  const emit = defineEmits(['update:modelValue', 'close'])
  const state = reactive({
    processTabs: {
      checkedNode: {},
      data: [
        {
          index: '1',
          label: '基础信息',
          checked: true
        },
        {
          index: '2',
          label: '表单设计',
          checked: false
        }
      ]
    },
    isShowFrom: false
  })

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const optionData = computed(() => {
    return props.optionData.filter(v => v.applyTypePid)
  })

  const prefabricationFieldList = ref(['sealName'])

  // const templateList = ref([
  //   {
  //     title: '用印申请',
  //     imgUrl:
  //       'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t1.png',
  //     jsonUrl: JSON.stringify(template7),
  //     description: '用印申请'
  //   }
  // ])

  const rules = {
    formName: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur'
      }
    ],
    applyTypeId: [
      {
        required: true,
        message: '请选择',
        trigger: 'change'
      }
    ]
  }

  const onChange = businessType => {
    // getTemplateList(businessType)
  }

  // 点击切换选项
  const clickCutTabs = async (data, item) => {
    try {
      if (item.index === '2') {
        await formRef.value.validate()
      }
      data.forEach(element => {
        element.checked = false
      })
      item.checked = true
      // 处理选项
      disCutTabs()
    } catch (error) {
      state.processTabs.data[1].checked = false
      state.processTabs.data[0].checked = true
    }
  }

  // 处理选项
  const disCutTabs = () => {
    state.processTabs.data.forEach(item => {
      if (item.checked) {
        state.processTabs.checkedNode = item
      }
    })
    if (state.processTabs.checkedNode.index === '3') {
      nextTick(() => {
        // 设置表单模板默认数据
        console.log('nextTick')
      })
    }
  }

  // 点击关闭弹框
  const clickClose = () => {
    emit('close')
  }

  // 点击保存
  const clickSave = async () => {
    try {
      const formInfo = await vformRef.value.getFormJson()
      await formManageService.formAdd({
        formName: formData.value.formName,
        applyTypeId: formData.value.applyTypeId,
        sealUseTypeId: formData.value.sealUseTypeId,
        readme: formData.value.readme,
        formInfo: JSON.stringify(formInfo)
      })
      isVisible.value = false
      ElMessage.success('表单添加成功')
    } catch (error) {
      ElMessage.error(error)
    }
  }

  // 获取模板list
  // const getTemplateList = async businessType => {
  //   switch (businessType) {
  //     case '1-1': // 用印申请
  //       templateList.value = [
  //         {
  //           title: '用印申请',
  //           imgUrl:
  //             'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t1.png',
  //           jsonUrl: JSON.stringify(template7),
  //           description: '用印申请'
  //         }
  //       ]
  //       prefabricationFieldList.value = ['sealName']
  //       break
  //     case '2-1': // 转办申请
  //       templateList.value = [
  //         {
  //           title: '转办申请',
  //           imgUrl:
  //             'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t1.png',
  //           jsonUrl: JSON.stringify(template2),
  //           description: '转办申请'
  //         }
  //       ]
  //       prefabricationFieldList.value = ['applicantInfo']
  //       break
  //     default:
  //       break
  //   }
  // }

  const onLoaded = async () => {
    // vformRef.value.setFormJson(templateList.value[0].jsonUrl)
  }

  onMounted(() => {
    disCutTabs()
  })
</script>

<style lang="scss" scoped>
  :deep(.add-form-dialog) {
    background: #f2f2f2;

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 0;
      height: 100%;
      overflow: auto;
    }

    .el-dialog__footer {
      border-top: 1px solid #e9ebec;
    }

    .custom-tabs-label {
      display: flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.45);

      .order {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 14px;
        color: rgba(0, 0, 0, 0.45);
      }
    }

    .el-tabs__item.is-active {
      .custom-tabs-label {
        color: #d0963e;
      }

      .order {
        color: #fff;
        background: #d0963e;
        border: none;
      }
    }

    .el-tabs__item:hover {
      .custom-tabs-label {
        color: #d0963e;
      }

      .order {
        color: #fff;
        background: #d0963e;
        border: none;
      }
    }
  }

  .form-header {
    width: 100%;
    height: 64px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
    background: #ffffff;
    padding: 0 24px;
    /* 投影/默认 */

    box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
      0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);

    .backPrev {
      font-size: 22px;
      color: rgba(0, 0, 0, 0.85);
      cursor: pointer;

      .iconpark-icon {
        width: 18px;
        height: 18px;
        margin-right: 8px;
      }
    }

    .save-btn {
      background: #d0963e;
      border-radius: 2px;
      color: #ffffff;
    }
  }

  .formBase {
    width: 80%;
    height: 85%;
    background: #fff;
    margin: 72px auto 0 auto;
    min-width: 600px;

    .formBase-bg {
      width: 495px;
      margin: 0 auto;
      padding-top: 52px;
    }

    .form-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 22px;
      margin-bottom: 24px;
      text-align: center;
    }
  }
</style>

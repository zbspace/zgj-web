<template>
  <div>
    <el-dialog
      v-model="isVisible"
      title="add form"
      fullscreen
      class="add-form-dialog"
    >
      <div class="form-header">
        <div class="backPrev" @click="backPrev">
          <svg class="iconpark-icon">
            <use href="#Vector8Stroke"></use>
          </svg>
          {{ props.formId ? '编辑' : '新增' }}
        </div>
        <div>
          <el-tabs class="demo-tabs" @tab-change="handleChange">
            <el-tab-pane>
              <template #label>
                <span class="custom-tabs-label">
                  <div class="order">1</div>
                  <span>基础信息</span>
                </span>
              </template>
            </el-tab-pane>
            <el-tab-pane>
              <template #label>
                <span class="custom-tabs-label">
                  <div class="order">2</div>
                  <span>表单设计</span>
                </span>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div>
          <el-button class="save-btn" @click="submitForm">保存</el-button>
        </div>
      </div>
      <div class="formBase" v-show="!isShowFrom">
        <div class="formBase-bg">
          <div class="form-title">请填写如下基础信息</div>
          <!-- <v-form-render
            :form-json="formJson"
            :form-data="formData"
            :option-data="optionData"
            ref="vFormRef"
            @buttonClick="clickSelect"
            @changeSelectForm="fromSelect"
          >
          </v-form-render> -->
          <JyVform
            ref="vFormRef"
            mode="render"
            :formJson="formJson"
            :formData="formData"
            :optionData="optionData"
            @buttonClick="clickSelect"
            @on-loaded="onLoaded"
            key="1"
          />
        </div>
      </div>
      <jy-vform
        ref="vformRef"
        v-show="isShowFrom"
        style="margin-top: 48px"
        key="2"
      />

      <!-- <template #footer>
        <el-button @click="cancel"> 取消 </el-button>
        <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
      </template> -->
    </el-dialog>
  </div>
</template>

<script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import formStepJson from '@/views/addDynamicFormJson/formStep'
  const vformRef = ref(null)
  const isShowFrom = ref(false)
  const formJson = reactive(formStepJson)
  const formData = reactive({})
  const optionData = reactive({})
  const vFormRef = ref(null)
  const submitForm = type => {
    if (!type) {
      vFormRef.value.resetForm()
      return
    }
    vFormRef.value
      .getFormData()
      .then(formData => {
        // Form Validation OK
        if (isShowFrom.value) {
          alert(JSON.stringify(formData))
          showFormDialog.value = false
        } else {
          isShowFrom.value = true
        }
      })
      .catch(error => {
        // Form Validation failed

        ElMessage.error(error)
      })
  }
  const props = defineProps({
    formId: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  })

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const emit = defineEmits(['update:modelValue', 'formClose'])
  const cancel = () => {
    emit('update:modelValue', false)
  }
  const handleSubmit = () => {
    emit('update:modelValue', true)
    console.log('vform--->', vformRef.value.getFormJson())
  }
  function backPrev() {
    emit('update:modelValue', false)
    emit('formClose', false)
  }
  function handleChange(name) {
    isShowFrom.value = name > 0
    console.log(vFormRef)
  }

  const onLoaded = () => {
    vFormRef.value.setFormJson(formJson)
  }
  const clickSelect = () => {}
  onMounted(() => {
    console.log(`the component is now mounted.`)
  })
</script>

<style lang="scss" scoped>
  :deep(.add-form-dialog) {
    padding-top: 16px;
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
    }

    .form-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 22px;
      margin-bottom: 24px;
      text-align: center;
    }
  }
</style>

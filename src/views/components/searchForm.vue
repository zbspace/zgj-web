<template>
  <div class="components-searchForm">
    <div
      class="ap-dis"
      :class="{
        'border-bottom':
          state.props.defaultAttribute['border-bottom'] === false ? false : true
      }"
    >
      <el-scrollbar
        :max-height="state.props.defaultAttribute['scrollbar-max-height']"
        class="fromData-scrollbar"
      >
        <div class="fromData">
          <div
            class="ap-box"
            v-for="(item, index) in state.cache.formData"
            :key="index"
            :style="[
              props.style.lineStyle,
              item.style,
              computedFill(item, index)
            ]"
          >
            <!-- input 输入框-->
            <div class="ap-box-cont input" v-if="item.type == 'input'">
              <div class="ap-box-label" :style="props.style.labelStyle">
                <span class="ap-box-label-necessary" v-if="item.isNecessary"
                  >*</span
                >
                {{ item.label }}
              </div>
              <div class="ap-box-contBox">
                <el-input
                  class="width-100"
                  v-bind="item.defaultAttribute"
                  v-model="item.value"
                  clearable
                  @keyup.enter="reloadData"
                />
              </div>
            </div>
            <!-- dialog 选择弹出框-->
            <div
              class="ap-box-cont derivable"
              v-else-if="item.type == 'dialog'"
            >
              <div class="ap-box-label" :style="props.style.labelStyle">
                <span class="ap-box-label-necessary" v-if="item.isNecessary">
                  *
                </span>
                {{ item.label }}
              </div>
              <div class="ap-box-contBox width-0">
                <el-select
                  v-model="item.values"
                  v-bind="item.defaultAttribute"
                  tag-type="waring"
                  disabled
                  style="width: 100%"
                  :class="
                    (item.defaultAttribute.multiple && item.values.length) ||
                    (!item.defaultAttribute.multiple && item.values)
                      ? 'hasContent'
                      : ''
                  "
                  @click="clickDialog(item, index)"
                >
                  <el-option
                    v-for="one in item.options"
                    :key="one.value"
                    :label="one.label"
                    :value="one.value"
                  />
                </el-select>
                <div
                  class="ap-box-contBox-icon"
                  @click="clickDialog(item, index)"
                >
                  <img
                    class="ap-box-contBox-icon-img"
                    src="../../assets/svg/ketanchude.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <!-- derivable 选择弹出框-->
            <div
              class="ap-box-cont derivable"
              v-else-if="item.type == 'derivable'"
            >
              <div class="ap-box-label" :style="props.style.labelStyle">
                <span class="ap-box-label-necessary" v-if="item.isNecessary">
                  *
                </span>
                {{ item.label }}
              </div>
              <div class="ap-box-contBox width-0">
                <el-select
                  v-model="item.values"
                  v-bind="item.defaultAttribute"
                  :ref="el => setRef(el, item)"
                  style="width: 100%"
                  :class="
                    (item.defaultAttribute.multiple &&
                      item.values &&
                      item.values.length) ||
                    (!item.defaultAttribute.multiple && item.values)
                      ? 'hasContent'
                      : ''
                  "
                  @click="clickElement(item, index)"
                >
                  <el-option
                    v-for="one in item.options"
                    :key="one.value"
                    :label="one.label"
                    :value="one.value"
                  />
                </el-select>
                <div class="ap-box-contBox-icon">
                  <img
                    class="ap-box-contBox-icon-img"
                    src="../../assets/svg/ketanchude.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <!-- select 下拉选择框-->
            <div class="ap-box-cont select" v-else-if="item.type == 'select'">
              <div class="ap-box-label" :style="props.style.labelStyle">
                <span class="ap-box-label-necessary" v-if="item.isNecessary"
                  >*</span
                >
                {{ item.label }}
              </div>
              <div class="ap-box-contBox">
                <el-select
                  class="width-100"
                  v-bind="item.defaultAttribute"
                  v-model="item.value"
                  clearable
                  :multiple="
                    item.defaultAttribute
                      ? item.defaultAttribute.multiple
                      : false
                  "
                  @change="reloadData"
                >
                  <el-option
                    v-for="data in item.options"
                    :key="data[item.optionValue || 'value']"
                    :label="data[item.optionLabel || 'label']"
                    :value="data[item.optionValue || 'value']"
                  />
                </el-select>
              </div>
            </div>
            <!-- picker 时间选择器-->
            <div class="ap-box-cont picker" v-else-if="item.type == 'picker'">
              <div class="ap-box-label" :style="props.style.labelStyle">
                <span class="ap-box-label-necessary" v-if="item.isNecessary"
                  >*</span
                >
                {{ item.label }}
              </div>
              <div class="ap-box-contBox width-0">
                <el-date-picker
                  class="width-100"
                  v-bind="item.defaultAttribute"
                  v-model="item.value"
                  @change="changeDatePicker"
                />
              </div>
            </div>
            <!-- checkbox 多选-->
            <div
              class="ap-box-cont checkbox"
              v-else-if="item.type == 'checkbox'"
            >
              <div class="ap-box-label" :style="props.style.labelStyle">
                <span class="ap-box-label-necessary" v-if="item.isNecessary"
                  >*</span
                >
                {{ item.label }}
              </div>
              <div
                class="ap-box-autoBox checkbox"
                v-for="(data, num) in item.checkbox"
                :key="num"
              >
                <el-checkbox
                  v-bind="data.defaultAttribute"
                  :style="data.style"
                  v-model="data.value"
                />
              </div>
            </div>
            <!-- radio 单选-->
            <div class="ap-box-cont radio" v-else-if="item.type == 'radio'">
              <div class="ap-box-label" :style="props.style.labelStyle">{{
                item.label
              }}</div>
              <div class="ap-box-autoBox">
                <el-radio-group
                  v-bind="item.defaultAttribute"
                  v-model="item.value"
                  @change="reloadData"
                >
                  <el-radio
                    v-for="(data, num) in item.radio"
                    :key="num"
                    :label="data.label"
                    >{{ data.name }}</el-radio
                  >
                </el-radio-group>
              </div>
            </div>
            <!-- cascader 级联-->
            <div
              class="ap-box-cont cascader"
              v-else-if="item.type == 'cascader'"
            >
              <div class="ap-box-label" :style="props.style.labelStyle">
                <span class="ap-box-label-necessary" v-if="item.isNecessary"
                  >*</span
                >
                {{ item.label }}
              </div>
              <div class="ap-box-contBox">
                <el-cascader
                  class="width-100"
                  style="width: 100%"
                  v-bind="item.defaultAttribute"
                  v-model="item.value"
                  @change="reloadData"
                />
              </div>
            </div>
            <!-- switch 开关-->
            <div class="ap-box-cont switch" v-else-if="item.type == 'switch'">
              <div class="ap-box-label" :style="props.style.labelStyle">
                <span class="ap-box-label-necessary" v-if="item.isNecessary"
                  >*</span
                >
                {{ item.label }}
              </div>
              <div class="ap-box-contBox">
                <el-switch
                  v-bind="item.defaultAttribute"
                  v-model="item.value"
                />
              </div>
            </div>
            <!-- radioButton 单选按钮-->
            <div
              class="ap-box-cont radioButton"
              v-else-if="item.type == 'radioButton'"
            >
              <div class="ap-box-label" :style="props.style.labelStyle">
                <span class="ap-box-label-necessary" v-if="item.isNecessary"
                  >*</span
                >
                {{ item.label }}
              </div>
              <div class="ap-box-contBox">
                <div
                  class="button-contBox"
                  v-for="(data, num) in item.data"
                  :key="num"
                >
                  <div
                    class="custom-button"
                    :class="{ checked: data.checked ? true : false }"
                    :style="item.style"
                    @click="clickradioBut(item.data, data, num)"
                  >
                    {{ data.name }}
                    <img
                      class="custom-button-checkIcon"
                      src="@/assets/svg/anniu-xuanzhong.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- checkButton 多选按钮-->
            <div
              class="ap-box-cont checkButton"
              v-else-if="item.type == 'checkButton'"
            >
              <div class="ap-box-label" :style="props.style.labelStyle">
                <span class="ap-box-label-necessary" v-if="item.isNecessary"
                  >*</span
                >
                {{ item.label }}
              </div>
              <div class="ap-box-contBox">
                <div
                  class="button-contBox"
                  v-for="(data, num) in item.data"
                  :key="num"
                >
                  <div
                    class="custom-button"
                    :class="{ checked: data.checked ? true : false }"
                    :style="item.style"
                    @click="clickcheckBut(item.data, data, num)"
                  >
                    {{ data.name }}
                    <img
                      class="custom-button-checkIcon"
                      src="@/assets/svg/anniu-xuanzhong.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- scopeInput 范围输入框 -->
            <div
              class="ap-box-cont scopeInput"
              v-if="item.type == 'scopeInput'"
            >
              <div class="ap-box-label" :style="props.style.labelStyle">
                <span class="ap-box-label-necessary" v-if="item.isNecessary"
                  >*</span
                >
                {{ item.label }}
              </div>
              <div class="ap-box-contBox">
                <div class="ap-box-contBox-start">
                  <el-input
                    class="width-100"
                    v-bind="item.startAttribute"
                    v-model="item.startValue"
                  />
                </div>
                <div class="ap-box-contBox-cut"> - </div>
                <div class="ap-box-contBox-end">
                  <el-input
                    class="width-100"
                    v-bind="item.endAttribute"
                    v-model="item.endValue"
                  />
                </div>
              </div>
            </div>
            <!-- custom 自定义内容-->
            <div class="ap-box-cont custom" v-else-if="item.type == 'custom'">
              <div class="ap-box-label" :style="props.style.labelStyle">
                <span class="ap-box-label-necessary" v-if="item.isNecessary"
                  >*</span
                >
                {{ item.label }}
              </div>
              <div
                class="ap-box-contBox"
                v-for="(data, num) in item.data"
                :key="num"
              >
                <slot :name="data.id"></slot>
              </div>
            </div>
          </div>
          <div class="butData" :style="props.style.butLayoutStyle">
            <div
              class="ap-box"
              v-for="(item, index) in props.butData"
              :key="index"
              :style="item.style"
            >
              <div
                class="ap-box-cont"
                v-if="item.type == 'click'"
                @click="clickSubmit(item, index)"
              >
                <el-button v-bind="item.defaultAttribute">{{
                  item.name
                }}</el-button>
              </div>
              <div
                class="ap-box-cont unfold"
                v-if="item.type == 'unfold' && state.cache.showUnfold"
                @click="clickCutUnfoldstatus"
              >
                <div class="unfold-" v-if="state.cache.isUnfold == 0">
                  展开
                  <img
                    class="unfold-icon"
                    src="../../assets/svg/xiangxia-lan.svg"
                    alt=""
                    srcset=""
                  />
                </div>
                <div v-else-if="state.cache.isUnfold == 1">
                  收起
                  <img
                    class="unfold-icon"
                    src="../../assets/svg/xiangshang-lan.svg"
                    alt=""
                    srcset=""
                  />
                </div>
              </div>
              <div
                class="ap-box-cont"
                v-if="item.type == 'text'"
                @click="clickSubmit(item, index)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <!-- 往来单位弹框选择 -->
    <JyRelatedCompany
      v-model="wldwDialogVisible"
      @on-submit="relatedCompanySubmit"
      :checkType="checkType"
      :haveSelectList="fieldModel"
    />

    <!-- 印章选择弹框 -->
    <JySelectSeal
      v-model="yzDialogVisible"
      :haveSelectList="selectedData"
      :checkType="checkType"
      @on-submit="getSelection"
    />

    <!-- 选择文件类型 -->
    <KDocumentTypeDialog
      v-model:show="showDocumentTypeDialog"
      :searchSelected="documentTypeSelected"
      @update:searchSelected="documentTypeSubmit"
    ></KDocumentTypeDialog>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, computed, ref, watch } from 'vue'
  import KDocumentTypeDialog from '@/views/components/modules/KDocumentTypeDialog'
  import request from '@/utils/request'
  const props = defineProps({
    // 标识
    refs: {
      type: String,
      default: ''
    },
    // 处理类型
    type: {
      type: String,
      default: '0'
    },
    // 表单数据
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 按钮数据
    butData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 样式
    style: {
      type: Object,
      default: () => {
        return {
          lineStyle: {
            width: 'calc(100% / 3)'
          },
          cutOffRuleStyle: {
            width: '100%'
          },
          labelStyle: {
            width: '100px'
          },
          butLayoutStyle: {
            width: '100%',
            'justify-content': 'center'
          }
        }
      }
    },
    // 默认属性
    defaultAttribute: {
      type: Object,
      default: () => {
        return {
          isUnfold: false,
          'scrollbar-max-height': 'auto',
          'border-bottom': true
        }
      }
    }
  })
  const showDocumentTypeDialog = ref(false)
  const documentTypeSelected = ref([])
  const kDialogOpenId = ref(null)
  const wldwDialogVisible = ref(false)
  const yzDialogVisible = ref(false)
  const selectedData = ref(null)
  const fieldModel = ref(null)
  const dialogCurrent = ref(null)
  const checkType = ref(null)

  const emit = defineEmits(['clickSubmit', 'reloadData'])

  const state = reactive({
    props: {
      // 默认属性
      defaultAttribute: {
        isUnfold: false,
        'scrollbar-max-height': 'auto',
        'border-bottom': true
      }
    },
    cache: {
      // 分割线样式
      cutOffRuleStyle: {
        width: '100%'
      },
      // 是否展开
      isUnfold: 0,
      // 表单数据
      formData: [],
      // 是否显示咱开
      showUnfold: false
    }
  })

  // 计算 占满一行
  const computedFill = computed(() => {
    return (item, index) => {
      const fixed = [
        'custom',
        'checkbox',
        'radio',
        'switch',
        'radioButton',
        'checkButton'
      ]
      const alterable = []
      if (
        fixed.indexOf(item.type) > -1 &&
        index < state.cache.formData.length - 1
      ) {
        return {
          width: '100%'
        }
      } else if (
        fixed.indexOf(item.type) > -1 &&
        index === state.cache.formData.length - 1
      ) {
        return {
          width: 'auto',
          'min-width': 'calc(100% / 3 * 2 + 100px)'
        }
      } else if (
        alterable.indexOf(item.type) > -1 &&
        index < state.cache.formData.length - 1
      ) {
        return {
          width: 'auto'
        }
      } else if (
        alterable.indexOf(item.type) > -1 &&
        index === state.cache.formData.length - 1
      ) {
        return {
          width: 'auto'
        }
      } else {
        return {}
      }
    }
  })

  // 初始化Props数据
  function initPropsData() {
    if (props.defaultAttribute) {
      for (const key in props.defaultAttribute) {
        state.props.defaultAttribute[key] = props.defaultAttribute[key]
      }
    }

    // 初始化表单单数据
    initFormData()
  }

  const serachData = computed({
    get() {
      return props.data
    }
  })

  watch(
    () => props.data,
    () => {
      initPropsData()
    }
  )

  // 初始化表单单数据
  function initFormData(searchQuery) {
    const queryData = searchQuery || serachData.value
    let showUnfold = false
    if (props.defaultAttribute.isUnfold) {
      state.cache.isUnfold = props.defaultAttribute.isUnfold
    }

    queryData.forEach(item => {
      if (!item.inCommonUse) {
        showUnfold = true
      }
      if (item.requestObj) {
        request(item.requestObj).then(res => {
          console.log(res)
          item.options = res.data
        })
      }
    })
    state.cache.showUnfold = showUnfold

    // 设置表单显示数据
    setFormData(queryData)
  }

  // 设置表单显示数据
  function setFormData(searchQuery) {
    const queryData = searchQuery || serachData.value
    let formData = []
    if (state.cache.isUnfold === 0) {
      queryData.map(item => {
        if (item.inCommonUse) {
          formData.push(item)
        }
        return item
      })
    } else if (state.cache.isUnfold === 1) {
      formData = queryData
    }
    state.cache.formData = formData
  }

  // 获取当前表单的值
  function reloadData() {
    emit('reloadData')
  }
  const derivableRef = {}
  // 点击表单
  function clickElement(item, index) {
    derivableRef[item.id].blur()
    if (item.defaultAttribute.type === 'document') {
      showDocumentTypeDialog.value = true
      kDialogOpenId.value = item.id
    }
    // showDepPerDialog.value = true
    // kDialogOpenId.value = item.id
    // if (item.defaultAttribute.type === 'user') {
    //   tabsShow.value = ['user']
    //   searchSelected.value = []
    // } else {
    //   tabsShow.value = ['organ']
    //   searchSelected.value = []
    // }
  }

  // 文件类型提交
  const documentTypeSubmit = value => {
    const index = state.cache.formData.findIndex(
      i => i.id === kDialogOpenId.value
    )
    if (index > -1) {
      if (state.cache.formData[index].defaultAttribute.multiple) {
        state.cache.formData[index].values = value.map(i => i.id)
      } else {
        state.cache.formData[index].values = value[0].id
      }
      state.cache.formData[index].options = value.map(i => {
        return {
          label: i.name,
          value: i.id
        }
      })
    }
  }

  // 点击按钮
  function clickSubmit(item, index) {
    console.log(item, 'clickSubmit')
    emit('clickSubmit', item, index)
  }

  // 点击切换展开状态
  function clickCutUnfoldstatus() {
    if (state.cache.isUnfold === 0) {
      state.cache.isUnfold = 1
    } else if (state.cache.isUnfold === 1) {
      state.cache.isUnfold = 0
    }
    // 设置表单显示数据
    setFormData()
  }

  // 点击选中单选按钮
  function clickradioBut(arr, node, index) {
    // console.log(arr, node, index)
    if (node.checked) {
      arr[index].checked = false
    } else {
      arr.forEach(element => {
        element.checked = false
      })
      arr[index].checked = true
    }
  }
  // 点击选中多选按钮
  function clickcheckBut(arr, node, index) {
    // console.log(arr, node, index)
    if (node.checked) {
      arr[index].checked = false
    } else {
      arr[index].checked = true
    }
  }
  function changeDatePicker(val) {
    if (!val) {
      emit('reloadData')
    }
  }
  // dialog
  function clickDialog(item, index) {
    checkType.value = item.defaultAttribute.multiple ? 'checkbox' : 'radio'
    if (item.defaultAttribute.type === 'JyRelatedCompany') {
      wldwDialogVisible.value = true
      fieldModel.value = item.values
    } else if (item.defaultAttribute.type === 'JySelectSeal') {
      yzDialogVisible.value = true
      console.log(item)
      selectedData.value = item.defaultAttribute.multiple
        ? item.options
        : item.values
    }
    dialogCurrent.value = item.id
  }

  // 往来单位
  function relatedCompanySubmit(value) {
    console.log(value)
    wldwDialogVisible.value = false
    const index = state.cache.formData.findIndex(
      i => i.id === dialogCurrent.value
    )
    if (index > -1) {
      if (state.cache.formData[index].defaultAttribute.multiple) {
        state.cache.formData[index].values = value.map(i => i.relatedCompanyId)
        state.cache.formData[index].options = value.map(i => {
          return {
            label: i.relatedCompanyName,
            value: i.relatedCompanyId
          }
        })
      } else {
        state.cache.formData[index].values = value.relatedCompanyId
        state.cache.formData[index].options = [
          {
            label: value.relatedCompanyName,
            value: value.relatedCompanyId
          }
        ]
      }
    }
  }

  // 印章
  function getSelection(value) {
    console.log(value)
    yzDialogVisible.value = false
    const index = state.cache.formData.findIndex(
      i => i.id === dialogCurrent.value
    )
    if (index > -1) {
      if (state.cache.formData[index].defaultAttribute.multiple) {
        state.cache.formData[index].values = value.map(i => i.sealId)
        state.cache.formData[index].options = value.map(i => {
          return {
            label: i.sealName,
            value: i.sealId,
            ...i
          }
        })
      } else {
        state.cache.formData[index].values = value.sealId
        state.cache.formData[index].options = [
          {
            label: value.sealName,
            value: value.sealId,
            ...value
          }
        ]
      }
    }
  }

  const setRef = (el, attr) => {
    if (el) {
      derivableRef[attr.id] = el
    }
  }
  onBeforeMount(() => {
    // 初始化Props数据
    initPropsData()
  })

  defineExpose({
    initFormData
  })
</script>
<style lang="scss">
  .components-searchForm {
    .el-input.is-disabled .el-input__wrapper {
      background-color: transparent;
    }

    .ap-dis {
      padding: 0rem 0% 0.5rem 0%;
      display: flex;
      flex-flow: wrap;
      box-sizing: border-box;
    }

    .lineShow {
      flex-flow: nowrap;

      .fromData-scrollbar {
        width: auto;
        flex-grow: 1;
      }

      .butData {
        flex-grow: 0;
      }
    }

    .fromData-scrollbar {
      width: 100%;
    }

    .fromData {
      width: 100%;
      display: flex;
      flex-flow: wrap;
      box-sizing: border-box;
      // justify-content: space-between;
    }

    .ap-box {
      width: calc(100% / 3);
      min-width: calc(100% / 3);
      display: flex;
      align-items: center;
      @include mixin-padding-top(10);
      @include mixin-padding-bottom(10);
      @include mixin-padding-right(0);
      box-sizing: border-box;

      .ap-box-label {
        text-align: right;
        position: relative;
        @include mixin-padding-right(10);
        box-sizing: border-box;
        color: var(--jy-color-text-1);

        .ap-box-label-necessary {
          color: red;
          left: -0.5rem;
          position: absolute;
        }
      }

      .ap-box-cont {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;

        .ap-box-contBox {
          flex-grow: 1;
        }

        .ap-box-autoBox {
          width: auto;
        }

        .checkbox {
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
      }
    }

    .ap-division {
      padding: 0%;
    }

    .butData {
      width: calc(100% / 3 - 100px);
      display: flex;
      // flex-flow: wrap;
      justify-content: flex-end;
      flex-grow: 1;

      .ap-box {
        width: auto;
        min-width: auto;
        margin-left: 10px;
        padding-right: 0%;
      }

      .unfold {
        display: flex;
        align-items: center;
        color: var(--jy-info-6);
        cursor: pointer;
        margin-right: 0.5rem;

        .unfold-icon {
          margin-left: 0.3rem;
        }
      }
    }

    .width-100 {
      width: 100% !important;
    }

    .width-0 {
      width: 0% !important;
    }

    .border-bottom {
      border-bottom: 1px solid var(--jy-color-border-2);
    }

    .custom-button {
      & {
        border: 1px dashed var(--jy-color-border-1);
        border-radius: var(--jy-border-radius-2);
        width: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        @include mixin-padding-top(5);
        @include mixin-padding-bottom(5);
        @include mixin-padding-right(16);
        @include mixin-padding-left(16);
        font-size: var(--jy-font-size-body-1);
        position: relative;
      }
      .custom-button-checkIcon {
        position: absolute;
        top: -1px;
        right: -1px;
        display: none;
      }
    }
    .checked {
      border: 1px solid var(--jy-primary-6);
      color: var(--jy-primary-6);
      .custom-button-checkIcon {
        display: inline-block;
      }
    }

    .fill {
      width: 100%;
    }

    .derivable {
      .el-input__suffix {
        display: none;
      }

      .el-select .el-input.is-disabled .el-input__wrapper {
        cursor: pointer;
      }

      .el-select .el-input.is-disabled .el-input__inner {
        cursor: pointer;
      }

      .hasContent {
        .el-input__wrapper {
          -webkit-text-fill-color: #000;
        }

        .el-input__inner {
          -webkit-text-fill-color: #000;
        }
      }

      .ap-box-contBox {
        position: relative;
        display: flex;
        align-items: center;

        .ap-box-contBox-icon {
          position: absolute;
          right: 0.8rem;
          cursor: pointer;
          height: 14px;
          display: flex;
          align-items: center;

          .ap-box-contBox-icon-img {
            height: 100%;
          }
        }

        :deep {
          .el-input__inner {
            padding-right: 1.5rem;
            box-sizing: border-box;
          }
        }
      }
    }

    .radioButton {
      align-items: flex-start !important;
      margin-bottom: -0.5rem;

      .ap-box-label {
        @include mixin-padding-top(5);
        @include mixin-padding-bottom(5);
      }

      .ap-box-contBox {
        display: flex;
        justify-content: flex-start;
        flex-flow: wrap;
      }

      .button-contBox {
        cursor: pointer;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .button-contBox :hover {
        background-color: var(--jy-primary-2);
      }

      .button-contBox {
        flex-grow: 0 !important;
      }
    }

    .checkButton {
      align-items: flex-start !important;
      margin-bottom: -0.5rem;

      .ap-box-label {
        @include mixin-padding-top(5);
        @include mixin-padding-bottom(5);
      }

      .ap-box-contBox {
        display: flex;
        justify-content: flex-start;
        flex-flow: wrap;
      }

      .button-contBox {
        cursor: pointer;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .button-contBox :hover {
        background-color: var(--jy-primary-2);
      }

      .button-contBox {
        flex-grow: 0 !important;
      }
    }
    .scopeInput {
      .ap-box-contBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 0%;
        .ap-box-contBox-start {
          width: calc(50% - 1rem);
        }
        .ap-box-contBox-end {
          width: calc(50% - 1rem);
        }
      }
    }

    :deep {
      .width-100 {
        width: 100% !important;
      }

      input::-webkit-input-placeholder {
        /* WebKit browsers */
        // color: #9c9c9c;
        font-size: var(--jy-font-size-caption);
      }

      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        // color: #9c9c9c;
        font-size: var(--jy-font-size-caption);
      }

      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        // color: #9c9c9c;
        font-size: var(--jy-font-size-caption);
      }

      input::-ms-input-placeholder {
        /* Internet Explorer 10+ */
        // color: #9c9c9c;
        font-size: var(--jy-font-size-caption);
      }

      .el-checkbox__label {
        font-size: var(--jy-font-size-body-2);
        color: var(--jy-color-text-1);
      }
    }
  }
</style>

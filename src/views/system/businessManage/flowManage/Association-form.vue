<template>
  <div class="flowManage-Association-form">
    <div class="choice" v-if="state.currentState === '1'">
      <div class="info-box">
        <div class="info-title"> 选择表单进行关联 </div>
        <div class="info-remind">
          <div class="info-remind-title">
            <div class="info-remind-title-icon">
              <i class="icon">
                <svg class="iconpark-icon">
                  <use href="#Check-Circle"></use>
                </svg>
              </i>
            </div>
            <div class="info-remind-title-text"> 提示 </div>
          </div>
          <div class="info-remind-p">
            1: 如果关联表单，则该流程仅用于当前表单；
          </div>
          <div class="info-remind-p">
            2: 若当前业务类型/文件类型换绑新的表单，则新表单无法使用当前流程；
          </div>
          <div class="info-remind-p">
            3:
            如果不关联表单，无论当前业务类型/文件类型绑定的表单怎么变更，该流程都可使用。
          </div>
        </div>
        <div class="info-form">
          <el-form
            :model="form"
            label-width="80px"
            :rules="form.rules"
            ref="ruleFormRef"
            status-icon
          >
            <el-form-item label="业务类型" required>
              <el-select v-model="form.businessType" placeholder="请选择">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="文件类型" required>
              <el-select v-model="form.fileType" placeholder="请选择">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="info-noContent" v-if="state.list.data.length === 0">
          <div class="info-noContent-backcolor"></div>
          <div class="info-noContent-desc">暂无可关联的表单</div>
        </div>
        <div class="info-list" v-else>
          <div
            class="info-list-box"
            v-for="(item, index) in state.list.data"
            :key="index"
          >
            <div class="info-list-box-redio">
              <el-radio-group
                v-model="state.list.radio"
                class="ml-4"
                @change="redioChange"
              >
                <el-radio :label="item.label" size="large">
                  <span></span>
                </el-radio>
              </el-radio-group>
            </div>
            <div class="info-list-box-text">
              {{ item.desc }}
            </div>
            <div class="info-list-box-but">
              <div class="Have-been-enabled">已启用</div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-footer">
        <el-button type="primary" v-if="state.list.data.length === 0">
          去创建
        </el-button>
        <el-button type="primary" v-else @click="clickEditForm">确定</el-button>
      </div>
    </div>
    <div class="add" v-if="state.currentState === '2'">
      <div>
        <v-form-render
          :form-json="formLibraryJson"
          :form-data="formLibraryData"
          :option-data="optionLibraryData"
          ref="vFormLibraryRef"
        >
        </v-form-render>
      </div>
      <div class="info-footer">
        <el-button type="primary" @click="clickEdit">编辑</el-button>
        <el-button @click="clickReselect">重新选择</el-button>
      </div>
    </div>
    <!-- 编辑表单 -->
    <div>
      <JyElMessageBox
        v-model="state.JyElMessageBox.show"
        :custom-content="true"
        :defaultAttribute="{
          fullscreen: true,
          height: '100%'
        }"
      >
        <AddFrom
          :formId="'12345667'"
          v-model="state.JyElMessageBox.show"
          @formClose="state.JyElMessageBox.show = false"
        />
      </JyElMessageBox>
    </div>
  </div>
</template>
<script setup>
  import { reactive, defineExpose } from 'vue'
  import AddFrom from '@/views/system/businessManage/formManage/AddForm/index.vue'
  const formLibraryJson = reactive({})
  const state = reactive({
    currentState: '1', // 1选择表单  2 编辑表单
    list: {
      radio: '',
      data: [
        {
          label: '1',
          desc: '表单1表单1表单1表单1表单1表单1表单1'
        },
        {
          label: '2',
          desc: '表单1表单1表单1表单1表单1表单1表单2'
        },
        {
          label: '3',
          desc: '表单1表单1表单1表单1表单1表单1表单3'
        },
        {
          label: '4',
          desc: '表单1表单1表单1表单1表单1表单1表单4'
        }
      ]
    },
    JyElMessageBox: {
      show: false,
      header: {
        data: ''
      },
      content: {
        data: ''
      }
    }
  })
  const form = reactive({
    ProcessName: '',
    ProcessType: false,
    businessType: '',
    fileType: '',
    rangeApplication: '',
    desc: '',
    rules: [
      {
        required: true,
        message: '新手机号不能为空',
        trigger: 'blur'
      }
    ]
  })
  // 点击去创建
  const clickEditForm = () => {
    state.currentState = '2'
  }
  // 点击重新选择
  const clickReselect = () => {
    state.currentState = '1'
  }
  // 点击编辑
  const clickEdit = () => {
    state.JyElMessageBox.show = true
  }
  // 获取信息值
  const getInfoValue = () => {
    let SelectionForm = null
    if (state.list.radio) {
      state.list.data.map(item => {
        if (item.label === state.list.radio) {
          SelectionForm = item
        }
        return true
      })
    }
    return {
      SelectionForm
    }
  }
  // 单选框发生变化
  const redioChange = () => {
    // console.log('--->', state.list.radio)
  }
  const formLibraryData = reactive({})
  // 提供方法
  defineExpose({
    getInfoValue
  })
</script>
<style lang="scss" scoped>
  .flowManage-Association-form {
    margin: 0%;
    width: 90%;
    height: calc(95% - 1rem);
    margin-top: 1rem;
    background-color: var(--jy-color-fill--5);
    position: relative;
    color: var(--jy-color-text-1);

    .choice {
      width: 100%;
      height: 100%;
    }

    .info-box {
      width: 50%;
      margin: 0% auto;
      text-align: center;

      .info-title {
        padding-top: 3rem;
        font-size: var(--jy-font-size-title-2);
        color: var(--jy-color-text-1);
      }

      .info-from {
        margin-top: 1.5rem;
      }
    }

    .info-footer {
      width: 100%;
      position: absolute;
      bottom: 0%;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid var(--jy-color-border-2);
    }

    .info-remind {
      background: var(--jy-warning-1);
      /* 警告 Warning/禁用 */

      border: 1px solid var(--jy-warning-3);
      border-radius: var(--jy-border-radius-2);
      padding: 1rem;
      margin-top: 1rem;
      text-align: left;

      .info-remind-title {
        display: flex;
        align-items: center;
        font-size: var(--jy-font-size-title-1);

        .info-remind-title-icon {
          margin-right: 0.5rem;
          width: 1.3rem;
          height: 1.3rem;

          .icon {
            width: 100%;
            height: 100%;
          }
        }
      }

      .info-remind-p {
        padding: 0.2rem 1.8rem;
        box-sizing: border-box;
        color: var(--jy-color-text-3);
      }
    }

    .info-form {
      margin-top: 1rem;
      padding: 0% 10%;
      box-sizing: border-box;
    }

    .info-noContent {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      flex-flow: wrap;

      .info-noContent-backcolor {
        background-color: #d9d9d9;
        width: 15rem;
        height: 8rem;
      }

      .info-noContent-desc {
        width: 100%;
        margin-top: 1rem;
      }
    }

    .info-list {
      margin-top: 1rem;

      .info-list-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        padding: 0.7rem 1rem;
        box-sizing: border-box;
        background: var(--jy-color-fill--2);
        border-radius: var(--jy-border-radius-2);
        box-sizing: border-box;
        margin: 0.5rem 0rem;
        cursor: pointer;

        .info-list-box-redio {
          width: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .info-list-box-text {
          width: calc(100% - 5rem);
        }

        .info-list-box-sub {
          width: 4rem;
        }
      }
    }

    .icon {
      width: 1rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .iconpark-icon {
        width: 100%;
        height: 100%;
      }
    }

    // 已启用
    .Have-been-enabled {
      background: var(--jy-success-1);
      /* 成功 Success/常规 */
      border: 1px solid var(--jy-success-6);
      border-radius: var(--jy-border-radius-2);
      font-size: var(--jy-font-size-caption);
      color: var(--jy-success-6);
      padding: 0.1rem 0.2rem;
      box-sizing: border-box;
    }

    // 禁用
    .disabled {
      background: var(--jy-color-fill--2);
      /* 成功 Success/常规 */
      border: 1px solid var(--jy-color-border-1);
      border-radius: var(--jy-border-radius-2);
      font-size: var(--jy-font-size-caption);
      color: var(--jy-color-text-2);
      padding: 0.1rem 0.2rem;
      box-sizing: border-box;
    }

    :deep(.el-form) {
      .el-form-item__label {
        margin-bottom: 0%;
      }

      .el-select {
        width: 100%;
      }
    }
  }
</style>

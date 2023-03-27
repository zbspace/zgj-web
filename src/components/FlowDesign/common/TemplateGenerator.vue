<template>
  <div>
    <a-textarea
      ref="smsInput"
      v-model:value="smsContent"
      :auto-size="{ minRows: 3, maxRows: 6 }"
      placeholder="请输入内容"
      @input="smsInput"
      @blur="inputBlur"
      @focus="focusHandler"
      @click="focusHandler"
      @keydown.up.down.left.right="focusHandler"
      @select="selectHandler"
    ></a-textarea>
    <a-dropdown>
      <template #overlay>
        <a-menu>
          <a-menu-item
            v-for="fields in fieldInfoLisNew"
            :key="fields.value"
            :value="fields.value"
            :disabled="fields.value === 'disabled'"
            @click="insertFields(fields)"
            >{{ fields.label }}</a-menu-item
          >
        </a-menu>
      </template>
      <a-button size="small" type="primary" style="float: right; margin-top: -35px; margin-right: 10px">
        置入字段
        <DownOutlined />
      </a-button>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  name: 'TemplateGenerator',
  props: {
    // 表单数据
    fieldInfoLis: { type: Array, default: () => [] },
    // v-model数据
    inputValue: { type: String, default: () => '' }
  },
  data() {
    return {
      smsContent: '',
      inputFocus: null,
      fieldInfoLisNew: [],
      visible: false
    };
  },
  // 这里回显数据，并做转换
  mounted() {
    this.fieldInfoLisNew = [
      ...JSON.parse(
        JSON.stringify([
          {
            label: '发起人',
            value: 'initiator'
          },
          {
            label: '流程名称',
            value: 'processName'
          },
          {
            label: '发起时间',
            value: 'startTime'
          },
          {
            label: '表单字段',
            value: 'disabled' // 这里表示在组件显示的时候就截至了，是下一梭子数组的标题哦
          }
        ])
      ),
      ...this.fieldInfoLis
    ];
    this.smsContent = this.setInput(this.inputValue);
  },
  methods: {
    // 入数据转换
    setInput(value) {
      this.fieldInfoLisNew.forEach(field => {
        let temp = '';
        if (value.indexOf(field.value) > -1) {
          temp = value.replace(new RegExp(field.value, 'g'), '[' + field.label + ']');
        }
        if (temp !== '') {
          value = temp;
        }
      });
      return value;
    },
    // 选中置入的
    insertFields(fields) {
      this.insertStr('[' + fields.label + ']');
    },
    // 插入元素
    insertStr(str) {
      let before = this.smsContent.slice(0, this.inputFocus);
      let after = this.smsContent.slice(this.inputFocus, this.smsContent.length);
      this.inputFocus = this.inputFocus + str.length;
      this.smsContent = before + str + after;
      this.$emit('update:modelValue', this.outValue(this.smsContent));
    },
    // 保存光标位置
    inputBlur(e) {
      this.inputFocus = e.target.selectionStart;
      this.visible = false;
    },
    // 删除元素剩余部分
    smsInput(e) {
      //deleteContentBackward==退格键 deleteContentForward==del键
      if (e.inputType === 'deleteContentBackward' || e.inputType === 'deleteContentForward') {
        let beforeIndex = 0;
        let afterIndex = 0;
        // 光标位置往前
        for (let i = e.target.selectionStart - 1; i >= 0; i--) {
          if (this.smsContent[i] === '[') {
            beforeIndex = i;
            afterIndex = e.target.selectionStart;
            break;
          }
          if (this.smsContent[i] === ']') {
            break;
          }
        }
        // 光标位置往后
        for (let i = e.target.selectionStart; i < this.smsContent.length; i++) {
          if (this.smsContent[i] === ']') {
            afterIndex = i + 1;
            beforeIndex = e.target.selectionStart;
            break;
          }
          if (this.smsContent[i] === '[') {
            break;
          }
        }
        if (beforeIndex === 0 && afterIndex === 0) {
          this.$emit('update:modelValue', this.outValue(this.smsContent));
          return;
        }
        let beforeStr = this.smsContent.slice(0, beforeIndex);
        let afterStr = this.smsContent.slice(afterIndex);
        this.smsContent = beforeStr + afterStr;
        this.inputFocus = beforeStr.length;
        this.$nextTick(() => {
          this.changeFocus(e.target, this.inputFocus, this.inputFocus);
        });
      }
      // this.$emit("smsText", this.smsContent);

      this.$emit('update:modelValue', this.outValue(this.smsContent));
    },
    // 选择元素剩余部分
    selectHandler(e) {
      // 光标开始位置往前
      for (let i = e.target.selectionStart - 1; i >= 0; i--) {
        if (this.smsContent[i] === '[') {
          this.changeFocus(e.target, i, e.target.selectionEnd);
          break;
        }
        if (this.smsContent[i] === ']') {
          break;
        }
      }
      // 光标结束位置往后
      for (let i = e.target.selectionEnd; i < this.smsContent.length; i++) {
        if (this.smsContent[i] === ']') {
          this.changeFocus(e.target, e.target.selectionStart, i + 1);
          break;
        }
        if (this.smsContent[i] === '[') {
          break;
        }
      }
    },
    // 焦点跳出元素内
    focusHandler(e) {
      setTimeout(() => {
        let selStart = e.target.selectionStart;
        let beforeArrLength = this.smsContent.slice(0, selStart).split('[').length;
        let afterArrLength = this.smsContent.slice(0, selStart).split(']').length;
        //根据'['和']'生成两个数组 判断数组长度 是否相等 不相等就不成对就移动光标
        if (beforeArrLength !== afterArrLength) {
          let pos = this.smsContent.indexOf(']', selStart) + 1;
          if (beforeArrLength > afterArrLength && e.code == 'ArrowLeft') {
            //按下按键左箭头
            pos = this.smsContent.lastIndexOf('[', selStart);
          }
          this.changeFocus(e.target, pos, pos);
        }
      }, 100);
    },
    // 修改光标位置
    changeFocus(target, start, end) {
      let range,
        el = target;
      if (el.setSelectionRange) {
        el.setSelectionRange(start, end);
      } else {
        range = el.createTextRange();
        range.collapse(false);
        range.select();
      }
    },
    // 出口数据转换
    outValue(result) {
      let index = result.indexOf('[');
      let num = 0;
      while (index !== -1) {
        num++;
        index = result.indexOf('[', index + 1);
      }
      if (num > 0) {
        for (let i = 1; i <= num; i++) {
          let temp = '';
          this.fieldInfoLisNew.forEach(field => {
            if (result.indexOf('[' + field.label + ']') > -1) {
              temp = result.replace('[' + field.label + ']', field.value);
              result = temp;
            }
          });
        }
      }
      return result;
    }
  }
};
</script>

<style scoped>
.insert-list p {
  text-align: center;
}
.insert-list div {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}
</style>

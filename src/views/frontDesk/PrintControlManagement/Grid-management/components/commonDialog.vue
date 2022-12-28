<template>
  <el-dialog
    title="盘点汇总详情"
    :visible.sync="dialogVisible"
    width="980px"
    class="coustomCheckStyle"
  >
    <div>弹窗模版</div>
  </el-dialog>
</template>

<script>
/**
 * show - 弹窗显示与否
 */
export default {
  name: "CheckAll",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    dialogVisible: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("update:show", val);
      },
    },
  },
};
</script>

<style lang="scss">
.coustomCheckStyle {
  .el-dialog {
    border-radius: 8px;
  }
  .el-dialog__header {
    background-color: #f5f5f5;
    padding: 20px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .el-dialog__body {
    padding: 0;
  }
}
</style>

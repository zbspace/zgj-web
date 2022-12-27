<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="980px"
    class="coustomErrorStyle"
    append-to-body
  >
    <el-table
      :data="list"
      :header-cell-style="{
        background: '#F1F1F1',
        color: '#333333',
        'text-align': 'center',
      }"
      :border="true"
      :stripe="true"
      height="520"
      style="width: 100%; font-size: 12px"
    >
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column
        prop="productName"
        align="center"
        label="印章名称"
      ></el-table-column>
      <el-table-column
        prop="productTypeName"
        align="center"
        label="印章类型"
      ></el-table-column>
      <el-table-column
        prop="rfidCode"
        align="center"
        label="绑定标签"
      ></el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <div v-if="scope.row.state == 0">正常</div>
          <div style="color: red" v-else>异常</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="receiveUserName"
        align="center"
        label="开锁人"
      ></el-table-column>
      <el-table-column
        prop="unlockType"
        align="center"
        label="开锁类型"
      ></el-table-column>
      <el-table-column
        prop="unlockTime"
        align="center"
        label="开锁时间"
      ></el-table-column>
      <el-table-column
        prop="lockTime"
        align="center"
        label="关锁时间"
      ></el-table-column>
      <el-table-column
        prop="receiveReason"
        align="center"
        label="领用事由"
      ></el-table-column>
      <el-table-column
        prop="exceptionRemark"
        align="center"
        label="备注"
      ></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
/**
 * show - 弹窗显示与否
 */

export default {
  name: "ErrorBoxDialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    outText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      title: "",
    };
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
  created() {
    // 处理title
    this.title = this.outText + `印章列表`;
  },
  methods: {},
};
</script>

<style lang="scss">
.checkView-content {
  display: flex;
  justify-content: center;
}
.checkView-content-list {
  padding: 20px;
}
.checkView-wrap {
  // width: 944px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;

  .checkView-content {
    padding: 22px 52px 44px 52px;
    > div {
      width: 390px;
      height: 500px;
    }
    .center-line {
      width: 1px;
      background: #e9e9e9;
      margin: 0 62px;
    }
    .box-all {
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 370px;
        height: 124px;
        background: rgba(255, 255, 255, 0);
        border: 1px solid rgba(190, 190, 189, 1);
        border-radius: 10px;
        margin-top: 20px;
        > div {
          width: calc(50% - 1px);
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: PingFang-SC-Bold;
          font-size: 18px;
          color: #626262;
          font-weight: 700;
          > .num {
            font-family: PingFang-SC-Bold;
            font-size: 33px;
            font-weight: 700;
            margin-top: 20px;
          }
        }
        > .item-line {
          width: 2px;
          height: 80px;
          background: rgba(190, 190, 189, 1);
        }
      }
      .out-item {
        border: none;
        display: flex;
        justify-content: space-between;
        > div {
          width: 180px;
          height: 100%;
          background-image: url("../assets/images/out-seal-bg.png");
          background-size: 100% auto;
          background-repeat: no-repeat;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #726c63;
        }
      }
    }
    .box-error-no {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .box-error {
      > img {
        width: 226px;
      }
      > p {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #626262;
        text-align: center;
        font-weight: 400;
      }
      .bottom {
        display: flex;
        .tab {
          margin-right: 25px;
          .item {
            width: 80px;
            height: 50px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #333333;
            text-align: center;
            font-weight: 500;
          }
          .select-item {
            background-image: linear-gradient(90deg, #ffc972 0%, #e2b062 100%);
          }
        }
        .error-list {
          .item {
            width: 128px;
            height: 75px;
            background: #f38381;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: PingFang-SC-Bold;
            font-size: 16px;
            color: #323232;
            font-weight: 700;
            margin-bottom: 10px;
          }
        }
      }
    }
    .top {
      border-bottom: 1px solid #e9e9e9;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #e2b062;
      font-weight: 500;
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      margin-bottom: 28px;
      > span {
        width: 4px;
        height: 30px;
        background: #e2b062;
        margin-right: 15px;
      }
    }
  }
}
.checkView-Info {
  position: absolute;
  top: 0;
  left: 0;
  width: 944px;
  height: 640px;
  top: 50%;
  left: 50%;
  margin-top: -320px;
  margin-left: -472px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  z-index: 999;
}
.coustomErrorStyle {
  .el-dialog {
    border-radius: 8px;
  }
  .el-dialog__header {
    background-color: #f5f5f5;
    padding: 20px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
}
</style>

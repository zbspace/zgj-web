<template>
  <div class="top">
    <div class="t-left">
      <div class="name">
        <span>下午好！陈潭</span> <span>管理员</span>
      </div>
      <p class="phone">137****4598</p>
      <div class="labels">
        <div>
          <p>待智能用印</p>
          <span>6</span>
        </div>
        <div>
          <p>待智能用印</p>
          <span>6</span>
        </div>
        <div>
          <p>待智能用印</p>
          <span>6</span>
        </div>
        <div>
          <p>待智能用印</p>
          <span>6</span>
        </div>
        <div>
          <p>待智能用印</p>
          <span>6</span>
        </div>
        <div>
          <p>待智能用印</p>
          <span>6</span>
        </div>
        <div>
          <p>待智能用印</p>
          <span>6</span>
        </div>
      </div>
    </div>

    <div class="t-right">
      <el-button type="primary">申请用印</el-button>
      <p>点击按钮快捷申请用印</p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 160px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: inset 0px 0px 6px rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(50px);
  border-radius: 4px;
  margin-top: 24px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  .t-left {
    .name {
      display: flex;
      align-items: center;
      margin-bottom: 7px;

      span:nth-child(1) {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.85);
      }

      span:nth-child(2) {
        display: flex;
        align-items: center;
        padding: 4px 14px;
        margin-left: 17px;
        gap: 10px;
        width: 70px;
        height: 30px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 30px;
        background: rgba(0, 0, 0, 0.04);
      }
    }

    .phone {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      margin-bottom: 5px;
    }

    .labels {
      display: flex;
      justify-content: space-between;
    }
  }

  .labels {
    div {
      text-align: center;
      margin-right: 24px;
    }

    p {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.65);
      margin-bottom: 8px;
    }

    span {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .t-right {
    width: 290px;
    height: 112px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px dashed #FFFFFF;
    backdrop-filter: blur(25px);
    border-radius: 4px;
    text-align: center;
    padding-top: 24px;

    button {
      margin-bottom: 18px;
    }

    p {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>

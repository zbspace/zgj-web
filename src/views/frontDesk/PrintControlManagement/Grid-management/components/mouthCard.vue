<template>
  <div class="card-container">
    <!-- pc -->
    <div
      :class="platform === 'pc' ? 'card-pc' : 'card-terminal'"
      :style="{
        border: isCancel ? '1px dashed #c0c4cc' : '',
        background: isCancel ? '#F5F5F5' : '#FFFFFF'
      }"
      @click.stop="goDetail"
    >
      <div class="status-label" v-if="ignoreException">格口异常(已忽略)</div>
      <div class="status-label" v-if="isError && !ignoreException">
        格口异常
      </div>
      <!-- left / top -->
      <div class="card-column left">
        <div
          class="img-box size-box"
          :class="isError ? 'error-bg' : 'normal-bg'"
        >
          <div
            v-if="platform === 'terminal'"
            class="terminal-name"
            :style="{
              color: isError ? '#ffffff' : '#c0c4cc'
            }"
          >
            {{ boxCode }}
          </div>
          <img
            src="../../../../../assets/svg/device/seal-zn-icon.svg"
            v-if="showImgIn"
          />
          <img
            src="../../../../../assets/svg/device/seal-zn-out-icon.svg"
            v-if="showImgOutNormal"
          />
          <img
            src="../../../../../assets/svg/device/seal-zn-error-icon.svg"
            v-if="showImgOutError"
          />
          <!-- bug -->
          <!-- <img :src="require(`../assets/images/${handleImgUrl}`)" /> -->
        </div>
        <div class="card-name name-style" v-if="isBound">
          {{ productName }}
        </div>
        <div class="card-name name-style" v-else>未绑定印章</div>
      </div>
      <!-- right / bottom -->
      <div class="card-column center"></div>
      <div class="card-column right">
        <!-- pc card name -->
        <div class="pc-name" v-if="platform === 'pc'">{{ boxCode }}</div>
        <!-- 按钮组 -->
        <div class="btns">
          <el-button
            class="unlock-btn btn"
            v-if="!isCancel"
            @click.stop="unlock"
          >
            <!-- :style="{ marginTop: !isBound && platform === 'pc' ? '60px' : '' }" -->
            开锁
          </el-button>
          <el-button class="check-btn btn" v-if="!isCancel" @click.stop="check">
            盘点
          </el-button>
          <el-button
            class="unlock-btn btn seal-btn"
            v-if="isCancel"
            @click.stop="Cancel"
          >
            注销
          </el-button>
          <el-button
            class="unlock-btn btn"
            v-if="false"
            @click.stop="unlockReturn"
          >
            开锁归还
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // TODO: 终端替换该文件
  /**
   * platform: pc、terminal
   * 卡片信息 productName 卡片名称、boxCode 格口名称
   * 状态对应关系 statusMaps
   * 1. 注销状态 cancel  - true 、false
   * 2. 异常 state - 0 、 -1、 -2
   * 3. 正常 在盒、取出 - inBoxState 0 、1
   * 4. 绑定、 bindState - 0 、1
   * 5. 忽略异常 ignoreException false / true
   * 开锁、盘点、注销、开锁归还  @unlock @check @cancel @unlockReturn
   */
  export default {
    name: 'MouthCard',
    props: {
      platform: {
        type: String,
        default: 'pc'
      },
      state: {
        type: Number,
        default: 0
      },
      inBoxState: {
        type: Number,
        default: 0
      },
      bindState: {
        type: Number,
        default: 1
      },
      cancel: {
        type: Boolean,
        default: false
      },
      ignoreException: {
        default() {
          return false
        }
      },
      productName: {
        type: String,
        default: '-'
      },
      boxCode: {
        type: String,
        default: '-'
      }
    },
    computed: {
      // 注销
      isCancel() {
        return !this.cancel
      },
      // 异常 - 异常背景
      isError() {
        return this.state !== 0 && this.state
      },
      // 绑定
      isBound() {
        return this.bindState === 1
      },
      // 在盒
      isInBox() {
        return this.inBoxState === 1
      },
      // img是否显示
      showImgIn() {
        return (
          this.isBound &&
          ((this.isInBox && !this.isError) ||
            (this.isError && this.state === -2))
        )
      },
      // img - 取出图片展示
      showImgOutNormal() {
        return this.isBound && !this.isInBox && !this.isError
      },
      // img - 异常取出
      showImgOutError() {
        // return this.isBound && this.isError && this.state === -2;
        return this.isBound && this.isError && this.state === -1
      },
      // 处理图片展示路径
      handleImgUrl() {
        let str = ''
        if (this.showImgIn) {
          str = 'status_in.png'
        } else if (this.showImgOut) {
          str = 'status_out.png'
        } else if (this.showImgOutError) {
          str = 'staus_small_error_out.png'
          str = 'status_out.png'
        }
        return str
      }
    },
    data() {
      return {}
    },
    methods: {
      // 开锁
      unlock(attr) {
        this.$emit('unlock', attr)
      },
      // 盘点
      check(attr) {
        this.$emit('check', attr)
      },
      // 开锁归还
      unlockReturn(attr) {
        this.$emit('unlockReturn', attr)
      },
      // 注销
      Cancel(attr) {
        this.$emit('cancel', attr)
      },
      goDetail() {
        this.$emit('goDetail')
      }
    }
  }
</script>

<style scoped lang="scss">
  .card-container {
    .card-pc {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 40px 16px 20px 16px;
      position: relative;
      border-radius: 4px;
      height: 216px;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.15);
      // box-shadow: 0 10px 20px 2px rgba(0, 0, 0, 0.06);
      // border-radius: 4px;
      max-width: 520px;

      .size-box {
        width: 168px;
        height: 92px;

        img {
          width: 36px;
          height: 62px;
        }
      }

      .name-style {
        width: 164px;
        height: 40px;
        margin-top: 20px;
        font-weight: 400;
        font-size: 14px;
        color: #999999;
      }

      .right {
        // width:calc(100% - 188px);
        // margin-left:50px;
        text-align: center;
      }

      .center {
        width: 1px;
        height: 154px;
        border-left: 1px dashed rgba(0, 0, 0, 0.15);
        margin: 0 10%;
      }

      .left {
        // flex: 1;
      }

      .pc-name {
        font-weight: 400;
        font-size: 22px;
        color: #303133;
        text-align: center;
        margin-bottom: 34px;
      }

      .btns {
        display: flex;
        flex-direction: column;

        .btn {
          width: 74px;
          height: 32px;
          text-align: center;
          border-radius: 2px;
          cursor: pointer;
        }

        .unlock-btn {
          font-weight: 500;
          font-size: 14px;
          color: #fafafa;
          background-color: var(--jy-primary-6);
        }

        .check-btn {
          border: 0.56px solid var(--jy-primary-6);
          margin-top: 20px;
          font-weight: 500;
          font-size: 14px;
          color: var(--jy-primary-6);
          margin-left: 0;
        }

        .seal-btn {
          margin-top: 60px;
        }
      }
    }

    .card-pc:hover {
      box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
        0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    }

    // 终端
    .card-terminal {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 20px 20px;
      width: 304px;
      height: 484px;
      background: #fbfbfb;
      box-shadow: 0 2px 25px 1px rgba(0, 0, 0, 0.13);
      border-radius: 10px;
      position: relative;

      .size-box {
        width: 236px;
        height: 184px;
        background: #ececec;

        img {
          width: 57px;
          height: 98px;
        }
      }

      .name-style {
        width: 268px;
        height: 62px;
        margin-top: 40px;
        font-weight: 600;
        font-size: 22px;
        color: #333333;
      }

      .terminal-name {
        position: absolute;
        top: 14px;
        left: 14px;
        font-size: 16px;
      }

      .left {
        align-items: center;
      }

      .btns {
        display: flex;
        flex-direction: column;
        width: 264px;
        margin-top: 50px;

        .btn {
          font-weight: 500;
          font-size: 14px;
          text-align: center;
          width: 264px;
          height: 47px;
          line-height: 47px;
          cursor: pointer;
        }

        .unlock-btn,
        .seal-btn {
          color: #fafafa;
          background-image: linear-gradient(
            90deg,
            #e2a952 0%,
            var(--jy-primary-6) 100%
          );
          box-shadow: 2px 3px 11px 0 rgba(0, 0, 0, 0.11),
            -2px -6px 11px 0 #ffffff, inset -2px -3px 4px 0 rgba(0, 0, 0, 0.09),
            inset 2px 3px 4px 0 rgba(255, 255, 255, 0.36);
          border-radius: 4px;
        }

        .check-btn {
          color: var(--jy-primary-6);
          margin-top: 10px;
          background: #f2f2f2;
          box-shadow: 2px 11px 18px 0 rgba(0, 0, 0, 0.09),
            -7px -9px 16px 0 #ffffff, inset -2px -3px 4px 0 rgba(0, 0, 0, 0.03),
            inset 2px 3px 4px 0 rgba(255, 255, 255, 0.36);
          border-radius: 4px;
        }
      }
    }

    .error-bg {
      background: #ecad9d;
    }

    .normal-bg {
      background: #ececec;
    }

    // 公共样式
    .card-column {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .status-label {
      width: 120px;
      height: 22px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #f57777;
      border-top-left-radius: 4px;
      border-bottom-right-radius: 16px;
      font-weight: 400;
      font-size: 10px;
      line-height: 22px;
      color: #fafafa;
      text-align: center;
    }

    .img-box {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 236px;
      height: 184px;
      // border: 0.5px solid #dfdfdf;
      // box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.12),
      //   inset 1px 2px 5px 0 rgba(0, 0, 0, 0.19);
      // border-radius: 4px;
      border: 0.5px solid #dfdfdf;
      box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.115139),
        inset 1px 2px 5px rgba(0, 0, 0, 0.194247);
      border-radius: 4px;
    }

    .card-name {
      text-align: center;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
</style>

<template>
  <div class="container-login">
    
    <!-- header -->
    <div class="header-login">
      <img class="logo" src="../../assets/images/login/logo.png" />
      <div class="left">
        <div class="down">
          <div class="icon"></div>
          <div>下载章管家APP</div>
        </div>
        
         <el-popover
            placement="top-start"
            title=""
            trigger="hover"
          >
            <template #reference>
              <div class="language">简体中文<i></i></div>
            </template>

            <template #default>
              <div>简体中文</div>
              <div>English</div>
            </template>
          </el-popover>
      </div>
    </div>

    <!-- content -->
    <div class="content-login">
    </div>

    <!-- footer -->
    <div class="footer-login">Copyright@2012-2022  章管家  沪ICP备13006057号-6  上海建业信息科技股份有限公司</div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .container-login {
    height: 100vh;
    width: 100vw;
    min-width: 1000px;
    min-height: 800px;
    padding: 30px 40px 20px 60px;
    background: #F5F6F7;

    .header-login {
      display: flex;
      justify-content: space-between;

      .logo {
        width: 118px;
        height: 38px;
      }

      .left {
        display: flex;
        font-family: Helvetica;
        font-size: 14px;
        color: #303133;
        
        .down {
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Helvetica;
          font-size: 14px;
          color: #303133;
          margin-right: 20px;
          cursor: pointer;
          .icon {
            width: 16px;
            height: 16px;
            vertical-align: middle;
            margin-right: 6px;
            background: url(../../assets/images/login/phone_icon.png) no-repeat center center;
            background-size: 100%;
          }
        }

        .down:hover {
          color: #D0963E;
          .icon {
            background: url(../../assets/images/login/phone_icon_hover.png) no-repeat center center;
            background-size: 100%;
          }
        }

        .language {
          position: relative;
          line-height: 36px;
          font-family: Helvetica;
          font-size: 14px;
          color: #303133;
          background: rgba(255,255,255,0.00);
          border: 1px solid #909399;
          border-radius: 4px;
          padding: 0px 30px 0px 14px;
          cursor: pointer;
          &::after {
            content: "";
            position: absolute;
            top: 60%;
            right: 10px;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 6px solid rgba($color: #303133, $alpha: 0.8);
            border-left: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-right: 6px solid transparent;
            border-radius: 2px;
          }
        }

        .language:hover {
          color: #D0963E;
          border: 1px solid #D0963E;
          &::after {
            top: 40%;
            border-top: 6px solid transparent;
            border-left: 6px solid transparent;
            border-bottom: 6px solid rgba($color: #D0963E, $alpha: 0.8);
            border-right: 6px solid transparent;
          }
        }
      }
    }

    .content-login {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 530px;
      width: 504px;
      background: #FFFFFF;
      border: 1px solid #F0F0F0;
      box-shadow: 0 8px 100px 0 rgba(19,59,99,0.07);
      border-radius: 4px;
      margin: auto;
    }

    .footer-login {
      position: fixed;
      bottom: 40px;
      left: 0;
      width: 100%;
      text-align: center;
      font-family: Helvetica;
      font-size: 12px;
      color: #606266;
    }
  }
</style>
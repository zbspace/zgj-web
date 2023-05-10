<template>
  <div class="personall-container">
    <div class="head" v-if="loading">
      <img
        class="img"
        src="@/assets/svg/front/sealApply/back.svg"
        alt=""
        @click="goBack"
      />
      <span class="title">个人中心</span>

      <div class="cont">
        <!-- info -->
        <div class="info">
          <div class="user">{{
            userInfo.userName && userInfo.userName.substr(1)
          }}</div>

          <div class="user-msg">
            <div class="user-name">{{ userInfo.userName }}</div>

            <div class="user-phone">
              <div class="phone-item">
                <div class="label">手机号:</div>
                <div class="number">{{ userInfo.userTel || '-' }}</div>
                <div class="change" @click="changePhoneNumber">更换</div>
              </div>
              <div class="right-line"></div>
              <div class="phone-item">
                <div class="label">邮箱:</div>
                <div class="number">{{ userInfo.userMail || '-' }}</div>
                <div class="change" @click="changeEmail">更换</div>
              </div>
            </div>
          </div>

          <div class="back-img">
            <svg
              width="296"
              height="120"
              viewBox="0 0 296 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_2802_81596"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="296"
                height="120"
              >
                <rect width="296" height="120" rx="2" fill="#F1F4F8" />
              </mask>
              <g mask="url(#mask0_2802_81596)">
                <path
                  d="M148.393 -31.4769L295.998 35.3846L145.608 104.272L-1.99775 37.4108L148.393 -31.4769Z"
                  fill="url(#paint0_linear_2802_81596)"
                />
                <path
                  d="M-2 37.4111L145.607 104.274V265.354H-2V37.4111Z"
                  fill="url(#paint1_linear_2802_81596)"
                />
                <path
                  d="M296 35.3877L145.607 104.277V265.356H293.215L296 35.3877Z"
                  fill="#EDEDED"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_2802_81596"
                  x1="147"
                  y1="99.7167"
                  x2="147"
                  y2="-29.9573"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="white" />
                  <stop offset="0.702553" stop-color="white" stop-opacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_2802_81596"
                  x1="145.607"
                  y1="151.889"
                  x2="-41.6869"
                  y2="151.889"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F0F0F0" />
                  <stop
                    offset="0.80732"
                    stop-color="#EEEEEE"
                    stop-opacity="0"
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div class="cont-box">
          <!-- depart -->
          <el-row
            class="row"
            v-for="(item, index) in userInfo.organInfoList"
            :key="index"
          >
            <el-col :span="2" style="min-width: 100px">
              <div class="label" v-show="index === 0">所属部门 :</div>
            </el-col>
            <el-col :span="16">
              <div class="column">{{ item.organName }}</div>
            </el-col>
          </el-row>

          <!-- 角色 -->
          <el-row class="row">
            <el-col :span="2" style="min-width: 100px">
              <div class="label">角色 :</div>
            </el-col>
            <el-col :span="16">
              <span
                class="column"
                v-for="(item, index) in userInfo.roleInfoList"
                :key="index"
              >
                {{ item.roleName }}
                <span v-if="index !== userInfo.roleInfoList.length - 1">
                  、
                </span>
              </span>
            </el-col>
          </el-row>

          <!-- 职位 -->
          <el-row class="row">
            <el-col :span="2" style="min-width: 100px">
              <div class="label">职位 :</div>
            </el-col>
            <el-col :span="16">
              <div class="column">{{ userInfo.userTitle }}</div>
            </el-col>
          </el-row>

          <!-- 工号 -->
          <el-row class="row">
            <el-col :span="2" style="min-width: 100px">
              <div class="label">工号 :</div>
            </el-col>
            <el-col :span="16">
              <div class="column">{{ userInfo.userNo }}</div>
            </el-col>
          </el-row>

          <!-- 照片 -->
          <el-row class="row">
            <el-col :span="2" style="min-width: 100px">
              <div class="label">人脸图片 :</div>
            </el-col>
            <el-col :span="16">
              <div class="column">
                <el-upload
                  :action="`/api/user/editUserCenterFace`"
                  :headers="headers"
                  :show-file-list="false"
                  list-type="picture-card"
                  :on-success="handleAvatarSuccess"
                  :on-error="onError"
                  :before-upload="beforeAvatarUpload"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <el-image
                    v-if="userInfo.userFaceImage"
                    :src="userInfo.userFaceImage"
                    style="padding: 6px"
                  ></el-image>
                  <el-icon v-else>
                    <Plus />
                  </el-icon>
                </el-upload>
              </div>
            </el-col>
          </el-row>

          <!-- 提示 -->
          <el-row>
            <el-col :span="2" style="min-width: 80px">
              <div></div>
            </el-col>
            <el-col :span="16">
              <div class="tips">
                <div>提示</div>
                <div>1:支持上传JPG/JPEG/PNG格式的人脸图片，大小不超过5M</div>
                <div>2:请尽量保证人脸图形完整清晰，没有遮挡</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <JyDialog
        title="更换手机号"
        v-model="showFormDialog"
        :width="600"
        :height="220"
      >
        <el-form
          label-position="left"
          ref="loginformRef"
          label-width="100px"
          :model="loginform"
          hide-required-asterisk
        >
          <el-form-item>
            <template #label>
              <div class="from-label">已绑定手机号</div>
            </template>
            <div>{{ userInfo.userTel }}</div>
          </el-form-item>
          <el-form-item
            prop="phone"
            required
            :rules="[
              {
                required: true,
                message: '请输入正确的手机号',
                pattern:
                  /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
                trigger: 'change'
              }
            ]"
          >
            <template #label>
              <div class="from-label">新手机号</div>
            </template>
            <el-input
              v-model="loginform.phone"
              placeholder="请输入"
              style="width: 210px"
              maxlength="11"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="clearfix"
            label="验证码"
            prop="code"
            required
            :rules="[
              {
                required: true,
                message: '验证码是6位数字',
                trigger: 'change',
                pattern: /^\d{6}$/
              }
            ]"
          >
            <template #label>
              <div class="from-label">验证码</div>
            </template>
            <el-input
              v-model="loginform.code"
              placeholder="请输入验证码"
              style="width: 210px"
              maxlength="6"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            ></el-input>
            <VerificationBtn
              :customStyle="customStyle"
              :customClick="true"
              @customClickFn="customClick"
              ref="verificationBtn"
            ></VerificationBtn>
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button type="primary" @click="login"> 提交 </el-button>
          <el-button @click="onClose">取消</el-button>
        </template>
      </JyDialog>

      <JyDialog
        title="更换邮箱"
        v-model="showEmailDialog"
        :width="600"
        :height="100"
      >
        <el-form
          label-position="left"
          ref="loginEmailformRef"
          label-width="100px"
          :model="loginEmailform"
          hide-required-asterisk
        >
          <el-form-item>
            <template #label>
              <div class="from-label">已绑定邮箱</div>
            </template>
            <div>{{ userInfo.userMail || '暂未绑定邮箱' }}</div>
          </el-form-item>
          <el-form-item
            prop="email"
            required
            :rules="[
              {
                required: true,
                message: '邮箱格式不正确',
                pattern:
                  /^[a-z0-9A-Z]+[-|a-z0-9A-Z._]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/,
                trigger: 'change'
              }
            ]"
          >
            <template #label>
              <div class="from-label">新邮箱</div>
            </template>
            <el-input
              v-model="loginEmailform.email"
              placeholder="请输入"
              style="width: 210px"
            ></el-input>
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button type="primary" @click="loginEmail"> 提交 </el-button>
          <el-button @click="onEmailClose">取消</el-button>
        </template>
      </JyDialog>
    </div>
  </div>
</template>

<script setup>
  import router from '@/router'
  import { nextTick, reactive, ref, onBeforeMount } from 'vue'
  import { ElMessage } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  import JyDialog from '@/components/common/JyDialog/index2.vue'
  import VerificationBtn from '@/views/login/components/VerificationBtn.vue'
  import infoApi from '@/api/common/navbar'
  import { API_BASE_PREFIX } from '@/utils/constants'
  import { useAccountInfoStore } from '@/store/accountInfo'
  import { messageError } from '@/hooks/useMessage'

  const verificationBtn = ref(null)
  const headers = ref({
    'zgj-token': useAccountInfoStore().token
  })
  const loginform = reactive({
    phone: '',
    code: ''
  })

  const loginEmailform = reactive({
    email: ''
  })
  const loginformRef = ref(null)
  const loginEmailformRef = ref(null)

  const handleAvatarSuccess = (response, uploadFile) => {
    userInfo.userFaceImage = uploadFile.url
  }
  const onError = (error, uploadFile, uploadFiles) => {
    messageError(error)
  }
  const beforeAvatarUpload = rawFile => {
    if (
      rawFile.type !== 'image/jpeg' &&
      rawFile.type !== 'image/png' &&
      rawFile.type !== 'image/jpg'
    ) {
      ElMessage.error('请上传格式为jpg、jpeg、png的人脸图片')
      return false
    }
    if (rawFile.size / 1024 / 1024 > 5) {
      ElMessage.error('人脸图片最多支持5MB')
      return false
    }
    return true
  }

  const goBack = () => {
    router.go(-1)
  }

  const showFormDialog = ref(false)
  const showEmailDialog = ref(false)

  const changeEmail = () => {
    showEmailDialog.value = true
    nextTick(() => {
      loginEmailformRef.value.resetFields()
      loginEmailform.email = ''
    })
  }

  const onEmailClose = value => {
    showEmailDialog.value = false
  }

  const loginEmail = () => {
    loginEmailformRef.value.validate(valid => {
      if (valid) {
        infoApi.changeEmail(loginEmailform.email).then(_ => {
          showEmailDialog.value = false
          ElMessage.success('更改邮箱成功!')
          loadUserInfo()
        })
      } else {
        return false
      }
    })
  }

  const changePhoneNumber = () => {
    showFormDialog.value = true
    nextTick(() => {
      loginformRef.value.resetFields()
      loginform.phone = ''
      loginform.code = ''
    })
  }

  const onClose = value => {
    showFormDialog.value = false
  }

  const login = () => {
    loginformRef.value.validate(valid => {
      if (valid) {
        infoApi
          .changeMobile({ phone: loginform.phone, code: loginform.code })
          .then(res => {
            showFormDialog.value = false
            ElMessage.success('更改手机号成功!')
            loadUserInfo()
          })
      } else {
        return false
      }
    })
  }

  const customStyle = {
    width: '120px',
    height: '32px',
    fontSize: '14px'
  }
  const loading = ref(false)
  const userInfo = reactive({
    userId: '',
    userName: '',
    userTel: '',
    userMail: '',
    userTitle: '',
    userNo: '',
    userFaceImage: '',
    organInfoList: [],
    roleInfoList: []
  })

  const customClick = () => {
    loginformRef.value.validateField('phone', async valid => {
      if (valid) {
        infoApi
          .sendChangeMobileVerificationCode({
            phone: loginform.phone,
            type: 'LOGIN'
          })
          .then(res => {
            verificationBtn.value.countDown()
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
  }

  const loadUserInfo = () => {
    infoApi
      .getUserInfo()
      .then(res => {
        userInfo.userId = res.data.userId
        userInfo.userName = res.data.userName
        userInfo.userTel = res.data.userTel
        userInfo.userMail = res.data.userMail
        userInfo.userTitle = res.data.userTitle
        userInfo.userNo = res.data.userNo
        userInfo.userFaceImage = res.data.userFaceImage
          ? API_BASE_PREFIX + res.data.userFaceImage
          : ''
        userInfo.organInfoList = res.data.organInfoList
        userInfo.roleInfoList = res.data.roleInfoList
        loading.value = true
      })
      .catch(_ => {
        loading.value = true
      })
  }

  const handleRemove = () => {}

  const handlePictureCardPreview = () => {}
  onBeforeMount(() => {
    loadUserInfo()
  })
</script>

<style scoped lang="scss">
  .personall-container {
    margin: 0;
    width: 100%;
    // min-height: calc(100vh - 64px);
    padding: 16px;

    .head {
      min-height: calc(100vh - 120px);
      background: #ffffff;
      border-radius: 4px;
      padding: 24px;
      // overflow-y: auto;
      .img {
        cursor: pointer;
        vertical-align: baseline;
        margin-right: 8px;
      }

      .title {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        height: 30px;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.85);
      }

      .cont {
        .info {
          position: relative;
          display: flex;
          width: 100%;
          min-width: 600px;
          height: 120px;
          margin: 24px 0;
          background: rgba(0, 0, 0, 0.04);
          border-radius: 2px;
          overflow: hidden;

          .user {
            width: 76px;
            height: 76px;
            background: var(--jy-primary-6);
            border-radius: 50%;
            font-weight: 400;
            font-size: 22px;
            text-align: center;
            line-height: 76px;
            color: #ffffff;
            margin: 22px 32px 0 50px;
          }

          .user-msg {
            .user-name {
              font-size: 22px;
              color: rgba(0, 0, 0, 0.85);
              margin: 22px 0 24px 0;
            }

            .user-phone {
              display: flex;

              .phone-item {
                display: flex;
                font-size: 14px;
                line-height: 22px;

                .label {
                  color: rgba(0, 0, 0, 0.45);
                }

                .number {
                  padding: 0 12px;
                }

                .change {
                  color: #3e78d0;
                  cursor: pointer;
                }
              }

              .right-line {
                width: 0px;
                height: 18px;
                border: 1px solid rgba(0, 0, 0, 0.06);
                margin: 2px 40px;
              }
            }
          }

          .back-img {
            position: absolute;
            left: 700px;
            bottom: 0;
            z-index: 0;
          }
        }

        .cont-box {
          margin-left: 16px;
          .row {
            margin-bottom: 16px;
          }

          .tips {
            font-size: 12px;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.45);
          }
          .label {
            font-size: 14px;
            line-height: 22px;
            color: rgba(0, 0, 0, 0.45);
            text-align: right;
            margin-right: 12px;
          }
          .column {
            font-family: 'PingFang SC';
            color: rgba(0, 0, 0, 0.85);
            // margin-bottom: 8px;
          }
        }
      }
    }
  }
  .from-label {
    text-align: end;
    font-size: 14px;
    font-weight: 400;
    width: 100%;
    color: rgba(0, 0, 0, 0.65);
  }
</style>

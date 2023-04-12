<template>
  <div class="editBusinessRule">
    <componentsLayout special>
      <div style="width: 100%; padding: 24px 16px 0 16px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            style="--el-text-color-regular: rgba(0, 0, 0, 0.65)"
          >
            业务管理
          </el-breadcrumb-item>
          <el-breadcrumb-item
            style="
              --el-text-color-regular: rgba(0, 0, 0, 0.65);
              cursor: pointer;
            "
            @click="router.go(-1)"
          >
            业务规则管理
          </el-breadcrumb-item>
          <el-breadcrumb-item
            style="--el-text-color-regular: rgba(0, 0, 0, 0.25)"
          >
            {{
              router.currentRoute.value.query.ruleBusinessId ? '编辑' : '新增'
            }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="title">{{
          router.currentRoute.value.query.ruleBusinessId ? '编辑' : '新增'
        }}</div>
        <el-scrollbar
          height="calc(100vh - 280px)"
          style="overflow-x: hidden; padding-bottom: 20px"
        >
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="170px"
            class="demo-ruleForm"
            style="width: calc(100% - 5px)"
          >
            <el-row :gutter="5">
              <el-col :span="10">
                <el-form-item label="业务规则名称" prop="ruleBusinessName">
                  <el-input
                    v-model="ruleForm.ruleBusinessName"
                    clearable
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="业务规则编码" prop="ruleBusinessNo">
                  <el-input v-model="ruleForm.ruleBusinessNo" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="10">
                <el-form-item label="文件类型" prop="fileTypeIds">
                  <!-- <el-select
                    v-model="ruleForm.fileTypeIds"
                    multiple
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in fileTypeList"
                      :key="item.fileTypeId"
                      :label="item.fileTypeName"
                      :value="item.fileTypeId"
                    />
                  </el-select> -->
                  <div class="ap-box-contBox" style="width: 100%">
                    <el-select
                      v-model="ruleForm.fileTypeIds"
                      multiple
                      placeholder="请选择"
                      style="width: 100%"
                      popper-class="hidePoper"
                      :class="{
                        hasContent:
                          ruleForm.fileTypeIds && ruleForm.fileTypeIds.length
                      }"
                      @click="clickFileType"
                      collapse-tags
                      collapse-tags-tooltip
                      :max-collapse-tags="3"
                    >
                      <el-option
                        v-for="one in fileTypeList"
                        :key="one.fileTypeId"
                        :label="one.fileTypeName"
                        :value="one.fileTypeId"
                      />
                    </el-select>
                    <div class="ap-box-contBox-icon" @click="clickFileType">
                      <img
                        class="ap-box-contBox-icon-img"
                        src="@/assets/svg/ketanchude.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="用印类型" prop="sealUseTypeId">
                  <el-select
                    v-model="ruleForm.sealUseTypeId"
                    placeholder="请选择"
                    style="width: 100%"
                    disabled
                  >
                    <el-option label="物理用印" value="1" />
                    <el-option label="电子签章" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- tabs -->
            <div class="tabs">
              <div
                class="oneTab"
                :class="{ actived: currentTab === 1 }"
                @click.stop="changeTab(1)"
                >智能用印</div
              >
              <div
                class="oneTab"
                :class="{ actived: currentTab === 2 }"
                @click.stop="changeTab(2)"
                >普通用印</div
              >
            </div>
            <!-- 表单 -->
            <div style="margin-left: 45px; margin-bottom: 24px">
              <div class="labelTitle">用印设置</div>
              <div class="grayBg">
                <div class="normal-checkbox">
                  <el-form-item label="防伪打印" prop="qrCodeSwitch">
                    <el-checkbox
                      v-model="ruleForm.qrCodeSwitch"
                      label="二维码水印"
                      true-label="1"
                      false-label="0"
                    />
                  </el-form-item>
                  <el-form-item prop="wordWaterSwitch">
                    <el-checkbox
                      v-model="ruleForm.wordWaterSwitch"
                      label="文字水印"
                      true-label="1"
                      false-label="0"
                    />
                  </el-form-item>
                  <el-form-item prop="gridWaterSwitch">
                    <el-checkbox
                      v-model="ruleForm.gridWaterSwitch"
                      label="网纹水印"
                      true-label="1"
                      false-label="0"
                    />
                  </el-form-item>
                  <el-form-item prop="invisibleWaterMarkSwitch">
                    <el-checkbox
                      v-model="ruleForm.invisibleWaterMarkSwitch"
                      label="隐形水印"
                      true-label="1"
                      false-label="0"
                    />
                  </el-form-item>
                </div>
                <template v-if="currentTab === 1">
                  <el-row :gutter="5">
                    <el-col :span="10">
                      <el-form-item label="外借电子围栏" prop="railSwitch">
                        <el-switch
                          v-model="ruleForm.railSwitch"
                          active-value="1"
                          inactive-value="0"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="批量用印" prop="batchSwitch">
                        <template #label>
                          <span>批量用印 </span>
                          <el-popover
                            placement="top"
                            effect="dark"
                            trigger="hover"
                            content="批量用印"
                          >
                            <template #reference>
                              <svg
                                class="svg-icon el-tooltip__trigger"
                                aria-hidden="true"
                                data-v-11cc4082=""
                              >
                                <use
                                  xlink:href="#icon-el-info"
                                  data-v-11cc4082=""
                                ></use>
                              </svg>
                            </template>
                          </el-popover>
                        </template>
                        <el-switch
                          v-model="ruleForm.batchSwitch"
                          active-value="1"
                          inactive-value="0"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </template>
              </div>
              <template v-if="currentTab === 1">
                <div class="labelTitle">远程监督用印</div>
                <div class="grayBg">
                  <el-form-item label="远程盖章确认人" prop="remoteUsers">
                    <div class="contentBoxes">
                      <div class="ap-box-contBox">
                        <el-select
                          v-model="ruleForm.remoteUsers"
                          multiple
                          placeholder="请选择"
                          style="width: 100%"
                          popper-class="hidePoper"
                          :class="{
                            hasContent:
                              ruleForm.remoteUsers &&
                              ruleForm.remoteUsers.length
                          }"
                          @click="clickDialog('remoteUsers')"
                        >
                          <el-option
                            v-for="one in remoteUsersList"
                            :key="one.value"
                            :label="one.label"
                            :value="one.value"
                          />
                        </el-select>
                        <div
                          class="ap-box-contBox-icon"
                          @click="clickDialog('remoteUsers')"
                        >
                          <img
                            class="ap-box-contBox-icon-img"
                            src="@/assets/svg/ketanchude.svg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="xian">（限10人）</div>
                    </div>
                  </el-form-item>
                  <el-form-item label="视频盖章确认人" prop="videoUsers">
                    <div class="contentBoxes">
                      <div class="ap-box-contBox">
                        <el-select
                          v-model="ruleForm.videoUsers"
                          multiple
                          placeholder="请选择"
                          style="width: 100%"
                          popper-class="hidePoper"
                          :class="{
                            hasContent:
                              ruleForm.videoUsers && ruleForm.videoUsers.length
                          }"
                          @click="clickDialog('videoUsers')"
                        >
                          <el-option
                            v-for="one in videoUsersList"
                            :key="one.value"
                            :label="one.label"
                            :value="one.value"
                          />
                        </el-select>
                        <div
                          class="ap-box-contBox-icon"
                          @click="clickDialog('videoUsers')"
                        >
                          <img
                            class="ap-box-contBox-icon-img"
                            src="@/assets/svg/ketanchude.svg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="xian">（限10人）</div>
                    </div>
                  </el-form-item>
                </div>
              </template>
            </div>
            <el-timeline>
              <template v-if="currentTab === 1">
                <el-timeline-item hide-timestamp>
                  <template #dot>
                    <div class="timeDot"><div></div></div>
                  </template>
                  <div class="timeLineTitle">盖前</div>
                  <el-divider />
                  <div class="grayBg">
                    <el-row :gutter="5">
                      <el-col :span="24">
                        <el-row :gutter="15">
                          <el-col :span="5">
                            <el-form-item
                              label="盖前采集人脸"
                              prop="frontFaceSwitch"
                            >
                              <template #label>
                                <span>盖前采集人脸 </span>
                                <el-popover
                                  placement="top"
                                  effect="dark"
                                  trigger="hover"
                                  content="盖前采集人脸"
                                >
                                  <template #reference>
                                    <svg
                                      class="svg-icon el-tooltip__trigger"
                                      aria-hidden="true"
                                      data-v-11cc4082=""
                                    >
                                      <use
                                        xlink:href="#icon-el-info"
                                        data-v-11cc4082=""
                                      ></use>
                                    </svg>
                                  </template>
                                </el-popover>
                              </template>
                              <el-switch
                                v-model="ruleForm.frontFaceSwitch"
                                active-value="1"
                                inactive-value="0"
                                @change="changeFrontFaceSwitch"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col
                            :span="19"
                            v-if="ruleForm.frontFaceSwitch === '1'"
                            style="display: flex"
                          >
                            <el-form-item
                              label-width="auto"
                              label="采集时机"
                              prop="frontFaceSelectVal"
                            >
                              <el-radio-group
                                v-model="ruleForm.frontFaceSelectVal"
                              >
                                <el-radio label="1"
                                  >每个印章首次进入采集</el-radio
                                >
                                <el-radio label="2">每次进入都采集</el-radio>
                              </el-radio-group>
                            </el-form-item>
                            <el-form-item label="采集需人脸检测">
                              <el-switch
                                v-model="ruleForm.frontFaceCheckSwitch"
                                active-value="1"
                                inactive-value="0"
                              />
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :span="24">
                        <el-row :gutter="15">
                          <el-col :span="5">
                            <el-form-item
                              label="盖前人脸比对"
                              prop="frontFaceSwitch"
                            >
                              <template #label>
                                <span>盖前人脸比对 </span>
                                <el-popover
                                  placement="top"
                                  effect="dark"
                                  trigger="hover"
                                  content="盖前人脸比对"
                                >
                                  <template #reference>
                                    <svg
                                      class="svg-icon el-tooltip__trigger"
                                      aria-hidden="true"
                                      data-v-11cc4082=""
                                    >
                                      <use
                                        xlink:href="#icon-el-info"
                                        data-v-11cc4082=""
                                      ></use>
                                    </svg>
                                  </template>
                                </el-popover>
                              </template>
                              <el-switch
                                v-model="ruleForm.frontFaceVsSwitch"
                                active-value="1"
                                inactive-value="0"
                                @change="changeFrontFaceDuibiSwitch"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col
                            :span="18"
                            v-if="ruleForm.frontFaceVsSwitch === '1'"
                          >
                            <el-row :gutter="5">
                              <el-col :span="12">
                                <el-form-item
                                  label-width="auto"
                                  label="比对时机"
                                  prop="frontFaceVsOption"
                                >
                                  <el-radio-group
                                    v-model="ruleForm.frontFaceVsOption"
                                  >
                                    <el-radio label="1"
                                      >每个印章首次进入比对</el-radio
                                    >
                                    <el-radio label="2"
                                      >每次进入都比对</el-radio
                                    >
                                  </el-radio-group>
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <div class="normal-checkbox">
                                  <el-form-item
                                    label-width="auto"
                                    label="比对人"
                                    prop="frontFaceVsAgentSwitch"
                                    :rules="[
                                      {
                                        required: true,
                                        trigger: 'change',
                                        validator: (rule, value, callback) => {
                                          if (
                                            ruleForm.frontFaceVsAgentSwitch ===
                                              '0' &&
                                            ruleForm.frontFaceVsKeeprSwitch ===
                                              '0'
                                          ) {
                                            callback('请选择人脸比对人')
                                          } else {
                                            callback()
                                          }
                                        }
                                      }
                                    ]"
                                  >
                                    <el-checkbox
                                      v-model="ruleForm.frontFaceVsAgentSwitch"
                                      true-label="1"
                                      false-label="0"
                                      >盖章人和代办人</el-checkbox
                                    >
                                  </el-form-item>

                                  <el-form-item
                                    label-width="auto"
                                    prop="frontFaceVsKeeprSwitch"
                                  >
                                    <el-checkbox
                                      v-model="ruleForm.frontFaceVsKeeprSwitch"
                                      true-label="1"
                                      false-label="0"
                                      @change="
                                        ruleFormRef.validateField(
                                          'frontFaceVsAgentSwitch'
                                        )
                                      "
                                      >盖章人和保管人</el-checkbox
                                    >
                                  </el-form-item>
                                </div>
                              </el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                      </el-col>

                      <el-col :span="8">
                        <el-form-item
                          label="盖前强制OCR核验"
                          prop="frontOcrSwitch"
                        >
                          <template #label>
                            <span>盖前强制OCR核验 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="盖前强制OCR核验"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.frontOcrSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="二维码水印核验"
                          prop="frontQrCodeSwitch"
                        >
                          <template #label>
                            <span>二维码水印核验 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="二维码水印核验"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.frontQrCodeSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-timeline-item>
                <el-timeline-item hide-timestamp>
                  <template #dot>
                    <div class="timeDot"><div></div></div>
                  </template>
                  <div class="timeLineTitle">盖中</div>
                  <el-divider />
                  <div class="grayBg">
                    <el-row :gutter="5">
                      <el-col :span="16">
                        <el-row :gutter="0">
                          <el-col :span="3">
                            <el-form-item
                              label="盖中拍照"
                              prop="runPhotoSwitch"
                            >
                              <template #label>
                                <span>盖中拍照 </span>
                                <el-popover
                                  placement="top"
                                  effect="dark"
                                  trigger="hover"
                                  content="盖中拍照"
                                >
                                  <template #reference>
                                    <svg
                                      class="svg-icon el-tooltip__trigger"
                                      aria-hidden="true"
                                      data-v-11cc4082=""
                                    >
                                      <use
                                        xlink:href="#icon-el-info"
                                        data-v-11cc4082=""
                                      ></use>
                                    </svg>
                                  </template>
                                </el-popover>
                              </template>
                              <el-switch
                                v-model="ruleForm.runPhotoSwitch"
                                active-value="1"
                                inactive-value="0"
                                @change="changeRunPhotoSwitch"
                              />
                            </el-form-item>
                          </el-col>
                          <el-col
                            :span="21"
                            v-if="ruleForm.runPhotoSwitch === '1'"
                          >
                            <el-form-item label="" prop="runPhotoSelectVal">
                              <el-radio-group
                                v-model="ruleForm.runPhotoSelectVal"
                              >
                                <el-radio label="1">扫码时拍照</el-radio>
                                <el-radio label="2">下盖时拍照</el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="盖中录制视频"
                          prop="runVideoSwitch"
                        >
                          <template #label>
                            <span>盖中录制视频 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="盖中录制视频"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.runVideoSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="强制定位" prop="runGpsSwitch">
                          <template #label>
                            <span>强制定位 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="强制定位"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.runGpsSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="长盖章" prop="runDelaySwitch">
                          <template #label>
                            <span>长盖章 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="长盖章"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.runDelaySwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="智感盖章" prop="runSensorSwitch">
                          <template #label>
                            <span>智感盖章 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="智感盖章"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.runSensorSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="二维码水印核验"
                          prop="runQrCodeSwitch"
                        >
                          <template #label>
                            <span>二维码水印核验 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="二维码水印核验"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.runQrCodeSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="一盖一码" prop="runOneCodeSwitch">
                          <template #label>
                            <span>一盖一码 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="一盖一码"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.runOneCodeSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="移动侦测" prop="runMoveSwitch">
                          <template #label>
                            <span>移动侦测 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="移动侦测"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.runMoveSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="怼章移动侦测"
                          prop="runViolenceMoveSwitch"
                        >
                          <template #label>
                            <span>怼章移动侦测 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="怼章移动侦测"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.runViolenceMoveSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="盖章距离检测"
                          prop="runDistanceSwitch"
                        >
                          <template #label>
                            <span>盖章距离检测 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="盖章距离检测"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.runDistanceSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="图片清晰度检测"
                          prop="runDefinitionSwitch"
                        >
                          <template #label>
                            <span>图片清晰度检测 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="图片清晰度检测"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.runDefinitionSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- <el-row :gutter="15">
                      <el-col :span="5">
                        <el-form-item label="人脸检测" prop="runFaceSwitch">
                          <template #label>
                            <span>人脸检测 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="人脸检测"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.runFaceSwitch"
                            active-value="1"
                            inactive-value="0"
                            @change="changeRunFaceSwitch"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="19" v-if="ruleForm.runFaceSwitch === '1'">
                        <el-row :gutter="5">
                          <el-col :span="12">
                            <el-form-item
                              label="比对时机"
                              label-width="auto"
                              prop="runFaceDate"
                            >
                              <el-radio-group v-model="ruleForm.runFaceDate">
                                <el-radio label="1">首次进入比对</el-radio>
                                <el-radio label="2">每次进入都比对</el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item
                              label-width="auto"
                              label="人脸比对人"
                              prop="runFaceUser"
                              :rules="[
                                { required: true, message: '请选择人脸比对人' }
                              ]"
                            >
                              <el-checkbox-group v-model="ruleForm.runFaceUser">
                                <el-checkbox label="1"
                                  >盖章人和代办人</el-checkbox
                                >
                                <el-checkbox label="2"
                                  >盖章人和保管人</el-checkbox
                                >
                              </el-checkbox-group>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row> -->
                  </div>
                </el-timeline-item>
                <el-timeline-item hide-timestamp>
                  <template #dot>
                    <div class="timeDot"><div></div></div>
                  </template>
                  <div class="timeLineTitle">盖后</div>
                  <el-divider />
                  <div class="grayBg">
                    <el-row :gutter="5">
                      <el-col :span="8">
                        <el-form-item
                          label="盖后自动存档"
                          prop="laterAutoSaveSwitch"
                        >
                          <template #label>
                            <span>盖后自动存档 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="盖后自动存档"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.laterAutoSaveSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item
                          label="二维码水印核验"
                          prop="laterQrCodeSwitch"
                        >
                          <template #label>
                            <span>二维码水印核验 </span>
                            <el-popover
                              placement="top"
                              effect="dark"
                              trigger="hover"
                              content="二维码水印核验"
                            >
                              <template #reference>
                                <svg
                                  class="svg-icon el-tooltip__trigger"
                                  aria-hidden="true"
                                  data-v-11cc4082=""
                                >
                                  <use
                                    xlink:href="#icon-el-info"
                                    data-v-11cc4082=""
                                  ></use>
                                </svg>
                              </template>
                            </el-popover>
                          </template>
                          <el-switch
                            v-model="ruleForm.laterQrCodeSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-timeline-item>
              </template>
              <el-timeline-item hide-timestamp>
                <template #dot>
                  <div class="timeDot"><div></div></div>
                </template>
                <div class="timeLineTitle">归档</div>
                <el-divider />
                <div class="grayBg">
                  <el-row :gutter="5">
                    <el-col :span="8">
                      <el-form-item label="需要归档" prop="archiveSwitch">
                        <template #label>
                          <span>需要归档 </span>
                          <el-popover
                            placement="top"
                            effect="dark"
                            trigger="hover"
                            content="需要归档"
                          >
                            <template #reference>
                              <svg
                                class="svg-icon el-tooltip__trigger"
                                aria-hidden="true"
                                data-v-11cc4082=""
                              >
                                <use
                                  xlink:href="#icon-el-info"
                                  data-v-11cc4082=""
                                ></use>
                              </svg>
                            </template>
                          </el-popover>
                        </template>
                        <el-switch
                          v-model="ruleForm.archiveSwitch"
                          active-value="1"
                          inactive-value="0"
                          @change="changeArchiveSwitch"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="强制归档"
                        prop="archiveRequiredSwitch"
                      >
                        <el-switch
                          v-model="ruleForm.archiveRequiredSwitch"
                          active-value="1"
                          inactive-value="0"
                          :disabled="ruleForm.archiveSwitch === '0'"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="二维码水印核验"
                        prop="archiveQrCodeSwitch"
                      >
                        <template #label>
                          <span>二维码水印核验 </span>
                          <el-popover
                            placement="top"
                            effect="dark"
                            trigger="hover"
                            content="二维码水印核验"
                          >
                            <template #reference>
                              <svg
                                class="svg-icon el-tooltip__trigger"
                                aria-hidden="true"
                                data-v-11cc4082=""
                              >
                                <use
                                  xlink:href="#icon-el-info"
                                  data-v-11cc4082=""
                                ></use>
                              </svg>
                            </template>
                          </el-popover>
                        </template>
                        <el-switch
                          v-model="ruleForm.archiveQrCodeSwitch"
                          active-value="1"
                          inactive-value="0"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="归档文件页数校验"
                        prop="archivePageSwitch"
                      >
                        <template #label>
                          <span>归档文件页数校验 </span>
                          <el-popover
                            placement="top"
                            effect="dark"
                            trigger="hover"
                            content="归档文件页数校验"
                          >
                            <template #reference>
                              <svg
                                class="svg-icon el-tooltip__trigger"
                                aria-hidden="true"
                                data-v-11cc4082=""
                              >
                                <use
                                  xlink:href="#icon-el-info"
                                  data-v-11cc4082=""
                                ></use>
                              </svg>
                            </template>
                          </el-popover>
                        </template>
                        <el-switch
                          v-model="ruleForm.archivePageSwitch"
                          active-value="1"
                          inactive-value="0"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        label="归档后自动OCR校验"
                        prop="archiveOcrSwitch"
                      >
                        <template #label>
                          <span>归档后自动OCR校验 </span>
                          <el-popover
                            placement="top"
                            effect="dark"
                            trigger="hover"
                            content="归档后自动OCR校验"
                          >
                            <template #reference>
                              <svg
                                class="svg-icon el-tooltip__trigger"
                                aria-hidden="true"
                                data-v-11cc4082=""
                              >
                                <use
                                  xlink:href="#icon-el-info"
                                  data-v-11cc4082=""
                                ></use>
                              </svg>
                            </template>
                          </el-popover>
                        </template>
                        <el-switch
                          v-model="ruleForm.archiveOcrSwitch"
                          active-value="1"
                          inactive-value="0"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-timeline-item>
            </el-timeline>
          </el-form>
        </el-scrollbar>
      </div>
      <div class="businessFooter">
        <el-button type="primary" @click.stop="submitBusinessRule"
          >保存</el-button
        >
        <el-button @click.stop="resetForm">重置</el-button>
      </div>
    </componentsLayout>
    <kDepartOrPersonVue
      v-if="showDeptDialog"
      :show="showDepPerDialog"
      :max="10"
      @update:show="closeShow"
      :searchSelected="searchSelected"
      @update:searchSelected="submitSelected"
      :tabsShow="tabsShow"
    />

    <!-- 选择文件类型 -->
    <KDocumentTypeDialog
      v-model:show="showDocumentTypeDialog"
      :searchSelected="documentTypeSelected"
      @update:searchSelected="documentTypeSubmit"
      :queryParams="queryParams"
      v-if="showDocumentTypeDialog"
    ></KDocumentTypeDialog>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import componentsLayout from '@/views/components/Layout'
  import { fileManageService } from '@/api/frontDesk/fileManage/index'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import KDocumentTypeDialog from '@/views/components/modules/KDocumentTypeDialog'
  import { generatingNumber } from '@/utils/tools'
  import { useRouter } from 'vue-router'
  import ruleApi from '@/api/system/businessManage/businessRule'
  import { messageSuccess, messageWarning } from '@/hooks/useMessage'
  import { getItem } from '@/utils/storage'
  const router = useRouter()
  class BusinessRule {
    ruleBusinessId = ''
    ruleBusinessName = ''
    ruleBusinessNo = ''
    fileTypeIds = []
    sealUseTypeId = '1'
    railSwitch = '0'
    batchSwitch = '0'
    qrCodeSwitch = '0'
    wordWaterSwitch = '0'
    gridWaterSwitch = '0'
    invisibleWaterMarkSwitch = '0'
    remoteUsers = []
    videoUsers = []
    frontFaceSwitch = '0'
    frontFaceSelectVal = ''
    frontFaceVsSwitch = '0'
    frontFaceVsOption = ''
    // frontFaceUser = []
    frontFaceVsAgentSwitch = '0'
    frontFaceVsKeeprSwitch = '0'
    frontOcrSwitch = '0'
    frontQrCodeSwitch = '0'
    runPhotoSwitch = '0'
    runPhotoSelectVal = ''
    runVideoSwitch = '0'
    runGpsSwitch = '0'
    runDelaySwitch = '0'
    runSensorSwitch = '0'
    runQrCodeSwitch = '0'
    runOneCodeSwitch = '0'
    runMoveSwitch = '0'
    runViolenceMoveSwitch = '0'
    runDistanceSwitch = '0'
    runDefinitionSwitch = '0'
    // runFaceSwitch = '0'
    // runFaceDate = ''
    // runFaceUser = []
    laterAutoSaveSwitch = '0'
    laterQrCodeSwitch = '0'
    archiveSwitch = '0'
    archiveRequiredSwitch = '0'
    archiveQrCodeSwitch = '0'
    archivePageSwitch = '0'
    archiveOcrSwitch = '0'
    frontFaceCheckSwitch = '0'
  }
  let ruleBusinessNo = generatingNumber()
  const ruleForm = ref(new BusinessRule())
  const ruleFormRef = ref(null)
  const currentTab = ref(1)
  const remoteUsersList = ref([])
  const videoUsersList = ref([])
  const showDeptDialog = ref(false)
  const showDepPerDialog = ref(false)
  const searchSelected = ref([])
  const kDepartOrPerson = ref(null)
  const tabsShow = ref(['user'])

  const userId =
    getItem('accountInfo') && getItem('accountInfo').userInfo
      ? getItem('accountInfo').userInfo.userId
      : ''
  const queryParams = ref({
    userId
  })

  const rules = ref({
    ruleBusinessName: [
      {
        required: true,
        message: '请输入业务规则名称',
        trigger: 'change'
      }
    ],
    fileTypeIds: [
      {
        required: true,
        message: '请选择文件类型',
        trigger: 'change'
      }
    ],
    remoteUsers: [
      {
        required: true,
        message: '请选择远程盖章确认人',
        trigger: 'change'
      }
    ],
    videoUsers: [
      {
        required: true,
        message: '请选择视频盖章确认人',
        trigger: 'change'
      }
    ]
  })

  const fileTypeList = ref([])
  const showDocumentTypeDialog = ref(false)
  const documentTypeSelected = ref([])

  const submitBusinessRule = () => {
    ruleFormRef.value.validate(valid => {
      if (valid) {
        const ruleFormParams = JSON.parse(JSON.stringify(ruleForm.value))
        // ruleFormParams.runFaceUser = ruleFormParams.runFaceUser.join(',')
        ruleApi.addOrUpdate(ruleFormParams).then(() => {
          messageSuccess(
            ruleForm.value.ruleBusinessId ? '编辑成功' : '添加成功'
          )
          router.go(-1)
        })
      } else {
        console.log(1)
        messageWarning('请检查所有必填项')
      }
    })
  }

  const resetForm = () => {
    ruleFormRef.value.resetFields()
    ruleForm.value.ruleBusinessNo = ruleBusinessNo
  }

  const getFileTypeList = () => {
    fileManageService.getFileTypeList().then(res => {
      fileTypeList.value = res.data
    })
  }

  // 修改tab
  const changeTab = type => {
    if (currentTab.value === type) return
    currentTab.value = type
  }

  // 选择文件类型
  const clickFileType = () => {
    showDocumentTypeDialog.value = true
  }

  // 文件类型提交
  const documentTypeSubmit = value => {
    console.log(value)
    ruleForm.value.fileTypeIds = value.map(i => i.fileTypeId)
    // const index = state.cache.formData.findIndex(
    //   i => i.id === kDialogOpenId.value
    // )
    // if (index > -1) {
    //   if (state.cache.formData[index].defaultAttribute.multiple) {
    //     state.cache.formData[index].values = value.map(i => i.id)
    //   } else {
    //     state.cache.formData[index].values = value[0].id
    //   }
    //   state.cache.formData[index].options = value.map(i => {
    //     return {
    //       label: i.name,
    //       value: i.id
    //     }
    //   })
    // }
  }

  // 盖前采集人脸
  const changeFrontFaceSwitch = () => {
    if (ruleForm.value.frontFaceVsSwitch === '1') {
      ruleForm.value.frontFaceSwitch = '0'
      return messageWarning('需先关闭盖前人脸对比')
    }
    if (ruleForm.value.frontFaceSwitch === '1') {
      ruleForm.value.frontFaceSelectVal = '1'
      ruleForm.value.frontFaceVsSwitch = '0'
      ruleForm.value.frontFaceVsOption = ''
      ruleForm.value.frontFaceVsAgentSwitch = '0'
      ruleForm.value.frontFaceVsKeeprSwitch = '0'
      // ruleForm.value.frontFaceUser = []
    } else {
      ruleForm.value.frontFaceSelectVal = ''
    }
  }

  // 盖前人脸对比
  const changeFrontFaceDuibiSwitch = () => {
    if (ruleForm.value.frontFaceSwitch === '1') {
      ruleForm.value.frontFaceVsSwitch = '0'
      return messageWarning('需先关闭盖前采集人脸')
    }
    if (ruleForm.value.frontFaceVsSwitch === '1') {
      ruleForm.value.frontFaceVsOption = '1'
      // ruleForm.value.frontFaceUser = ['1']
      ruleForm.value.frontFaceVsAgentSwitch = '0'
      ruleForm.value.frontFaceVsKeeprSwitch = '0'
      ruleForm.value.frontFaceSwitch = '0'
      ruleForm.value.frontFaceSelectVal = ''
    } else {
      ruleForm.value.frontFaceVsOption = ''
      // ruleForm.value.frontFaceUser = []
      ruleForm.value.frontFaceVsAgentSwitch = '0'
      ruleForm.value.frontFaceVsKeeprSwitch = '0'
    }
  }

  // 盖中拍照
  const changeRunPhotoSwitch = () => {
    if (ruleForm.value.runPhotoSwitch === '1') {
      ruleForm.value.runPhotoSelectVal = '1'
    } else {
      ruleForm.value.runPhotoSelectVal = ''
    }
  }

  // 人脸检测
  // const changeRunFaceSwitch = () => {
  //   if (ruleForm.value.runFaceSwitch === '1') {
  //     ruleForm.value.runFaceDate = '1'
  //     ruleForm.value.runFaceUser = ['1']
  //   } else {
  //     ruleForm.value.runFaceDate = ''
  //     ruleForm.value.runFaceUser = []
  //   }
  // }

  // 归档
  const changeArchiveSwitch = () => {
    if (ruleForm.value.archiveSwitch === '0') {
      ruleForm.value.archiveRequiredSwitch = '0'
    }
  }

  // 选择确认人
  const clickDialog = type => {
    console.log(type)
    showDeptDialog.value = true
    kDepartOrPerson.value = type
    searchSelected.value = ruleForm.value[type]
    console.log(searchSelected.value)
    setTimeout(() => {
      showDepPerDialog.value = true
    }, 200)
  }

  // 确认选择确认人
  const submitSelected = value => {
    ruleForm.value[kDepartOrPerson.value] = value.map(i => i.id)
    // ruleForm.value[kDepartOrPerson.value] = value
    if (kDepartOrPerson.value === 'remoteUsers') {
      remoteUsersList.value = value.map(i => {
        return {
          label: i.name,
          value: i.id
        }
      })
    } else {
      videoUsersList.value = value.map(i => {
        return {
          label: i.name,
          value: i.id
        }
      })
    }
  }

  const closeShow = () => {
    showDepPerDialog.value = false
    setTimeout(() => {
      showDeptDialog.value = false
    }, 200)
  }

  // 获取详情
  const getRuleBusinessDetail = () => {
    ruleApi
      .ruleView(router.currentRoute.value.query.ruleBusinessId)
      .then(res => {
        const data = res.data
        // data.fileTypeIds = data.fileTypes.map(i => i.fileTypeId)
        // data.runFaceUser = data.runFaceUser.split(',')
        data.remoteUsers = data.remoteSealUserList.map(i => i.userId)
        // data.remoteUsers = data.remoteSealUserList
        remoteUsersList.value = data.remoteSealUserList.map(i => {
          return {
            label: i.userName,
            value: i.userId
          }
        })
        data.videoUsers = data.remoteVideoList.map(i => i.userId)
        // data.videoUsers = data.remoteVideoList
        videoUsersList.value = data.remoteVideoList.map(i => {
          return {
            label: i.userName,
            value: i.userId
          }
        })
        delete data.fileTypes
        ruleBusinessNo = data.ruleBusinessNo
        data.fileTypeIds = data.fileTypeList.map(v => v.fileTypeId)
        ruleForm.value = data
        documentTypeSelected.value = data.fileTypeList.map(v => {
          return { ...v, type: 'document' }
        })
      })
  }

  onMounted(() => {
    getFileTypeList()
    if (router.currentRoute.value.query.ruleBusinessId) {
      getRuleBusinessDetail()
    } else {
      ruleForm.value.ruleBusinessNo = ruleBusinessNo
    }
  })
</script>
<style lang="scss" scoped>
  .title {
    font-size: 22px;
    margin: 16px 0;
  }

  .businessFooter {
    width: 100%;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba($color: #000000, $alpha: 0.06);
  }
  .labelTitle {
    font-size: 14px;
    color: rgba($color: #000000, $alpha: 0.45);
    margin-bottom: 8px;
    margin-top: 18px;
  }

  .grayBg {
    background-color: rgba($color: #000000, $alpha: 0.04);
    padding: 24px 12px 6px;
    margin-top: 8px;
    .normal-checkbox {
      display: flex;
      :deep(.el-form-item__content) {
        margin-left: 0 !important;
        margin-right: 16px !important;
      }
    }
  }

  .tabs {
    display: flex;
    align-items: center;
    width: 172px;
    height: 28px;
    border-radius: 2px;
    border: 1px solid rgba($color: #000000, $alpha: 0.15);
    background: rgba(0, 0, 0, 0.04);

    .oneTab {
      width: 84px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      color: rgba($color: #000000, $alpha: 0.85);
      cursor: pointer;
    }

    .actived {
      color: var(--jy-primary-6);
      background-color: #ffffff;
      border-radius: 2px;
    }
  }

  .timeLineTitle {
    font-size: 16px;
    color: rgba($color: #000000, $alpha: 0.85);
  }

  .timeDot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #e8f5ff;
    margin-top: -4px;
    margin-left: -5px;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      width: 14px;
      height: 14px;
      background-color: #3e78d0;
      border-radius: 50%;
    }
  }
</style>

<style lang="scss">
  .hidePoper {
    display: none;
  }
  .editBusinessRule .ap-deliberate {
    padding: 0 !important;
  }

  .editBusinessRule .el-tabs__content {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 18px;
  }

  .editBusinessRule .el-timeline {
    padding-left: 14px;
  }

  .editBusinessRule {
    .el-divider {
      margin: 8px 0 16px;
    }
    .hasContent {
      .el-input__wrapper {
        -webkit-text-fill-color: #000;
      }

      .el-input__inner {
        -webkit-text-fill-color: #000;
      }
    }

    .contentBoxes {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .xian {
        color: rgba($color: #000000, $alpha: 0.45);
        font-size: 12px;
      }
    }

    .ap-box-contBox {
      width: calc(100% - 70px);
      position: relative;
      display: flex;
      align-items: center;

      .el-input__suffix {
        display: none;
      }

      .el-select .el-input.is-disabled .el-input__wrapper {
        cursor: pointer;
      }

      .el-select .el-input.is-disabled .el-input__inner {
        cursor: pointer;
      }

      .el-input.is-disabled .el-input__wrapper {
        background-color: #ffffff;
      }

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
</style>
